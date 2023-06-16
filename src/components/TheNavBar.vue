<script setup>
import useAuthStore from '@/stores/AuthenticatedStore';
import { storeToRefs } from 'pinia';
import { handleImgError } from '@/helpers';

const { authenticatedUser, authId } = storeToRefs(useAuthStore());
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
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
        <ul class="d-flex align-items-center list-unstyled m-0">
          <li class="me-2">
            <img
              @error="handleImgError"
              :src="authenticatedUser.avatar"
              :alt="`${authenticatedUser.username} profile picture`"
              class="img-fluid rounded-circle"
              width="45"
              height="45"
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
                {{ authenticatedUser.username }}
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
                <li><a class="dropdown-item" href="#">Logout</a></li>
              </ul>
            </div>
          </li>
        </ul>
        <!-- <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Sign in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#">Register</a>
          </li>
        </ul> -->
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
