<script setup>
import { onMounted, ref } from 'vue';
import useForumStore from '@/stores/ForumStore';
import useThreadStore from '@/stores/ThreadStore';
import { useRouter } from 'vue-router';

const props = defineProps(['forumId']);
const router = useRouter();
const threadStore = useThreadStore();
const forum = ref(null);

onMounted(async () => {
  forum.value = await useForumStore().getForum(props.forumId);
});

const publish = async (form) => {
  const thread = await threadStore.createThread(form.title, form.content, props.forumId);
  router.push({ name: 'thread', params: { id: thread.id } });
};
</script>

<template>
  <h1>
    Create new thread in <em>{{ forum?.name }}</em>
  </h1>
  <ThreadEditor
    @save-thread="publish"
    @cancel-thread="router.push({ name: 'forum', params: { id: forumId } })"
  />
</template>

<style lang="scss" scoped></style>
