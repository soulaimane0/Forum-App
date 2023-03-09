<script setup>
import sourceData from '@/data.json';
import { reactive } from 'vue';

const categories = reactive(sourceData.categories);
</script>

<template>
  <h1 class="text-center my-4">Welcome To Forum</h1>
  <div>
    <CategoryList :categories="categories" />
  </div>
</template>

<style scoped></style>
