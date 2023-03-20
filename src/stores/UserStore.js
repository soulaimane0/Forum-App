import { defineStore, acceptHMRUpdate } from 'pinia';
import sourceData from '../data.json';
import usePostsStore from './PostsStore';
import useThreadStore from './ThreadStore';
import { ref } from 'vue';

const useUserStore = defineStore('userStore', {
  state: () => {
    return { users: sourceData.users };
  },
  getters: {
    getUser: (state) => (userId) => state.users.find((item) => item.id === userId),
    getPostsByUser: () => (userId) =>
      usePostsStore().posts.filter((item) => item.userId === userId),
    getThreadByUser: () => (userId) =>
      useThreadStore().threads.filter((item) => item.userId === userId),
    countUserPosts: (state) => (userId) => state.getPostsByUser(userId).length,
    countUserThreads: (state) => (userId) => state.getThreadByUser(userId).length,
  },
  actions: {
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
