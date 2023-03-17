import { defineStore, acceptHMRUpdate } from 'pinia';
import sourceData from '../data.json';

const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      users: sourceData.users,
      authId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
    };
  },
  getters: {
    authenticatedUser: (state) => state.users.find((item) => item.id === state.authId),
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
export default useAuthStore;
