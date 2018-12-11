// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import 'lib-flexible'
Vue.config.productionTip = false

//mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'
import VueClipboard from 'vue-clipboard2'

import router from './router'
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

/*点击事件延迟问题*/
import fastClick from 'fastclick'
fastClick.attach(document.body)
//视频播放
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)

//处理移动端click事件300毫秒延迟。
import FastClick from 'fastclick'
FastClick.attach(document.body);

import promise from 'es6-promise';//解决axios在ie9下不生效的方法
promise.polyfill();

// 引入moment用来格式化时间
import moment from "moment";
Vue.prototype.$moment = moment;

// 引入animate.css
import animate from 'animate.css'

Vue.prototype.$http = axios;
//拦截器、
// import { Loading, Message, MessageBox  } from 'element-ui'
import { Indicator,Toast} from 'mint-ui';
// 超时时间
axios.defaults.timeout = 60000;


//http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  // loadinginstace = Loading.service({ fullscreen: true });
  // console.log(loadinginstace)
  Indicator.open({ text: '加载中...', spinnerType: 'fading-circle' });
  return config
}, error => {
  // Message({
  //   message:'加载超时',
  //   type:'warning'
  // });
  // loadinginstace.close()
  Indicator.close();
  return Promise.reject(error)
})
// http响应拦截器
import api from './api/api'
import common from './common/js/common';
axios.interceptors.response.use(data => {// 响应成功关闭loading
  // loadinginstace.close()

  // 返回状态码不是200时统一报错
  if(data.data.status != 200) {
    // token有问题
    if(data.data.status_code == 405007 || data.data.message == '用户不存在') {
      if(localStorage.getItem('toLogin')) {
        Toast(data.data.message);
      }else {
        // 避免code影响
        // router.push('/login');
        window.location.href = window.location.origin + '/#/login';
        localStorage.setItem('toLogin', 'toLogin');
        // 倒计时60秒*10
        const TIME_COUNT = 60*10;
        let count = TIME_COUNT;
        let time = setInterval(() => {
          if (count > 0 && count <= TIME_COUNT) {
            count --;
          } else {
            localStorage.setItem('toLogin', '');
            clearInterval(time);
          }
        }, 1000);
      }
    }
    // 用户不存在
    else if(data.data.status_code == 405004) {
      // console.log(window.location.href);
      // console.log(window.location.origin);
      // window.location.href = window.location.origin + '/#/login';
      // let href = window.location.href.split('#/')[1];
      Toast(data.data.message);
    }else {
      Toast(data.data.message);
    }
  }

  Indicator.close();
  return data
}, error => {
  // Message({
  //   message:'请求失败',
  //   type:'warning'
  // });
  // loadinginstace.close()
  Indicator.close();
  return Promise.reject(error)
});
import store from './vuex';

//引入微信
import 'weixin-js-sdk';

//过滤器
Vue.filter('money', function(val) {
  val = val.toString().replace(/\$|\,/g,'');
  if(isNaN(val)) {
    val = "0";
  }
  let sign = (val == (val = Math.abs(val)));
  val = Math.floor(val*100+0.50000000001);
  let cents = val%100;
  val = Math.floor(val/100).toString();
  if(cents<10) {
    cents = "0" + cents
  }
  for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
    val = val.substring(0,val.length-(4*i+3))+',' + val.substring(val.length-(4*i+3));
  }

  return (((sign)?'':'-') + val + '.' + cents);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
