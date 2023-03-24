import { defineStore, acceptHMRUpdate } from 'pinia';
import sourceData from '../data.json';
import useUserStore from './UserStore';
import useThreadStore from './ThreadStore';
import useAuthStore from '@/stores/AuthenticatedStore';
import { reactive } from 'vue';
import { findById } from '@/helpers';

const usePostsStore = defineStore('postsStore', {
  state: () => {
    return { posts: sourceData.posts };
  },
  getters: {
    getUserByPost: () => (userId) => {
      const userStore = useUserStore();
      return findById(userStore.users, userId);
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
      const thread = findById(useThreadStore().threads, threadId);
      thread.posts = thread.posts || [];
      thread.contributors = thread.contributors || [];

      thread.posts.unshift(post.id);
      // thread.contributors.forEach((item, index) => {
      //   if (item[index] !== item[index + 1]) thread.contributors.unshift(post.userId);
      // });
    },
  },
});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useThreadStore, import.meta.hot));
// }
export default usePostsStore;
