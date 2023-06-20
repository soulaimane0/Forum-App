<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import useForumStore from '@/stores/ForumStore';
import { storeToRefs } from 'pinia';
import useAsyncDataStatus from '@/composables/asyncDataStatus';

const forumStore = useForumStore();
const route = useRoute();
const forumId = ref(route.params.id);

const { forum, threads } = storeToRefs(forumStore);
const asyncDataStatus = useAsyncDataStatus();

const forumData = reactive({
  forum: {},
  threads: [],
});
onMounted(async () => {
  await forumStore.getForum(forumId.value);
  await forumStore.getThreadsByForum(forumId.value);
  forumData.forum = forum.value;
  forumData.threads = threads.value;
  asyncDataStatus.asyncData_fetched();
});

watch(
  () => [...threads.value],
  () => {
    forumData.threads = threads.value;
  }
);
</script>

<template>
  <div v-if="asyncDataStatus.isDataReady.value" class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between">
        <div>
          <h1>{{ forumData.forum?.name }}</h1>
          <p>{{ forumData.forum?.description }}</p>
        </div>
        <div class="d-grid align-items-center">
          <RouterLink :to="{ name: 'thread-create', params: { forumId: forumId } }">
            <button class="btn btn-primary p-3 fw-semibold">Start a Thread</button>
          </RouterLink>
        </div>
      </div>
      <ThreadList :threads="forumData.threads" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
