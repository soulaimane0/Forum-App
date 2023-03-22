import { defineStore, acceptHMRUpdate } from 'pinia';
import sourceData from '../data.json';
import useUserStore from './UserStore';
import useThreadStore from './ThreadStore';
import useAuthStore from '@/stores/AuthenticatedStore';
import { reactive } from 'vue';

const usePostsStore = defineStore('postsStore', {
  state: () => {
    return { posts: sourceData.posts };
  },
  getters: {
    getUserByPost: () => (userId) => {
      const userStore = useUserStore();
      return userStore.users.find((user) => user.id === userId);
    },
    getPostsByThread: (state) => (threadId) =>
      state.posts.filter((item) => item.threadId === threadId),
  },
  actions: {
    save(text, threadId) {
      const post = reactive({
        id: '-pjvt' + Math.random() * 9999,
        text,
        threadId,
        publishedAt: Math.floor(new Date() / 1000),
        userId: useAuthStore().authId,
      });

      this.posts.unshift(post);
      const thread = useThreadStore().threads.find((item) => item.id === threadId);
      thread.posts = thread.posts || [];
      thread.posts.unshift(post.id);
    },
  },
});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useThreadStore, import.meta.hot));
// }
export default usePostsStore;
