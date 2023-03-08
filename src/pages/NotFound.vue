<template>
  <div class="text-center">
    <h1 class="fs-1">ERROR 404 !!</h1>
    <h3 class="mt-2 mb-5">Uh-Oh , Page Not Found...</h3>
    <RouterLink class="text-decoration-none" :to="{ name: 'home' }">
      <h4 class="text-primary">Read some cool threads !</h4>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped></style>
