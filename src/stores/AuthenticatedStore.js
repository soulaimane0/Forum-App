import { defineStore, acceptHMRUpdate } from 'pinia';
import sourceData from '../data.json';
import { findById } from '@/helpers';

const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      users: sourceData.users,
      authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
    };
  },
  getters: {
    authenticatedUser: (state) => findById(state.users, state.authId),
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
export default useAuthStore;
