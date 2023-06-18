<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import useThreadStore from '@/stores/ThreadStore';
import usePostsStore from '@/stores/PostsStore';
import useAuthStore from '@/stores/AuthenticatedStore';
import { storeToRefs } from 'pinia';

const props = defineProps(['forumId']);
const route = useRoute();
const threadId = ref(route.params.id);

const threadStore = useThreadStore();
const postsStore = usePostsStore();
const authStore = useAuthStore();

const { getPostsByThread, postsByThread } = storeToRefs(postsStore);
const { getThread, getUserByThread, thread, userByThread } = storeToRefs(threadStore);

const data = reactive({
  thread: {},
  user: {},
  posts: [],
});
const postsNum = ref(0);
const contributorsNum = ref(0);

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
  } catch (error) {
    console.error('Error while fetching data :', error);
  }
});

const addPost = async (post) => {
  postsStore.createPost(post.text, threadId.value, authStore.authId);
};

watch(
  () => ({ ...postsByThread.value }),
  () => {
    data.posts = { ...postsByThread.value };
  }
);
</script>

<template>
  <div v-if="data">
    <div class="d-flex justify-content-between">
      <h1 class="mb-3">{{ data.thread?.title }}</h1>
      <div class="d-grid align-items-center">
        <RouterLink :to="{ name: 'thread-update', params: { id: threadId } }">
          <button class="btn btn-primary fw-semibold">Update thread</button>
        </RouterLink>
      </div>
    </div>
    <div class="d-flex justify-content-between text-secondary">
      <p>
        By {{ data.user?.name }},
        <BaseDate :timestamp="data.thread?.publishedAt" />
      </p>
      <threadPostsAndContributersCount
        :postsNum="postsNum"
        :contibutorsNum="contributorsNum"
      />
    </div>

    <PostEditor class="mb-4" @save-post="addPost" />

    <PostsList v-if="data.posts" :posts="data.posts" />
  </div>

  <div v-else>
    <em>Loading...</em>
  </div>
</template>
