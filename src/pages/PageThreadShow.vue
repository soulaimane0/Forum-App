<script setup>
import { computed, reactive, ref } from 'vue';
import sourceData from '@/data.json';
import { useRoute } from 'vue-router';

const route = useRoute();
const threads = reactive(sourceData.threads);
const posts = reactive(sourceData.posts);
const users = reactive(sourceData.users);

const thread = computed(() => {
  return threads.find((thread) => thread.id === route.params.id);
});

const postById = (postId) => {
  return posts.find((post) => post.id === postId);
};

const userById = (userId) => {
  return users.find((user) => user.id === userId);
};

const countPostByUser = (userId) => {
  const userPosts = ref(0);
  posts.forEach((post) => {
    if (post.userId === userId) userPosts.value += 1;
  });
  return userPosts.value;
};

console.log(sourceData);
</script>

<template>
  <h1 class="text-center mb-3">{{ thread.title }}</h1>
  <div class="card shadow border-0 mb-3 p-3" v-for="postId in thread.posts" :key="postId">
    <div class="row g-0">
      <div class="col-md-2 d-flex flex-column justify-content-between align-items-center">
        <h5>{{ userById(postById(postId).userId).name }}</h5>
        <img
          :src="userById(postById(postId).userId).avatar"
          class="w-75 rounded-circle"
          alt="User picture"
          referrerpolicy="no-referrer"
        />
        <h6>{{ countPostByUser(postById(postId).userId) }} posts</h6>
      </div>
      <div class="col-md-10">
        <div class="card-body">
          <p class="card-text">
            {{ postById(postId).text }}
          </p>
          <p class="card-text float-end">
            <small class="text-muted">{{ postById(postId).publishedAt }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
