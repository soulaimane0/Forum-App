<script setup>
import useUserStore from '@/stores/UserStore';
import { handleImgError } from '@/helpers';
import { onMounted, ref } from 'vue';

const props = defineProps(['userId']);
const userStore = useUserStore();
const user = ref(null);

onMounted(async () => {
  user.value = await userStore.getUser(props.userId);
});
</script>

<template>
  <h5>{{ user?.username }}</h5>
  <img
    @error="handleImgError"
    :src="user?.avatar"
    style="width: 95px; height: 95px"
    class="rounded-circle"
    :alt="`${user?.username}' Picture`"
    referrerpolicy="no-referrer"
  />
  <h6>{{ userStore.countUserPosts(userId) }} posts</h6>
  <h6>{{ userStore.countUserThreads(userId) }} threads</h6>
</template>
