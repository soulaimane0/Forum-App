<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import useThreadStore from '@/stores/ThreadStore';
import usePostsStore from '@/stores/PostsStore';

const props = defineProps(['forumId']);
const route = useRoute();
const threadId = ref(route.params.id);

const threadStore = useThreadStore();
const postsStore = usePostsStore();

const posts = ref(null);
const thread = ref(null);
const user = ref(null);

const totalPosts = async () => {
  const count = await threadStore.countThreadPosts(threadId.value);
  console.log('This is count logged: ', count);
  return count;
};

const total_posts = computed(async () => {
  return await totalPosts();
});

const total_contributors = threadStore.countThreadContributors(threadId.value);

onMounted(async () => {
  await postsStore.fetchPosts();
  await threadStore.fetchThreads();
  posts.value = await postsStore.getPostsByThread(threadId.value);
  thread.value = await threadStore.thread(threadId.value);
  user.value = await threadStore.getUserByThread(thread.value.userId);
  console.log(posts.value);
});

const savePost = (text) => {
  postsStore.save(text, threadId.value);
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
    <p>
      {{
        `${total_posts} ${
          total_posts > 1 ? 'Replies' : 'Reply'
        } by ${total_contributors} ${
          total_contributors > 1 ? 'Contributors' : 'Contributor'
        }`
      }}
    </p>
  </div>

  <PostEditor @save-post="savePost" />

  <PostsList :posts="posts" />
</template>

<style scoped></style>
