<template>
  <div >
    <page-nav :list="nav_list" @navClick="navClick"></page-nav>
    <activity v-if="select.value == 'activity'"></activity>
    <tweet v-else-if="select.value == 'tweet'"></tweet>
  </div>
</template>

<script>
  import pageNav from '../../components/common/pageNav';
  import activity from './activity';
  import tweet from './tweet';
  import axios from 'axios';
  import api from '../../api/api'
  export default {
    data(){
      return{
        nav_list:[
          {
            name:'推文编辑',
            value:'tweet',
            active:true
          },
          {
            name:'活动专题',
            value:'activity',
            active:false
          }
        ],
        select:{
          name:'推文编辑',
          value:'tweet',
          active:true
        }
      }
    },
    components:{
      pageNav,
      activity,
      tweet
    },
    methods:{
      navClick(index){
        let arr = [].concat(this.nav_list);
        for(let i=0;i<arr.length;i++){
          arr[i].active = false;
        }
        arr[index].active =true;
        this.nav_list = [].concat(arr);
        this.select = this.nav_list[index];
      },
      getTweet(){

      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
