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
      location.href = url.split('?mbjid')[0] + '#/pandora?mbjid' + url.split('?mbjid')[1]
    }else if(location.href.indexOf('fmfpid') > 0) {         // 新人首单
      location.href = url.split('?fmfpid')[0] + '#/activityProductDetail?fmfpid' + url.split('?fmfpid')[1]
    }else if(location.href.indexOf('tcid') > 0) {           // 试用商品
      location.href = url.split('?tcid')[0] + '#/activityProductDetail?tcid' + url.split('?tcid')[1]
    }else if(location.href.indexOf('neid') > 0) {           // 圈子详情 - 在圈子列表页点击的分享
      location.href = url.split('?neid')[0] + '#/circle/detail?neid' + url.split('?neid')[1]
    }else if(location.href.indexOf('prid') > 0) {           // 商品详情
      location.href = url.split('?prid')[0] + '#/product/detail?prid' + url.split('?prid')[1]
    }else if(location.href.indexOf('circleid') > 0) {       // 店主版圈子右上角分享
      location.href = location.origin
    }
    // 将邀请人的usid保存，等注册的时候使用
    if(!localStorage.getItem('token')) {
      // alert(location.href);
      if(location.href.indexOf('secret_usid') > 0) {
        localStorage.setItem('secret_usid', location.href.split('secret_usid=')[1]);
      }
    }
  },
  mounted() {
    console.log('v 0.2.6');
    // let token = 'eyJhbGciOiJIUzI1NiIsImlhdCI6MTU0NjcxOTgyOSwiZXhwIjoxNTQ3MzI0NjI5fQ.eyJpZCI6ImQ1NzM5MzUyLTBiNmMtMTFlOS1hNmVmLTAwMTYzZTA4ZDMwZiIsIm1vZGVsIjoiVXNlciIsImxldmVsIjoxLCJ1c2VybmFtZSI6Ilx1NTNlYVx1NjYyZlx1NmNhMVx1NjcwOVx1NTk4Mlx1Njc5YyJ9.xvbRIEtWTkebhe2wo5m1BWeX8iG03jvQWTIMb5wsUIg';
    // let token = 'eyJhbGciOiJIUzI1NiIsImlhdCI6MTU0NjcwNDM4MiwiZXhwIjoxNTQ3MzA5MTgyfQ.eyJ1c2VybmFtZSI6Ilx1NTNlYVx1NjYyZlx1NmNhMVx1NjcwOVx1NTk4Mlx1Njc5YyIsImlkIjoiYjNkNTcxZDItMTBmYS0xMWU5LTk0YzctMDAxNjNlMTNhM2UzIiwibW9kZWwiOiJVc2VyIiwibGV2ZWwiOjJ9.MqI99lbmvRWlnY8X8yhSiNWOExwwV4zJwtS_-lDsiXc';
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
