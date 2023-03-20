<script setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import usePostsStore from '@/stores/PostsStore';

const postsStore = usePostsStore();

const route = useRoute();
const emit = defineEmits(['save-post']);
const postReply = ref(null);

const savePost = () => {
  if (postReply.value) {
    const post = reactive({
      text: postReply.value,
    });
    emit('save-post', { post });
    postReply.value = null;
  } else {
    alert('Please write some text in the post input field !');
  }
};
</script>

<template>
  <form @submit.prevent="savePost">
    <div class="card my-4 p-3">
      <div class="mb-3">
        <label for="post" class="form-label">Add Post</label>
        <textarea
          v-model="postReply"
          class="form-control"
          id="post"
          cols="30"
          rows="4"
        ></textarea>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
