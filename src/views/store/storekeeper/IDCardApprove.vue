<template>
  <div class="m-IDCard">
    <div class="m-IDCard-row">
      <div class="m-row-title">真实姓名</div>
      <input type="text" class="m-row-input m-name-input" placeholder="请输入真实姓名">
    </div>
    <div class="m-IDCard-row">
      <div class="m-row-title">身份证号</div>
      <input type="text" class="m-row-input m-num-input" placeholder="请输入身份证号">
    </div>

    <div class="m-IDCard-row">
      <div class="m-row-title">身份证正面</div>
    </div>
    <img class="m-IDCard-img" src="/static/images/icon-upload-IDCard-img.png" alt="">
    <div class="m-IDCard-row">
      <div class="m-row-title">身份证反面</div>
    </div>
    <img class="m-IDCard-img" src="/static/images/icon-upload-IDCard-img.png" alt="">

    <div class="m-foot-btn">
      <span>提交申请</span>
    </div>
  </div>
</template>

<script>
  import common from '../../../common/js/common';

  export default {
    name: "IDCardApprove",
    mounted() {
      common.changeTitle('身份证认证');
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-IDCard {
    padding: 60px 50px;
    .m-IDCard-row {
      display: flex;
      margin-bottom: 25px;
      .m-row-title {
        color: #666666;
        font-size: 30px;
        margin-right: 32px;
      }
      .m-row-input {
        border: 1px #999999 solid;
        border-radius: 30px;
        font-size: 24px;
        padding-left: 30px;
      }
      .m-name-input {
        width: 220px;
      }
      .m-num-input {
        width: 450px;
      }
    }
    .m-IDCard-img {
      width: 655px;
      height: 429px;
      margin-bottom: 30px;
    }
    .m-foot-btn{
      margin: 30px -25px;
      span{
        display: inline-block;
        width: 700px;
        height: 106px;
        line-height: 106px;
        background-color: @mainColor;
        font-size: 38px;
        font-weight: bold;
        border-radius: 10px;
        box-shadow: 0 5px 6px rgba(0,0,0,0.16);
      }
    }
  }
</style>
