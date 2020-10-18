import Vue from 'vue';
import Router from 'vue-router';
import Home from './src/views/Home.vue';
import Login from './src/views/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: { name: 'home' }
    }    
  ],
});

export default router;
