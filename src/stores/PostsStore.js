import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';
import { db } from '@/helpers/firestore.js';
import {
  collection,
  onSnapshot,
  doc,
  query,
  where,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  writeBatch,
} from 'firebase/firestore';

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
            const mappedPosts = reactive([]);
            const posts = snapshotQuery.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            posts.forEach(async (post) => {
              const userDoc = await getDoc(doc(db, 'users', post.userId));
              const user = { ...userDoc.data(), id: userDoc.id };
              mappedPosts.push({ ...post, user });
            });
            resolve(mappedPosts);
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
    async createPost(text, threadId, userId) {
      try {
        const batch = writeBatch(db);

        // Add new Post
        const postRef = doc(collection(db, 'posts'));
        const post = reactive({
          publishedAt: Math.floor(new Date() / 1000),
          text,
          threadId,
          userId,
        });
        batch.set(postRef, post);
        console.log('New post has been add successfully !');

        // Update thread by adding posts and contributers
        const threadRef = doc(db, 'threads', threadId);
        batch.update(threadRef, {
          posts: arrayUnion(postRef.id),
          contributors: arrayUnion(userId),
        });

        await batch.commit();
      } catch (err) {
        console.error(err);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot));
}
export default usePostsStore;
