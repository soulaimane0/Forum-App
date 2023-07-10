<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import useThreadStore from '@/stores/ThreadStore';
import usePostsStore from '@/stores/PostsStore';
import useAuthStore from '@/stores/AuthenticatedStore';
import { storeToRefs } from 'pinia';
import useAsyncDataStatus from '@/composables/asyncDataStatus';

const props = defineProps(['forumId']);
const route = useRoute();
const threadId = ref(route.params.id);

const threadStore = useThreadStore();
const postsStore = usePostsStore();
const authStore = useAuthStore();
const asyncDataStatus = useAsyncDataStatus();

const { getPostsByThread, postsByThread } = storeToRefs(postsStore);
const { getThread, getUserByThread, thread, userByThread } = storeToRefs(threadStore);

const data = reactive({
  thread: {},
  user: {},
  posts: [],
});
const postsNum = ref(0);
const contributorsNum = ref(0);
let isTextAreaDirty = ref(false);

onMounted(async () => {
  try {
    await Promise.all([postsStore.fetchPosts(), threadStore.fetchThreads()]);

    await getThread.value(threadId.value);
    await getUserByThread.value(thread.value.userId);
    await getPostsByThread.value(threadId.value);

    data.thread = thread.value;
    data.user = userByThread.value;
    data.posts = postsByThread.value;

    postsNum.value = data.thread.posts?.length || 0;
    contributorsNum.value = data.thread.contributors?.length || 0;
    asyncDataStatus.asyncData_fetched();
  } catch (error) {
    console.error('Error while fetching data :', error);
  }
});

const addPost = async (post) => {
  postsStore.createPost(post.text, threadId.value, authStore.authId);
};

watch([() => ({ ...postsByThread.value }), () => ({ ...thread.value })], () => {
  data.posts = { ...postsByThread.value };
  data.thread = thread.value;
  postsNum.value = data.thread.posts?.length || 0;
  contributorsNum.value = data.thread.contributors?.length || 0;
});

onBeforeRouteLeave(() => {
  if (isTextAreaDirty.value) {
    const confirmed = confirm('Do you really want to leave? you have unsaved changes!');
    if (!confirmed) return false;
  }
});

const userIsAuthenticated = computed(() => (authStore.authId ? true : false));
</script>

<template>
  <div v-if="asyncDataStatus.isDataReady.value">
    <div class="d-flex justify-content-between">
      <h1 class="mb-3">{{ data.thread?.title }}</h1>
      <div class="d-grid align-items-center">
        <RouterLink
          v-if="data.thread.userId === authStore.authId"
          :to="{ name: 'thread-update', params: { id: threadId } }"
        >
          <button class="btn btn-primary fw-semibold">Update thread</button>
        </RouterLink>
      </div>
    </div>
    <div class="d-flex justify-content-between text-secondary mb-4">
      <p>
        By {{ data.user?.name }},
        <BaseDate :timestamp="data.thread?.publishedAt" />
      </p>
      <threadPostsAndContributersCount
        :postsNum="postsNum"
        :contibutorsNum="contributorsNum"
      />
    </div>
    <div></div>
    <PostsList v-if="data.posts" :posts="data.posts" />

    <PostEditor
      v-if="userIsAuthenticated"
      class="mb-4 mt-8"
      @save-post="addPost"
      @dirty="isTextAreaDirty = true"
      @clean="isTextAreaDirty = false"
    />
    <div v-else class="text-center mb-5 fs-5 fw-semibold">
      <RouterLink
        class="text-decoration-none"
        :to="{ name: 'signin', query: { redirectTo: route.path } }"
        >Sign in</RouterLink
      >
      or
      <RouterLink
        class="text-decoration-none"
        :to="{ name: 'register', query: { redirectTo: route.path } }"
        >Register</RouterLink
      >
      to reply.
    </div>
  </div>
</template>
