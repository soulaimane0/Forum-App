<script setup>
import { reactive } from 'vue';
import useCategoryStore from '@/stores/CategoryStore.js';
import { storeToRefs } from 'pinia';
const { categories } = storeToRefs(useCategoryStore());
</script>

<template>
  <h1 class="text-center my-4">Welcome To Forum</h1>
  <div>
    <CategoryList :categories="categories" />
  </div>
</template>

<style scoped></style>
