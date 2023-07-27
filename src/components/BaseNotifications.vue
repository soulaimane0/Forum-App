<script setup>
import useNotifications from '@/composables/useNotifications.js';

const { notifications, removeNotification } = useNotifications();
console.log('Notif', notifications);

const remNotification = (id) => {
  removeNotification(id);
};
</script>

<template>
  <main>
    <transition-group name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>{{ notification.message }}</strong>
        <button
          type="button"
          @click="remNotification(notification.id)"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </transition-group>
  </main>
</template>

<style scoped>
main {
  position: fixed;
  bottom: 0;
  right: 1rem;
}
.alert {
  font-size: 0.9rem;
  width: 260px !important;
  margin-bottom: 0.5rem;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}
.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.8s ease;
}
</style>
