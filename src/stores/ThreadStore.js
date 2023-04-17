import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';
import { db } from '@/helpers/firestore.js';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';

const useThreadStore = defineStore('threadStore', {
  state: () => {
    return {
      threads: reactive([]),
    };
  },
  getters: {
    thread: () => (threadId) => {
      return new Promise((resolve, reject) => {
        onSnapshot(
          doc(db, 'threads', threadId),
          (doc) => {
            const thread = { ...doc.data(), id: doc.id };
            resolve(thread);
          },
          reject
        );
      });
    },
    getUserByThread: () => (userId) => {
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
    countThreadPosts: (state) => async (threadId) => {
      const thread = await state.thread(threadId);
      const number_of_posts = thread.posts?.length || 0;
      console.log(number_of_posts);
      return number_of_posts;
    },
    countThreadContributors: (state) => async (threadId) => {
      const number_of_contributors =
        (await state.thread(threadId).contributors?.length) || 0;
      return number_of_contributors;
    },
  },
  actions: {
    async fetchThreads() {
      onSnapshot(collection(db, 'threads'), (snapshotQuery) => {
        try {
          const threads = snapshotQuery.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          this.threads = threads;
        } catch (error) {
          console.error(error);
        }
      });
    },
    async createThread(title, text, forumId) {
      const thread = reactive({
        id: '-fgdv' + Math.random() * 9999,
        title,
        publishedAt: Math.floor(new Date() / 1000),
        forumId,
        userId: useAuthStore().authId,
      });
      this.threads.unshift(thread);
      usePostsStore().save(text, thread.id);
      const forum = useForumStore().getForum(forumId);
      forum.threads = forum.threads || [];
      forum.threads.unshift(thread.id);
      return this.thread(thread.id);
    },
    updateThread(title, threadId) {
      const index = this.threads.findIndex((item) => item.id === threadId);
      this.threads[index].title = title;
      console.log('Updated successfully');
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThreadStore, import.meta.hot));
}
export default useThreadStore;
