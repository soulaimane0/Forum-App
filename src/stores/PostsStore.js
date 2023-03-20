import { defineStore, acceptHMRUpdate } from 'pinia';
import sourceData from '../data.json';
import useUserStore from './UserStore';
import useThreadStore from './ThreadStore';
import useAuthStore from '@/stores/AuthenticatedStore';

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
    save(post, threadId) {
      post.id = '-pjvt' + Math.random() * 9999;
      post.threadId = threadId;
      post.publishedAt = Math.floor(new Date() / 1000);
      post.userId = useAuthStore().authId;
      this.posts.unshift(post);
      const thread = useThreadStore().threads.find((item) => item.id === threadId);
      thread.posts.unshift(post.id);
    },
  },
});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useThreadStore, import.meta.hot));
// }
export default usePostsStore;
