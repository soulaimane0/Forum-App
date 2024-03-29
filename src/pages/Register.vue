<script setup>
import { reactive, ref } from 'vue';
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

let avatarPreview = ref(null);
const handleImageUpload = (e) => {
  form.avatar = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    avatarPreview.value = event.target.result;
  };
  reader.readAsDataURL(form.avatar);
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div
        class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto bg-white rounded px-6 py-8 shadow"
      >
        <h1 class="text-center fw-bold mb-6">Register</h1>
        <VeeForm @submit="registerUser">
          <div
            class="avatar-container text-center mx-auto"
            style="height: 125px; width: 130px"
          >
            <label for="avatar" class="h-100 w-100">
              <img
                :src="avatarPreview || '/src/assets/images/user-img-upload.png'"
                alt="User avatar"
                :class="avatarPreview ? 'rounded-circle w-100 h-100' : ''"
                style="cursor: pointer"
              />
            </label>
            <VeeField
              name="avatar"
              type="file"
              id="avatar"
              accept="image/*"
              @change="handleImageUpload"
              hidden
            />
            <VeeErrorMessage class="text-danger" name="avatar" />
          </div>
          <div class="mb-3">
            <label class="form-label">Full Name</label>
            <VeeField
              name="name"
              id="name"
              rules="required"
              required
              v-model="form.name"
              type="text"
              class="form-control"
            />
            <VeeErrorMessage class="text-danger" name="name" />
          </div>
          <div class="mb-3">
            <label class="form-label">Username</label>
            <VeeField
              name="username"
              id="username"
              rules="required|unique:users,username"
              v-model="form.username"
              type="text"
              class="form-control"
              required
            />
            <VeeErrorMessage class="text-danger" name="username" />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <VeeField
              name="email"
              id="email"
              v-model="form.email"
              type="email"
              class="form-control"
              rules="required|email|unique:users,email"
              required
            />
            <VeeErrorMessage class="text-danger" name="email" />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <VeeField
              name="password"
              label="Password"
              id="password"
              required
              v-model="form.password"
              type="password"
              class="form-control"
              rules="required|min:8"
            />
            <VeeErrorMessage class="text-danger" name="password" />
          </div>
          <div class="mt-6">
            <button type="submit" class="btn btn-primary py-2 fw-bold w-100">
              Register
            </button>
          </div>
        </VeeForm>
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
