<template>
    <div class="m-circle">
      <!--搜索-->
      <div class="m-selected-search">
        <div class="m-search-input-box">
          <span class="m-icon-search"></span>
          <span>搜索圈子关键词</span>
        </div>
        <span class="m-icon-upload"></span>
      </div>
      <div class="m-circle-content">
         <div class="m-scroll-l">
           <ul class="m-circle-nav">
             <li class="active">全部</li>
             <li>运动健身</li>
             <li>户外徒步</li>
             <li>露营体验</li>
             <li>潜水滑雪</li>
           </ul>
         </div>
        <div class="m-video-one">
          <span class="m-video-label">【运动健身】</span>
          <video src="" class="m-video"></video>
          <span class="m-icon-video"></span>
          <span class="m-video-like">
            <span class="m-like-icon"></span>
            <span>12545</span>
          </span>
          <ul class="m-video-icon-ul">
            <li>
              <span class="m-icon-like"></span>
            </li>
            <li class="m-border">
              <span class="m-icon-comment"></span>
            </li>
            <li>
              <span class="m-icon-transmit"></span>
            </li>
          </ul>
        </div>
        <div class="m-video-one">
          <span class="m-video-label">【运动健身】</span>
          <video src="" class="m-video"></video>
          <span class="m-icon-video"></span>
          <span class="m-video-like">
            <span class="m-like-icon active"></span>
            <span>12545</span>
          </span>
          <ul class="m-video-icon-ul">
            <li>
              <span class="m-icon-like"></span>
            </li>
            <li class="m-border">
              <span class="m-icon-comment"></span>
            </li>
            <li>
              <span class="m-icon-transmit"></span>
            </li>
          </ul>
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
  .m-circle{
    .m-circle-content{
      padding: 0 28px;
      .m-scroll-l{
        width: 700px;
        overflow-x: auto;
        overflow-y: hidden;
        margin: 20px 0 46px;
        .m-circle-nav{
          width: 101%;
          overflow-y: hidden;
          text-align: left;
          display: inline;
          white-space: nowrap;
          overflow-x: scroll;
          li{
            display: inline-block;
            padding: 5px;
            /*width: 150px!important;*/
            height: 34px;
            line-height: 34px;
            margin-right: 62px;
            &.active{
              border-bottom: 3px solid @mainColor;
            }
          }
        }
      }
      .m-video-one{
        position: relative;
        width: 700px;
        height: 260px;
        border-radius: 10px;
        box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.16);
        margin-bottom: 30px;
        .m-video-label{
          position: absolute;
          top:-21px;
          left:16px;
          height: 43px;
          line-height: 43px;
          padding: 0 25px;
          background-color: #fcd316;
          border-radius: 40px;
          box-shadow: 3px 5px 6px 0 rgba(0, 0, 0, 0.16);
        }
        .m-video{
          display: block;
          width: 700px;
          height: 200px;
          background-color: #9fd0bf;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .m-icon-video{
          display: block;
          width: 91px;
          height: 91px;
          position: absolute;
          top: 55px;
          left: 331px;
          background: url("/static/images/icon-video.png") no-repeat;
          background-size: 100% 100%;
        }
        .m-video-like{
          position: absolute;
          top: 161px;
          right:16px;
          color: #fff;
          height: 27px;
          line-height: 27px;
          .m-like-icon{
            display: inline-block;
            width: 28px;
            height: 27px;
            background: url("/static/images/icon-collect.png") no-repeat;
            background-size: 100% 100%;
            vertical-align: text-bottom;
            margin-right: 10px;
            &.active{
              background: url("/static/images/icon-collect-active.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
        .m-video-icon-ul{
          .flex-row(space-around);
          margin: 18px 0;
          li{
            width: 33.3%;
            text-align: center;
          }
          .m-border{
            border-left: 1px solid #999999;
            border-right: 1px solid #999999;
          }
          .m-icon-like{
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url("/static/images/icon-like.png") no-repeat;
            background-size: 100% 100%;
          }
          .m-icon-comment{
            display: inline-block;
            width: 27px;
            height: 21px;
            background: url("/static/images/icon-comment.png") no-repeat;
            background-size: 100% 100%;
          }
          .m-icon-transmit{
            display: inline-block;
            width: 23px;
            height: 20px;
            background: url("/static/images/icon-transmit.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>
