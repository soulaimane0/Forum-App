<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { handleImgError } from '@/helpers';

const props = defineProps(['user', 'postsCount', 'threadsCount']);
const emits = defineEmits(['update-user-profile']);
const router = useRouter();

const activeUser = reactive({ ...props.user });
const save = () => {
  if (activeUser.email && activeUser.name && activeUser.email) {
    emits('update-user-profile', { ...activeUser });
    router.push({ name: 'profile' });
  } else {
    alert('Please fill in all the required fields !!');
  }
};
const cancel = () => {
  router.push({ name: 'profile' });
};
</script>

<template>
  <div class="card border-0 shadow" v-if="activeUser">
    <div class="card-header text-center border-0 bg-white">
      <img
        @error="handleImgError"
        :src="user?.avatar"
        :alt="`${user?.name} profile picture`"
        class="rounded-circle"
        width="120"
        height="120"
      />
    </div>
    <div class="card-body pb-0">
      <label for="username">Username*</label>
      <input
        id="username"
        type="text"
        class="form-control mb-2"
        placeholder="Username"
        v-model="activeUser.username"
      />

      <label for="name">Name*</label>
      <input
        id="name"
        type="text"
        class="form-control mb-2"
        placeholder="Name"
        v-model="activeUser.name"
      />
      <label for="bio">Bio</label>
      <textarea
        id="bio"
        rows="4"
        class="form-control"
        placeholder="Bio..."
        v-model="activeUser.bio"
      ></textarea>
      <div class="d-flex justify-content-around mt-4">
        <h4>{{ postsCount }} Posts</h4>
        <h4>{{ threadsCount }} Threads</h4>
      </div>

      <hr class="w-75 mx-auto" />
    </div>
    <div class="card-footer px-2 border-0 bg-white">
      <label for="website">Website</label>
      <input
        id="website"
        type="text"
        class="form-control mb-2"
        placeholder="website"
        v-model="activeUser.website"
      />
      <label for="email">Email*</label>
      <input
        id="email"
        type="email"
        class="form-control mb-2"
        placeholder="Email"
        v-model="activeUser.email"
      />
      <label for="location">Location</label>
      <input
        id="location"
        type="text"
        class="form-control mb-2"
        placeholder="Your location..."
        v-model="activeUser.location"
      />

      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
        <button class="btn btn-secondary" @click="cancel">Cancel</button>
        <button class="btn btn-primary" @click="save">Save</button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
