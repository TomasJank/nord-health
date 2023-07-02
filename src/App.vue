<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store';
import { Route } from '@/types/enums/routeEnums';

const authStore = useAuthStore();
const router = useRouter();

const startApplication = () => {
  if (!authStore.currentUser.email) {
    router.push({ name: Route.Login });

    return;
  } else {
    router.push({ name: Route.Dashboard });
  }
};

startApplication();
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade-fast" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
@/data/constants
