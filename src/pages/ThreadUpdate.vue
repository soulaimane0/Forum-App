<script setup>
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue';
import useThreadStore from '@/stores/ThreadStore';
import usePostsStore from '@/stores/PostsStore';

import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const threadId = ref(route.params.id);
const threadStore = useThreadStore();
const postsStore = usePostsStore();

const threadData = reactive({
  thread: null,
  posts: null,
});

onBeforeMount(async () => {
  threadData.thread = await threadStore.thread(threadId.value);
  threadData.posts = await postsStore.getPostsByThread(threadId.value);
});

const update = async (form) => {
  await threadStore.updateThread(form.title, threadId.value);
  router.push({ name: 'thread', params: { id: threadId.value } });
};
</script>

<template>
  <h1>
    Editing <em>{{ threadData.thread?.title }}</em>
  </h1>
  <template v-if="threadData.thread && threadData.posts[0]">
    <ThreadEditor
      :title="threadData.thread?.title"
      :text="threadData.posts[0]?.text"
      @save-thread="update"
      @cancel-thread="router.push({ name: 'thread', params: { id: threadId } })"
    />
  </template>
  <template v-else>
    <p>Loading...</p>
  </template>
</template>

<style lang="scss" scoped></style>
