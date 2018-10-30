<template>
    <div class="m-circle-detail">
      <!--搜索-->
      <div class="m-selected-search">
        <span class="m-icon-back"></span>
        <div class="m-search-input-box">
          <span class="m-icon-search"></span>
          <span>搜索圈子关键词</span>
        </div>
      </div>
      <div class="m-circle-content">
        <h3 class="m-circle-title">谈谈我健身10年的体验</h3>
        <img src="" class="m-circle-img" alt="">
        <div class="m-content">
          <h3>健身的注意事项</h3>
          <p>什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么...</p>
          <video src=""></video>
          <p>什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么...</p>
        </div>
      </div>
      <div class="m-circle-foot">
        <div class="float-left">
          <span class="m-icon-btn active">
            <span class="m-icon-zan"></span>
            <span>赞同120</span>
          </span>
          <span class="m-icon-btn">
            <span class="m-icon-cai"></span>
          </span>
        </div>
        <span class="m-circle-comment float-right">评论</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "detail"
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "../../../common/css/index";
.m-circle-content{
  margin: 18px 0 38px;
  .m-circle-title{
    font-size: 28px;
    font-weight: bold;
    margin-left: 28px;
    text-align: left;
  }
  .m-circle-img{
    display: block;
    width: 100%;
    height: 450px;
    background-color: #9fd0bf;
    margin: 14px 0 30px ;
  }
  .m-content{
    padding: 46px 46px 200px;
    text-align: left;
    h3{
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    p{
      margin-bottom: 20px;
      color: #666666;
    }
    video{
      display: block;
      width: 100%;
      height: 360px;
      border-radius: 10px;
      background-color: #9fd0bf;
      margin-bottom: 20px;
    }
  }
}
.m-circle-foot{
  position: fixed;
  z-index: 1000;
  bottom: 0;
  left: 0;
  padding: 45px 49px 98px;
  width: 652px;
  background-color: #fff;
  font-size: 18px;
  &:after{
    content: '';
    display: block;
    clear: both;
  }
  .m-circle-comment{
    display: block;
    width: 67px;
    height: 45px;
    line-height: 45px;
    background: url("/static/images/icon-circle-comment.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
  }
  .m-icon-btn{
    display: inline-block;
    padding:0 18px;
    background-color: #ccc;
    border-radius: 10px;
    color: #fff;
    line-height: 42px;
    margin-right: 30px;
    &.active{
      background-color: @mainColor;
    }
    .m-icon-zan{
      display: inline-block;
      width: 38px;
      height: 38px;
      background: url("/static/images/icon-zan.png") no-repeat;
      background-size: 100% 100%;
      vertical-align: text-top;
    }
    .m-icon-cai{
      display: inline-block;
      width: 38px;
      height: 38px;
      background: url("/static/images/icon-cai.png") no-repeat top;
      background-size: 100% 100%;
      vertical-align: text-top;
    }
  }
}
</style>
