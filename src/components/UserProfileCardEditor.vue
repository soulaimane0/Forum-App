<script setup>
import { reactive, ref, computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { handleImgError } from '@/helpers';

const props = defineProps(['user', 'postsCount', 'threadsCount']);
const emits = defineEmits(['update-user-profile']);
const router = useRouter();

const activeUser = reactive({ ...props.user });
let uploadingImg = ref(false);
let userPreviewImg = ref(activeUser?.avatar);

const changeRandomAvatar = (event) => {
  const randomAvatarUL = event;
  activeUser.avatar = randomAvatarUL;
  const reader = new FileReader();
  reader.onload = () => {
    userPreviewImg.value = reader.result;
  };
  reader.readAsDataURL(activeUser.avatar);
  console.log(activeUser);
};

const handleImageUpload = (e) => {
  uploadingImg.value = true;
  activeUser.avatar = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    uploadingImg.value = false;
    userPreviewImg.value = reader.result;
  };
  reader.readAsDataURL(activeUser.avatar);
  console.log(activeUser);
};

const save = () => {
  if (activeUser.email && activeUser.name && activeUser.email) {
    console.log('acc ', activeUser);
    emits('update-user-profile', { ...activeUser });
    router.push({ name: 'profile' });
  } else {
    alert('Please fill in all the required fields !!');
  }
};
const cancel = () => {
  router.push({ name: 'profile' });
};
</script>

<template>
  <div class="card border-0 shadow-sm" v-if="activeUser">
    <div class="card-header text-center border-0 bg-white">
      <label for="avatar" class="position-relative">
        <img
          @error="handleImgError"
          :src="userPreviewImg || '/src/assets/images/user-img-upload.png'"
          :alt="`${user?.name} profile picture`"
          class="rounded-circle"
          style="cursor: pointer"
          width="120"
          height="120"
        />
        <div v-if="uploadingImg" class="uploading-spinner position-absolute">
          <BaseSpinner color="#fff" />
        </div>
      </label>
      <input
        type="file"
        id="avatar"
        accept="image/*"
        @change="handleImageUpload"
        hidden
      />
      <UserProfileCardEditorRandomAvatar @hit="changeRandomAvatar" />
    </div>
    <div class="card-body pb-0">
      <label for="username">Username*</label>
      <input
        id="username"
        type="text"
        class="form-control mb-2"
        placeholder="Username"
        v-model="activeUser.username"
      />

      <label for="name">Name*</label>
      <input
        id="name"
        type="text"
        class="form-control mb-2"
        placeholder="Name"
        v-model="activeUser.name"
      />
      <label for="bio">Bio</label>
      <textarea
        id="bio"
        rows="4"
        class="form-control"
        placeholder="Bio..."
        v-model="activeUser.bio"
      ></textarea>
      <div class="d-flex justify-content-around mt-4">
        <h4>{{ postsCount }} Posts</h4>
        <h4>{{ threadsCount }} Threads</h4>
      </div>

      <hr class="w-75 mx-auto" />
    </div>
    <div class="card-footer px-2 border-0 bg-white">
      <label for="email">Email*</label>
      <input
        id="email"
        type="email"
        class="form-control mb-2"
        placeholder="Email"
        v-model="activeUser.email"
      />
      <label for="website">Website</label>
      <input
        id="website"
        type="text"
        class="form-control mb-2"
        placeholder="website"
        v-model="activeUser.website"
      />

      <label for="location">Location</label>
      <input
        id="location"
        type="text"
        class="form-control mb-2"
        placeholder="Your location..."
        v-model="activeUser.location"
      />

      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
        <button class="btn btn-secondary" @click.prevent="cancel">Cancel</button>
        <button class="btn btn-primary" @click="save">Save</button>
      </div>
    </div>
  </div>
  <div v-else>
    <base-spinner />
  </div>
</template>

<style scoped>
.uploading-spinner {
  top: 45px;
  left: 40px;
}
.sk-circle {
  margin: 0 !important;
}
</style>
