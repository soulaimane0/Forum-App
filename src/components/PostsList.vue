<script setup>
import usePostsStore from '@/stores/PostsStore';
import useAuthStore from '@/stores/AuthenticatedStore';
import { ref } from 'vue';

const props = defineProps(['posts']);
const postsStore = usePostsStore();
const authStore = useAuthStore();

const editing = ref(null);
const handleEdit = (id) => {
  editing.value = editing.value === id ? null : id;
};

const updatePost = async (post) => {
  await postsStore.updatePost(post.text, post.id);
  editing.value = null;
};
</script>

<template>
  <div v-for="post in posts" :key="post.id" class="card shadow border-0 mb-3 p-3">
    <div class="row g-0">
      <div class="col-md-2 d-flex flex-column align-items-center">
        <PostCardUserInfo :userId="post.userId" />
      </div>
      <div class="col-md-10">
        <div class="card-body h-100 d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between">
            <PostEditor
              class="w-100"
              v-if="editing === post.id"
              :post="post"
              @save-post="updatePost"
            />
            <p v-else class="card-text">
              {{ post.text }}
            </p>
            <a
              v-if="post.userId === authStore.authId"
              @click.prevent="handleEdit(post.id)"
              href="#"
              class="ps-3 text-dark"
            >
              <fa icon="fa-pencil" />
            </a>
          </div>
          <div class="align-self-end text-end">
            <div class="text-muted" v-if="post.edited?.at"><small>edited</small></div>
            <BaseDate :timestamp="parseInt(post.publishedAt)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
