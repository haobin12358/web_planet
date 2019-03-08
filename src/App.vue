<!--<template>
  <div id="app">
    &lt;!&ndash;<span class="m-return" @click.stop="returnClick">返回</span>&ndash;&gt;
    <router-view v-if="isRouterAlive"/>
  </div>
</template>-->

<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isRouterAlive && $route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="isRouterAlive && !$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import axios from 'axios';
  import api from '../src/api/api';

export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  created() {
    // this.$router.beforeEach((to, from, next) => {
    //   setTimeout(function () {
    //     window.location.href = window.location.href;
    //   }, 500);
    // });
    // 将邀请人的usid保存，等注册的时候使用
    if(!localStorage.getItem('token')) {
      if(location.href.indexOf('secret_usid') > 0) {
        localStorage.setItem('secret_usid', location.href.split('secret_usid=')[1])
        // localStorage.setItem('location',location.href);
        // location.href = location.origin +'/login';
      }
    }

    let url = location.href.split('&from')[0];
    if(!localStorage.getItem('url')) {
      if(url.indexOf('&secret_usid') > 0) {
        localStorage.setItem('url', url);
      }
    }else {
      if(localStorage.getItem('url').indexOf('&secret_usid') < 0) {
        localStorage.removeItem('url');
        if(url.indexOf('&secret_usid') > 0) {
          localStorage.setItem('url', url);
        }
      }
    }
    let params = {};
    if(location.href.indexOf('mbjid') > 0) {                    // 邀请好友帮拆魔盒
      localStorage.setItem('share', 'mbjid');
      location.href = location.origin;
      this.shareRecord(params);
    }else if(location.href.indexOf('fmfpid') > 0) {             // 新人首单
      localStorage.setItem('share', 'fmfpid');
      location.href = location.origin;
      this.shareRecord(params);
    }else if(location.href.indexOf('tcid') > 0) {               // 试用商品
      localStorage.setItem('share', 'tcid');
      location.href = location.origin;
      this.shareRecord(params);
    }else if(location.href.indexOf('neid') > 0) {               // 圈子详情 - 在圈子列表页点击的分享
      localStorage.setItem('share', 'neid');
      location.href = location.origin;
      this.shareRecord(params);
    }else if(location.href.indexOf('prid') > 0) {               // 商品详情
      localStorage.setItem('share', 'prid');
      location.href = location.origin;
      this.shareRecord(params);
    }else if(location.href.indexOf('circleid') > 0) {           // 店主版圈子右上角分享
      location.href = location.origin + '/#/circle';
      this.shareRecord(params);
    }else if(location.href.indexOf('activityId=new') > 0) {     // 新人首单默认右上角分享
      localStorage.setItem('share', 'activityId=new');
      location.href = location.origin;
      this.shareRecord(params);
    }else if(location.href.indexOf('activityId=try') > 0) {     // 试用商品默认右上角分享
      localStorage.setItem('share', 'activityId=try');
      location.href = location.origin;
      this.shareRecord(params);
    }else if(location.href.indexOf('uaid') > 0) {     // 竞猜填写数字页面
      localStorage.setItem('share', 'uaid');
      location.href = location.origin;
      this.shareRecord(params);
    }else if(location.href.indexOf('page') > 0) {     // 跳转到首页
      localStorage.setItem('share', 'index');
      location.href = location.origin;
      this.shareRecord(params);
    }
    // 新人不绑手机号就清除localStorage
    if(localStorage.getItem('is_new')) {
      localStorage.clear()
    }
  },
  mounted() {
    console.log('v 0.6.5');
    // let token = 'eyJhbGciOiJIUzI1NiIsImlhdCI6MTU1MDk4Nzc4MSwiZXhwIjoxNTUxNTkyNTgxfQ.eyJ1c2VybmFtZSI6Ilx1NTNlYVx1NjYyZlx1NmNhMVx1NjcwOVx1NTk4Mlx1Njc5YyIsImlkIjoiNTE4NjZlZjYtMTI3NS0xMWU5LWI4YjItMDAxNjNlMDhkMzBmIiwibW9kZWwiOiJVc2VyIiwibGV2ZWwiOjJ9.BHLdRBzIWQRl7xuMyi2vBh6HP_fUR1kVOHBmQMTFiTg';
    // let token = 'eyJhbGciOiJIUzI1NiIsImlhdCI6MTU1MTUwNDk0NywiZXhwIjoxNTUyMTA5NzQ3fQ.eyJ1c2VybmFtZSI6Ilx1NTNlYVx1NjYyZlx1NmNhMVx1NjcwOVx1NTk4Mlx1Njc5YyIsImlkIjoiMjczNDU1ODItM2MwYS0xMWU5LWE0ZjYtMDAxNjNlMTNhM2UzIiwibW9kZWwiOiJVc2VyIiwibGV2ZWwiOjF9.4JXjxmYNjqu95XVoLb17bzyzbS3bpswRGpBZOsEXmGA';
    // localStorage.setItem('token', token);
    localStorage.setItem('toLogin', '');
  },
  methods:{
    returnClick(){
      this.$router.go(-1);
    },
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive =true;
      })
    },
    shareRecord(params) {
      console.log(params);
      /*axios.post(api.refund_cancel + '?token='+ localStorage.getItem('token'), { oraid: this.refund.oraid }).then(res => {
        if(res.data.status == 200) {

        }
      });*/
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color: #fff;
}
.m-return{
  position: fixed;
  left: 10px;
  top: 10px;
  width: 80px;
  height: 40px;
  line-height: 44px;
  border-radius: 15px;
  background-color: rgba(0,0,0,0.2);
  color: #f7f7f7;
  z-index: 10000;
}
</style>
