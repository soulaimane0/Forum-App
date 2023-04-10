<script setup>
import { ref } from 'vue';
import useThreadStore from '@/stores/ThreadStore';
import usePostsStore from '@/stores/PostsStore';
import { storeToRefs } from 'pinia';

import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const threadId = ref(route.params.id);
const threadStore = useThreadStore();
const { thread } = storeToRefs(threadStore);
const { getPostsByThread } = storeToRefs(usePostsStore());

const update = async (form) => {
  threadStore.updateThread(form.title, threadId.value);
  router.push({ name: 'thread', params: { id: threadId.value } });
};
</script>

<template>
  <h1>
    Editing <em>{{ thread(threadId)?.title }}</em>
  </h1>
  <ThreadEditor
    :title="thread(threadId).title"
    :text="getPostsByThread(threadId)[0].text"
    @save-thread="update"
    @cancel-thread="router.push({ name: 'thread', params: { id: threadId } })"
  />
</template>

<style lang="scss" scoped></style>
