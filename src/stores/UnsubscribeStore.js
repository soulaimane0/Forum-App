import { defineStore } from 'pinia';
import { reactive } from 'vue';

const useUnsubscribeStore = defineStore('unsubscribeStore', {
  state: () => {
    return {
      unsubscribes: reactive([]),
    };
  },
  actions: {
    async unsubscribeAllSnapshots() {
      if (this.unsubscribes.length) {
        this.unsubscribes.forEach((unsubscribe) => {
          unsubscribe();
        });
        this.unsubscribes.length = 0;
      }
    },
  },
});

export default useUnsubscribeStore;
