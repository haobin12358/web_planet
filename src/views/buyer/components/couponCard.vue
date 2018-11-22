<template>
  <div>
    <div v-if="couponList.length > 0">
      <!--<div class="m-coupon-card" v-for="item in couponList">
        <span class="m-left-circle"></span>
        <span class="m-price-icon" v-if="item.codiscount == 10">￥</span>
        <div class="m-coupon-detail">
          <span class="m-ft-130" v-if="item.codiscount == 10">{{item.cosubtration}}</span>
          <span class="m-ft-140" v-if="item.codiscount != 10">{{item.codiscount}}</span>
          <span class="m-ft-40" v-if="item.codiscount != 10">折</span>
          <div>
            <p class="m-ft-48">{{item.title_subtitle.title}}</p>
            <p class="m-ft-36">{{item.title_subtitle.subtitle}}</p>
          </div>
          <div class="m-coupon-time">
            有效时间：{{item.covalidstarttime}} 至 {{item.covalidendtime}}
          </div>
        </div>
        <span class="m-right-circle"></span>
      </div>-->
      <div class="m-coupon-card" :class="item.ready_collected ? 'm-have' : '' || item.navName == '已过期' ? 'm-had' : '' || item.navName == '已使用' ? 'm-have' : ''"
           v-for="item in couponList" @click="couponClick(item)">
        <div class="m-card-left">
          <img class="m-store-img" :class="item.navName == '已过期' ? 'm-had' : '' || item.navName == '已使用' ? 'm-have' : ''"
               :src="item.title_subtitle.left_logo" alt="">
          <div class="m-store-name">{{item.title_subtitle.left_text}}</div>
        </div>
        <div class="m-card-right">
          <div class="m-card-time">{{item.covalidstarttime}}—{{item.covalidendtime}}</div>
          <div class="m-card-detail">
            <div class="m-detail-left" v-if="item.codiscount == '10'">
              <span class="m-text-small">￥</span>
              <span class="m-text-big">{{item.cosubtration}}</span>
            </div>
            <div class="m-detail-left m-space" v-else>
              <span class="m-text-big">{{item.codiscount}}</span>
              <span class="m-text-small">折</span>
            </div>
            <div class="m-detail-right">
              <div class="m-detail-title">{{item.title_subtitle.title}}</div>
              <div class="m-detail-subtitle">{{item.title_subtitle.subtitle}}</div>
              <div class="m-detail-btn" v-if="item.cocancollect && !item.ready_collected && !item.navName" @click="getCoupon">点击领取</div>
              <div class="m-detail-btn" v-if="!item.cocancollect">不可领取</div>
              <div class="m-detail-btn" v-if="item.ready_collected">已领取</div>
              <div class="m-detail-btn" v-if="item.navName">{{item.navName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-no-coupon" v-else>
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
      // 优惠券选择
      couponClick(item){
        this.$emit('couponClick',item);
      },
      // 点击领取优惠券
      getCoupon() {

      }
    },
    mounted() {
      // console.log(this.couponList);
    },
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-coupon-card{
    display: flex;
    justify-content: space-between;
    width: 700px;
    height: 171px;
    margin: 0 0 5px 25px;
    background: url("/static/images/coupon/icon-new.png") no-repeat;
    background-size: 100% 100%;
    &.m-had {
      background: url("/static/images/coupon/icon-had.png") no-repeat;
      background-size: 100% 100%;
    }
    &.m-have {
      background: url("/static/images/coupon/icon-have.png") no-repeat;
      background-size: 100% 100%;
    }
    .m-card-left {
      margin: 20px 0 0 45px;
      .m-store-img {
        width: 100px;
        height: 100px;
        background: #ffffff;
        box-shadow: 2px 3px 6px rgba(0,0,0,0.16);
        border-radius: 10px;
        &.m-had {
          opacity: 0.3;
        }
        &.m-have {
          opacity: 0.5;
        }
      }
      .m-store-name {
        color: #ffffff;
        font-size: 18px;
      }
    }
    .m-card-right {
      width: 63%;
      color: #ffffff;
      font-size: 18px;
      margin: 15px 20px 0 0;
      .m-card-time {
        margin-bottom: 5px;
        text-align: right;
      }
      .m-card-detail {
        display: flex;
        justify-content: space-between;
        .m-detail-left {
          margin-top: -10px;
          .m-text-small{
            font-size: 46px;
          }
          .m-text-big {
            font-size: 100px;
            font-weight: bold;
          }
          &.m-space {
            margin-left: 50px;
          }
        }
        .m-detail-right {
          .m-detail-title {

          }
          .m-detail-subtitle {

          }
          .m-detail-btn {
            width: 96px;
            height: 32px;
            line-height: 35px;
            font-size: 24px;
            padding: 5px 16px;
            margin-top: 10px;
            border: 1px solid rgba(255,255,255,1);
            border-radius: 30px;
          }
        }
      }
    }
  }
</style>
