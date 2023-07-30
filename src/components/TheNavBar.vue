<script setup>
import useAuthStore from '@/stores/AuthenticatedStore';
import { storeToRefs } from 'pinia';
import { handleImgError } from '@/helpers';
import useUserStore from '@/stores/UserStore';

const userStore = useUserStore();
const authUserStore = useAuthStore();
const { authenticatedUser, authId } = storeToRefs(authUserStore);

const logOut = async () => {
  await userStore.logOut();
};
</script>

<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-primary">
    <div class="container-fluid text-white py-1 px-8 fs-5">
      <RouterLink class="navbar-brand" :to="{ name: 'home' }">
        <img
          src="@/assets/images/forum-logo.png"
          alt="Forum logo"
          width="45"
          height="45"
        />
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" :to="{ name: 'home' }">Home</RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
        <ul v-if="authId" class="d-flex align-items-center list-unstyled m-0">
          <li class="me-2" style="width: 48px; height: 49px">
            <img
              @error="handleImgError"
              :src="authenticatedUser?.avatar || '/user-placeholder.png'"
              :alt="`${authenticatedUser?.username} profile picture`"
              class="rounded-circle h-100 w-100"
            />
          </li>
          <li>
            <div class="dropdown">
              <a
                class="btn dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{
                  authenticatedUser?.username.length >= 12
                    ? authenticatedUser?.username.substring(0, 12) + '..'
                    : authenticatedUser?.username
                }}
              </a>

              <ul class="dropdown-menu">
                <li>
                  <RouterLink
                    class="dropdown-item"
                    href="#"
                    :to="{
                      name: 'profile',
                      params: { id: authId },
                    }"
                    >View Profile</RouterLink
                  >
                </li>
                <li>
                  <RouterLink @click="logOut" class="dropdown-item" :to="{ name: 'home' }"
                    >Logout</RouterLink
                  >
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul v-else class="navbar-nav">
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              href="#"
              :to="{
                name: 'signin',
              }"
              >Sign in</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              href="#"
              :to="{
                name: 'register',
              }"
              >Register</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  .dropdown {
    .dropdown-toggle:focus {
      border: none;
    }
  }
}
</style>
