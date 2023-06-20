<script setup>
import { useRouter } from 'vue-router';

const props = defineProps(['categories']);
const router = useRouter();

const toForumPage = (forumId) => {
  router.push({ name: 'forum', params: { id: forumId } });
};
</script>

<template>
  <div class="row">
    <div class="col-12" v-if="categories.length">
      <table
        v-for="category in categories"
        :key="category.id"
        class="table table-hover rounded mb-8"
        style="overflow: hidden"
      >
        <thead>
          <tr class="fs-3 bg-primary">
            <th colspan="3" scope="col">
              <RouterLink
                class="text-light text-decoration-none"
                :to="{ name: 'category', params: { id: category.id } }"
              >
                {{ category?.name }}
              </RouterLink>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="forum in category.fullForums"
            :key="forum.id"
            style="cursor: pointer"
            @click="toForumPage(forum.id)"
          >
            <td>
              <div>
                <h4 class="text-primary-600">{{ forum.name }}</h4>
                <p>{{ forum.description }}</p>
              </div>
            </td>

            <td>
              <div class="text-center">
                <p class="fw-semibold fs-4">
                  {{ forum.threads?.length }}
                </p>
                <p>
                  {{
                    forum.threads?.length > 1
                      ? 'Threads'
                      : forum.threads?.length === 1
                      ? 'Thread'
                      : 'No Threads'
                  }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <BaseSpinner v-else />
  </div>
</template>

<style lang="scss" scoped></style>
