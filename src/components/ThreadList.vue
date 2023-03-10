<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import sourceData from '@/data.json';

const props = defineProps(['threads']);
const emit = defineEmits(['to-thread-page']);
const route = useRoute();
const router = useRouter();
const users = reactive(sourceData.users);

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
  <div class="row">
    <div class="col-12">
      <table class="table table-hover rounded" style="overflow: hidden">
        <thead>
          <tr class="fs-3 bg-primary">
            <th class="text-light" colspan="3" scope="col">Threads</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="threads?.length"
            v-for="thread in threads"
            :key="thread.id"
            style="cursor: pointer"
            @click="emit('to-thread-page', thread.id)"
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
                  by
                  <span class="fw-semibold"> {{ userById(thread.userId).name }} </span> ,
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
          <tr v-else>
            <td colspan="3">
              <p>No threads Available...</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
