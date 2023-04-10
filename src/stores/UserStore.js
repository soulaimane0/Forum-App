import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';
import { db } from '@/helpers/firestore.js';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';

const useUserStore = defineStore('userStore', {
  state: () => {
    return { users: reactive([]) };
  },
  getters: {
    getUser: () => (userId) => {
      return new Promise((resolve, reject) => {
        onSnapshot(
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
        onSnapshot(
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
        onSnapshot(
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
    countUserPosts: (state) => async (userId) =>
      await state.getPostsByUser(userId)?.length,
    countUserThreads: (state) => async (userId) =>
      await state.getThreadByUser(userId)?.length,
  },
  actions: {
    fetchUsers() {
      onSnapshot(collection(db, 'users'), (snapshotQuery) => {
        try {
          const docs = snapshotQuery.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          this.users = docs;
        } catch (error) {
          console.error(error);
        }
      });
    },
    updateUserDetails(userData, userId) {
      const userIndex = this.users.findIndex((item) => item.id === userId);
      this.users[userIndex] = userData;
      console.log('Updated Successfilly !!!');
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
export default useUserStore;
