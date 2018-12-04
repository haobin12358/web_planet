<template>
  <div class="m-bottomService-foot">
    <div class="m-foot-btn">
      <span class="m-icon-service"></span>
      <span>联系卖家</span>
    </div>
    <div class="m-foot-btn">
      <span class="m-icon-tell"></span>
      <span>拨打电话</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bottom-service"
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
 .m-bottomService-foot{
  width: 700px;
  border-radius: 10px;
  background-color: #FCD316;
  height: 86px;
  line-height: 86px;
  margin: 150px 25px 50px 25px;
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
</style>
