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
    // 将邀请人的usid保存，等注册的时候使用
    if(!localStorage.getItem('token')) {
      if(location.href.indexOf('secret_usid') > 0) {
        localStorage.setItem('secret_usid', location.href.split('secret_usid=')[1])
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
    if(location.href.indexOf('mbjid') > 0) {                // 邀请好友帮拆魔盒
      localStorage.setItem('share', 'mbjid');
      location.href = location.origin;
    }else if(location.href.indexOf('fmfpid') > 0) {         // 新人首单
      localStorage.setItem('share', 'fmfpid');
      location.href = location.origin;
    }else if(location.href.indexOf('tcid') > 0) {           // 试用商品
      localStorage.setItem('share', 'tcid');
      location.href = location.origin;
    }else if(location.href.indexOf('neid') > 0) {           // 圈子详情 - 在圈子列表页点击的分享
      localStorage.setItem('share', 'neid');
      location.href = location.origin;
    }else if(location.href.indexOf('prid') > 0) {           // 商品详情
      localStorage.setItem('share', 'prid');
      location.href = location.origin;
    }else if(location.href.indexOf('circleid') > 0) {       // 店主版圈子右上角分享
      location.href = location.origin + '/#/circle'
    }
    // 新人不绑手机号就清除localStorage
    if(localStorage.getItem('is_new')) {
      localStorage.clear()
    }
  },
  mounted() {
    console.log('v 0.4.4');
    // let token = 'eyJhbGciOiJIUzI1NiIsImlhdCI6MTU0ODM5NDcyMiwiZXhwIjoxNTQ4OTk5NTIyfQ.eyJ1c2VybmFtZSI6Ilx1NTNlYVx1NjYyZlx1NmNhMVx1NjcwOVx1NTk4Mlx1Njc5YyIsImlkIjoiNTE4NjZlZjYtMTI3NS0xMWU5LWI4YjItMDAxNjNlMDhkMzBmIiwibW9kZWwiOiJVc2VyIiwibGV2ZWwiOjJ9.lTh7lGanswYZldjeOBC4yuwJ4Y2pdMMcJQUYIIfBDPU';
    // let token = 'eyJhbGciOiJIUzI1NiIsImlhdCI6MTU0ODM5Mzg4OSwiZXhwIjoxNTQ4OTk4Njg5fQ.eyJ1c2VybmFtZSI6Ilx1NTNlYVx1NjYyZlx1NmNhMVx1NjcwOVx1NTk4Mlx1Njc5YyIsImlkIjoiOGJjNmRjNWUtMjA1OC0xMWU5LThhZDMtMDAxNjNlMTNhM2UzIiwibW9kZWwiOiJVc2VyIiwibGV2ZWwiOjF9.OtUdMe8kQLKcyAHhgoEuPYv7kcwwlrzDaoc2e8chZJE';
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
