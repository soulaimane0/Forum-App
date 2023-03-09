<script setup>
import { reactive, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import sourceData from '@/data.json';

const props = defineProps(['threadPosts']);

const users = reactive(sourceData.users);
const userById = (userId) => {
  return users.find((user) => user.id === userId);
};

// const totalPostsByUser = () => {
//   const userPosts = ref(0);
//   posts.forEach((post) => {
//     if (post.userId === props.thread.userId) userPosts.value += 1;
//   });
//   return userPosts.value;
// };
</script>

<template>
  <div class="card shadow border-0 mb-3 p-3" v-for="post in threadPosts" :key="post.id">
    <div class="row g-0">
      <div class="col-md-2 d-flex flex-column align-items-center">
        <h5>{{ userById(post.userId).name }}</h5>
        <img
          :src="userById(post.userId).avatar"
          style="width: 95px; height: 95px"
          class="rounded-circle"
          alt="User picture"
          referrerpolicy="no-referrer"
        />
        <h6>19 posts</h6>
      </div>
      <div class="col-md-10">
        <div class="card-body">
          <p class="card-text">
            {{ post.text }}
          </p>
          <BaseDate class="d-flex justify-content-end" :timestamp="post.publishedAt" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
