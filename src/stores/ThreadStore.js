import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';
import sourceData from '../data.json';
import useUserStore from './UserStore';
import useAuthStore from './AuthenticatedStore';
import usePostsStore from './PostsStore';
import useForumStore from './ForumStore';
import { findById } from '@/helpers';

const useThreadStore = defineStore('threadStore', {
  state: () => {
    return { threads: sourceData.threads };
  },
  getters: {
    thread: (state) => (threadId) => findById(state.threads, threadId),
    getUserByThread: () => (userId) => {
      const userStore = useUserStore();
      return findById(userStore.users, userId);
    },
    countThreadPosts: (state) => (threadId) => {
      return state.thread(threadId).posts?.length || 0;
    },
    countThreadContributors: (state) => (threadId) => {
      return state.thread(threadId).contributors?.length || 0;
    },
  },
  actions: {
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
