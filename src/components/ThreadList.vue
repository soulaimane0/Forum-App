<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import sourceData from '@/data.json';
import BaseDate from './BaseDate.vue';

const route = useRoute();
const router = useRouter();
const threads = reactive(sourceData.threads);
const posts = reactive(sourceData.posts);
const users = reactive(sourceData.users);

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

const toTheThead = (threadId) => {
  router.push({ name: 'thread', params: { id: threadId } });
};
console.log(sourceData);
</script>

<template>
  <table class="table table-hover rounded" style="overflow: hidden">
    <thead>
      <tr class="fs-3" style="background-color: rgb(104, 71, 138)">
        <th class="text-light" colspan="3" scope="col">Threads</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="thread in threads"
        :key="thread.id"
        style="cursor: pointer"
        @click="toTheThead(thread.id)"
      >
        <td>
          <div class="d-flex align-items-center">
            <img
              :src="userById(thread.userId).avatar"
              alt="user profile"
              style="width: 45px; height: 45px"
              class="rounded-circle"
              referrerpolicy="no-referrer"
            />
            <div class="ms-3">
              <p class="fw-bold mb-1">{{ userById(thread.userId).name }}</p>
              <p class="text-muted mb-0">{{ userById(thread.userId).email }}</p>
            </div>
          </div>
        </td>
        <td>
          <p class="fw-bold">{{ thread.title }}</p>
          <div class="d-flex">
            <p>
              by <span class="fw-semibold"> {{ userById(thread.userId).name }} </span> ,
            </p>
            <BaseDate :timestamp="thread.publishedAt" />
          </div>
        </td>
        <td>
          <p>
            <span class="fw-bold">{{ thread.posts.length }}</span> replys
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
