<template>
    <div class="m-mainIndex">
      <div class="m-mainIndex-head m-flex-around">
        <div class="m-left">
          <img src=""  class="m-avator" alt="">
          <p class="m-user-name">居剧女孩</p>
          <p class="m-user-level">星会员</p>
        </div>
        <ul class="m-head-num-ul">
          <li>
            <p class="m-num">22</p>
            <p>关注</p>
          </li>
          <li class="m-num-line"></li>
          <li>
            <p class="m-num">22</p>
            <p>粉丝</p>
          </li>
          <li class="m-num-line"></li>
          <li>
            <p class="m-num">22</p>
            <p>喜欢</p>
          </li>
        </ul>
      </div>
      <div class="m-mainIndex-edit m-flex-between">
        <div class="m-flex-start">
          <img src="/static/images/circle/icon-edit.png" class="m-edit-icon" alt="">
          <span>我发布的</span>
        </div>
        <div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "mainIndex"
    }
</script>

<style scoped lang="less">
  @import "../../../common/css/index";
  .m-mainIndex{
    color: #000;
    .m-mainIndex-head{
      width: 100%;
      height: 250px;
      background: url("/static/images/circle/icon-mainIndex-bg.png") no-repeat;
      background-size: 100% 100%;
      color: #fff;
      padding: 30px 0;
      /*text-align: left;*/
      .m-avator{
        display: block;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-color: #9fd0bf;
      }
      .m-left{
        width: 150px;
        /*margin: 0 0 0 60px;*/
        .m-user-level{
          font-size: 16px;
          border: 1px solid #fff;
          display: block;
          padding: 0 16px;
        }
        .m-user-name{
          font-size: 32px;
          margin: 8px;
        }
      }
      .m-head-num-ul{
        .flex-row(space-between);
        font-size: 20px;
        li{
          /*border-right: 1px solid #fff;*/
          padding: 0 55px;
          &.m-num-line{
            padding: 0;
            height: 40px;
            width: 2px;
            background-color: #fff;
          }
        }
        .m-num{
          font-size: 40px;
        }
      }
    }
    .m-mainIndex-edit{
      padding: 30px 30px 30px 60px;
      border-bottom: 1px solid #F2F2F2;
      .m-edit-icon{
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-right: 20px;
      }
    }
  }
</style>
