import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';
import sourceData from '../data.json';
import useUserStore from './UserStore';
import useAuthStore from './AuthenticatedStore';
import usePostsStore from './PostsStore';
import useForumStore from './ForumStore';

const useThreadStore = defineStore('threadStore', {
  state: () => {
    return { threads: sourceData.threads };
  },
  getters: {
    thread: (state) => (threadId) => state.threads.find((item) => item.id === threadId),
    getUserByThread: () => (userId) => {
      const userStore = useUserStore();
      return userStore.users.find((item) => item.id === userId);
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
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThreadStore, import.meta.hot));
}
export default useThreadStore;
