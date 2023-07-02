import { createRouter, createWebHistory } from 'vue-router';
import { Route } from '@/types/enums/routeEnums';
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
const routes = [
  {
    path: '/dashboard',
    name: Route.Dashboard,
    component: Dashboard
  },
  {
    path: '/login',
    name: Route.Login,
    component: Login
  },
  {
    path: '/register',
    name: Route.Register,
    component: Register
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
