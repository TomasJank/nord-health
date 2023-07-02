<script setup lang="ts">
import { ref, watch } from 'vue';
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
const repeatPassword = useField(validators.repeatPassword);

const handleSubmit = async () => {
  if (username.isValid && password.isValid && repeatPassword.isValid) {
    try {
      isLoading.value = true;
      await authStore.register({ email: username.value, password: password.value });
      router.push({ name: Route.Login });
    } catch (error: any) {
      backendErrorMessage.value = error.message;
    }
    isLoading.value = false;
  }

  if (!password.isValid) {
    password.error = password.validationMessage;
    password.focus();
  }

  if (!repeatPassword.isValid && password.isValid) {
    repeatPassword.error = repeatPassword.validationMessage;
    repeatPassword.focus();
  }

  if (!username.isValid) {
    username.error = username.validationMessage;
    username.focus();
  }
};

watch([() => password.value, () => username.value, () => repeatPassword.value], () => {
  backendErrorMessage.value = '';
});

watch(password, (value) => {
  repeatPassword.additionalValue = value.value;
});
</script>

<template>
  <div class="signup-page">
    <nord-stack class="content-wrapper">
      <nord-card class="mb-3" padding="l">
        <h2 slot="header" class="text-center">Create a Nord Health account</h2>
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
                :error="password.error"
                @input="password.value = $event.target.value"
              >
                <span v-if="backendErrorMessage" slot="error" />
              </nord-input>
            </div>

            <div class="repeat-password">
              <nord-input
                :ref="password.setRef"
                label="Repeat Password"
                expand
                type="password"
                name="repeat-password"
                placeholder="••••••••"
                :error="repeatPassword.error || backendErrorMessage"
                @input="repeatPassword.value = $event.target.value"
              />
            </div>

            <nord-button :loading="isLoading" type="submit" expand variant="primary">Sign up</nord-button>
          </nord-stack>
        </form>
      </nord-card>

      <nord-card class="text-center">
        Already a member?
        <router-link :to="Route.Login">Log in</router-link>
      </nord-card>
    </nord-stack>
  </div>
</template>

<style scoped>
.signup-page {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--primary);
}
.content-wrapper {
  width: 400px;
}
.password,
.repeat-password {
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
