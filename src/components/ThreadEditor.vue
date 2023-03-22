<script setup>
import { ref } from 'vue';

const emits = defineEmits(['save-thread']);
const title = ref(null);
const content = ref(null);

const save = () => {
  emits('save-thread', title.value, content.value);
  title.value = '';
  content.value = '';
};
</script>

<template>
  <form @submit.prevent="save">
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input type="text" class="form-control" id="title" v-model="title" required />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">Content</label>
      <textarea
        id="content"
        rows="4"
        class="form-control"
        v-model="content"
        required
      ></textarea>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
      <button class="btn btn-secondary" @click="$emit('cancel-thread')">Cancel</button>
      <button type="submit" class="btn btn-primary" @submit.prevent="save">
        Publish
      </button>
    </div>
  </form>
</template>
