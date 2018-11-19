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

// 良泽的测试号
// let token = 'eyJhbGciOiJIUzI1NiIsImlhdCI6MTU0MjAxMzA1NiwiZXhwIjoxNTQyNjE3ODU2fQ.eyJpZCI6IjAwMTRiMjZlLWU2NTktMTFlOC04MDJlLWI4MmE3MmFiMjIxNCIsIm1vZGVsIjoiVXNlciIsImxldmVsIjoxfQ.mJFZ6DgEmJGuNyDxj9rSyItDPP4r12zB0njF5ys91uE';
// 只是没有如果
let token =  'eyJhbGciOiJIUzI1NiIsImlhdCI6MTU0MjYxODIyOCwiZXhwIjoxNTQzMjIzMDI4fQ.eyJpZCI6IjAwMTRiMjZlLWU2NTktMTFlOC04MDJlLWI4MmE3MmFiMjIxNCIsIm1vZGVsIjoiVXNlciIsImxldmVsIjoyfQ.u2XIVIAhEEbAAEiHM16PEDF95Ym3UsV8HnH9vLgBko8';
localStorage.setItem('token', token);


Vue.prototype.$http = axios;
//拦截器、
// import { Loading, Message, MessageBox  } from 'element-ui'
import { Indicator,Toast} from 'mint-ui';
// 超时时间
axios.defaults.timeout = 600000
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
axios.interceptors.response.use(data => {// 响应成功关闭loading
  // loadinginstace.close()

  if(data.data.status_code == 403001 ){
    axios.get(api.get_config,{
      params:{
        url: window.location.href
      }
    } ).then((res) => {
      if(res.data.status == 200){
        const id = res.data.data.appId
        const url = window.location.origin + '/#/index/index';
        // const  url = 'https://daaiti.cn/WeiDian/#/login';
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
          +  id + '&redirect_uri='+ encodeURIComponent(url) + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
      }

    }).catch((error) => {
      console.log(error ,'1111')
    })
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
})
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
