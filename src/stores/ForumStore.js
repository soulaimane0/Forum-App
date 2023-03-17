import { defineStore, acceptHMRUpdate } from 'pinia';
import sourceData from '../data.json';
import useThreadStore from './ThreadStore';

const useForumStore = defineStore('forumStore', {
  state: () => {
    return { forums: sourceData.forums };
  },
  getters: {
    getForum: (state) => (forumId) => state.forums.find((item) => item.id === forumId),
    getThreadsByForum: () => (forumId) => {
      const threadStore = useThreadStore();
      return threadStore.threads.filter((item) => item.forumId === forumId);
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useForumStore, import.meta.hot));
}
export default useForumStore;