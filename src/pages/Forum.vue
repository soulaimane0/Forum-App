<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useForumStore from '@/stores/ForumStore';
import { storeToRefs } from 'pinia';

const { getForum, getThreadsByForum } = storeToRefs(useForumStore());
const route = useRoute();
const forumId = ref(route.params.id);
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between">
        <div>
          <h1>{{ getForum(forumId).name }}</h1>
          <p>{{ getForum(forumId).description }}</p>
        </div>
        <div class="d-grid align-items-center">
          <RouterLink :to="{ name: 'thread-create', params: { forumId: forumId } }">
            <button class="btn btn-primary p-3 fw-semibold">Start a Thread</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <ThreadList :threads="getThreadsByForum(forumId)" />
</template>

<style lang="scss" scoped></style>
