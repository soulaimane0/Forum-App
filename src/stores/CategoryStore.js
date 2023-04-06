import { defineStore, acceptHMRUpdate } from 'pinia';
import { db } from '@/helpers/firestore.js';
import { collection, onSnapshot, doc, query, where } from 'firebase/firestore';
import { reactive } from 'vue';

const useCategoryStore = defineStore('categoryStore', {
  state: () => {
    return {
      categories: reactive([]),
    };
  },
  getters: {
    getCategory: () => (categoryId) => {
      return new Promise((resolve, reject) => {
        onSnapshot(
          doc(db, 'categories', categoryId),
          (doc) => {
            const category = { ...doc.data(), id: doc.id };
            resolve(category);
          },
          reject
        );
      });
    },
    getFormsByCategory: () => (categoryId) => {
      return new Promise((resolve, reject) => {
        const forumRef = collection(db, 'forums');
        const q = query(forumRef, where('categoryId', '==', categoryId));
        onSnapshot(
          q,
          (snapshotQuery) => {
            try {
              const forums = snapshotQuery.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              resolve(forums);
            } catch (error) {
              console.error('While getting fourms : ', error);
            }
          },
          reject
        );
      });
    },
  },
  actions: {
    fetchCategories() {
      onSnapshot(collection(db, 'categories'), (snapshotQuery) => {
        try {
          const categories = snapshotQuery.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          this.categories = categories;
        } catch (error) {
          console.error('While getting categories : ', error);
        }
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot));
}
export default useCategoryStore;
