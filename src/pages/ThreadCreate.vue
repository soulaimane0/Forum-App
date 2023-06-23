<script setup>
import { onMounted, ref } from 'vue';
import useForumStore from '@/stores/ForumStore';
import useThreadStore from '@/stores/ThreadStore';
import usePostsStore from '@/stores/PostsStore';
import useAuthStore from '@/stores/AuthenticatedStore';
import { useRouter } from 'vue-router';

const props = defineProps(['forumId']);
const emits = defineEmits(['ready']);

const router = useRouter();
const threadStore = useThreadStore();
const postsStore = usePostsStore();
const authStore = useAuthStore();

const forum = ref(null);

onMounted(async () => {
  forum.value = await useForumStore().getForum(props.forumId);
  emits('ready');
});

const publish = async (form) => {
  const thread = await threadStore.createThread(
    props.forumId,
    form.title,
    authStore.authId
  );
  await postsStore.createPost(form.content, thread, authStore.authId);
  router.push({ name: 'thread', params: { id: thread } });
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
