<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useField } from '@/composables';
import validators from '@/services/validationService';
import { useAuthStore } from '@/store';
import { Route } from '@/types/enums/routeEnums';

const authStore = useAuthStore();
const router = useRouter();

const isLoading = ref(false);
const backendErrorMessage = ref('');
const username = useField(validators.email);
const password = useField(validators.password);

const handleSubmit = async () => {
  backendErrorMessage.value = '';

  if (username.isValid && password.isValid) {
    try {
      isLoading.value = true;
      await authStore.logIn({ email: username.value, password: password.value });
      router.push({ name: Route.Dashboard });
    } catch (error: any) {
      backendErrorMessage.value = error.message;
    }
    isLoading.value = false;
  }

  if (!password.isValid) {
    password.error = password.validationMessage;
    password.focus();
  }

  if (!username.isValid) {
    username.error = username.validationMessage;
    username.focus();
  }
};
watch([() => password.value, () => username.value], () => {
  backendErrorMessage.value = '';
});
</script>

<template>
  <div class="login-page">
    <nord-stack class="content-wrapper">
      <nord-card class="mb-3" padding="l">
        <h2 slot="header" class="text-center">Sign in to Nord Health</h2>
        <form action="#" @submit.prevent="handleSubmit">
          <nord-stack>
            <nord-input
              :ref="username.setRef"
              label="Username"
              expand
              type="email"
              name="username"
              placeholder="user@example.com"
              :error="username.error"
              @input="username.value = $event.target.value"
            >
              <span v-if="backendErrorMessage" slot="error" />
            </nord-input>
            <div class="password">
              <nord-input
                :ref="password.setRef"
                label="Password"
                expand
                type="password"
                name="password"
                placeholder="••••••••"
                :error="password.error || backendErrorMessage"
                @input="password.value = $event.target.value"
              />
            </div>

            <nord-button :loading="isLoading" type="submit" expand variant="primary">Sign in</nord-button>
          </nord-stack>
        </form>
      </nord-card>

      <nord-card class="text-center">
        New to Nord?
        <router-link :to="Route.Register">Create an account</router-link>
      </nord-card>
    </nord-stack>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  height: 100vh;
  background-color: var(--primary);
}
.content-wrapper {
  width: 500px;
}
.password {
  position: relative;
}

.password a {
  text-decoration: none;
  font-size: var(--n-font-size-s);
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
}
</style>
