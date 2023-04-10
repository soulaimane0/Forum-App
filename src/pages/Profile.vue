<script setup>
import useUserStore from '@/stores/UserStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
  edit: {
    type: Boolean,
    default: false,
  },
});
const route = useRoute();
const userId = ref(route.params.id);
const userStore = useUserStore();

const user = ref(null);
const posts = ref(null);
const threads = ref(null);
const total_posts = ref(userStore.countUserPosts(userId.value));
const total_threads = ref(userStore.countUserThreads(userId.value));

const save = (eventData) => {
  userStore.updateUserDetails(eventData, userId);
};

onMounted(async () => {
  user.value = await userStore.getUser(userId.value);
  posts.value = await userStore.getPostsByUser(userId.value);
  threads.value = await userStore.getThreadByUser(userId.value);
  // total_posts.value = await userStore.countUserPosts(userId.value);
  // total_threads.value = await userStore.countUserThreads(userId.value);
  // console.log(user.value);
  // console.log(posts.value);
  // console.log(total_posts.value);
  // console.log(total_threads.value);
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <UserProfileCardDetails
          v-if="!edit"
          :user="user"
          :postsCount="posts?.length"
          :threadsCount="threads?.length"
        />
        <userProfileCardEditor
          v-else
          :user="user"
          :postsCount="posts?.length"
          :threadsCount="threads?.length"
          @update-user-profile="save"
        />
      </div>
      <div class="col-md-8">
        <h1>{{ user?.username }}'s recent activity</h1>
        <hr />
        <PostsList v-if="posts?.length" :posts="posts" />
        <div v-else>
          <em>No recent activity available for now...</em>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
