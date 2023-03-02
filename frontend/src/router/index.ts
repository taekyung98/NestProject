import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Store from '../store/index';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/views/user/signUp.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login.vue'),
    meta: { noVerify: true },
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      userAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { matched } = to;
  if (matched.some(({ meta }) => meta.userAuth)) {
    if (!Store.getters.login) {
      return next();
    }
    console.log(12)
    const { result } = await Store.dispatch('verify');
    if (!result) {
      return next(`/login`);
    }
  }
  return next();
});

export default router
