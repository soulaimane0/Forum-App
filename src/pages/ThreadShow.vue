<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import useThreadStore from '@/stores/ThreadStore';
import usePostsStore from '@/stores/PostsStore';
import { storeToRefs } from 'pinia';

const { thread } = storeToRefs(useThreadStore());
const postsStore = usePostsStore();

const route = useRoute();
const threadId = route.params.id;

const savePost = (text) => {
  postsStore.save(text, threadId);
};
</script>

<template>
  <div class="d-flex justify-content-between">
    <h1 class="mb-3">{{ thread(threadId).title }}</h1>
    <div class="d-grid align-items-center">
      <button class="btn btn-primary fw-semibold">Update thread</button>
    </div>
  </div>

  <PostEditor @save-post="savePost" />

  <PostsList :posts="postsStore.getPostsByThread(threadId)" />
</template>

<style scoped></style>
