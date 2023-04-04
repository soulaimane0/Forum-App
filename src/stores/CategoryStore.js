import { defineStore, acceptHMRUpdate } from 'pinia';
import useForumStore from './ForumStore';
import { findById } from '@/helpers';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/helpers/firestore.js';

const useCategoryStore = defineStore('categoryStore', {
  state: () => {
    return {
      categories: [],
    };
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
  actions: {
    initCategories() {
      onSnapshot(collection(db, 'categories'), (snapshotQuery) => {
        try {
          snapshotQuery.forEach((doc) => {
            this.categories.push({ ...doc.data(), id: doc.id });
          });
        } catch (error) {
          console.log('While getting category data  : ', error);
        }
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot));
}
export default useCategoryStore;
