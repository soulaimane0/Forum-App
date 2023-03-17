<script setup>
import useUserStore from '@/stores/UserStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.params.id;
const { getUser, countUserPosts, countUserThreads, getPostsByUser } = storeToRefs(
  useUserStore()
);
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card border-0 shadow">
          <div class="card-header text-center border-0 bg-white">
            <img
              :src="getUser(userId).avatar"
              :alt="`${getUser(userId).username} profile picture`"
              class="rounded-circle"
              width="120"
              height="120"
            />
            <h2 class="fw-bold">{{ getUser(userId).username }}</h2>
          </div>
          <div class="card-body pb-0">
            <h3 class="mb-0">{{ getUser(userId).name }}</h3>
            <p class="my-1">{{ getUser(userId).bio || 'No bio specifid.' }}</p>
            <small class="text-blue-700">{{ getUser(userId).username }} is online</small>
            <div class="d-flex justify-content-around mt-4">
              <h4>{{ countUserPosts(userId) }} Posts</h4>
              <h4>{{ countUserThreads(userId) }} Threads</h4>
            </div>
            <hr class="w-75 mx-auto" />
          </div>
          <div class="card-footer text-center px-2 border-0 bg-white">
            <a
              :href="getUser(userId).website"
              target="_blank"
              class="text-decoration-none"
              >{{ getUser(userId).website?.substring(7) || 'No website available.' }}</a
            >
          </div>
        </div>
        <small class="d-flex justify-content-center mt-3" style="font-size: 0.7rem">
          <!-- ${getUser(userId).registeredAt} -->
          {{ `Member since june 2018,` }} last visited &nbsp;
          <BaseDate :timestamp="getUser(userId).registeredAt" />
        </small>
        <hr class="mt-1 mx-auto w-75" />
        <div class="text-center">
          <button class="btn btn-primary">Edit Profile</button>
        </div>
      </div>
      <div class="col-md-8">
        <h1>{{ getUser(userId).username }}'s recent activity</h1>
        <hr />
        <PostsList
          v-if="getPostsByUser(userId)?.length"
          :posts="getPostsByUser(userId)"
        />
        <div v-else>
          <em>No recent activity available for now...</em>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
