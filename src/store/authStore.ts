import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import router from '@/router';
import { Route } from '@/types/enums/routeEnums';
import { StoreName } from '@/types/enums/storeEnums';
import { User, AuthParams } from '@/types/models/authModels';
export const useAuthStore = defineStore(
  StoreName.Auth,
  () => {
    const currentUser = reactive<User>({ accessToken: null, email: null });
    const auth = getAuth();

    const register = async ({ email, password }: AuthParams) => {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response) {
        console.log('response', response);
      } else {
        throw new Error('Unable to register user');
      }
    };

    const logIn = async ({ email, password }: AuthParams) => {
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        currentUser.email = user.email;
      } catch (error) {
        throw new Error('Failed to login');
      }
    };

    const logout = () => {
      currentUser.accessToken = null;
      currentUser.email = null;
      router.push({ name: Route.Login });
    };

    return { currentUser, register, logIn, logout };
  },
  {
    persist: true
  }
);
