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
  import common from './common/js/common';
  import axios from 'axios';
  import api from './api/api';
  import {Toast} from 'mint-ui';
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
    let url = location.href.split('&from')[0];
    if(location.href.indexOf('mbjid') > 0) {                // 邀请好友帮拆魔盒
      location.href = url.split('?mbjid')[0] + '#/pandora?mbjid' + url.split('?mbjid')[1];
      // alert(url.split('?mbjid')[0] + '#/pandora?mbjid' + url.split('?mbjid')[1]);
    }else if(location.href.indexOf('fmfpid') > 0) {         // 新人首单
      location.href = url.split('?fmfpid')[0] + '#/activityProductDetail?fmfpid' + url.split('?fmfpid')[1];
      // alert(url.split('?fmfpid')[0] + '#/activityProductDetail?fmfpid' + url.split('?fmfpid')[1]);
    }else if(location.href.indexOf('tcid') > 0) {           // 试用商品
      location.href = url.split('?tcid')[0] + '#/activityProductDetail?tcid' + url.split('?tcid')[1];
      // alert(url.split('?tcid')[0] + '#/activityProductDetail?tcid' + url.split('?tcid')[1]);
    }else if(location.href.indexOf('neid') > 0) {           // 圈子详情
      location.href = url.split('?neid')[0] + '#/circle/detail?neid' + url.split('?neid')[1];
      // alert(url.split('?neid')[0] + '#/circle/detail?neid' + url.split('?neid')[1]);
    }
    // 将邀请人的usid保存，等注册的时候使用
    if(!localStorage.getItem('token')) {
      // alert(location.href);
      if(location.href.indexOf('secret_usid') > 0) {
        localStorage.setItem('secret_usid', location.href.split('secret_usid=')[1]);
      }
    }
  },
  mounted(){
    // let token = 'eyJhbGciOiJIUzI1NiIsImlhdCI6MTU0NDg5MDM1MywiZXhwIjoxNTQ1NDk1MTUzfQ.eyJpZCI6IjNiMTI1YzY0LTAwODQtMTFlOS1hYTE4LTAwMTYzZTA4ZDMwZiIsIm1vZGVsIjoiVXNlciIsImxldmVsIjoxLCJ1c2VybmFtZSI6Ilx1NWJhMlx1NWI5ODg4MjAifQ.4ETC7t7tyavuxajtP-UpRB3YiDGbefiVhANTq4BqYPI';
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
