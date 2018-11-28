import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  { path: '/', component: () => import('../views/profile/index'),   redirect: 'profile', hidden: true },
  { path: '/login', component: () => import('../views/login/index'), hidden: true },
  { path: '/forgetPwd', component: () => import('../views/login/forgetPwd'), hidden: true },
  { path: '/error', component: () => import('../views/error/error'), hidden: true },
  {
    path: '/admin',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/admin/index'),
      name: 'admin',
      meta: { title: 'admin', icon: 'admin', noCache: true }
    }
    ],
  },
  {
    path: '/approveManage',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/admin/approveManage'),
      name: 'approveManage',
      meta: { title: 'approveManage', icon: 'approveManage', noCache: true }
    }
    ],
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/profile/index'),
      name: 'profile',
      meta: { title: 'profile', icon: 'profile', noCache: true }
    }
    ],
  },
  {
    path: '/product',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/product/index'),
      name: 'product',
      meta: { title: 'product', icon: 'product', noCache: true }
    },
      {
        path: 'addProductOne',
        component: () => import('../views/product/addProductOne'),
        name: 'addProductOne',
        meta: { title: 'addProductOne', icon: 'addProductOne', noCache: true }
      },
      {
        path: 'addProductTwo',
        component: () => import('../views/product/addProductTwo'),
        name: 'addProductTwo',
        meta: { title: 'addProductTwo', icon: 'addProductTwo', noCache: true }
      },
      {
        path: 'addProductThree',
        component: () => import('../views/product/addProductThree'),
        name: 'addProductThree',
        meta: { title: 'addProductThree', icon: 'addProductThree', noCache: true }
      }
    ],
  },
  {
    path: '/member',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/member/index'),
      name: 'member',
      meta: { title: 'member', icon: 'member', noCache: true }
    }
    ],
  },
  {
    path: '/imageText',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/imageText/index'),
      name: 'imageText',
      meta: { title: 'imageText', icon: 'imageText', noCache: true }
    },
      {
        path: 'addTweet',
        component: () => import('../views/imageText/addTweet'),
        name: 'addTweet',
        meta: { title: 'addTweet', icon: 'addTweet', noCache: true }
      },
      {
        path: 'addActivity',
        component: () => import('../views/imageText/addActivity'),
        name: 'addActivity',
        meta: { title: 'addActivity', icon: 'addActivity', noCache: true }
      }
    ],
  },
  {
    path: '/transaction',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/transaction/index'),
      name: 'transaction',
      meta: { title: 'transaction', icon: 'transaction', noCache: true }
    }
    ],
  },
  {
    path: '/order',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/order/index'),
      name: 'order',
      meta: { title: 'order', icon: 'order', noCache: true }
    },
      {
        path: 'orderDetail',
        component: () => import('../views/order/orderDetail'),
        name: 'orderDetail',
        meta: { title: 'orderDetail', icon: 'orderDetail', noCache: true }
      }
    ],
  },
  {
    path: '/marketing',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/marketing/index'),
      name: 'marketing',
      meta: { title: 'marketing', icon: 'marketing', noCache: true }
    }
    ],
  },
  {
    path: '/commission',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/commission/index'),
      name: 'commission',
      meta: { title: 'commission', icon: 'commission', noCache: true }
    }
    ],
  },
  {
    path: '/approve',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/approve/index'),
      name: 'approve',
      meta: { title: 'approve', icon: 'approve', noCache: true }
    }
    ],
  },
  {
    path: '/service',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/service/index'),
      name: 'service',
      meta: { title: 'service', icon: 'service', noCache: true }
    }
    ],
  },
  {
    path: '/procurement',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/procurement/index'),
      name: 'procurement',
      meta: { title: 'procurement', icon: 'procurement', noCache: true }
    }
    ],
  },
  {
    path: '/stock',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/stock/index'),
      name: 'stock',
      meta: { title: 'stock', icon: 'stock', noCache: true }
    }
    ],
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/activity/index'),
      name: 'activity',
      meta: { title: 'activity', icon: 'activity', noCache: true }
    }
    ],
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

