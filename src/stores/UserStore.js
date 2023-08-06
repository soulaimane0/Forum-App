import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';
import { db, auth } from '@/helpers/firestore.js';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';
import usePostsStore from '@/stores/PostsStore';
import useThreadStore from '@/stores/ThreadStore';
import useAuthStore from '@/stores/AuthenticatedStore';
import { appendUnsubscribe } from '@/helpers';
import useNotifications from '@/composables/useNotifications';

const { addNotification } = useNotifications();
const useUserStore = defineStore('userStore', {
  state: () => {
    return { users: reactive([]), user: reactive({}), posts: reactive([]) };
  },
  getters: {
    getUser: (state) => async (userId) => {
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          doc(db, 'users', userId),
          (doc) => {
            const user = { ...doc.data(), id: doc.id };
            state.user = user;
            resolve(user);
          },
          reject
        );
        appendUnsubscribe(unsubscribe);
      });
    },
    getPostsByUser: (state) => (userId) => {
      return new Promise((resolve, reject) => {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('userId', '==', userId));
        const unsubscribe = onSnapshot(
          q,
          (snapshotQuery) => {
            try {
              const posts = snapshotQuery.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              state.posts = posts;
              resolve(posts);
            } catch (error) {
              console.error('While getting posts : ', error);
            }
          },
          reject
        );
        appendUnsubscribe(unsubscribe);
      });
    },
    getThreadByUser: () => (userId) => {
      return new Promise((resolve, reject) => {
        const threadsRef = collection(db, 'threads');
        const q = query(threadsRef, where('userId', '==', userId));
        const unsubscribe = onSnapshot(
          q,
          (snapshotQuery) => {
            try {
              const threads = snapshotQuery.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              resolve(threads);
            } catch (error) {
              console.error('While getting threads : ', error);
            }
          },
          reject
        );
        appendUnsubscribe(unsubscribe);
      });
    },
    countUserPosts: () => (userId) =>
      usePostsStore().posts.filter((post) => post.userId === userId)?.length,
    countUserThreads: () => (userId) =>
      useThreadStore().threads.filter((thread) => thread.userId === userId)?.length,
  },
  actions: {
    fetchUsers() {
      const unsubscribe = onSnapshot(collection(db, 'users'), (snapshotQuery) => {
        try {
          const docs = snapshotQuery.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          this.users = docs;
        } catch (error) {
          console.error(error);
        }
      });
      appendUnsubscribe(unsubscribe);
    },
    async updateUserDetails(userData, userId) {
      try {
        const userRef = doc(db, 'users', userId);
        let userInfos = {
          username: userData.username,
          name: userData.name,
          bio: userData.bio || null,
          email: userData.email,
          website: userData.website || null,
          location: userData.location || null,
        };

        if (userData.avatar) {
          const storage = getStorage();
          const storageRef = ref(
            storage,
            `uploads/${userId}/images/${Date.now()}-${userData.avatar.name}`
          );
          const snapShot = await uploadBytes(storageRef, userData.avatar);
          userData.avatar = await getDownloadURL(snapShot.ref);
          userInfos.avatar = userData.avatar;
        }
        this.user = { ...userInfos };
        await updateDoc(userRef, { ...userInfos });
        await useAuthStore().getAuthenticatedUser();
        addNotification({ message: 'Profile Updated Successfully!', timeout: 6000 });
      } catch (error) {
        console.error(error);
      }
    },
    async createUser(id, name, username, email, avatar = null) {
      try {
        const usernameLower = username.toLowerCase();
        email = email.toLowerCase();
        const registeredAt = serverTimestamp();
        const userRef = doc(db, 'users', id);
        const user = reactive({
          avatar,
          name,
          email,
          username,
          usernameLower,
          registeredAt,
        });
        await setDoc(userRef, user);
      } catch (err) {
        throw new Error(err);
      }
    },
    async registerUserWithEmailAndPassword(
      name,
      username,
      email,
      avatar = null,
      password
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (avatar) {
          const storage = getStorage();
          const storageRef = ref(
            storage,
            `uploads/${userCredential.user.uid}/images/${Date.now()}-${avatar.name}`
          );
          const snapShot = await uploadBytes(storageRef, avatar);
          avatar = await getDownloadURL(snapShot.ref);
        }
        addNotification({ message: 'Successful registration!', timeout: 6000 });
        await this.createUser(userCredential.user.uid, name, username, email, avatar);
      } catch (err) {
        throw new Error(err);
      }
    },
    async logOut() {
      try {
        await signOut(auth);
        useAuthStore().authId = null;
        addNotification({ message: 'User logged out successfully!', timeout: 6000 });
      } catch (err) {
        throw new Error(err);
      }
    },
    async signInWithEmailAndPassword(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        addNotification({ message: 'User logged in successfully!', timeout: 6000 });
        await useAuthStore().getAuthenticatedUser();
        return userCredential;
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          throw new Error('Email not found. Please check your email or register.');
        } else if (error.code === 'auth/wrong-password') {
          throw new Error('Incorrect email or password.');
        } else {
          throw new Error('An error occurred during sign-in. Please try again later.');
        }
      }
    },
    async signInWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        const response = await signInWithPopup(auth, provider);
        const user = response.user;
        const { isNewUser } = getAdditionalUserInfo(response);

        if (isNewUser) {
          await this.createUser(
            user.uid,
            user.displayName,
            user.email,
            user.email,
            user.photoURL
          );
          addNotification({ message: 'Successful registration!', timeout: 6000 });
        } else {
          await useAuthStore().getAuthenticatedUser();
          addNotification({ message: 'User logged in successfully!', timeout: 6000 });
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
export default useUserStore;
