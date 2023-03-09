<script setup></script>

<template>
  <NavigationBar />
  <div class="container pt-4">
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style>
body {
  background-color: #f6f8ff !important;
  min-height: 100vh;
}
</style>
