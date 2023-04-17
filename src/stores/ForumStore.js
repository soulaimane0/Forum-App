import { defineStore, acceptHMRUpdate } from 'pinia';
import { db } from '@/helpers/firestore.js';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { reactive } from 'vue';

const useForumStore = defineStore('forumStore', {
  state: () => {
    return {
      forums: reactive([]),
    };
  },
  getters: {
    getForum: () => (forumId) => {
      return new Promise((resolve, reject) => {
        onSnapshot(
          doc(db, 'forums', forumId),
          (doc) => {
            try {
              const forum = { ...doc.data(), id: doc.id };
              resolve(forum);
            } catch (error) {
              console.error(error);
            }
          },
          reject
        );
      });
    },
    getThreadsByForum: () => (forumId) => {
      return new Promise((resolve, reject) => {
        const ThreadRef = collection(db, 'threads');
        const q = query(ThreadRef, where('forumId', '==', forumId));
        onSnapshot(
          q,
          (snapshotQuery) => {
            try {
              const mappedThreads = reactive([]);
              const threads = snapshotQuery.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              threads.forEach(async (thread) => {
                const userDoc = await getDoc(doc(db, 'users', thread.userId));
                const user = { ...userDoc.data(), id: userDoc.id };
                mappedThreads.push({ ...thread, user });
              });
              resolve(mappedThreads);
            } catch (error) {
              console.error('While getting threads : ', error);
            }
          },
          reject
        );
      });
    },
  },
  actions: {
    fetchForums() {
      try {
        onSnapshot(collection(db, 'forums'), (snapshotQuery) => {
          const docs = snapshotQuery.docs.map((doc) => ({ ...doc.data(), id: doc.is }));
          this.forums = docs;
        });
      } catch (error) {
        console.error('While getting forum data  : ', error);
      }
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useForumStore, import.meta.hot));
}
export default useForumStore;
