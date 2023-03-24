<script setup>
import { reactive, computed } from 'vue';

const emits = defineEmits(['save-thread']);
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
});
const form = reactive({
  title: props.title,
  content: props.text,
});

const existing = computed(() => !!props.title);

const save = () => {
  emits('save-thread', { ...form });
};
</script>

<template>
  <form @submit.prevent="save">
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input type="text" class="form-control" id="title" v-model="form.title" required />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">Content</label>
      <textarea
        id="content"
        rows="4"
        class="form-control"
        v-model="form.content"
        :readonly="existing"
        required
      ></textarea>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
      <button class="btn btn-secondary" @click="$emit('cancel-thread')">Cancel</button>
      <button type="submit" class="btn btn-primary" @submit.prevent="save">
        {{ existing ? 'Update' : 'Publish' }}
      </button>
    </div>
  </form>
</template>
