<script setup>
const props = defineProps({
  postsNum: {
    type: Number,
    required: true,
  },
  contibutorsNum: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <p>
    {{
      `${postsNum ? postsNum : '..'} ${postsNum > 1 ? 'Replies' : 'Reply'} by ${
        contibutorsNum ? contibutorsNum : '..'
      } ${contibutorsNum > 1 ? 'Contributors' : 'Contributor'}`
    }}
  </p>
</template>
