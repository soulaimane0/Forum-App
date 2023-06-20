<script setup>
import { onMounted, ref } from 'vue';
import useCategoryStore from '@/stores/CategoryStore.js';
import { storeToRefs } from 'pinia';
import useAsyncDataStatus from '@/composables/asyncDataStatus';

const { categories } = storeToRefs(useCategoryStore());
const categoryStore = useCategoryStore();
const asyncDataStatus = useAsyncDataStatus();

onMounted(async () => {
  await categoryStore.fetchCategories();
  asyncDataStatus.asyncData_fetched();
});
</script>

<template>
  <div v-if="asyncDataStatus.isDataReady.value">
    <h1 class="text-center my-4">Welcome To Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<style scoped></style>
