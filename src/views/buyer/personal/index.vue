<template>
  <div class="m-personal" >
    <div class="m-personal-bg">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-personal-content">
      <p class="m-set-box">
        <span class="m-icon-set" @click="changeRoute('/personal/setUp')"></span>
      </p>
      <div class="m-personal-info">
        <img src="" class="m-personal-head-portrait" alt="">
        <div class="m-personal-info-box">
          <div class="m-personal-info-text">
            <div>
              <p>居居女孩</p>
              <p>
                <span class="m-personal-identity">行装会员</span>
              </p>
            </div>
            <img src="" class="m-code-img" alt="" @click="changeRoute('/personal/code')">
          </div>
          <ul class="m-personal-ul">
            <li @click="changeRoute('/personal/coupon')">
              <span class="m-icon-gift"></span>
              <span class="m-name">优惠券</span>
              <span>0</span>
            </li>
            <li @click="changeRoute('/personal/integral')">
              <span class="m-icon-integral"></span>
              <span class="m-name">可用积分</span>
              <span>520</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="m-personal-body">
        <div class="m-one-part">
          <p class="m-one-part-title">
            <span class="m-name">我的订单</span>
            <span @click="changeRoute('/orderList')">
              <span>全部订单</span>
              <span class="m-icon-more"></span>
            </span>
          </p>
          <ul class="m-part-icon-ul">
            <li>
              <img src="/static/images/icon-order-pay.png" alt="">
              <span>待付款</span>
            </li>
            <li>
              <img src="/static/images/icon-order-send.png" class="m-square" alt="">
              <span>待发货</span>
            </li>
            <li>
              <img src="/static/images/icon-receive.png" class="m-square" alt="">
              <span>待收货</span>
            </li>
            <li>
              <img src="/static/images/icon-order-after-sale.png" alt="">
              <span>售后</span>
            </li>
          </ul>
        </div>
        <div class="m-one-part">
          <p class="m-one-part-title">
            <span class="m-name">常用工具</span>
          </p>
          <ul class="m-part-icon-ul m-use">
            <li>
              <img src="/static/images/icon-personal-service.png" alt="">
              <span>客服中心</span>
            </li>
            <li>
              <img src="/static/images/icon-personal-security-center.png"  alt="">
              <span>安全中心</span>
            </li>
            <li>
              <img src="/static/images/icon-personal-discount.png"  alt="">
              <span>优惠中心</span>
            </li>
          </ul>
        </div>
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
      changeRoute(v){
        this.$router.push(v)
      }
    },
    created() {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
 @import "../../../common/css/personal";
</style>
