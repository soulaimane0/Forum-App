<script setup>
import { reactive } from 'vue';
import useUserStore from '@/stores/UserStore';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits(['ready']);
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const form = reactive({
  email: '',
  password: '',
});

emit('ready');

const successRedirect = () => {
  const path = route.query.redirectTo || { name: 'home' };
  router.push(path);
};

const signIn = async () => {
  try {
    await userStore.signInWithEmailAndPassword(form.email, form.password);
    for (const prop of Object.getOwnPropertyNames(form)) {
      form[prop] = '';
    }
    successRedirect();
  } catch (err) {
    alert(err.message);
  }
};
const signInWithGoogle = async () => {
  try {
    await userStore.signInWithGoogle();
    successRedirect();
  } catch (error) {
    alert(error.code);
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div
        class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto bg-white rounded px-6 py-8 shadow"
      >
        <h1 class="text-center fw-bold mb-4">Sign in</h1>
        <VeeForm @submit="signIn">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <VeeField
              name="email"
              rules="required|email"
              required
              v-model="form.email"
              type="email"
              class="form-control"
            />
            <VeeErrorMessage class="text-danger" name="email" />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <VeeField
              name="password"
              label="Password"
              rules="required|min:8"
              required
              v-model="form.password"
              type="password"
              class="form-control"
            />
            <VeeErrorMessage class="text-danger" name="password" />
          </div>
          <div class="mt-6">
            <button type="submit" class="btn btn-primary py-2 fw-bold w-100 mb-3">
              Log in
            </button>
          </div>
          <RouterLink
            class="text-success-500 text-decoration-none fw-semibold float-end"
            :to="{ name: 'register' }"
          >
            Create an account?
          </RouterLink>
        </VeeForm>
      </div>
    </div>
    <div class="row mt-10">
      <div class="col col-md-6 col-md-8 col-xl-6 mx-auto text-center">
        <button @click="signInWithGoogle" class="btn btn-danger btn-sm">
          <fa icon="fab fa-google" /> Sign in with google
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
