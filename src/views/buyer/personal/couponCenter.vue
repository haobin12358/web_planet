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
        <span class="m-circle active">1</span>
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
        <span class="m-circle">7</span>
        <span class="m-couponCenter-week-btn">签到</span>
      </div>
    </div>
    <div class="m-couponCenter-content">
      <div class="m-scroll">
        <nav-list :navlist="nav_list" @navClick="navClick"></nav-list>
      </div>
      <div class="m-couponCenter-content-ul">
        <coupon-card></coupon-card>
        <coupon-card></coupon-card>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import navList from '../../../components/common/navlist';
  import couponCard from '../components/couponCard';
  export default {
    data() {
      return {
        nav_list:[
          {
            name:'限时优惠券',
            params:'',
            active:true
          },
          {
            name:'满减优惠券',
            params:'',
            active:false
          },
          {
            name:'活动1',
            params:'',
            active:false
          },
          {
            name:'活动2',
            params:'',
            active:false
          },
          {
            name:'活动2',
            params:'',
            active:false
          }
        ]
      }
    },
    components: {
      navList,
      couponCard
    },
    methods: {
      navClick(index){
        let arr = [].concat(this.nav_list);
        for(let i=0;i<arr.length;i++){
          arr[i].active = false;
        }
        arr[index].active = true;
        this.nav_list = [].concat(arr)
      }
    },
    created() {

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
        width: 36px;
        padding: 20px 0;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background-color: #fff;
        box-shadow:0 3px 6px rgba(0,0,0,0.16);
        font-size: 18px;
        text-align: center;
      }
      .m-couponCenter-day{
        text-align: center;
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
          width: 105px;
          height: 30px;
          line-height: 30px;
          background-color: #fff;
          text-align: center;
          font-size: 21px;
          border-radius: 30px;
          box-shadow:0px 3px 6px rgba(0,0,0,0.16);
          margin-left: 50px;
        }
      }
    }
    .m-couponCenter-content{
      .m-scroll{
        width: 700px;
        overflow-x: auto;
        overflow-y: hidden;
        margin: 20px 0 46px 50px;
      }
      .m-couponCenter-content-ul{
        padding: 20px 72px;
      }
    }
  }

</style>
