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
const commonLayout = r => require.ensure([], () => r(require('../views/common/commonLayout')), 'commonLayout');

export const constantRouterMap = [
  { path: '/', component: () => import('../views/login/index'),   redirect: 'login', hidden: true },
  { path: '/login', component: () => import('../views/login/index'), hidden: true },
  { path: '/forgetPwd', component: () => import('../views/login/forgetPwd'), hidden: true },
  { path: '/error', component: () => import('../views/error/error'), hidden: true },
  {
    path: '/admin',
    component: commonLayout,
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
    component: commonLayout,
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
    component: commonLayout,
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
    component: commonLayout,
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
    component: commonLayout,
    redirect: '/member/distributor',
    children: [{
      path: 'distributor',
      component: () => import('../views/member/distributor'),
      name: 'distributor',
      meta: { title: 'distributor', icon: 'distributor', noCache: true },
    },
      {
        path: 'supplier',
        component: () => import('../views/member/supplier'),
        name: 'supplier',
        meta: { title: 'supplier', icon: 'supplier', noCache: true },
      },
      {
        path: 'addSupplier',
        component: () => import('../views/member/addSupplier'),
        name: 'addSupplier',
        meta: { title: 'addSupplier', icon: 'addSupplier', noCache: true }
      }

    ],
  },
  {
    path: '/imageText',
    component: commonLayout,
    redirect: '/imageText/tweet',
    children: [{
      path: 'tweet',
      component: () => import('../views/imageText/tweet'),
      name: 'tweet',
      meta: { title: 'tweet', icon: 'tweet', noCache: true }
    },
      {
        path: 'activity',
        component: () => import('../views/imageText/activity'),
        name: 'activity',
        meta: { title: 'activity', icon: 'activity', noCache: true }
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
    component: commonLayout,
    redirect: 'transaction/index',
    children: [
      {
        path: 'index',
        component: () => import('src/views/transaction/index'),
        meta: {},
      }
    ],
  },
  {
    path: '/order',
    component: commonLayout,
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
    component: commonLayout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/marketing/index'),
      name: 'marketing',
      meta: {title: 'marketing', icon: 'marketing', noCache: true}
    }, {
      path: 'couponEdit',
      component: () => import('../views/marketing/couponEdit'),
      name: 'couponEdit',
      meta: {noCache: true}
    },],
  },
  {
    path: '/commission',
    component: commonLayout,
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
    component: commonLayout,
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
    component: commonLayout,
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
    component: commonLayout,
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
    path: '/activity',
    component: commonLayout,
    redirect: '/activity/guess',
    children: [
      {
        path: 'guess',
        component: () => import('src/views/activity/guess'),
        meta: {}
      }, {
        path: 'magicGiftBox',
        component: () => import('src/views/activity/magicGiftBox'),
        meta: {}
      },{
        path: 'trialProduct',
        component: () => import('src/views/activity/trialProduct'),
        meta: {}
      },{
        path: 'trialProductEdit',
        component: () => import('src/views/activity/trialProductEdit'),
        meta: {}
      },{
        path: 'firstOrder',
        component: () => import('src/views/activity/firstOrder'),
        meta: {}
      },
    ],
  },
  {
    path: '/set',
    component: commonLayout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/set/index'),
      name: 'set',
      meta: { title: 'set', icon: 'set', noCache: true }
    }
    ],
  },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

