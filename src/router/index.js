import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/index';

Vue.use(Router)


export const constantRouterMap = [
  { path: '/login', component: () => import('../views/login/login'), hidden: true },
  {path: '/register', component: () => import('../views/login/register'),hidden: true  },
  {path: '/forget', component: () => import('../views/login/forget'),hidden: true  },
  {
    path: '/',
    component: Layout,
    redirect: 'login',
    children: [{ path: '/login', component: () => import('../views/login/login'), hidden: true }
    ],
  },

];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
