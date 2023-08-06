import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';
import { auth } from '@/helpers/firestore.js';
import useUserStore from '@/stores/UserStore';
import { onAuthStateChanged } from 'firebase/auth';

const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      authenticatedUser: reactive({}),
      authId: '',
      authObserverUnsubscribe: null,
    };
  },
  getters: {},
  actions: {
    async getAuthenticatedUser() {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        this.authenticatedUser = await useUserStore().getUser(userId);
        this.authId = userId;
      } else {
      }
    },
    async initAuthentication() {
      if (this.authObserverUnsubscribe) this.authObserverUnsubscribe();
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          try {
            if (user) {
              await this.getAuthenticatedUser();
              resolve(user);
            } else {
              resolve(null);
            }
          } catch (err) {
            console.error(err);
          }
        });
        this.authObserverUnsubscribe = unsubscribe;
      });
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
export default useAuthStore;
