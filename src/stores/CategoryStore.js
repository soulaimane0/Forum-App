import { defineStore } from 'pinia';
import sourceData from '../data.json';
import useForumStore from './ForumStore';

const useCategoryStore = defineStore('categoryStore', {
  state: () => {
    return { categories: sourceData.categories };
  },
  getters: {
    getCategory: (state) => (categoryId) => {
      return state.categories.find((item) => item.id === categoryId);
    },
    getFormsByCategory: () => (categoryId) => {
      const forumStore = useForumStore();
      return forumStore.forums.filter((item) => item.categoryId === categoryId);
    },
  },
});

export default useCategoryStore;
