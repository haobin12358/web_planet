<template>
    <div class="m-submitOrder">
      <div class="m-one-part m-pl-s m-pr-s m-address-part">
        <div class="m-left">
          <div class="m-address-name">
            <div>
              <span class="m-border"></span>
              <span>收货人：居居女孩</span>
            </div>
            <span>15700000000</span>
          </div>
          <p class="m-address-p">
            收货地址：杭州市-西湖区-浙江工业大学（屏峰校区）家和西苑14幢112
          </p>
        </div>
        <span class="m-icon-more"></span>
      </div>
      <div class="m-one-part">
        <h3>北面</h3>
        <div class="m-product">
          <img src="" class="m-product-img" alt="">
          <div>
            <h3>北面防雨防风软壳衣</h3>
            <p class="m-sku-select">绿色；XL</p>
            <p class="m-price-num">
              <span class="m-price">￥899</span>
              <span>x1</span>
            </p>
          </div>
        </div>
      </div>
      <div class="m-one-part">
        <ul class="m-order-ul">
          <li class="m-sku-num">
            <span>购买数量</span>
            <div class="m-num">
              <span class="m-icon-cut"></span>
              <input type="text" class="m-num-input" placeholder="0">
              <span class="m-icon-add"></span>
            </div>
          </li>
          <li class="m-flex-between">
            <span>配送方式</span>
            <div>
              <span>快递:￥10.00</span>
              <span class="m-icon-more"></span>
            </div>
          </li>
          <li class="m-message">
            <span>买家留言：</span>
            <textarea name="" id=""  placeholder="选填"></textarea>
          </li>
          <li class="m-flex-between">
            <span>优惠方式</span>
            <div>
              <span class="m-grey">无优惠</span>
              <span class="m-icon-more"></span>
            </div>
          </li>
          <li class="m-flex-between">
            <span>付款方式</span>
            <div>
              <span>支付宝</span>
              <span class="m-icon-more"></span>
            </div>
          </li>
        </ul>
      </div>

      <div class="m-order-btn">
        <span>支付订单</span>
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
        methods: {},
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
.m-submitOrder{
  width: 100%;
  min-height: 100%;
  background-color: #eee;
  padding: 17px 25px 200px;
  color: #333;
  .m-icon-more{
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url("/static/images/icon-more.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
  }
  .m-one-part{
    width: 612px;
    padding: 16px 44px 22px;
    background-color: #fff;
    box-shadow:0 5px 6px rgba(0,0,0,0.16);
    border-radius: 10px;
    margin-bottom: 20px;
    text-align: left;
    &.m-pl-s{
      width: 630px;
      padding: 16px 14px 22px 26px;
      &.m-pr-s{
        width: 660px;
        padding: 16px 14px 22px 26px;
      }
    }
    &.m-pr-s{
      width: 642px;
      padding: 16px 14px 22px 44px;
    }
    &.m-address-part{
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-between;
      .m-left{
        width: 630px;
      }
      .m-address-name{
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        color: #666;
        .m-border{
          display: inline-block;
          width: 5px;
          height:50px;
          background:linear-gradient(180deg,rgba(255,251,223,1) 0%,rgba(252,211,22,1) 100%);
          vertical-align: middle;
          margin-right: 15px;
        }
      }
      .m-address-p{
        text-align: left;
        color: #999;
        padding-left: 20px;
        line-height: 28px;
      }
    }
    h3{
      font-size: 24px;
      font-weight: 400;
      color: #333;
    }
    .m-product{
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      h3{
        margin: 0;
      }
      .m-product-img{
        display: block;
        width: 100px;
        height: 100px;
        background-color: #edb3b1;
        margin-right: 20px;
      }
      .m-sku-select{
        margin: 8px 0;
        color: #999;
      }
      .m-price-num{
        margin: 0;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        width: 480px;
        .m-price{
          color: #FF6600;
        }
      }
    }
    .m-order-ul{
      li{
        border-bottom: 1px solid #ccc;
        padding: 28px 0;
        &:last-child{
          border-bottom: none;
        }
      }
    }
    .m-message{
      display: flex;
      flex-flow: row;
      textarea{
        display: block;
        min-height: 100px;
        width: 400px;
        padding: 0 40px 10px;
      }
    }
  }
  .m-order-btn{
    padding: 0;
    margin: 0;
    width: 700px;
    position: fixed;
    bottom: 83px;
    left: 25px;
    span{
      display: inline-block;
      width: 700px;
      height:106px;
      line-height: 106px;
      background:rgba(252,211,22,1);
      box-shadow:0 5px 6px rgba(0,0,0,0.16);
      border-radius: 10px;
      font-weight: bold;
      font-size: 38px;
    }
  }
}
</style>
