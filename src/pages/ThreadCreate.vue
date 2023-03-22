<script setup>
import { ref } from 'vue';
import useForumStore from '@/stores/ForumStore';
import useThreadStore from '@/stores/ThreadStore';

import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const props = defineProps(['forumId']);
const router = useRouter();
const { getForum } = storeToRefs(useForumStore());
const threadStore = useThreadStore();

const publish = async (title, content) => {
  const thread = await threadStore.createThread(title, content, props.forumId);
  router.push({ name: 'thread', params: { id: thread.id } });
};
</script>

<template>
  <h1>
    Create new thread in <em>{{ getForum(forumId).name }}</em>
  </h1>
  <ThreadEditor
    @save-thread="publish"
    @cancel-thread="router.push({ name: 'forum', params: { id: forumId } })"
  />
</template>

<style lang="scss" scoped></style>
