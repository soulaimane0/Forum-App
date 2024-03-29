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

let isUpdating = ref(false);
const updatePost = async (post) => {
  isUpdating.value = true;
  await postsStore.updatePost(post.text, post.id);
  editing.value = null;
  isUpdating.value = false;
};
</script>

<template>
  <div v-for="post in posts" :key="post.id" class="card shadow-sm border-0 mb-4 p-3">
    <div class="row g-0">
      <PostCardUserInfo :userId="post.userId" />
      <div class="col-md-10">
        <div class="card-body h-100 d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between">
            <div class="w-100" v-if="editing === post.id">
              <PostEditor
                v-if="!isUpdating"
                class="w-100"
                :post="post"
                @save-post="updatePost"
              />
              <BaseSpinner class="mx-auto" v-else />
            </div>

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
            <BaseDate :timestamp="post.publishedAt" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
