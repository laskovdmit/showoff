import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import PromoPage from '@/views/PromoPage.vue';
import LoginPage from '@/views/Auth/LoginPage.vue';
import RecoveryPage from '@/views/Auth/RecoveryPage.vue';
import RegisterPage from '@/views/Auth/RegisterPage.vue';
import store from '@/store/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Promo',
    component: PromoPage,
    meta: {
      layout: 'Promo',
      auth: false,
    },
  },
  {
    path: '/lk',
    name: 'Home',
    component: HomePage,
    meta: {
      layout: 'Main',
      auth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      layout: 'Auth',
      title: 'Авторизация',
      auth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: {
      layout: 'Auth',
      title: 'Регистрация',
      auth: false,
    },
  },
  {
    path: '/recovery',
    name: 'Recovery',
    component: RecoveryPage,
    meta: {
      layout: 'Auth',
      title: 'Восстановление пароля',
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes,
});

const authRoutes: string[] = ['Login', 'Register', 'Recovery'];

router.beforeEach((to, from, next) => {
  const requiredAuth = to.meta.auth;
  const routeToName: string = to.name ? to.name.toString() : '';

  console.log(requiredAuth, routeToName);

  if (requiredAuth && store.getters['auth/isAuthenticated']) {
    next();
  } else if (requiredAuth && !store.getters['auth/isAuthenticated']) {
    next('/login?message=forbid');
  } else if (store.getters['auth/isAuthenticated'] && authRoutes.includes(routeToName)) {
    next('/lk');
  } else {
    next();
  }
});

export default router;
