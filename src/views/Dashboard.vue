<script setup lang="ts">
import { getAuth } from 'firebase/auth';
import { useAuthStore } from '@/store';

const authStore = useAuthStore();

getAuth().onAuthStateChanged((user) => {
  if (!user) {
    authStore.logout();
  }
});
</script>

<template>
  <div>
    <nord-header>
      <h1 class="n-typescale-l">Dashboard</h1>
      <nord-button slot="end" variant="primary" @click="authStore.logout">
        <nord-icon name="interface-logout" />
        Log out
      </nord-button>
    </nord-header>
    <div class="dashboard">
      <nord-stack class="welcome-stack" direction="horizontal" gap="l">
        <nord-card class="welcome-card" padding="l">
          <h2 slot="header">Welcome {{ authStore.currentUser.email }}</h2>
          <nord-stack direction="horizontal">
            <nord-stack gap="l">
              <p>Welcome to nord health dashboard</p>
            </nord-stack>
          </nord-stack>
        </nord-card>
      </nord-stack>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.welcome-stack {
  text-align: center;
  width: 500px;
}
</style>
