<script setup>
import { onMounted, reactive } from 'vue';
import useCategoryStore from '@/stores/CategoryStore.js';
import { storeToRefs } from 'pinia';

const { categories } = storeToRefs(useCategoryStore());
onMounted(async () => {
  await useCategoryStore().fetchCategories();
});
</script>

<template>
  <h1 class="text-center my-4">Welcome To Forum</h1>
  <div v-if="categories.length">
    <CategoryList :categories="categories" />
  </div>
  <div v-else class="row d-flex align-items-center" style="min-height: 50vh">
    <em class="text-center fw-semibold fs-1">Loading...</em>
  </div>
</template>

<style scoped></style>
