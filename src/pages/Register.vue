<script setup>
import { reactive } from 'vue';
import useUserStore from '@/stores/UserStore';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits(['ready']);
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const form = reactive({
  name: '',
  username: '',
  email: '',
  avatar: '',
  password: '',
});

emit('ready');

const successRedirect = () => {
  const path = route.query.redirectTo || { name: 'home' };
  router.push(path);
};

const registerUser = async () => {
  await userStore.registerUserWithEmailAndPassword(
    form.name,
    form.username,
    form.email,
    form.avatar,
    form.password
  );
  for (const prop of Object.getOwnPropertyNames(form)) {
    form[prop] = '';
  }
  successRedirect();
};

const registerWithGoogle = async () => {
  await userStore.signInWithGoogle();
  successRedirect();
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div
        class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto bg-white rounded px-6 py-8 shadow"
      >
        <h1 class="text-center fw-bold mb-4">Register</h1>
        <form @submit.prevent="registerUser">
          <div class="mb-3">
            <label class="form-label">Full Name</label>
            <input required v-model="form.name" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input required v-model="form.username" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input required v-model="form.email" type="email" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              required
              v-model="form.password"
              type="password"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Avatar</label>
            <input v-model="form.avatar" type="text" class="form-control" />
          </div>
          <div class="mt-6">
            <button type="submit" class="btn btn-primary py-2 fw-bold w-100">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row mt-10">
      <div class="col col-md-6 col-md-8 col-xl-6 mx-auto text-center">
        <button @click="registerWithGoogle" class="btn btn-danger btn-sm">
          <fa icon="fab fa-google" /> Sign up with google
        </button>
      </div>
    </div>
    <div class="row mt-10">
      <div class="col col-md-9 col-md-11 col-xl-9 mx-auto text-center">
        <div class="status d-flex justify-content-around border-top pt-4 text-gray-400">
          <div class="state">
            <p><fa icon="fa-user" /> 47 users online</p>
          </div>
          <div class="state">
            <p><fa icon="fa-users" /> 497 users registered</p>
          </div>
          <div class="state">
            <p><fa icon="fa-comments" /> 49 threads</p>
          </div>
          <div class="state">
            <p><fa icon="fa-comment" /> 763 posts</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
