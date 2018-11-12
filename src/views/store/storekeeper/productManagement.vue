<template>
  <div>
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
</template>

<script>
  export default {
    name: "productManagement",
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

  .m-product-box {

  }
</style>
