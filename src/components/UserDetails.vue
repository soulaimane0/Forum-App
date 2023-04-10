<script setup>
import { onMounted, ref } from 'vue';
import useThreadStore from '@/stores/ThreadStore';

const props = defineProps(['userId']);
const threadStore = useThreadStore();

const user = ref(null);

onMounted(async () => {
  user.value = await threadStore.getUserByThread(props.userId);
  console.log(user.value);
});
</script>

<template>
  <div class="d-flex align-items-center">
    <img
      :src="user?.avatar"
      alt="user profile"
      style="width: 45px; height: 45px"
      class="rounded-circle"
      referrerpolicy="no-referrer"
    />
    <div class="ms-3">
      <p class="fw-bold mb-1">
        {{ user?.name }}
      </p>
      <p class="text-muted mb-0">
        {{ user?.email }}
      </p>
    </div>
  </div>
</template>

<style lang="scss"></style>
