<script setup>
import { onMounted, ref, computed } from 'vue';
import useThreadStore from '@/stores/ThreadStore';

const threadStore = useThreadStore();
const props = defineProps(['threads']);
const user_id = ref(null);

const getUserData = async (userId) => {
  user_id.value = userId;
  return await threadStore.getUserByThread(userId);
};

// onMounted(async () => {
//   if (user_id.value) {
//     await getUserData(user_id.value);
//     console.log(getUserData(user_id.value));
//   }
// });
</script>

<template>
  <div class="row">
    <div class="col-12">
      <table class="table table-hover rounded" style="overflow: hidden">
        <thead>
          <tr class="fs-3 bg-primary">
            <th class="text-light" colspan="3" scope="col">Threads</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="threads?.length"
            v-for="thread in threads"
            :key="thread.id"
            style="cursor: pointer"
          >
            <td>
              <RouterLink
                class="text-decoration-none"
                :to="{ name: 'thread', params: { id: thread.id } }"
              >
                <UserDetails :userId="thread.userId" />
              </RouterLink>
            </td>
            <td>
              <p class="fw-bold">{{ thread.title }}</p>
              <div class="d-flex">
                <p>
                  by
                  <span class="fw-semibold">
                    {{ getUserData(thread.userId)?.name }}
                  </span>
                  ,
                </p>
                <BaseDate :timestamp="thread.publishedAt" />
              </div>
            </td>
            <td>
              <p>
                <span class="fw-bold">{{ thread.posts.length }}</span> replys
              </p>
            </td>
          </tr>
          <tr v-else>
            <td colspan="3">
              <p>No threads Available...</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
