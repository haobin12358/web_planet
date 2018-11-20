<template>
  <div>
    <div v-if="couponList.length > 0">
      <div class="m-coupon-card" v-for="item in couponList">
        <span class="m-left-circle"></span>
        <span class="m-price-icon">￥</span>
        <div class="m-coupon-detail">
          <span class="m-ft-130">{{item.cosubtration}}</span>
          <div>
            <p class="m-ft-48">{{item.title_subtitle.title}}</p>
            <p class="m-ft-36">{{item.title_subtitle.subtitle}}</p>
          </div>
          <div class="m-coupon-time">
            有效时间：{{item.covalidstarttime}} 至 {{item.covalidendtime}}
          </div>
        </div>
        <span class="m-right-circle"></span>
      </div>
    </div>
    <div class="m-no-coupon" v-if="couponList.length == 0">
      <span class="m-no-img"></span>
      <p style="margin-top: -40px">暂时还没有优惠券哦~</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      couponList: { type: Array, default: null },
    },
    methods: {
      /*navClick(i){
        this.$emit('navClick',i);
      }*/
    },
    mounted() {
      console.log(this.couponList);
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-coupon-card{
    position: relative;
    width: 619px;
    height: 213px;
    background:linear-gradient(108deg,rgba(252,211,22,1) 0%,rgba(245,147,145,1) 100%);
    border-radius: 10px;
    margin-bottom: 30px;
    color: #fff;
    &.unable{
      background:linear-gradient(108deg,rgba(233,233,233,1) 0%,rgba(153,153,153,1) 100%);
    }
    .m-price-icon{
      position: absolute;
      top: 10px;
      left: 15px;
      font-size: 46px;
    }
    .m-icon-word{
      font-size: 46px;
      display: inline-block;
      margin-top: 60px;
      /*vertical-align: text-bottom;*/
    }
    .m-left-circle{
      position: absolute;
      top: 84px;
      left: -21px;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: #fff;
    }
    .m-right-circle{
      position: absolute;
      top: 84px;
      right: -21px;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: #fff;
    }
    .m-coupon-detail{
      .flex-row(space-between);
      width: 540px;
      padding-right: 30px;
      position: absolute;
      top: 23px;
      left: 40px;
      text-align: left;
      .m-coupon-time {
        position: absolute;
        bottom: -15px;
        left: -30px;
        font-size: 16px;
      }
      .m-ft-130{
        font-size: 130px;
        font-weight: bold;
        line-height: 180px;
        margin: -10px 0 0 10px;
      }
      .m-ft-48{
        font-size: 44px;
        margin: -10px -10px 10px 0;
      }
    }
  }
</style>
