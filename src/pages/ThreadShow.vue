<script setup>
import { computed, reactive, ref } from 'vue';
import sourceData from '@/data.json';
import { useRoute } from 'vue-router';
import PostsList from '@/components/PostsList.vue';
import PostEditor from '@/components/PostEditor.vue';

const route = useRoute();
const threads = reactive(sourceData.threads);
const posts = reactive(sourceData.posts);

const thread = computed(() => {
  return threads.find((thread) => thread.id === route.params.id);
});

const threadPosts = computed(() => {
  return posts.filter((post) => post.threadId === route.params.id);
});

const savePost = (eventData) => {
  posts.unshift(eventData.post);
};

console.log(sourceData);
</script>

<template>
  <h1 class="text-center mb-3">{{ thread.title }}</h1>

  <PostEditor @save-post="savePost" />

  <PostsList :threadPosts="threadPosts" />
</template>

<style scoped></style>
