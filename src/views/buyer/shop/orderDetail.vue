<template>
    <div class="m-orderDetail">
       <div class="m-orderDetail-status">
         <span>买家已付款</span>
         <span class="m-icon-order-status"></span>
       </div>
      <div class="m-order-one-part">
        <div class="m-user-text">
          <span class="m-icon-wuliu"></span>
          <div class="m-flex-between">
            <div>
              <p class="m-wuliu-text">您的包裹已出库</p>
              <p>2018-11-05 11:55:09</p>
            </div>
            <span class="m-icon-more"></span>
          </div>
        </div>
        <div class="m-user-text">
          <span class="m-icon-loc"></span>
          <div>
            <p>
              <span>居居女孩</span>
              <span class="m-user-tel">15700000000</span>
            </p>
            <p class="m-bottom-text">
              收货地址：杭州市-西湖区-浙江工业大学（屏峰校区）家和西苑14幢112
            </p>
          </div>
        </div>
      </div>
      <div class="m-order-one-part m-box-shadow">
        <div class="m-order-store-tile">
          <div>
            <span class="m-icon-store"></span>
            <span class="m-store-name">背面</span>
            <span class="m-icon-more"></span>
          </div>
          <span class="m-red">待发货</span>
        </div>
        <div class="m-order-product-ul">
          <div class="m-product-info">
            <img src="" class="m-product-img" alt="">
            <div>
              <p class="m-flex-between">
                <span class="m-product-name">南面防雨防风软壳衣
                南面防雨防风软壳衣</span>
                <span>￥899</span>
              </p>
              <p class="m-flex-between m-sku-text m-ft-22">
                <span class="m-product-label">绿色；XL</span>
                <span >x1</span>
              </p>
            </div>
          </div>
        </div>
        <p class="m-flex-between m-ft-22">
          <span>运费</span>
          <span>￥0.00</span>
        </p>
        <p class="m-flex-between m-ft-22">
          <span>实付款（含运费）</span>
          <span class="m-price">￥899.00</span>
        </p>
        <p class="m-back-btn">
          <span @click="changeRoute('/selectBack')">退款</span>
        </p>
      </div>
      <div class="m-order-one-part m-box-shadow">
        <p>
          <span class="m-border"></span>
          <span>订单信息</span>
        </p>
        <div class="m-ft-22 m-time-text">
          <p>订单编号：123456789000</p>
          <p>创建时间：2018-11-05 11:26:00</p>
          <p>付款时间：2018-11-05 11:27:30</p>
          <p>发货时间：2018-11-05 11:55:09</p>
        </div>
      </div>
      <div class="m-align-right">
        <span>查看物流</span>
        <span class="active">确认收货</span>
      </div>

      <div class="m-orderDetail-foot">
        <div class="m-foot-btn">
          <span class="m-icon-service"></span>
          <span>联系卖家</span>
        </div>
        <div class="m-foot-btn">
          <span class="m-icon-tell"></span>
          <span>拨打电话</span>
        </div>
      </div>
    </div>
</template>

<script>
  import common from '../../../common/js/common'
    export default {
       data(){
         return{

         }
       },
      mounted(){
        common.changeTitle('订单列表');
      },
      methods:{
        changeRoute(v){
          this.$router.push(v);
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
.m-orderDetail{
  min-height: 100%;
  background-color: #eee;
  padding-bottom: 120px;
  .m-orderDetail-status{
    .flex-row(flex-end);
    width: 100%;
    height: 220px;
    background-color: @mainColor;
    .m-icon-order-status{
      display: block;
      width: 288px;
      height: 147px;
      background: url("/static/images/icon-order-status-pay.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 136px;
      margin-right: 65px;
      &.m-send{
        background: url("/static/images/icon-order-status-send.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .m-order-one-part{
    padding: 24px 24px 30px 50px;
    background-color: #fff;
    color: #666;
    margin-bottom: 20px;
    text-align: left;
    &.m-box-shadow{
      box-shadow:0 5px 5px rgba(0,0,0,0.16);
    }
    .m-icon-loc{
      display: inline-block;
      width: 60px;
      height: 60px;
      background: url("/static/images/icon-order-loc.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 30px;
    }
    .m-icon-wuliu{
      display: inline-block;
      width: 60px;
      height: 60px;
      background: url("/static/images/icon-order-wuliu.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 30px;
    }
    .m-wuliu-text{
      width: 540px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .m-icon-more{
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url("/static/images/icon-more.png") no-repeat;
      background-size: 100% 100%;
    }
    .m-user-text{
      /*width: 580px;*/
      text-align: left;
      padding: 35px 0;
      border-bottom: 1px solid @borderColor;
      &:last-child{
        border-bottom: none;
      }
      .flex-row(flex-start);
      .m-user-tel{
        display: inline-block;
        color: #999;
        margin-left: 56px;
      }
      .m-bottom-text{
        width: 580px;
        margin-top: 20px;
      }
    }
    .m-order-store-tile{
      .flex-row(space-between);
      .m-icon-store{
        display: inline-block;
        width: 31px;
        height: 29px;
        background: url("/static/images/icon-store.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: text-bottom;
      }
      .m-store-name{
        display: inline-block;
        margin: 0 25px;
      }
    }
    .m-order-product-ul{
      margin: 16px 0 65px;
      .m-product-info{
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        margin: 15px 0;
        .m-product-img{
          display: block;
          width: 100px;
          height: 100px;
          background-color: #9fd0bf;
          margin-right: 48px;
        }
        .m-sku-text{
          margin-top: 40px;
        }
        .m-product-name{
          display: block;
          width: 460px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
        }
      }
    }
    .m-back-btn{
      text-align: right;
      margin-top: 45px;
      span{
        display: inline-block;
        width: 129px;
        height: 41px;
        border-radius: 30px;
        background-color: @mainColor;
        text-align: center;
        line-height: 41px;
        font-weight: 400;
      }
    }
    .m-border{
      display: inline-block;
      width: 5px;
      height: 50px;
      background:linear-gradient(180deg,rgba(255,251,223,1) 0%,rgba(252,211,22,1) 100%);
      vertical-align: middle;
      margin-right: 10px;
    }
    .m-time-text{
      padding-left: 20px;
      p{
        line-height: 34px;
      }
    }
  }
  .m-orderDetail-foot{
    width: 700px;
    border-radius: 10px;
    background-color: @mainColor;
    height: 86px;
    line-height: 86px;
    margin: 200px 25px 50px;
    padding: 10px 0;
    .m-foot-btn{
      display: inline-block;
      width: 49%;
      border-left: 1px solid #fff;
      &:first-child{
        border-left: none;
      }
      .m-icon-service{
        display: inline-block;
        width: 59px;
        height: 60px;
        background: url("/static/images/m-serviceCenter-kefu.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
        margin-right: 43px;
      }
      .m-icon-tell{
        display: inline-block;
        width: 61px;
        height: 60px;
        background: url("/static/images/m-serviceCenter-tell.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
        margin-right: 36px;
      }
    }
  }
  .m-align-right{
    text-align: right;
    background-color: #fff;
    width: 100%;
    padding: 30px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    span{
      display: inline-block;
      width: 129px;
      height: 41px;
      line-height: 41px;
      border-radius: 30px;
      border: 1px solid #999;
      color: #999;
      text-align: center;
      margin-left: 40px;
      &.active{
        background-color: @mainColor;
        color: #333;
        border: 1px solid @mainColor;
      }
      &:last-child{
        margin-right: 25px;
      }
    }
  }
}
</style>
