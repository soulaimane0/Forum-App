<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import sourceData from '@/data.json';

const route = useRoute();
const router = useRouter();
const categories = reactive(sourceData.categories);
const forums = reactive(sourceData.forums);

const getCategoryForum = computed(() => {
  return forums.filter((item) => item.categoryId === route.params.id);
});
const category = computed(() => {
  return categories.find((item) => item.id === route.params.id);
});
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h1 class="mb-4">{{ category.name }}</h1>
    </div>
  </div>
  <ForumList :forums="getCategoryForum" />
</template>

<style lang="scss" scoped></style>
