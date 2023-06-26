import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, ref } from 'vue';
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
import usePostsStore from '@/stores/PostsStore';
import useThreadStore from '@/stores/ThreadStore';
import useAuthStore from '@/stores/AuthenticatedStore';
import { appendUnsubscribe } from '@/helpers';

const useUserStore = defineStore('userStore', {
  state: () => {
    return { users: reactive([]), user: reactive({}) };
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
    getPostsByUser: () => (userId) => {
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

        await updateDoc(userRef, {
          email: userData.email,
          name: userData.name,
          username: userData.username,
        });
        console.log('User Updated Successfilly !!!');
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
        console.log('User registered successfully!');
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
        console.log('Successful registration!');
        await this.createUser(userCredential.user.uid, name, username, email, avatar);
      } catch (err) {
        throw new Error(err);
      }
    },
    async logOut() {
      try {
        await signOut(auth);
        useAuthStore().authId = null;
        console.log('User logged out successfully!');
      } catch (err) {
        throw new Error(err);
      }
    },
    async signInWithEmailAndPassword(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in successfully!');
        await useAuthStore().getAuthenticatedUser();
        return userCredential;
      } catch (err) {
        throw new Error(err);
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
          console.log('Registered with Google Provider successfully!');
        } else {
          await useAuthStore().getAuthenticatedUser();
          console.log('Signed in with Google Provider successfully!');
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
