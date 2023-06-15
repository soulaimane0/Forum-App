<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import useThreadStore from '@/stores/ThreadStore';
import usePostsStore from '@/stores/PostsStore';
import useAuthStore from '@/stores/AuthenticatedStore';

const props = defineProps(['forumId']);
const route = useRoute();
const threadId = ref(route.params.id);

const threadStore = useThreadStore();
const postsStore = usePostsStore();
const authStore = useAuthStore();

const posts = ref(null);
const thread = ref(null);
const user = ref(null);

onMounted(async () => {
  await postsStore.fetchPosts();
  await threadStore.fetchThreads();
  posts.value = await postsStore.getPostsByThread(threadId.value);
  thread.value = await threadStore.thread(threadId.value);
  user.value = await threadStore.getUserByThread(thread.value.userId);
});

const savePost = async (text) => {
  postsStore.createPost(text, threadId.value, authStore.authId);
  posts.value = await postsStore.getPostsByThread(threadId.value);
};
</script>

<template>
  <div class="d-flex justify-content-between">
    <h1 class="mb-3">{{ thread?.title }}</h1>
    <div class="d-grid align-items-center">
      <RouterLink :to="{ name: 'thread-update', params: { id: threadId } }">
        <button class="btn btn-primary fw-semibold">Update thread</button>
      </RouterLink>
    </div>
  </div>
  <div class="d-flex justify-content-between text-secondary">
    <p>
      By {{ user?.name }},
      <BaseDate :timestamp="thread?.publishedAt" />
    </p>
    <threadPostsAndContributersCount :threadId="threadId" />
  </div>

  <PostEditor @save-post="savePost" />

  <PostsList :posts="posts" />
</template>

<style scoped></style>
