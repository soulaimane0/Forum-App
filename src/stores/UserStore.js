import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';
import { db } from '@/helpers/firestore.js';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import usePostsStore from '@/stores/PostsStore';
import useThreadStore from '@/stores/ThreadStore';

const useUserStore = defineStore('userStore', {
  state: () => {
    return { users: reactive([]) };
  },
  getters: {
    getUser: () => (userId) => {
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          doc(db, 'users', userId),
          (doc) => {
            const user = { ...doc.data(), id: doc.id };
            resolve(user);
          },
          reject
        );
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
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
export default useUserStore;
