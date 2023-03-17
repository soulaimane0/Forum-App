<script setup></script>

<template>
  <TheNavBar />
  <div class="container pt-4">
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style>
body {
  background-color: #f6f8ff !important;
  min-height: 100vh;
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
</style>
