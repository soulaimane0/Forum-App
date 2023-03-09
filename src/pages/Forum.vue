<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import sourceData from '@/data.json';

const route = useRoute();
const router = useRouter();
const threads = reactive(sourceData.threads);
const forums = reactive(sourceData.forums);

const forum = computed(() => {
  return forums.find((item) => item.id === route.params.id);
});
const getThreadByForumId = computed(() => {
  return threads.filter((item) => item.forumId === route.params.id);
});
const toThreadPage = (threadId) => {
  router.push({ name: 'thread', params: { id: threadId } });
};
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h1>{{ forum.name }}</h1>
      <p>{{ forum.description }}</p>
    </div>
  </div>
  <ThreadList :threads="getThreadByForumId" @toThreadPage="toThreadPage" />
</template>

<style lang="scss" scoped></style>
