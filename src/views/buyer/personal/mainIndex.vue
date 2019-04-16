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
        <div class="m-position-relative" @click="labelShow = !labelShow">
          <span class="m-label">全部</span>
          <img src="/static/images/circle/icon-up-more.png" class="m-up-more" alt="">
          <div class="m-scroll" v-show="labelShow">
            <ul class="m-label-ul">
              <li>
                全部
              </li>
              <li>
                游记
              </li>
              <li>
                自由主题
              </li>
              <li>
                全部
              </li>
              <li>
                游记
              </li>
              <li>
                自由主题
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="m-mainIndex-content">
        <div class="m-circle-item">
          <div class="m-circle-user-box">
            <div>
              <img src="" class="m-circle-user-avator" alt="">
              <span class="m-circle-user-name">juju</span>
              <span class="m-circle-user-level">星会员</span>
            </div>
            <span class="m-circle-collect">关注</span>
          </div>
          <div class="m-circle-img-box">
            <img src="" class="m-circle-img" alt="">
            <img src="" class="m-circle-img" alt="">
            <img src="" class="m-circle-img" alt="">
          </div>
          <div class="m-circle-text">
            <span class="m-circle-label">#去热带的岛屿游泳#</span>
            攻略测评打赏,榜单场景内容推荐网红打卡自由主题圈子活动游记攻略测评打赏榜单场景,内容推荐网红打卡自由主题圈子活动游记攻略测评打赏榜单场景内,容推荐自由zhuzhu
          </div>
          <div class="m-circle-loc m-flex-start">
            <img src="/static/images/circle/icon-loc.png" class="m-icon-loc" alt="">
            <span>杭州</span>
          </div>
          <div class="m-circle-icon-box m-flex-between">
            <img src="/static/images/circle/icon-share.png" class="m-icon" alt="">
            <div class="m-flex-end">
              <div class="m-circle-icon-one">
                <img src="/static/images/circle/icon-like.png" class="m-icon" alt="">
                <span>234</span>
              </div>
              <div class="m-circle-icon-one">
                <img src="/static/images/circle/icon-comment.png" class="m-icon" alt="">
                <span>234</span>
              </div>
              <div class="m-circle-icon-one">
                <img src="/static/images/circle/icon-collect.png" class="m-icon" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "mainIndex",
      data(){
          return{
            labelShow:false
          }
      }
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
      font-size: 28px;
      .m-edit-icon{
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-right: 20px;
      }
      .m-label{
        font-size: 24px;
      }
      .m-up-more{
        display: inline-block;
        width: 24px;
        height: 14px;
        margin-left: 10px;
      }
      .m-position-relative{
        position: relative;
        .m-scroll{
          height: 250px;
          overflow: scroll;
          background-color: #fff;
          width: 180px;
          text-align: center;
          position: absolute;
          bottom: -270px;
          right: -30px;
          font-size: 24px;
          transition: height 0.1s ease-out;
          .m-label-ul{
            overflow-y: scroll;
            overflow-x: hidden;
            li{
              padding: 15px 0;
            }
          }
        }
      }
    }
    .m-mainIndex-content{
      padding: 0 33px;
      background-color: #fff;
      .m-circle-item{
        border-bottom: 1px solid #F2F2F2;
        padding: 30px 0;
        .m-circle-user-box{
          .flex-row(space-between);
          padding-bottom: 20px;
          .m-circle-user-avator{
            display: inline-block;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #F2F2F2;
          }
          .m-circle-user-name{
            font-size: 28px;
            margin: 0 10px;
          }
          .m-circle-user-level{
            font-size: 16px;
            color: @mainColor;
            border: 1px solid @mainColor;
            padding: 0 10px;
          }
          .m-circle-collect{
            color: @mainColor;
            border: 1px solid @mainColor;
            padding: 0 20px;
            font-size: 24px;
          }
        }
        .m-circle-img-box{
          margin-bottom: 20px;
          display: flex;
          flex-flow: row;
          justify-content: flex-start;
          flex-wrap: wrap;
          .m-circle-img{
            display: block;
            width: 210px;
            height: 200px;
            margin: 0 10px 10px 0;
            background-color: #F2F2F2;
          }
        }
        .m-circle-text{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-align: left;
          margin-bottom: 20px;
          .m-circle-label{
            color: #006FCE;
          }
        }
        .m-circle-loc{
          color: #C1C1C1;
          font-size: 24px;
          text-align: left;
          margin-bottom: 20px;
          .m-icon-loc{
            display: inline-block;
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
        }
        .m-circle-icon-box{
          .m-icon{
            display: inline-block;
            width: 40px;
            height: 40px;
          }
          .m-circle-icon-one{
            display: flex;
            flex-flow: row;
            align-items: flex-start;
            margin-left: 40px;
          }
        }
      }
    }
  }
  /*滚动条样式*/
  .m-scroll::-webkit-scrollbar { /*滚动条整体样式*/
    width: 0; /*高宽分别对应横竖滚动条的尺寸*/
    height: 0;
    border-radius: 10px;
  }

  .m-scroll::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px @mainColor;
    background: @mainColor;
  }

  .m-scroll::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px #fbea7d;
    border-radius: 10px;
    background: #fbea7d;
  }
</style>
