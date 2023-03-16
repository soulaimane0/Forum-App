<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useCategoryStore from '@/stores/CategoryStore';
import { storeToRefs } from 'pinia';

const { getCategory, getFormsByCategory } = storeToRefs(useCategoryStore());
const route = useRoute();
const categoryId = ref(route.params.id);
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h1 class="mb-4">{{ getCategory(categoryId).name }}</h1>
    </div>
  </div>
  <ForumList :forums="getFormsByCategory(categoryId)" />
</template>

<style lang="scss" scoped></style>
