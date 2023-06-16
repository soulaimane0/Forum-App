<script setup>
import { handleImgError } from '@/helpers';

const props = defineProps(['threads']);
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
                <div class="d-flex align-items-center">
                  <img
                    @error="handleImgError"
                    :src="thread.user?.avatar"
                    alt="user profile"
                    style="width: 45px; height: 45px"
                    class="rounded-circle"
                    referrerpolicy="no-referrer"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">
                      {{ thread.user?.name }}
                    </p>
                    <p class="text-muted mb-0">
                      {{ thread.user?.email }}
                    </p>
                  </div>
                </div>
              </RouterLink>
            </td>
            <td>
              <p class="fw-bold">{{ thread.title }}</p>
              <div class="d-flex">
                <p>
                  by
                  <span class="fw-semibold">
                    {{ thread.user?.name }}
                  </span>
                  ,
                </p>
                <BaseDate :timestamp="thread.publishedAt" />
              </div>
            </td>
            <td>
              <p>
                <span class="fw-bold">{{ thread.posts?.length }}</span> replys
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
