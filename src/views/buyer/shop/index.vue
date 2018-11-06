<template>
    <div class="m-shop" >
     <div class="m-shop-bg">
       <span class="m-icon-bg"></span>
     </div>
      <div class="m-shop-content">
        <h3 class="m-shop-title">
          <span class="m-title">购物车</span>
          <span>管理</span>
        </h3>
        <p class="m-p">共58件商品</p>

        <!--<div class="m-no-coupon">-->
          <!--<span class="m-no-img m-shop-no-img"></span>-->
          <!--<p>购物车空空如也,<span class="m-red">去下单</span>吧~</p>-->
        <!--</div>-->
        <div class="m-shop-one">
          <div class="m-shop-store-name">
            <span class="m-icon-radio"></span>
            <span>背面</span>
            <span class="m-icon-more"></span>
          </div>
          <div class="m-shop-product ">
            <span class="m-icon-radio"></span>
            <div class="m-product-info">
              <img src="" class="m-product-img" alt="">
              <div>
                <h3>北面防雨防风软壳衣北面防雨防风软壳衣</h3>
                <p class="m-product-sku-select-p">
                  <span class="m-product-sku-select">
                     <span>绿色；XL</span>
                    <span class="m-sku-more"></span>
                  </span>
                </p>
                <div class="m-sku-num">
                  <span class="m-red">￥899</span>
                  <div class="m-num">
                    <span class="m-icon-cut"></span>
                    <input type="text" class="m-num-input" placeholder="0">
                    <span class="m-icon-add"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="m-shop-one">
          <div class="m-shop-store-name">
            <span class="m-icon-radio"></span>
            <span>背面</span>
            <span class="m-icon-more"></span>
          </div>
          <div class="m-shop-product ">
            <span class="m-icon-radio"></span>
            <div class="m-product-info">
              <img src="" class="m-product-img" alt="">
              <div>
                <h3>北面防雨防风软壳衣北面防雨防风软壳衣</h3>
                <p class="m-product-sku-select-p">
                  <span class="m-product-sku-select">
                     <span>绿色；XL</span>
                    <span class="m-sku-more"></span>
                  </span>
                </p>
                <div class="m-sku-num">
                  <span class="m-red">￥899</span>
                  <div class="m-num">
                    <span class="m-icon-cut"></span>
                    <input type="text" class="m-num-input" placeholder="0">
                    <span class="m-icon-add"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="m-shop-product ">
            <span class="m-icon-radio"></span>
            <div class="m-product-info">
              <img src="" class="m-product-img" alt="">
              <div>
                <h3>北面防雨防风软壳衣北面防雨防风软壳衣</h3>
                <p class="m-product-sku-select-p">
                  <span class="m-product-sku-select">
                     <span>绿色；XL</span>
                    <span class="m-sku-more"></span>
                  </span>
                </p>
                <div class="m-sku-num">
                  <span class="m-red">￥899</span>
                  <div class="m-num">
                    <span class="m-icon-cut"></span>
                    <input type="text" class="m-num-input" placeholder="0">
                    <span class="m-icon-add"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-shop-foot">
         <span class="m-icon-radio"></span>
         <div>
           <span>合计</span>
           <span class="m-red">￥18.0</span>
           <span class="m-shop-btn" @click.stop="payOrder">结算</span>
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
          payOrder(e){
            console.log(e)
            this.$router.push('/submitOrder');
          }
        },
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
.m-shop{
  width: 100%;
  min-height: 1334px;
  background-color: #EEEEEE;
  position: relative;
  /*z-index: -2;*/
  .m-shop-bg{
    width: 100%;
    height: 450px;
    background:linear-gradient(180deg,rgba(252,211,22,1) 0%,rgba(239,232,197,1) 100%);
    position: absolute;
    top:0;
    left: 0;
    /*z-index: -1;*/
    .m-icon-bg{
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 67px;
      background: url("/static/images/icon-shop-bg.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .m-shop-content{
    padding: 0 25px;
    text-align: left;
    position: absolute;
    top:0;
    left: 0;
    .m-no-coupon{
      margin-top: 200px;
    }
    .m-shop-title{
      .flex-row(space-between);
      padding: 20px 0;
      .m-title{
        font-size: 38px;
        font-weight: bold;
      }
    }
    .m-p{
      padding: 0 0 40px;
    }
    .m-shop-one{
      background-color: #fff;
      width: 654px;
      padding: 23px;
      border-radius: 10px;
      box-shadow:0 5px 6px rgba(0,0,0,0.16);
      color: #333;
      margin-bottom: 20px;
      .m-icon-radio{
        margin-right: 35px;
      }
      .m-icon-more{
        display: inline-block;
        width: 23px;
        height: 23px;
        background: url("/static/images/icon-more.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 25px;
        vertical-align: text-top;
      }
      .m-shop-store-name{
        font-weight: 400;
      }
      .m-shop-product{
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: flex-start;
        margin: 30px 0;
        .m-product-info{
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: flex-start;
          .m-product-img{
            display: block ;
            width: 153px;
            height: 153px;
            background-color: #edb3b1;
            margin-right: 30px;
          }
          h3{
            font-weight: 400;
          }
          .m-product-sku-select-p{
            margin: 30px 0 30px;
            .m-product-sku-select{
              padding: 8px 20px;
              background-color: #E9E9E9;
              border-radius: 10px;
              .m-sku-more{
                display: inline-block;
                width: 16px;
                height: 16px;
                background: url("/static/images/icon-down.png") no-repeat;
                background-size: 100% 100%;
                margin-left: 23px;
              }
            }
          }

        }
      }
    }
  }
  .m-shop-foot{
    position: fixed;
    bottom: 103px;
    left: 0;
    height: 90px;
    padding: 0 50px;
    width: 650px;
    background-color: #fff;
    z-index: 10;
    .flex-row(space-between);
    color: #999999;
    line-height: 60px;
    .m-red{
      color: @mainColor;
      font-size: 30px;
      margin: 0 10px;
    }
    .m-shop-btn{
      display: inline-block;
      width: 193px;
      height: 60px;
      background:linear-gradient(90deg,rgba(245,236,178,1) 0%,rgba(252,211,22,1) 100%);
      border-radius: 30px;
      font-size: 30px;
      color: #333;
    }
  }
  .m-icon-radio{
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url("/static/images/icon-radio.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: text-top;
    &.active{
      background: url("/static/images/icon-radio-active.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
