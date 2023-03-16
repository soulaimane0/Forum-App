import { defineStore } from 'pinia';
import sourceData from '../data.json';

const useUserStore = defineStore('userStore', {
  state: () => {
    return { users: sourceData.users };
  },
  getters: {
    // getForum: (state) => (forumId) => state.forums.find((item) => item.id === forumId),
  },
});

export default useUserStore;
