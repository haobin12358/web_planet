import Vue from 'vue';
import Vuex from 'vuex';
import side from '../common/json/side';


Vue.use(Vuex);

let store= new Vuex.Store({
	state: {
    menu: [
      {
        title:"概况",
        path:"/profile",
        iconPath: '/src/common/images/icon-profile-side.png'
      },
      {
        title:"商品",
        path:"/product",
        iconPath: '/src/common/images/icon-product-side.png'
      },
      {
        title:"会员",
        path:"/member",
        iconPath: '/src/common/images/icon-member-side.png',
        children: [
          {
            title: '分销商经销',
            path: 'distributor'
          },
          {
            title: '供应商经销',
            path: 'supplier'
          }
        ]
      },
      {
        title:"图文",
        path:"/imageText",
        iconPath: '/src/common/images/icon-imageText-side.png',
        children: [
          {
            title: '推文编辑',
            path: 'tweet'
          },
          {
            title: '活动专题',
            path: 'activity'
          }
        ]
      },
      {
        title:"订单",
        path:"/order",
        iconPath: '/src/common/images/icon-order-side.png'
      },
      {
        title:"营销",
        path:"/marketing",
        iconPath: '/src/common/images/icon-marketing-side.png'
      },
      {
        title:"佣金",
        path:"/commission",
        iconPath: '/src/common/images/icon-commission-side.png'
      },
      {
        title:"审批",
        path:"/approve",
        iconPath: '/src/common/images/icon-approve-side.png'
      },
      {
        title:"客服",
        path:"/service",
        iconPath: '/src/common/images/icon-service-side.png'
      },
      {
        title: '活动',
        path: '/activity',
        iconPath: '../src/common/images/side/icon-activity-side.png',
        children: [
          {
            title: '每日竞猜',
            path: 'guess',
          },{
            title: '魔术礼盒',
            path: 'magicGiftBox',
          },{
            title: '试用商品',
            path: 'trialProduct',
          },{
            title: '新人首单',
            path: 'firstOrder',
          },
        ]
      },
      {
        title:"配置",
        path:"/set",
        iconPath: '/src/common/images/icon-set-side.png'
      }

    ],
	},
	mutations: {

	}
})


export default store
