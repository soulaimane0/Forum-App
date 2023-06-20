import { defineStore, acceptHMRUpdate } from 'pinia';
import { db } from '@/helpers/firestore.js';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { reactive } from 'vue';
import { appendUnsubscribe } from '@/helpers';

const useForumStore = defineStore('forumStore', {
  state: () => {
    return {
      forums: reactive([]),
      forum: reactive({}),
      threads: reactive([]),
    };
  },
  getters: {
    getForum: (state) => (forumId) => {
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          doc(db, 'forums', forumId),
          (doc) => {
            try {
              const forum = { ...doc.data(), id: doc.id };
              state.forum = forum;
              resolve(forum);
            } catch (error) {
              console.error(error);
            }
          },
          reject
        );
        appendUnsubscribe(unsubscribe);
      });
    },
    getThreadsByForum: (state) => (forumId) => {
      return new Promise((resolve, reject) => {
        const ThreadRef = collection(db, 'threads');
        const q = query(ThreadRef, where('forumId', '==', forumId));
        const unsubscribe = onSnapshot(
          q,
          async (snapshotQuery) => {
            try {
              const threads = snapshotQuery.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              const mappedThreads = await Promise.all(
                threads.map(async (thread) => {
                  const userDoc = await getDoc(doc(db, 'users', thread.userId));
                  const user = { ...userDoc.data(), id: userDoc.id };
                  return { ...thread, user };
                })
              );
              state.threads = Array.from(mappedThreads);
              resolve(mappedThreads);
            } catch (error) {
              console.error('While getting threads : ', error);
            }
          },
          reject
        );
        appendUnsubscribe(unsubscribe);
      });
    },
  },
  actions: {
    fetchForums() {
      try {
        const unsubscribe = onSnapshot(collection(db, 'forums'), (snapshotQuery) => {
          const docs = snapshotQuery.docs.map((doc) => ({ ...doc.data(), id: doc.is }));
          this.forums = docs;
        });
        appendUnsubscribe(unsubscribe);
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
