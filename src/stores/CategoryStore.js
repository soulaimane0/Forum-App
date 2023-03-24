import { defineStore, acceptHMRUpdate } from 'pinia';
import sourceData from '../data.json';
import useForumStore from './ForumStore';
import { findById } from '@/helpers';

const useCategoryStore = defineStore('categoryStore', {
  state: () => {
    return { categories: sourceData.categories };
  },
  getters: {
    getCategory: (state) => (categoryId) => {
      return findById(state.categories, categoryId);
    },
    getFormsByCategory: () => (categoryId) => {
      const forumStore = useForumStore();
      return forumStore.forums.filter((item) => item.categoryId === categoryId);
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot));
}
export default useCategoryStore;
