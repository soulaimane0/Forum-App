<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import useCategoryStore from '@/stores/CategoryStore';
import useAsyncDataStatus from '@/composables/asyncDataStatus';

const route = useRoute();
const categoryId = ref(route.params.id);
const categoryStore = useCategoryStore();
const asyncDataStatus = useAsyncDataStatus();

const category = ref(null);
const forums = ref(null);
onMounted(async () => {
  category.value = await categoryStore.getCategory(categoryId.value);
  forums.value = await categoryStore.getFormsByCategory(categoryId.value);
  asyncDataStatus.asyncData_fetched();
});
</script>

<template>
  <div v-if="asyncDataStatus.isDataReady.value" class="row">
    <div class="col-12">
      <h1 class="mb-4">{{ category?.name }}</h1>
      <ForumList :forums="forums" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
