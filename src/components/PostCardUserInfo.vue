<script setup>
import useUserStore from '@/stores/UserStore';
import { handleImgError } from '@/helpers';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const props = defineProps(['userId']);
const userStore = useUserStore();
// const { user } = storeToRefs(userStore);
const user = ref(null);

onMounted(async () => {
  user.value = await userStore.getUser(props.userId);
});
</script>

<template>
  <div v-if="user" class="col-md-2 d-flex flex-column align-items-center">
    <h5>
      {{
        user?.username.length >= 12
          ? user?.username.substring(0, 12) + '..'
          : user?.username
      }}
    </h5>
    <img
      @error="handleImgError"
      :src="user?.avatar || '/user-placeholder.png'"
      style="width: 95px; height: 95px"
      class="rounded-circle"
      :alt="`${user?.username}' Picture`"
      referrerpolicy="no-referrer"
    />
    <h6>{{ userStore.countUserPosts(userId) }} posts</h6>
    <h6>{{ userStore.countUserThreads(userId) }} threads</h6>
  </div>
</template>
