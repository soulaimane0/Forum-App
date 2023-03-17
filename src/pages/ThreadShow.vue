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

const savePost = (eventData) => {
  postsStore.save(eventData.post, threadId);
};
</script>

<template>
  <h1 class="text-center mb-3">{{ thread(threadId).title }}</h1>

  <PostEditor @save-post="savePost" />

  <PostsList :posts="postsStore.getPostsByThread(threadId)" />
</template>

<style scoped></style>
