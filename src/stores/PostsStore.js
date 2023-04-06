import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';
import { db } from '@/helpers/firestore.js';
import { collection, onSnapshot, doc, query, where } from 'firebase/firestore';

const usePostsStore = defineStore('postsStore', {
  state: () => {
    return { posts: reactive([]) };
  },
  getters: {
    getUserByPost: () => (userId) => {
      return new Promise((resolve, reject) => {
        onSnapshot(
          doc(db, 'users', userId),
          (doc) => {
            const user = { ...doc.data(), id: doc.id };
            resolve(user);
          },
          reject
        );
      });
    },
    getPostsByThread: () => (threadId) => {
      return new Promise((resolve, reject) => {
        const postRef = collection(db, 'posts');
        const q = query(postRef, where('threadId', '==', threadId));
        onSnapshot(
          q,
          (snapshotQuery) => {
            const posts = snapshotQuery.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            resolve(posts);
          },
          reject
        );
      });
    },
  },
  actions: {
    fetchPosts() {
      onSnapshot(collection(db, 'posts'), (snapshotQuery) => {
        try {
          const posts = snapshotQuery.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          this.posts = posts;
        } catch (error) {
          console.error('While getting posts : ', error);
        }
      });
    },
    save(text, threadId) {
      const post = reactive({
        id: '-pjvt' + Math.random() * 9999,
        text,
        threadId,
        publishedAt: Math.floor(new Date() / 1000),
        userId: useAuthStore().authId,
      });

      this.posts.unshift(post);
      const thread = findById(useThreadStore().threads, threadId);
      thread.posts = thread.posts || [];
      thread.contributors = thread.contributors || [];

      thread.posts.unshift(post.id);
      // thread.contributors.forEach((item, index) => {
      //   if (item[index] !== item[index + 1]) thread.contributors.unshift(post.userId);
      // });
    },
  },
});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useThreadStore, import.meta.hot));
// }
export default usePostsStore;
