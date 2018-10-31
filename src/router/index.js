import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/index';

Vue.use(Router)


export const constantRouterMap = [
  { path: '/login', component: () => import('../views/login/login'), hidden: true },
  {path: '/register', component: () => import('../views/login/register'),hidden: true  },
  {path: '/forget', component: () => import('../views/login/forget'),hidden: true  },
  { path: '/first', component: () => import('../views/login/first'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: 'material',
    children: [{ path: '/material', component: () => import('../views/store/material/index'), hidden: true }
    ],
  },
  {
    path: '/member',
    component: Layout,
    redirect: 'member',
    children: [{ path: '/member', component: () => import('../views/store/member/index'), hidden: true }
    ],
  },
  {
    path: '/storekeeper',
    component: Layout,
    redirect: 'storekeeper',
    children: [{ path: '/storekeeper', component: () => import('../views/store/storekeeper/index'), hidden: true }
    ],
  },
  {
    path: '/selected',
    component: Layout,
    redirect: 'selected',
    children: [{ path: '/selected', component: () => import('../views/buyer/selected/index'), hidden: true }
    ],
  },
  { path: '/scene', component: () => import('../views/buyer/selected/scene'), hidden: true },
  {
    path: '/circle',
    component: Layout,
    redirect: 'circle',
    children: [{ path: '/circle', component: () => import('../views/buyer/circle/index'), hidden: true }
    ],
  },
  { path: '/circle/detail', component: () => import('../views/buyer/circle/detail'), hidden: true },
  {
    path: '/equipment',
    component: Layout,
    redirect: 'equipment',
    children: [{ path: '/equipment', component: () => import('../views/buyer/equipment/index'), hidden: true }
    ],
  },
  { path: '/equipment/detail', component: () => import('../views/buyer/equipment/detail'), hidden: true },
  { path: '/product', component: () => import('../views/buyer/equipment/product'), hidden: true },
  { path: '/product/detail', component: () => import('../views/buyer/equipment/productDetail'), hidden: true },
  { path: '/evaluate', component: () => import('../views/buyer/equipment/evaluate'), hidden: true },
  {
    path: '/shop',
    component: Layout,
    redirect: 'shop',
    children: [{ path: '/shop', component: () => import('../views/buyer/shop/index'), hidden: true }
    ],
  },
  {
    path: '/personal',
    component: Layout,
    redirect: 'personal',
    children: [{ path: '/personal', component: () => import('../views/buyer/personal/index'), hidden: true }
    ],
  },

];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
