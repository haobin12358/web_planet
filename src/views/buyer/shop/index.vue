<template>
    <div class="m-shop">
     <div class="m-shop-bg">
       <span class="m-icon-bg"></span>
     </div>
      <div class="m-shop-content">
        <h3 class="m-shop-title">
          <span class="m-title">购物车</span>
          <span>管理</span>
        </h3>
        <p class="m-p">共58件商品</p>

        <div class="m-shop-one">
        </div>
      </div>
      <div class="m-shop-foot">
         <span class="m-icon-radio"></span>
         <div>
           <span>合计</span>
           <span class="m-red">￥18.0</span>
           <span class="m-shop-btn">结算</span>
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
        methods: {},
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
  z-index: -2;
  .m-shop-bg{
    width: 100%;
    height: 450px;
    background:linear-gradient(180deg,rgba(252,211,22,1) 0%,rgba(239,232,197,1) 100%);
    position: absolute;
    top:0;
    left: 0;
    z-index: -1;
    .m-icon-bg{
      position: absolute;
      bottom: -1px;
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
    }
  }
  .m-shop-foot{
    position: fixed;
    bottom: 109px;
    left: 0;
    height: 90px;
    padding: 0 50px;
    width: 650px;
    background-color: #fff;
    z-index: 10;
    .flex-row(space-between);
    color: #999999;
    line-height: 60px;
    .m-icon-radio{
      display: block;
      width: 24px;
      height: 24px;
      background: url("/static/images/icon-radio.png") no-repeat;
      background-size: 100% 100%;
      &.active{
        background: url("/static/images/icon-radio-active.png") no-repeat;
        background-size: 100% 100%;
      }
    }
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
}
</style>
