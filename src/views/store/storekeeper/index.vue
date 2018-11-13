<template>
  <div class="m-storekeeper">
    <!--顶部图片-->
    <img class="m-storekeeper-bg" src="/static/images/icon-integral-bg.png" alt="">
    <!--顶部文字-->
    <div class="m-total-earnings">累计收益 : ￥15200.50</div>
    <div class="m-month-earnings">本月收益<span class="m-month-earnings-text">6666.00</span>元</div>
    <div class="m-total-jump-box m-earnings-detail" @click="changeRoute('/storekeeper/incomeDetail')">
      <div>收益详情</div>
      <img class="m-jump-img" src="/static/images/icon-more-black.png" alt="">
    </div>

    <!--我的订单-->
    <div class="m-border-radius m-my-order">
      <div class="m-total-jump-box" @click="changeRoute('/storekeeper/orderManagement')">
        <div class="m-jump-title">我的订单</div>
        <div class="m-jump-text">订单管理</div>
        <img class="m-jump-img" src="/static/images/icon-more.png" alt="">
      </div>
    </div>
    <!--我的商品-->
    <div class="m-border-radius">
      <div class="m-total-jump-box" @click="changeRoute('/storekeeper/productManagement')">
        <div class="m-jump-title">我的商品</div>
        <div class="m-jump-text">商品管理</div>
        <img class="m-jump-img" src="/static/images/icon-more.png" alt="">
      </div>
      <!--商品展示-->
      <div class="m-most-product">最新发布</div>
      <div class="m-product-box">
        <div class="m-product-part" @click="changeRoute('/member/productDetail')">
          <div class="m-part-left">
            <img class="m-product-img" src="http://dummyimage.com/200x200" alt="">
          </div>
          <div class="m-part-right">
            <div class="m-right-row">
              <div class="m-product-name">哑铃</div>
            </div>
            <div class="m-product-description">商品描述活动描述商品描述活动描述商品描述活动描述商品描述活动描述商品</div>
            <div class="m-price-share">
              <div class="m-product-price">押金：<span class="m-price-time">3个月500元</span></div>
              <img class="m-share-img" src="/static/images/icon-gray-share.png" alt="">
              <div class="m-share-text">分享</div>
            </div>
          </div>
        </div>
        <!--暂无最新发布商品-->
        <!--<img class="m-no-order-img" src="/static/images/icon-no-order.png" alt="">
        <div class="m-no-order-text">暂无最新发布商品</div>-->
      </div>
      <!--商品展示-->
      <div class="m-most-product">最热商品</div>
      <div class="m-product-box">
        <div class="m-product-part" @click="changeRoute('/member/productDetail')">
          <div class="m-part-left">
            <img class="m-product-img" src="http://dummyimage.com/200x200" alt="">
          </div>
          <div class="m-part-right">
            <div class="m-right-row">
              <div class="m-product-name">哑铃</div>
            </div>
            <div class="m-product-description">商品描述活动描述商品描述活动描述商品描述活动描述商品描述活动描述商品</div>
            <div class="m-price-share">
              <div class="m-product-price">押金：<span class="m-price-time">3个月500元</span></div>
              <img class="m-share-img" src="/static/images/icon-gray-share.png" alt="">
              <div class="m-share-text">分享</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--我的活动-->
    <div class="m-border-radius">
      <div class="m-total-jump-box" @click="changeRoute('/storekeeper/activityManagement')">
        <div class="m-jump-title">我的活动</div>
        <div class="m-jump-text">活动管理</div>
        <img class="m-jump-img" src="/static/images/icon-more.png" alt="">
      </div>
      <!--内容文字-->
      <div class="m-content-box">
        <div class="m-content-text">正在参与活动：2</div>
      </div>
    </div>
    <!--我的粉丝-->
    <div class="m-border-radius">
      <div class="m-total-jump-box" @click="changeRoute('/storekeeper/fansManagement')">
        <div class="m-jump-title">我的粉丝</div>
        <div class="m-jump-text">粉丝管理</div>
        <img class="m-jump-img" src="/static/images/icon-more.png" alt="">
      </div>
      <!--内容文字-->
      <div class="m-content-box">
        <div class="m-content-text">粉丝总数：123</div>
        <div class="m-content-text">本月新增：66</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data() {
        return {
          name: ''
        }
      },
      components: {},
      methods: {
        // 跳转其他页面的方法
        changeRoute(v) {
          this.$router.push(v)
        },
      }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-storekeeper {
    min-height: 100%;
    background-color: #EEEEEE;
    padding-bottom: 10px;
    .m-storekeeper-bg {
      width: 750px;
      height: 400px;
      margin-bottom: 65px;
    }
    .m-total-earnings {
      font-size: 24px;
      position: absolute;
      top: 110px;
      left: 60px;
    }
    .m-month-earnings {
      font-size: 21px;
      position: absolute;
      top: 190px;
      left: 110px;
      .m-month-earnings-text {
        font-size: 90px;
        padding: 0 16px;
      }
    }
    .m-border-radius {
      width: 700px;
      margin: 0 auto 20px auto;
      border-radius: 20px;
      background-color: #ffffff;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16);
      .m-most-product {
        font-size: 24px;
        text-align: left;
        margin: 0 0 20px 42px;
      }
      .m-product-box {
        padding: 0 24px 0 42px;
      }
      .m-no-order-img {
        width: 200px;
        height: 200px;
      }
      .m-no-order-text {
        font-size: 18px;
        padding-bottom: 40px;
      }
    }
    .m-total-jump-box {
      display: flex;
      padding: 25px 25px 25px 50px;
      .m-jump-title {
        flex: 1;
        font-size: 28px;
        font-weight: bold;
        text-align: left;
      }
      .m-jump-text {
        font-size: 24px;
      }
      .m-jump-img {
        width: 22px;
        height: 22px;
        margin: 4px 0 0 5px;
      }
    }
    .m-content-box {
      display: flex;
      padding: 0 25px 34px 50px;
      justify-content: space-between;
      .m-content-text {
        font-size: 28px;
      }
    }
    .m-earnings-detail {
      font-size: 21px;
      position: absolute;
      top: 290px;
      right: 25px;
    }
    .m-my-order {
      position: absolute;
      top: 360px;
      left: 25px;
    }
  }
</style>
