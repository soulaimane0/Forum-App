<script setup>
const props = defineProps(['user', 'postsCount', 'threadsCount']);
</script>

<template>
  <div class="card border-0 shadow">
    <div class="card-header text-center border-0 bg-white">
      <img
        :src="user.avatar"
        :alt="`${user.username} profile picture`"
        class="rounded-circle"
        width="120"
        height="120"
      />
      <h2 class="fw-bold">{{ user.username }}</h2>
    </div>
    <div class="card-body pb-0">
      <h3 class="mb-0">{{ user.name }}</h3>
      <p class="my-1">{{ user.bio || 'No bio specifid.' }}</p>
      <small class="text-blue-700">{{ user.username }} is online</small>
      <div class="d-flex justify-content-around mt-4">
        <h4>{{ postsCount }} Posts</h4>
        <h4>{{ threadsCount }} Threads</h4>
      </div>
      <hr class="w-75 mx-auto" />
    </div>
    <div class="card-footer text-center px-2 border-0 bg-white">
      <a :href="user.website" target="_blank" class="text-decoration-none">{{
        user.website?.substring(7) || 'No website available.'
      }}</a>
    </div>
    <small class="d-flex justify-content-center mt-3" style="font-size: 0.7rem">
      <!-- ${getUser.registeredAt} -->
      {{ `Member since june 2018,` }} last visited &nbsp;
      <BaseDate :timestamp="user.registeredAt" />
    </small>
    <hr class="mt-1 mx-auto w-75" />
    <div class="text-center">
      <RouterLink :to="{ name: 'profileEdit' }">
        <button class="btn btn-primary mb-4">Edit Profile</button>
      </RouterLink>
    </div>
  </div>
</template>
