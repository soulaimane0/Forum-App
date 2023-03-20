<script setup>
import useUserStore from '@/stores/UserStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

defineProps({
  edit: {
    type: Boolean,
    default: false,
  },
});
const route = useRoute();
const userId = route.params.id;
const userStore = useUserStore();
const { getUser, countUserPosts, countUserThreads, getPostsByUser } = storeToRefs(
  useUserStore()
);
const save = (eventData) => {
  userStore.updateUserDetails(eventData, userId);
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <UserProfileCardDetails
          v-if="!edit"
          :user="getUser(userId)"
          :postsCount="countUserPosts(userId)"
          :threadsCount="countUserThreads(userId)"
        />
        <userProfileCardEditor
          v-else
          :user="getUser(userId)"
          :postsCount="countUserPosts(userId)"
          :threadsCount="countUserThreads(userId)"
          @update-user-profile="save"
        />
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
