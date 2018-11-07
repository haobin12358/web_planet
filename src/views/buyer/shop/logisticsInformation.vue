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
        <p>物流信息：</p>
        <ul class="m-logisticsInformation-ul">
          <li>
            <div class="m-time">
              <p>09-21</p>
              <p class="m-ft-22">09:19</p>
            </div>
            <div class="m-logisticsInformation-info">
              <span class="m-circle active"></span>
              <span class="m-top"></span>
              <p>已揽件</p>
              <p class="m-ft-22">【杭州市】包裹由物流公司揽收</p>
            </div>
          </li>
          <li>
            <div class="m-time">
              <p>09-21</p>
              <p class="m-ft-22">09:19</p>
            </div>
            <div class="m-logisticsInformation-info">
              <span class="m-circle"></span>
              <p class="m-ft-22">【杭州市】包裹由物流公司揽收</p>
            </div>
          </li>
          <li>
            <div class="m-time">
              <p>09-21</p>
              <p class="m-ft-22">09:19</p>
            </div>
            <div class="m-logisticsInformation-info">
              <span class="m-circle active"></span>
              <span class="m-bottom"></span>
              <p>已揽件</p>
              <p class="m-ft-22">【杭州市】包裹由物流公司揽收</p>
            </div>
          </li>
        </ul>
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
  .m-logisticsInformation-text{
    padding: 18px 0;
    .m-logisticsInformation-ul{
      margin-top: 20px;
      li{
        .flex-row(flex-start);
        align-items: flex-start;
        /*padding: 25px 0;*/
        .m-time{
          width: 80px;
          text-align: right;
        }
        .m-logisticsInformation-info{
          position: relative;
          padding: 0 35px 0;
          height: 120px;
          border-left: 1px dashed @mainColor;
          margin-left: 40px;
          .m-top{
            position: absolute;
            top: 0;
            left: -4px;
            width: 8px;
            height: 10px;
            background-color: #eee;
          }
          .m-bottom{
            position: absolute;
            top: 40px;
            left: -4px;
            width: 8px;
            height: 80px;
            background-color: #eee;
          }
          .m-circle{
            position: absolute;
            left: -7.5px;
            top: 10px;
            width: 15px;
            height: 15px;
            background-color: @mainColor;
            border-radius: 50%;
            &.active{
              width: 30px;
              height: 30px;
              left: -15px;
            }
          }
        }
      }
    }
  }
}
</style>
