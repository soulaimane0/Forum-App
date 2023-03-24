<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import useThreadStore from '@/stores/ThreadStore';
import usePostsStore from '@/stores/PostsStore';

const props = defineProps(['forumId']);
const route = useRoute();
const threadStore = useThreadStore();
const postsStore = usePostsStore();

const threadId = route.params.id;
const thread = threadStore.thread(threadId);
const user = threadStore.getUserByThread(thread.userId);
const total_posts = threadStore.countThreadPosts(threadId);
const total_contributors = threadStore.countThreadContributors(threadId);

const savePost = (text) => {
  postsStore.save(text, threadId);
};
</script>

<template>
  <div class="d-flex justify-content-between">
    <h1 class="mb-3">{{ thread.title }}</h1>
    <div class="d-grid align-items-center">
      <RouterLink :to="{ name: 'thread-update', params: { id: threadId } }">
        <button class="btn btn-primary fw-semibold">Update thread</button>
      </RouterLink>
    </div>
  </div>
  <div class="d-flex justify-content-between text-secondary">
    <p>
      By {{ user.name }},
      <BaseDate :timestamp="thread.publishedAt" />
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

  <PostsList :posts="postsStore.getPostsByThread(threadId)" />
</template>

<style scoped></style>
