import Vue from 'vue';
import Vuex from 'vuex';
import side from '../common/json/side';


Vue.use(Vuex);

let store= new Vuex.Store({
	state: {
    menu: [
      {
        title: '交易',
        path: '/transaction',
        iconPath: '/src/common/images/icon-transaction-side.png',
      },
      {
        title: '活动',
        path: '/activity',
        iconPath: '/src/common/images/icon-activity-side.png',
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

    ],
	},
	mutations: {

	}
})


export default store
