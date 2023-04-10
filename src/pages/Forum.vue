<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import useForumStore from '@/stores/ForumStore';

const forumStore = useForumStore();
const route = useRoute();
const forumId = ref(route.params.id);

const forums = ref(null);
const threads = ref(null);
onMounted(async () => {
  forums.value = await forumStore.getForum(forumId.value);
  threads.value = await forumStore.getThreadsByForum(forumId.value);
});
</script>

<template>
  <div v-if="forums && threads" class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between">
        <div>
          <h1>{{ forums?.name }}</h1>
          <p>{{ forums?.description }}</p>
        </div>
        <div class="d-grid align-items-center">
          <RouterLink :to="{ name: 'thread-create', params: { forumId: forumId } }">
            <button class="btn btn-primary p-3 fw-semibold">Start a Thread</button>
          </RouterLink>
        </div>
      </div>
      <ThreadList :threads="threads" />
    </div>
  </div>
  <div v-else class="row d-flex align-items-center" style="min-height: 50vh">
    <em class="text-center fw-semibold fs-1">Loading...</em>
  </div>
</template>

<style lang="scss" scoped></style>
