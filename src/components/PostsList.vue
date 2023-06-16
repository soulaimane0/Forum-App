<script setup>
const props = defineProps(['posts']);
</script>

<template>
  <div v-for="post in posts" :key="post.id" class="card shadow border-0 mb-3 p-3">
    <div class="row g-0">
      <div class="col-md-2 d-flex flex-column align-items-center">
        <PostCardUserInfo :userId="post.userId" />
      </div>
      <div class="col-md-10">
        <div class="card-body">
          <p class="card-text">
            {{ post.text }}
          </p>
          <BaseDate
            class="d-flex justify-content-end"
            :timestamp="parseInt(post.publishedAt)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
