<script setup>
import { reactive, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import usePostsStore from '@/stores/PostsStore';

const emits = defineEmits(['save-post', 'dirty', 'clean']);
const props = defineProps({
  post: {
    type: Object,
    default: () => ({ text: null }),
  },
});

const postCopy = reactive({ ...props.post });
const savePost = () => {
  if (postCopy.text) {
    emits('save-post', postCopy);
    postCopy.text = null;
  } else {
    alert('Please write some text in the post input field !');
  }
};

watch(
  () => ({ ...postCopy }),
  () => {
    if (postCopy.text !== props.post.text) {
      emits('dirty');
    } else {
      emits('clean');
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<template>
  <form @submit.prevent="savePost">
    <div class="mb-3">
      <textarea
        v-model="postCopy.text"
        class="form-control"
        id="post"
        cols="30"
        rows="4"
        :placeholder="post.text ? 'Update post...' : 'Add Post...'"
      ></textarea>
    </div>
    <div class="d-flex justify-content-end">
      <button type="submit" class="btn btn-primary">
        {{ post.text ? 'Update post' : 'Submit post' }}
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
