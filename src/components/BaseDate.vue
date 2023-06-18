<script setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const props = defineProps({
  timestamp: {
    type: [Number, Object],
  },
});

const fullDate = () => {
  return dayjs.unix(props.timestamp?.seconds || props.timestamp).format('llll');
};
const diffDate = () => {
  return dayjs.unix(props.timestamp?.seconds || props.timestamp).fromNow();
};
</script>

<template>
  <span :title="fullDate()">
    <small class="text-muted"> {{ diffDate() }} </small>
  </span>
</template>

<style lang="scss" scoped></style>
