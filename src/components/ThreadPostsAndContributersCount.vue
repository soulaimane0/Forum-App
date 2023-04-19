<script setup>
import { onMounted, ref } from 'vue';
import useThreadStore from '@/stores/ThreadStore';

const props = defineProps({
  threadId: {
    type: String,
    required: true,
  },
});
const threadStore = useThreadStore();
const total_posts = ref(null);
const total_contributors = ref(null);

onMounted(async () => {
  total_posts.value = await threadStore.countThreadPosts(props.threadId);
  total_contributors.value = await threadStore.countThreadContributors(props.threadId);
});
</script>

<template>
  <p>
    {{
      `${total_posts ? total_posts : '..'} ${total_posts > 1 ? 'Replies' : 'Reply'} by ${
        total_contributors ? total_contributors : '..'
      } ${total_contributors > 1 ? 'Contributors' : 'Contributor'}`
    }}
  </p>
</template>
