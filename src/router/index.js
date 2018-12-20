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
  {
    path: '/login',
    component: () => import('src/views/login/index'),
    hidden: true},
  {path: '/404', component: () => import('src/views/errorPage/404'), hidden: true},
  {path: '/401', component: () => import('src/views/errorPage/401'), hidden: true},

  {
    path: '',
    component: Layout,
    redirect: 'profile',
    children: [
      {
        path: 'profile',
        name: 'ProfileIndex',
        component: () => import('src/views/profile/index'),
        meta: {title: '概况', icon: 'gailan', noCache: true}
      }
    ]
  },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

//  这些router会被权限过滤,不设置meta.roles的话也是看的到的
//  supplizer,admin,super

//  快捷数组
export const level1 = ['supplizer', 'admin', 'super']; //  三角色都可见
export const level2 = ['admin', 'super'];  //  管理员可见
export const level3 = ['super']; //  超管可见
export const asyncRouterMap = [
  {
    path: '/product',
    component: Layout,
    alwaysShow: true, //  当配置供应商只能看到所有商品时,所有商品会升级显示为1级菜单,加上这个还是能显示为二级
    redirect: '/product/index',
    name: 'Product',  //  有二级菜单的时候加下,面包屑就会显示 概览/一级菜单/二级
    meta: {title: '商品', icon: 'shangpin', roles: level1},
    children: [
      {
        path: 'index',
        name: 'ProductIndex',
        component: () => import('src/views/product/index'),
        meta: {title: '所有商品', noCache: false, roles: level1}
      }, {
        path: 'productEdit',
        name: 'ProductEdit',
        hidden: true,
        component: () => import('src/views/product/productEdit'),
        meta: {title: '商品编辑', noCache: false, roles: level1}
      },

      {
        path: 'productCategory',
        name: 'ProductCategory',
        component: () => import('src/views/product/productCategory'),
        meta: {title: '商品分类', noCache: true, roles: level2}
      },
      {
        path: 'productTag',
        name: 'ProductTag',
        component: () => import('src/views/product/productTag'),
        meta: {title: '场景和商品标签', noCache: true, roles: level2}
      },

       {
        path: 'productBrand',
        name: 'ProductBrand',
        component: () => import('src/views/product/productBrand'),
        meta: {title: '品牌和标签', noCache: true, roles: level2}
      },
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: 'order',
    meta: {title: '订单', icon: 'dingdan', roles: level2},
    children: [
      {
        path: 'order',
        name: 'OrderIndex',
        component: () => import('src/views/order/index'),
        meta: {title: '订单',noCache: true, icon: 'dingdan', roles: level2}
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: {title: '用户', icon: 'huiyuan', roles: level2},
    children: [
      {
        path: 'distributor',
        name: 'Distributor',
        component: () => import('src/views/user/distributor'),
        meta: {title: '分销商', noCache: true,roles: level2}
      }, {
        path: 'suppliers',
        name: 'Suppliers',
        component: () => import('src/views/user/suppliers'),
        meta: {title: '供应商',noCache: true, roles: level2}
      },
    ]
  },

  {
    path: '/circle',
    component: Layout,
    redirect: 'circle',
    meta: {title: '圈子', icon: 'article', roles: level2},
    children: [
      {
        path: 'circle',
        name: 'CircleIndex',
        component: () => import('src/views/circle/index'),
        meta: {title: '圈子', noCache: true, icon: 'article', roles: level2}
      },
      {
        path: 'editCircle',
        name: 'EditCircle',
        hidden: true,
        component: () => import('src/views/circle/editCircle'),
        meta: {title: '新增圈子', noCache: true, roles: level2 }
      }
    ]
  },

  {
    path: '/marketing',
    component: Layout,
    redirect: '/marketing/coupon',
    name: 'Marketing',
    meta: {title: '营销', icon: 'yingxiaoshezhi', roles: level2},
    children: [
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('src/views/marketing/coupon'),
        meta: {title: '优惠券', noCache: true,roles: level2}
      }, {
        path: 'attendance',
        name: 'Attendance',
        component: () => import('src/views/marketing/attendance'),
        meta: {title: '签到设置', noCache: true,roles: level2}
      },
    ]
  },

  {
    path: '/commission',
    component: Layout,
    redirect: 'commission',
    meta: {title: '佣金', icon: 'yongjin', roles: level2},
    children: [
      {
        path: 'commission',
        name: 'CommissionIndex',
        component: () => import('src/views/commission/index'),
        meta: {title: '佣金', noCache: true,icon: 'yongjin', roles: level2}
      }
    ]
  },

  {
    path: '/approval',
    component: Layout,
    redirect: '/approval/withdraw',
    name: 'Approval',
    meta: {title: '审批', icon: 'shenpi', roles: level2},
    children: [
      {
        path: 'withdrawAudit',
        name: 'WithdrawAudit',
        component: () => import('src/views/approval/withdrawAudit'),
        meta: {title: '提现审批',noCache: true, roles: level2}
      }, {
        path: 'returnProductAudit',
        name: 'ReturnProductAudit',
        component: () => import('src/views/approval/returnProductAudit'),
        meta: {title: '退货审批', noCache: true,roles: level2}
      }, {
        path: 'agentAudit',
        name: 'AgentAudit',
        component: () => import('src/views/approval/agentAudit'),
        meta: {title: '代理商审批',noCache: true, roles: level2}
      }, {
        path: 'productAudit',
        name: 'ProductAudit',
        component: () => import('src/views/approval/productAudit'),
        meta: {title: '供应商商品审批',noCache: true, roles: level2}
      }, {
        path: 'circleAudit',
        name: 'CircleAudit',
        component: () => import('src/views/approval/circleAudit'),
        meta: {title: '圈子审核',noCache: true, roles: level2}
      },
    ]
  },

  {
    path: '/service',
    component: Layout,
    redirect: 'service',
    meta: {title: '客服', icon: 'kefu', roles: level2},
    children: [
      {
        path: 'service',
        name: 'serviceIndex',
        component: () => import('src/views/service/index'),
        meta: {title: '客服', noCache: true,icon: 'kefu', roles: level2}
      }
    ]
  },

  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/index',
    name: 'Activity',
    meta: {title: '活动', icon: 'huodong', roles: level2},
    children: [
      {
        path: 'index',
        name: 'ActivityIndex',
        component: () => import('src/views/activity/index'),
        meta: {title: '活动管理',noCache: true, roles: level2}
      }, {
        path: 'guess',
        name: 'Guess',
        component: () => import('src/views/activity/guess'),
        meta: {title: '每日竞猜',noCache: true, roles: level2}
      }, {
        path: 'magicGiftBox',
        name: 'MagicGiftBox',
        component: () => import('src/views/activity/magicGiftBox'),
        meta: {title: '魔术礼盒',noCache: true, roles: level2}
      }, {
        path: 'trialProduct',
        name: 'TrialProduct',
        component: () => import('src/views/activity/trialProduct'),
        meta: {title: '试用商品',noCache: true, roles: level2}
      }, {
        path: 'firstOrder',
        name: 'FirstOrder',
        component: () => import('src/views/activity/firstOrder'),
        meta: {title: '新人首单',noCache: true, roles: level2}
      },
    ]
  },

  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/index',
    name: 'Setting',
    meta: {title: '配置', icon: 'shezhi', roles: level2}, //  todo 估计要改成超管可见
    children: [
      {
        path: 'index',
        name: 'SettingIndex',
        component: () => import('src/views/setting/index'),
        meta: {title: '激活码',noCache: true, roles: level2}
      }, {
        path: 'manager',
        name: 'Manager',
        component: () => import('src/views/setting/manager'),
        meta: {title: '管理员',noCache: true, roles: level2}
      }, {
        path: 'approvalSetting',
        name: 'ApprovalSetting',
        component: () => import('src/views/setting/approvalSetting'),
        meta: {title: '审批流',noCache: true, roles: level2}
      }
    ]
  },

  {path: '*', redirect: '/404', hidden: true},
]
