<template>
  <div class="m-activity">
    <div class="m-activity-info">
      <img src="" class="m-activity-img" alt="">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-activity-text">
      <p>TAWA是一个源于德国的家庭车生活服务商品牌，致力于为家庭用
        户提供与自驾游相关所需装备的一站式解决方案。</p>
      <p class="m-up-fold">
        <span>点击展开 <span class="m-icon-unfold"></span></span>
        <span>点击收起 <span class="m-icon-packup"></span></span>
      </p>
    </div>

    <product></product>
  </div>
</template>

<script>
  import product from '../components/product';
  export default {
    data(){
      return{
      }
    },
    components:{
      product
    },
    methods: {

    },
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
  .m-activity{
    .m-activity-info{
      height:440px;
      width: 100%;
      position: relative;
      margin-bottom: 68px;
      .m-activity-img{
        display: block;
        width: 100%;
        height: 440px;
        background-color: #9fd0bf;
      }
      .m-icon-bg{
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100%;
        height: 67px;
        background: url("/static/images/icon-bg.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .m-activity-text{
      padding: 0 36px;
      text-align: left;
      .m-up-fold{
        text-align: right;
        padding: 19px 160px 34px;
        font-size: 22px;
        color: #999;
        .m-icon-unfold{
          display: inline-block;
          width: 22px;
          height: 10px;
          background: url("/static/images/icon-brand-unfold.png") no-repeat;
          background-size: 100% 100%;
          margin-left: 10px;
          vertical-align: middle;
        }
        .m-icon-packup{
          display: inline-block;
          width: 22px;
          height: 10px;
          background: url("/static/images/icon-packup.png") no-repeat;
          background-size: 100% 100%;
          margin-left: 10px;
          vertical-align: middle;
        }
      }
    }
  }
</style>
