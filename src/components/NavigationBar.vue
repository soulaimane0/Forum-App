<script setup></script>

<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-primary">
    <div class="container-fluid text-white py-1 px-8 fs-5">
      <a class="navbar-brand" href="#">
        <img
          src="@/assets/images/forum-logo.png"
          alt="Forum logo"
          width="45"
          height="45"
        />
      </a>
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
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Sign in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#">Register</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
