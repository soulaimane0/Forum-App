import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';
import { db } from '@/helpers/firestore.js';
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  writeBatch,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';
import { appendUnsubscribe } from '@/helpers';

const useThreadStore = defineStore('threadStore', {
  state: () => {
    return {
      threads: reactive([]),
      thread: reactive({}),
      userByThread: reactive({}),
    };
  },
  getters: {
    getThread: (state) => async (threadId) => {
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(doc(db, 'threads', threadId), (doc) => {
          try {
            const thread = { ...doc.data(), id: doc.id };
            state.thread = thread;
            resolve(thread);
          } catch (err) {
            console.log(err);
            reject();
          }
        });
        appendUnsubscribe(unsubscribe);
      });
    },
    getUserByThread: (state) => async (userId) => {
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(doc(db, 'users', userId), (doc) => {
          try {
            const user = reactive({ ...doc.data(), id: doc.id });
            state.userByThread = user;
            resolve(user);
          } catch (err) {
            console.log(err);
            reject();
          }
        });
        appendUnsubscribe(unsubscribe);
      });
    },
  },
  actions: {
    async fetchThreads() {
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(collection(db, 'threads'), (snapshotQuery) => {
          try {
            const threads = snapshotQuery.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            this.threads = Array.from(threads);
            resolve();
          } catch (error) {
            console.error(error);
            reject(error);
          }
        });
        appendUnsubscribe(unsubscribe);
      });
    },
    async createThread(forumId, title, userId) {
      try {
        const batche = writeBatch(db);

        const threadRef = doc(collection(db, 'threads'));
        const thread = reactive({
          contributors: [userId],
          forumId,
          publishedAt: serverTimestamp(),
          title,
          userId,
        });

        batche.set(threadRef, thread);
        console.log('New thread has been created successfully ! ', threadRef.id);

        const forumRef = doc(db, 'forums', forumId);
        const userRef = doc(db, 'users', userId);
        batche.update(forumRef, {
          threads: arrayUnion(threadRef.id),
        });
        batche.update(userRef, {
          threads: arrayUnion(threadRef.id),
        });

        await batche.commit();
        return threadRef.id;
      } catch (error) {
        console.error(error);
      }
    },
    async updateThread(title, threadId) {
      const threadRef = doc(db, 'threads', threadId);
      await updateDoc(threadRef, {
        title,
      });
      console.log('Thread updated successfully !');
      const index = this.threads.findIndex((item) => item.id === threadId);
      this.threads[index].title = title;
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThreadStore, import.meta.hot));
}
export default useThreadStore;
