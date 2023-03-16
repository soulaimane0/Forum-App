import { defineStore } from 'pinia';
import sourceData from '../data.json';
import useUserStore from './UserStore';

const useThreadStore = defineStore('threadStore', {
  state: () => {
    return { threads: sourceData.threads };
  },
  getters: {
    getUserByThread: () => (userId) => {
      const userStore = useUserStore();
      return userStore.users.find((item) => item.id === userId);
    },
  },
});

export default useThreadStore;
