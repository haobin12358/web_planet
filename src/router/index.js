import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('src/views/redirect/index')
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
  //     }
  //   ]
  // },

  {
    path: '',
    component: Layout,
    redirect: 'profile',
    children: [
      {
        path: 'profile',
        name: 'ProfileIndex',
        component: () => import('src/views/profile/index'),
        meta: { title: '概况', icon: 'gailan' ,noCache: true}
      }
    ]
  },

  {
    path: '/product',
    component: Layout,
    redirect: '/product/index',
    name: 'Product',  //  有二级菜单的时候加下,面包屑就会显示 概览/一级菜单/二级
    meta: { title: '商品', icon: 'shangpin' },
    children: [
      {
        path: 'index',
        name: 'ProductIndex',
        component: () => import('src/views/product/index'),
        meta: { title: '所有商品',noCache: true }
      }, {
        path: 'productEdit',
        name: 'ProductEdit',
        hidden: true,
        component: () => import('src/views/product/productEdit'),
        meta: { title: '商品编辑', noCache: true}
      },

      {
        path: 'productCategory',
        name: 'ProductCategory',
        component: () => import('src/views/product/productCategory'),
        meta: { title: '商品分类',noCache: true  }
      }, {
        path: 'productBrand',
        name: 'ProductBrand',
        component: () => import('src/views/product/productBrand'),
        meta: { title: '商品品牌',noCache: true  }
      }, {
        path: 'productTag',
        name: 'ProductTag',
        component: () => import('src/views/product/productTag'),
        meta: { title: '场景和标签' ,noCache: true }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: 'order',
    children: [
      {
        path: 'order',
        name: 'OrderIndex',
        component: () => import('src/views/order/index'),
        meta: { title: '订单', icon: 'dingdan' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: { title: '用户', icon: 'huiyuan' },
    children: [
      {
        path: 'distributor',
        name: 'Distributor',
        component: () => import('src/views/user/distributor'),
        meta: { title: '分销商' }
      }, {
        path: 'suppliers',
        name: 'Suppliers',
        component: () => import('src/views/user/suppliers'),
        meta: { title: '供应商' }
      },
    ]
  },

  {
    path: '/tweet',
    component: Layout,
    redirect: 'tweet',
    children: [
      {
        path: 'tweet',
        name: 'TweetIndex',
        component: () => import('src/views/tweet/index'),
        meta: { title: '推文', icon: 'article' }
      }
    ]
  },

  {
    path: '/marketing',
    component: Layout,
    redirect: '/marketing/coupon',
    name: 'Marketing',
    meta: { title: '营销', icon: 'yingxiaoshezhi' },
    children: [
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('src/views/marketing/coupon'),
        meta: { title: '优惠券' }
      }, {
        path: 'attendance',
        name: 'Attendance',
        component: () => import('src/views/marketing/attendance'),
        meta: { title: '签到设置' }
      },
    ]
  },

  {
    path: '/commission',
    component: Layout,
    redirect: 'commission',
    children: [
      {
        path: 'commission',
        name: 'CommissionIndex',
        component: () => import('src/views/commission/index'),
        meta: { title: '佣金', icon: 'yongjin' }
      }
    ]
  },

  {
    path: '/approval',
    component: Layout,
    redirect: '/approval/withdraw',
    name: 'Approval',
    meta: { title: '审批', icon: 'shenpi' },
    children: [
      {
        path: 'withdrawAudit',
        name: 'WithdrawAudit',
        component: () => import('src/views/approval/withdrawAudit'),
        meta: { title: '提现审批' }
      },{
        path: 'returnProductAudit',
        name: 'ReturnProductAudit',
        component: () => import('src/views/approval/returnProductAudit'),
        meta: { title: '退货审批' }
      },{
        path: 'agentAudit',
        name: 'AgentAudit',
        component: () => import('src/views/approval/agentAudit'),
        meta: { title: '代理商审批' }
      },{
        path: 'productAudit',
        name: 'ProductAudit',
        component: () => import('src/views/approval/productAudit'),
        meta: { title: '供应商商品审批' }
      },{
        path: 'tweetAudit',
        name: 'TweetAudit',
        component: () => import('src/views/approval/tweetAudit'),
        meta: { title: '推文审核' }
      },
    ]
  },

  {
    path: '/service',
    component: Layout,
    redirect: 'service',
    children: [
      {
        path: 'service',
        name: 'serviceIndex',
        component: () => import('src/views/service/index'),
        meta: { title: '客服', icon: 'kefu' }
      }
    ]
  },

  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/index',
    name: 'Activity',
    meta: { title: '活动', icon: 'huodong' },
    children: [
      {
        path: 'index',
        name: 'ActivityIndex',
        component: () => import('src/views/activity/index'),
        meta: { title: '活动管理' }
      },{
        path: 'guess',
        name: 'Guess',
        component: () => import('src/views/activity/guess'),
        meta: { title: '每日竞猜' }
      },{
        path: 'magicGiftBox',
        name: 'MagicGiftBox',
        component: () => import('src/views/activity/magicGiftBox'),
        meta: { title: '魔术礼盒' }
      },{
        path: 'trialProduct',
        name: 'TrialProduct',
        component: () => import('src/views/activity/trialProduct'),
        meta: { title: '试用商品' }
      },{
        path: 'firstOrder',
        name: 'FirstOrder',
        component: () => import('src/views/activity/firstOrder'),
        meta: { title: '新人首单' }
      },
    ]
  },

  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/index',
    name: 'Setting',
    meta: { title: '配置', icon: 'shezhi' },
    children: [
      {
        path: 'index',
        name: 'ActivityIndex',
        component: () => import('src/views/setting/index'),
        meta: { title: '激活码' }
      },{
        path: 'manager',
        name: 'Manager',
        component: () => import('src/views/setting/manager'),
        meta: { title: '管理员' }
      },{
        path: 'approvalSetting',
        name: 'ApprovalSetting',
        component: () => import('src/views/setting/approvalSetting'),
        meta: { title: '审批流' }
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'gift' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'gift' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
