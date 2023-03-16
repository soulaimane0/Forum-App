import { defineStore } from 'pinia';
import sourceData from '../data.json';
import useUserStore from './UserStore';
import { reactive, defineEmits } from 'vue';

const usePostsStore = defineStore('postsStore', {
  state: () => {
    return { posts: sourceData.posts };
  },
  getters: {
    getUserByPost: () => (userId) => {
      const userStore = useUserStore();
      return userStore.users.find((user) => user.id === userId);
    },
  },
  actions: {
    // save(replyText, threadId) {
    // //   const emit = defineEmits(['save-post']);
    //   if (replyText) {
    //     const post = reactive({
    //       id: 'uikChsp-' + Math.random() * 9999,
    //       publishedAt: Math.floor(new Date() / 1000),
    //       text: replyText,
    //       threadId: threadId,
    //       userId: 'Miej9zSGMRZKDvMXzfxjVOyv3RF3',
    //     });
    //     emit('save-post', { post });
    //     replyText = null;
    //   } else {
    //     alert('Please write some text in the post field');
    //   }
    // },
  },
});

export default usePostsStore;
