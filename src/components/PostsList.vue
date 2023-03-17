<script setup>
import { reactive, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import usePostsStore from '@/stores/PostsStore';
import useUserStore from '@/stores/UserStore';
import { storeToRefs } from 'pinia';

const { getUserByPost } = storeToRefs(usePostsStore());
const { countUserPosts } = storeToRefs(useUserStore());

const props = defineProps(['posts']);
</script>

<template>
  <div class="card shadow border-0 mb-3 p-3" v-for="post in posts" :key="post.id">
    <div class="row g-0">
      <div class="col-md-2 d-flex flex-column align-items-center">
        <h5>{{ getUserByPost(post.userId).username }}</h5>
        <img
          :src="getUserByPost(post.userId).avatar"
          style="width: 95px; height: 95px"
          class="rounded-circle"
          alt="User picture"
          referrerpolicy="no-referrer"
        />
        <h6>{{ countUserPosts(post.userId) }} posts</h6>
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
