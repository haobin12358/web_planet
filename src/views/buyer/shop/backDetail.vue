<template>
    <div class="m-backDetail">
      <div class="m-orderDetail-status">
        <div>
          <p class="m-ft-28">请等待商家处理</p>
          <p class="m-alert">点撤销申请后此处显示“退款关闭”</p>
        </div>
        <span class="m-icon-order-status "></span>
      </div>
      <div class="m-back-info-box">
        <p class="m-back-info">您已成功发起退款申请，请耐心等待商家处理。</p>
        <!--<div class="m-product-text">-->
          <!--<p>联系人：居居</p>-->
          <!--<p>联系电话：15700000000</p>-->
          <!--<p>地址：浙江省杭州市萧山区宁围镇宝盛世纪中心B座XXXX室</p>-->
          <!--<p>邮政编码：310012</p>-->
          <!--<p>-->
            <!--快递单号：-->
            <!--<input type="text" class="m-input">-->
          <!--</p>-->
        <!--</div>-->
        <p class="m-back-info-btn">
          <span>撤销申请</span></p>
      </div>
      <div class="m-back-product">
        <h3>退款信息</h3>
        <div class="m-back-product-info">
          <img src=""  alt="">
          <div>
            <p>女士冲锋衣</p>
            <p class="m-product-select">规格：红色；XS</p>
          </div>
        </div>
        <div class="m-product-text">
          <p>退款原因：拍错/多拍/不想要</p>
          <p>退款金额：￥899.00</p>
          <p>申请时间：2018-11-5 13:30</p>
          <p>退款编号：21574987145132156465444</p>
        </div>
      </div>
      <bottom></bottom>
    </div>
</template>


<script>
  import bottom from '../components/bottomService';
    export default {
       data(){
         return{

         }
       },
      components:{
         bottom
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
.m-backDetail{
  min-height: 100%;
  background-color: #eee;
  .m-orderDetail-status{
    .flex-row(flex-end);
    width: 100%;
    height: 220px;
    background-color: @mainColor;
    line-height: 36px;
    .m-icon-order-status{
      display: block;
      width: 288px;
      height: 147px;
      background: url("/static/images/icon-back-status.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 65px;
    }
    .m-alert{
      color: #C70000;
      font-size: 18px;
    }
  }
  .m-back-info-box{
    padding: 0 50px 0;
    background-color: #fff;
    margin-bottom: 20px;
    text-align: left;
    .m-back-info{
      padding: 28px 0;
      border-bottom: 1px solid #ccc;
      text-align: left;
    }
    .m-product-text{
      padding-left: 0;
      padding-top: 28px;
      color: #666;
    }
    .m-back-info-btn{
      padding: 34px 0 55px;
      text-align: right;
      span{
        display: inline-block;
        padding: 5px 41px;
        line-height: 41px;
        text-align: center;
        border-radius: 30px;
        border: 1px solid #ccc;
        color: #999;
      }
    }
  }
  .m-back-product{
    background-color: #fff;
    box-shadow:0 5px 5px rgba(0,0,0,0.16);
    text-align: left;
    padding: 20px 0;
    color: #666;
    h3{
      padding-left:  50px;
    }
    .m-back-product-info{
      .flex-row(flex-start);
      padding: 10px 50px;
      background-color: #eee;
      margin: 5px 0 30px;
      img{
        display: block;
        width: 119px;
        height: 119px;
        background-color: #9fd0bf;
        margin-right: 20px;
      }
      .m-product-select{
        font-size: 21px;
        margin-top: 59px;
      }
    }
  }
  .m-product-text{
    padding-left: 50px;
    font-size: 21px;
    line-height: 40px;
    text-align: left;
  }
  .m-input{
    display: inline-block;
    width: 480px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 30px;
    margin: 10px 0;
  }
}
</style>
