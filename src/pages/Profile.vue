<script setup>
import useUserStore from '@/stores/UserStore';
import useThreadStore from '@/stores/ThreadStore';
import usePostsStore from '@/stores/PostsStore';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

defineProps({
  edit: {
    type: Boolean,
    default: false,
  },
});
const route = useRoute();
const emits = defineEmits(['ready']);
const userId = ref(route.params.id);
const userStore = useUserStore();
const threadStore = useThreadStore();
const postsStore = usePostsStore();

const user = ref(null);
const posts = ref(null);
const threads = ref(null);

const save = async (eventData) => {
  await userStore.updateUserDetails(eventData, userId.value);
};

onMounted(async () => {
  await postsStore.fetchPosts();
  await threadStore.fetchThreads();
  user.value = await userStore.getUser(userId.value);
  posts.value = await userStore.getPostsByUser(userId.value);
  threads.value = await userStore.getThreadByUser(userId.value);
  emits('ready');
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4" v-if="user">
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
