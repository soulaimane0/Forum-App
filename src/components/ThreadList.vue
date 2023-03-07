<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import sourceData from '@/data.json';

const route = useRoute();
const router = useRouter();
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
          <p>
            by <span class="fw-semibold"> {{ userById(thread.userId).name }} </span>
          </p>
        </td>
        <td>
          <p>
            <span class="fw-bold">{{ thread.posts.length }}</span> replys
          </p>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <div v-for="thread in threads" :key="thread.id">
    <h1 class="text-center mb-3">{{ thread.title }}</h1>
    <div
      class="card shadow border-0 mb-3 p-3"
      v-for="postId in thread.posts"
      :key="postId"
    >
      <div class="row g-0">
        <div
          class="col-md-2 d-flex flex-column justify-content-between align-items-center"
        >
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
  </div> -->
</template>

<style scoped></style>
