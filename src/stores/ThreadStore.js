import { defineStore, acceptHMRUpdate } from 'pinia';
import sourceData from '../data.json';
import useUserStore from './UserStore';

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
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThreadStore, import.meta.hot));
}
export default useThreadStore;
