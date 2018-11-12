<template>
  <div class="m-member">
    <!--搜索-->
    <div class="m-selected-search">
      <div class="m-search-input-box" @click="changeRoute('/search')">
        <span class="m-icon-search"></span>
        <span>搜索品牌/商品</span>
      </div>
    </div>
    <div class="m-img-box">
      <img class="m-member-img" src="http://hsingfo-curtain.com/images/Banner/635450965258533382.jpg" alt="">
      <div class="m-img-text-box">
        <div class="m-img-text"><span class="m-img-text-bold">25</span> Spt</div>
        <div class="m-img-text">九月 / 星期二</div>
      </div>
    </div>
    <!--内容-->
    <div class="m-member-content">
      <div class="m-member-part" @click="productDetail">
        <div class="m-part-left">
          <img class="m-product-img" src="http://dummyimage.com/200x200" alt="">
        </div>
        <div class="m-part-right">
          <div class="m-product-name">哑铃</div>
          <div class="m-product-description">商品描述活动描述商品描述活动描述商品描述活动描述商品描述活动描述商品</div>
          <div class="m-price-share">
            <div class="m-product-price">押金：<span class="m-price-time">3个月500元</span></div>
            <img class="m-share-img" src="/static/images/icon-gray-share.png" alt="" @click="productShare">
            <div class="m-share-text" @click="productShare">分享</div>
          </div>
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
      // 跳转其他页面的方法
      changeRoute(v){
        this.$router.push(v)
      },
      // 商品详情
      productDetail() {
        this.$router.push('/member/detail');
      },
      // 商品分享按钮
      productShare() {
        console.log("share");
      }
    },
    created() {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-member {
    min-height: 100%;
    .m-search-input-box {
      width: 680px !important;
    }
    .m-swipe{
      padding: 0 33px;
      /*margin: auto;*/
    }
    .m-img-box {
      .m-member-img {
        width: 750px;
        height: 180px;
      }
      .m-img-text-box {
        position: absolute;
        left: 50px;
        top: 120px;
        text-align: left;
        .m-img-text {
          color: #333333;
          font-size: 40px;
        }
        .m-img-text-bold {
          font-size: 60px;
          font-weight: bold;
        }
      }
    }
    .m-member-content {
      padding: 0 55px;
      .m-member-part {
        display: flex;
        margin-bottom: 100px;
        &:first-child {
          margin-top: 70px;
        }
        .m-part-left {
          .m-product-img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
        }
        .m-part-right {
          display: flex;
          flex-direction: column;
          text-align: left;
          margin: 0 0 10px 20px;
          .m-product-name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 15px;
          }
          .m-product-description {
            flex: 1;
            font-size: 24px;
          }
          .m-price-share {
            display: flex;
            .m-product-price {
              flex: 1;
              color: #999999;
              font-size: 25px;
              .m-price-time {
                color: #C70000;
              }
            }
            .m-share-img {
              width: 25px;
              height: 30px;
            }
            .m-share-text {
              color: #999999;
              font-size: 25px;
              margin: -2px 0 0 10px;
            }
          }
        }
      }
    }
  }
</style>
