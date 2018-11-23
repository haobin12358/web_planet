<template>
  <div >
    <page-nav :list="nav_list" @navClick="navClick"></page-nav>
    <coupon v-if="select=='coupon'"></coupon>
    <sign v-if="select=='sign'"></sign>
  </div>
</template>

<script>
  import pageNav from '../../components/common/pageNav';
  import coupon from './coupon';
  import sign from './sign';
  export default {
    data(){
      return{
        nav_list:[
          {
            name:'优惠券',
            value:'coupon',
            active:true
          },
          {
            name:'签到',
            value:'sign',
            active:false
          }
        ],
        select:'coupon'
      }
    },
    components:{
      pageNav,
      coupon,
      sign
    },
    methods:{
      navClick(index){
        let arr = [].concat(this.nav_list);
        for(let i=0;i<arr.length;i++){
          arr[i].active = false;
        }
        arr[index].active =true;
        this.nav_list = [].concat(arr);
        this.select = this.nav_list[index].value;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>


</style>
