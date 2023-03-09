<script setup>
import { computed, reactive } from 'vue';
import sourceData from '@/data.json';
import { useRouter } from 'vue-router';

const props = defineProps(['categories']);
const router = useRouter();
const forums = reactive(sourceData.forums);

const getForumCategory = (forumId) => {
  return forums.find((item) => item.id === forumId);
};
const toForumPage = (forumId) => {
  router.push({ name: 'forum', params: { id: forumId } });
};
</script>

<template>
  <div class="row">
    <div class="col-12">
      <table
        v-for="category in categories"
        :key="category.id"
        class="table table-hover rounded mb-8"
        style="overflow: hidden"
      >
        <thead>
          <tr class="fs-3 bg-primary">
            <th class="text-light" colspan="3" scope="col">{{ category.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="forum in category.forums"
            :key="forum"
            style="cursor: pointer"
            @click="toForumPage(forum)"
          >
            <td>
              <div>
                <h4 class="text-primary-600">{{ getForumCategory(forum).name }}</h4>
                <p>{{ getForumCategory(forum).description }}</p>
              </div>
            </td>

            <td>
              <div class="text-center">
                <p class="fw-semibold fs-4">
                  {{ getForumCategory(forum).threads?.length }}
                </p>
                <p>
                  {{
                    getForumCategory(forum).threads?.length > 1
                      ? 'Threads'
                      : getForumCategory(forum).threads?.length === 1
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
  </div>
</template>

<style lang="scss" scoped></style>
