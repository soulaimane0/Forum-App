import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';
import { auth } from '@/helpers/firestore.js';
import useUserStore from '@/stores/UserStore';

const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      authenticatedUser: reactive({}),
      authId: '',
    };
  },
  getters: {},
  actions: {
    async getAuthenticatedUser() {
      console.log('auth store started...');
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        this.authenticatedUser = await useUserStore().getUser(userId);
        this.authId = userId;
      } else {
        console.log('User is signed out!');
      }
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
export default useAuthStore;
