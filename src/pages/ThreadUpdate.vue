<script setup>
import { onMounted, reactive, ref } from 'vue';
import useThreadStore from '@/stores/ThreadStore';
import usePostsStore from '@/stores/PostsStore';
import useAsyncDataStatus from '@/composables/asyncDataStatus';

import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const threadId = ref(route.params.id);
const threadStore = useThreadStore();
const postsStore = usePostsStore();
const asyncDataStatus = useAsyncDataStatus();

const threadData = reactive({
  thread: {},
  posts: [],
});

onMounted(async () => {
  threadData.thread = await threadStore.getThread(threadId.value);
  threadData.posts = await postsStore.getPostsByThread(threadId.value);
  asyncDataStatus.asyncData_fetched();
});

const update = async (form) => {
  await threadStore.updateThread(form.title, threadId.value);
  router.push({ name: 'thread', params: { id: threadId.value } });
};
</script>

<template>
  <div v-if="asyncDataStatus.isDataReady.value">
    <h1>
      Editing <em>{{ threadData.thread?.title }}</em>
    </h1>
    <ThreadEditor
      :title="threadData.thread?.title"
      :text="threadData.posts[0]?.text"
      @save-thread="update"
      @cancel-thread="router.push({ name: 'thread', params: { id: threadId } })"
    />
  </div>
</template>

<style lang="scss" scoped></style>
