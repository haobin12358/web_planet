<template>
  <div class="m-pandora">
    <div class="m-box-product">
      <div class="m-box-tip m-ft-28 m-ft-b">您的好友为您打开了魔力盒子！</div>
      <div class="m-gift-one" @click="boxPopup = true"></div>
      <div class="m-gift-two" @click="boxPopup = true"></div>
      <div class="m-gift-three" @click="boxPopup = true"></div>
      <img class="m-product-img" src="http://dummyimage.com/550x550" alt="">
    </div>
    <div class="m-product-detail">
      <div class="m-buy-product">
        <div class="m-price-one m-ft-38 m-ft-b m-red">预设价格：￥345.00</div>
        <div class="m-box-btn m-ft-38 m-ft-b">点击购买</div>
      </div>
      <div class="m-product-name m-ft-38 m-ft-b tl">魔术礼盒</div>
      <div class="m-product-price">
        <div class="m-price-two">原价：￥400.00</div>
        <div class="m-price-three m-red">最低价：￥200.00</div>
      </div>
    </div>
    <div class="m-share-rule tl">
      <div class="m-rule-text">第一档：随机减少<span class="m-red">3-5</span>元</div>
      <div class="m-rule-text">第二档：随机减少<span class="m-red">5-10</span>元或增加<span class="m-red">1-2</span>元</div>
      <div class="m-rule-text">第三档：随机减少<span class="m-red">10-20</span>元或增加<span class="m-red">5-10</span>元</div>
      <div class="m-box-btn m-share-btn m-ft-38 m-ft-b animated infinite pulse">点击分享好友</div>
    </div>

    <div class="m-record-text">
      <div class="m-rule-icon"></div>
      <div class="m-text-bg">
        <div class="m-rule-title">拆盒记录</div>
        <div class="m-rule-row">
          <div class="m-rule-no">1</div>
          <div>居居拆盒并分享，减少5元</div>
        </div>
        <div class="m-rule-row">
          <div class="m-rule-no">2</div>
          <div>小甜甜帮居居拆盒，减少10元</div>
        </div>
        <div class="m-rule-row">
          <div class="m-rule-no">3</div>
          <div>咕咕帮居居拆盒，增加10元</div>
        </div>
        <div class="m-rule-row">
          <div class="m-rule-no">4</div>
          <div>啾啾帮居居拆盒，减少20元</div>
        </div>
        <div class="m-text m-ft-21">活动最终解释权归本公司所有</div>
      </div>
    </div>

    <!--点击魔盒的popup-->
    <mt-popup class="m-box-popup" v-model="boxPopup" pop-transition="popup-fade">
      <div class="m-gift-icon"></div>
      <div class="m-popup-text m-ft-30 m-ft-b">您为您的好友减少了<span class="m-red">5元</span>购买金额！</div>
      <div class="m-popup-btn m-ft-30 m-ft-b">告诉好友</div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';

  export default {
    data() {
      return {
        name: '',
        boxPopup: false,            // 点击魔盒的popup
      }
    },
    components: {},
    methods: {

    },
    mounted() {
      common.changeTitle('魔法礼盒');
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-pandora {
    .m-box-product {
      /*position: relative;*/
      height: 928px;
      background: url("/static/images/activity/icon-bg.png") no-repeat;
      background-size: 100% 100%;
      .m-box-tip {
        color: #FCD316;
        padding-top: 23px;
      }
      .m-gift-one {
        width: 184px;
        height: 204px;
        background: url("/static/images/activity/gift-one.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 223px;
        left: 119px;
      }
      .m-gift-two {
        width: 162px;
        height: 191px;
        background: url("/static/images/activity/gift-two.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 128px;
        right: 118px;
      }
      .m-gift-three {
        width: 198px;
        height: 210px;
        background: url("/static/images/activity/gift-three.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 453px;
        right: 58px;
      }
      .m-product-img {
        width: 383px;
        height: 383px;
        border: 20px solid rgba(255,255,255,1);
        box-shadow: -10px -10px 20px rgba(0,0,0,0.16);
        border-radius: 20px;
        position: absolute;
        top: 494px;
        left: 39px;
      }
    }
    .m-product-detail {
      padding: 0 40px;
      .m-buy-product {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: -20px;
        .m-price-one {

        }
      }
      .m-product-name {
        padding: 32px 0 49px 0;
      }
      .m-product-price {
        display: flex;
        justify-content: space-between;
        font-size: 30px;
        font-weight: bold;
        .m-price-two {

        }
        .m-price-three {

        }
      }
    }
    .m-box-btn {
      width: 230px;
      height: 51px;
      line-height: 50px;
      white-space: nowrap;
      color: #AF3300;
      padding: 16px 40px;
      background: linear-gradient(180deg,rgba(255,235,148,1) 0%,rgba(252,211,22,1) 100%);
      box-shadow: 0 5px 10px rgba(0,0,0,0.16);
      border-radius: 50px;
    }
    .m-share-btn {
      margin: 54px 0 0 153px;
    }
    .m-share-rule {
      padding: 33px 40px;
      .m-rule-text {
        color: #999999;
        font-size: 24px;
      }
    }
    .m-red {
      color: #C70000;
    }
    .m-record-text {
      width: 700px;
      height: 560px;
      background: #B0F4F5;
      border-radius: 20px 20px 0 0;
      position: absolute;
      top: 1500px;
      left: 25px;
      .m-rule-icon {
        width: 99px;
        height: 39px;
        background: url("/static/images/activity/icon-rule.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 11px;
        left: 59px;
        z-index: 1;
      }
      .m-text-bg {
        width: 644px;
        height: 530px;
        background: #845AFA;
        border-radius: 20px 20px 0 0;
        position: absolute;
        top: 29px;
        left: 28px;
        color: #ffffff;
        font-size: 38px;
        .m-rule-title {
          margin: 24px 0 30px 0;
        }
        .m-rule-row {
          display: flex;
          .m-rule-no {
            width: 30px;
            height: 30px;
            font-size: 30px;
            font-weight: bold;
            line-height: 35px;
            padding: 10px;
            margin: 0 30px 30px 30px;
            background-color: #FCD316;
            border-radius: 50%;
          }
        }
        .m-text {
          position: absolute;
          bottom: 0;
          left: 188px;
        }
      }
    }
    .m-box-popup {
      width: 680px;
      height: 600px;
      margin: -300px 0 0 25px;
      border-radius: 30px;
      border: 10px #9A5AEB dashed;
      .m-gift-icon {
        width: 183px;
        height: 204px;
        background: url("/static/images/activity/gift-four.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: -90px;
        left: 1px;
      }
      .m-popup-text {
        margin-top: 260px;
      }
      .m-popup-btn {
        width: 250px;
        height: 70px;
        line-height: 75px;
        margin: 141px 0 0 225px;
        color: #ffffff;
        background-color: #FCD316;
        box-shadow: 2px 8px 8px rgba(0,0,0,0.16);
        border-radius: 10px;
      }
    }
  }
</style>
