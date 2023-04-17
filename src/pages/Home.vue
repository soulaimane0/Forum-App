<script setup>
import { onMounted, reactive } from 'vue';
import useCategoryStore from '@/stores/CategoryStore.js';
import { storeToRefs } from 'pinia';
import useForumStore from '@/stores/ForumStore';
import useThreadStore from '@/stores/ThreadStore';

const threadStore = useThreadStore();
const { categories } = storeToRefs(useCategoryStore());

onMounted(async () => {
  await useCategoryStore().fetchCategories();
});
</script>

<template>
  <h1 class="text-center my-4">Welcome To Forum</h1>
  <div>
    <CategoryList :categories="categories" />
  </div>
</template>

<style scoped></style>
