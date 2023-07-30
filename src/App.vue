<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NProgress from 'nprogress';

const router = useRouter();
let showPage = ref(false);

NProgress.configure({
  speed: 200,
  showSpinner: false,
});

router.beforeEach(() => {
  showPage.value = false;
  NProgress.start();
});

const handlePageAppearence = () => {
  showPage.value = true;
  NProgress.done();
};
</script>

<template>
  <TheNavBar />
  <div class="container pt-4">
    <RouterView v-show="showPage" @ready="handlePageAppearence" :key="$route.fullPath" />
    <BaseSpinner v-if="!showPage" />
    <BaseNotifications />
  </div>
</template>

<style>
@import 'nprogress/nprogress.css';

#nprogress .bar {
  background: #57ad8d !important;
}

body {
  background-color: #f6f8ff !important;
  min-height: 100vh;
  overflow-x: hidden;
}
body::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

body::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

body::-webkit-scrollbar-thumb {
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.44, rgb(122, 153, 217)),
    color-stop(0.72, rgb(73, 125, 189)),
    color-stop(0.86, rgb(28, 58, 148))
  );
}
img {
  object-fit: cover;
}
</style>
