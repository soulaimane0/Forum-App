<script setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const props = defineProps({
  timestamp: {
    type: Number,
    required: true,
  },
});

const fullDate = (timestamp) => {
  return dayjs.unix(timestamp).format('llll');
};
const diffDate = (timestamp) => {
  return dayjs.unix(timestamp).fromNow();
};
</script>

<template>
  <span :title="fullDate(timestamp)">
    <small class="text-muted"> {{ diffDate(timestamp) }} </small>
  </span>
</template>

<style lang="scss" scoped></style>
