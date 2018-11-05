<template>
    <div class="m-logisticsInformation">
      <div class="m-one-part">
        <p>商品：女士冲锋衣</p>
        <div class="m-logisticsInformation-product-info">
          <img src="" alt="">
          <div>
            <p>订单号：123456789000</p>
            <div class="m-product-sku-price">
              <p>
                <span>规格：</span>
                <span>红色；XS</span>
              </p>
              <p>
                <span>付款金额:</span>
                <span class="m-price">￥899.00</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="m-one-part">
        <p class="m-flex-between">
          <span>物流：顺丰快递</span>
          <span class="m-ft-20">物流单号：123456789000</span>
        </p>
        <p class="m-flex-between m-mt-15">
          <span>收货人：居居女孩</span>
          <span>联系电话：15700000000</span>
        </p>
        <p>
          收货地址：杭州市-西湖区-浙江工业大学（屏峰校区）家和西苑14幢112
        </p>
      </div>
      <div class="m-map"></div>
      <div class="m-logisticsInformation-text">

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
.m-logisticsInformation{
  padding: 30px 45px;
  background-color: #eee;
  min-height: 1274px;
  text-align: left;
  color: #666;
  .m-one-part{
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow:0 5px 5px rgba(0,0,0,0.16);
    margin-bottom: 20px;
    p{
      line-height: 32px;
    }
    .m-mt-15{
      margin-top: 15px;
    }
    .m-logisticsInformation-product-info{
      .flex-row(flex-start);
      padding-top: 18px;
      img{
        display: block;
        width: 100px;
        height: 100px;
        margin-right: 40px;
      }
      .m-product-sku-price{
        width: 470px;
        margin-top: 44px;
        .flex-row(space-between);
      }
    }
  }
  .m-map{
    width: 100%;
    height: 614px;
    box-shadow:0 5px 5px rgba(0,0,0,0.16);
    border-radius: 10px;
  }
}
</style>
