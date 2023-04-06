<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import useCategoryStore from '@/stores/CategoryStore';

const route = useRoute();
const categoryId = ref(route.params.id);
const categoryStore = useCategoryStore();
const category = ref(null);
const forums = ref(null);
onMounted(async () => {
  category.value = await categoryStore.getCategory(categoryId.value);
  forums.value = await categoryStore.getFormsByCategory(categoryId.value);
});
</script>

<template>
  <div v-if="category && forums" class="row">
    <div class="col-12">
      <h1 class="mb-4">{{ category?.name }}</h1>
      <ForumList :forums="forums" />
    </div>
  </div>
  <div v-else class="row d-flex align-items-center" style="min-height: 50vh">
    <em class="text-center fw-semibold fs-1">Loading...</em>
  </div>
</template>

<style lang="scss" scoped></style>
