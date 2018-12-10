<template>
  <div id="app">
    <!--<span class="m-return" @click.stop="returnClick">返回</span>-->
    <router-view v-if="isRouterAlive"/>
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
  mounted(){
    // alert(common.GetQueryString('code'));

    // let token = 'eyJhbGciOiJIUzI1NiIsImlhdCI6MTU0NDQwNzg2NiwiZXhwIjoxNTQ1MDEyNjY2fQ.eyJpZCI6ImRkOWRjNzRlLWZjMWUtMTFlOC1iNjE1LTAwMTYzZTA4ZDMwZiIsIm1vZGVsIjoiVXNlciIsImxldmVsIjowfQ.BCfdacPsOuGVvQDSCDOrxTelz61m2KzSxItKQipcQxA';
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
