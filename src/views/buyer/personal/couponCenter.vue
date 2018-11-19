<template>
  <div class="m-couponCenter">
    <div class="m-couponCenter-top">
      <span class="m-couponCenter-rule">积分规则</span>
      <p class="m-couponCenter-top-p">累计积分：520</p>
      <div class="m-couponCenter-day">
        <span>已连续签到</span>
        <span class="m-couponCenter-day-bg">
          <span class="m-line"></span>
        <span class="m-num">0</span></span>
        <span class="m-couponCenter-day-bg">
          <span class="m-line"></span>
          <span class="m-num">0</span></span>
        <span class="m-couponCenter-day-bg">
          <span class="m-line"></span>
          <span class="m-num">3</span></span>
        <span>天</span>
      </div>
      <div class="m-couponCenter-week">
        <!--每周哪几天签到-->
        <!--<span class="m-circle active">1</span>
        <span class="m-circle-line"></span>
        <span class="m-circle">2</span>
        <span class="m-circle-line"></span>
        <span class="m-circle">3</span>
        <span class="m-circle-line"></span>
        <span class="m-circle">4</span>
        <span class="m-circle-line"></span>
        <span class="m-circle">5</span>
        <span class="m-circle-line"></span>
        <span class="m-circle">6</span>
        <span class="m-circle-line"></span>
        <span class="m-circle">7</span>-->
        <span class="m-couponCenter-week-btn" :class="signIn ? 'active' : ''" @click="userSignIn">签到</span>
      </div>
    </div>
    <div class="m-couponCenter-content">
      <div class="m-nav">
        <nav-list :navlist="nav_list" :isScroll="true" @navClick="navClick"></nav-list>
      </div>
      <div class="m-couponCenter-content-ul">
        <!--<coupon-card></coupon-card>-->
        <div class="m-no-coupon">
          <span class="m-no-img"></span>
          <p>还没有获得优惠券哦~</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import navList from '../../../components/common/navlist';
  import couponCard from '../components/couponCard';
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        nav_list:[
          { name:'限时优惠券', params:'', active:true }, { name:'满减优惠券', params:'', active:false }, { name:'活动1', params:'', active:false },
          { name:'活动2', params:'', active:false }, { name:'活动2', params:'', active:false }
        ],
        signIn: false,            // 是否已签到
      }
    },
    components: {
      navList,
      couponCard
    },
    methods: {
      // navList点击事件
      navClick(index){
        let arr = [].concat(this.nav_list);
        for(let i=0;i<arr.length;i++){
          arr[i].active = false;
        }
        arr[index].active = true;
        this.nav_list = [].concat(arr)
      },
      // 用户签到
      userSignIn() {
        axios.post(api.user_sign_in + '?token=' + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            Toast(res.data.message);
          }else{
            Toast(res.data.message);
          }
        });
      }
    },
    mounted() {
      common.changeTitle('优惠中心');
      // this.getUser();       // 获取个人信息
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-couponCenter{
    .m-couponCenter-top{
      width: 100%;
      height: 300px;
      background: url("/static/images/icon-integral-bg.png");
      background-size: 100% 100%;
      text-align: left;
      position: relative;
      .m-couponCenter-top-p{
        padding: 30px 0 24px 63px;
      }
      .m-couponCenter-rule{
        position: absolute;
        right: 0;
        top: 90px;
        width: 30px;
        padding: 20px 0;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background-color: #fff;
        box-shadow:0 3px 6px rgba(0,0,0,0.16);
        font-size: 18px;
        text-align: center;
      }
      .m-couponCenter-day{
        /*text-align: center;*/
        margin-left: 125px;
        .m-couponCenter-day-bg{
          display: inline-block;
          width: 87px;
          height: 138px;
          line-height: 138px;
          font-size: 90px;
          font-weight: 400;
          background-color: #fff;
          border-radius: 10px;
          text-shadow:0 3px 6px rgba(0,0,0,0.16);
          box-shadow:0 3px 6px rgba(0,0,0,0.16);
          vertical-align: text-bottom;
          margin: 0 4px;
          position: relative;
          .m-line{
            position: absolute;
            top: 50%;
            left: 0;
            width: 87px;
            height: 1px;
           border-top: 1px solid #e9e9e9;
            margin: 0;
            z-index: 0;
          }
          .m-num{
            position: absolute;
            /*top: 50%;*/
            left: 21px;
            z-index: 100;
          }
        }
      }
      .m-couponCenter-week{
        text-align: right;
        margin-top: 20px;
        padding-right: 40px;
        .m-circle{
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: #fff;
          border-radius: 50%;
          font-size: 18px;
          color: #ccc;
          box-shadow:0 3px 6px rgba(0,0,0,0.16);
          text-align: center;
          &.active{
            width: 30px;
            height: 30px;
            line-height: 30px;
            background-color: @mainColor;
            color: #333;
          }
        }
        .m-circle-line{
          display: inline-block;
          width: 50px;
          height: 4px;
          background-color: #fff;
          margin-bottom: 6px;
          margin-left: -8px;
          margin-right: -8px;
          box-shadow:0 3px 6px rgba(0,0,0,0.16);
        }
        .m-couponCenter-week-btn{
          display: inline-block;
          width: 150px;
          height: 40px;
          line-height: 40px;
          background-color: #fff;
          text-align: center;
          font-size: 21px;
          border-radius: 30px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16);
          margin-left: 50px;
          &.active {
            opacity: 0.5;
          }
        }
      }
    }
    .m-couponCenter-content{
      .m-nav{
        width: 700px;
        overflow-x: auto;
        overflow-y: hidden;
        margin: 20px 0 46px 30px;
      }
      .m-couponCenter-content-ul{
        padding: 20px 72px;
      }
    }
  }

</style>
