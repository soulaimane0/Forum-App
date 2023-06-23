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
  serverTimestamp,
} from 'firebase/firestore';
import useAuthStore from '@/stores/AuthenticatedStore';
import { appendUnsubscribe } from '@/helpers';

const usePostsStore = defineStore('postsStore', {
  state: () => {
    return {
      posts: reactive([]),
      postsByThread: reactive([]),
    };
  },
  getters: {
    getUserByPost: () => (userId) => {
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          doc(db, 'users', userId),
          (doc) => {
            const user = { ...doc.data(), id: doc.id };
            resolve(user);
          },
          reject
        );
        appendUnsubscribe(unsubscribe);
      });
    },
    getPostsByThread: (state) => async (threadId) => {
      return new Promise((resolve, reject) => {
        const postRef = collection(db, 'posts');
        const q = query(postRef, where('threadId', '==', threadId));
        const unsubscribe = onSnapshot(q, (snapshotQuery) => {
          try {
            const posts = snapshotQuery.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            state.postsByThread = Array.from(posts);
            resolve(posts);
          } catch (err) {
            console.log(err);
            reject();
          }
        });
        appendUnsubscribe(unsubscribe);
      });
    },
  },
  actions: {
    fetchPosts() {
      const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshotQuery) => {
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
      appendUnsubscribe(unsubscribe);
    },
    async createPost(text, threadId, userId) {
      try {
        const batch = writeBatch(db);

        // Add new Post
        const postRef = doc(collection(db, 'posts'));
        const post = reactive({
          publishedAt: serverTimestamp(),
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
          lastPostAt: serverTimestamp(),
        });

        await batch.commit();
      } catch (err) {
        console.error(err);
      }
    },
    async updatePost(text, postId) {
      try {
        const postRef = doc(db, 'posts', postId);

        await updateDoc(postRef, {
          text,
          edited: {
            at: serverTimestamp(),
            by: useAuthStore().authId,
            moderated: false,
          },
        });
        console.log('Post Updated successfully !');
        const index = this.posts.findIndex((item) => item.id === postId);
        this.posts[index].text = text;
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
