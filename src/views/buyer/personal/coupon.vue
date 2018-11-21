<template>
  <div class="m-coupon">
    <div class="m-nav">
      <nav-list :navlist="nav_list" :isScroll="false" @navClick="navClick"></nav-list>
    </div>
    <div class="m-coupon-content">
      <coupon-card :couponList="couponList"></coupon-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import couponCard from '../components/couponCard';
  import navList from '../../../components/common/navlist';
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        nav_list:[
          { name: '未使用', params: '2', active: true }, { name: '已使用', params: '1', active: false }, { name: '已过期', params: '0', active: false }
        ],
        couponList: []            // 优惠券list
      }
    },
    components: { navList, couponCard },
    methods: {
      // navList的点击事件
      navClick(index){
        let arr = [].concat(this.nav_list);
        for(let i = 0; i < arr.length; i ++) {
          arr[i].active = false;
        }
        arr[index].active = true;
        this.getUserCoupon(arr[index].params);            // 获取用户个人优惠券
        this.nav_list = [].concat(arr);
      },
      // 获取用户个人优惠券
      getUserCoupon(status) {
        let params = {
          token: localStorage.getItem('token')
        };
        if(status == "0") {
          params.canuse = "false";
        }else if(status == "1") {
          params.ucalreadyuse = "true";
        }else if(status == "2") {
          params.ucalreadyuse = "false";
        }
        this.couponList = [];
        axios.get(api.list_user_coupon, { params: params }).then(res => {
          if(res.data.status == 200){
            for(let i = 0; i < res.data.data.length; i ++) {
              this.couponList.push(res.data.data[i].coupon)
            }
          }else{
            Toast(res.data.message);
          }
        });
      }
    },
    mounted() {
      common.changeTitle('我的优惠券');
      this.getUserCoupon("2");            // 获取用户个人优惠券
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-coupon{
    min-height: 100%;
    .m-nav {
      width: 600px;
      margin: 0 75px;
    }
    .m-nav-list{
      padding: 0 80px;
    }
    .m-coupon-content{
      padding: 30px 65px;
    }
  }
</style>
