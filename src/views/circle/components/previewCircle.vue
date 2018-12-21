<template>
  <div>
    <div v-if="from == 'detail'">
      <el-button type="primary" @click="preview('detail')">预 览</el-button>
    </div>
    <div v-else>
      <el-button type="text" class="preview-button" @click="preview('list')">列表预览</el-button>
      <el-button type="text" class="preview-button" @click="preview('detail')">详情预览</el-button>
    </div>
    <!--列表预览dialog-->
    <el-dialog v-el-drag-dialog :visible.sync="listDialog" width="810px"
               :center="true" title="列表预览" :append-to-body="true" v-if="where == 'list'">
      <div class="m-circle-body">
        <template>
          <div class="m-video-one">
            <h3>{{circle.netitle}}</h3>
            <div class="m-video-box" v-if="circle.showtype == 'video'">
              <video src="" class="m-video"></video>
              <div class="m-img-box">
                <img :src="circle.videothumbnail" class="m-img">
              </div>
              <span class="m-video-time">{{circle.videoduration}}</span>
              <span class="m-icon-video"></span>
            </div>
            <div class="m-img-box" v-else-if="circle.showtype == 'picture'">
              <img :src="circle.mainpic" class="m-img">
            </div>
            <p class="m-text" v-else>
              {{circle.netext}}
            </p>
            <ul class="m-video-icon-ul">
              <li>
                <span class="m-icon-like " :class="circle.is_favorite?'active':''"></span>
                <span>{{circle.favoritnumber}}</span>
              </li>
              <li class="m-border">
                <span class="m-icon-comment"></span>
                <span>{{circle.commentnumber}}</span>
              </li>
              <li>
                <span class="m-icon-transmit"></span>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </el-dialog>

    <!--详情预览dialog-->
    <el-dialog v-el-drag-dialog :visible.sync="detailDialog" width="820px" top="5vh"
               :center="true" title="详情预览" :append-to-body="true">
      <div class="m-circle-detail">
        <div class="m-circle-content" v-if="news_info">
          <h3 class="m-circle-title">{{news_info.netitle}}</h3>
          <div class="m-author-box" v-if="news_info.author">
            <img class="m-author-img" :src="news_info.author.usheader">
            <div class="m-author-name">{{news_info.author.usname}}</div>
            <div>{{news_info.createtime}}</div>
          </div>
          <template v-if="news_info.image" v-for="item in news_info.image">
            <img class="m-circle-img" :src="item.niimage">
          </template>
          <div class="m-content">
            <p>{{news_info.netext}}</p>
            <div class="m-video-box" v-if="news_info.video">
              <div class="m-img-box">
                <img :src="news_info.video.nvthumbnail" class="m-img">
              </div>
              <video :src="news_info.video.nvvideo" id="videoPlay" v-show="false">您的浏览器不支持 video 视频播放</video>
              <span class="m-video-time">{{news_info.video.nvduration}}</span>
              <span class="m-icon-video"></span>
            </div>
          </div>
        </div>
        <div class="m-circle-foot" v-if="news_info">
          <div class="float-left">
            <span class="m-icon-btn" :class="news_info.is_favorite == 1 ? 'active' : ''">
              <span class="m-icon-zan"></span>
              <span>赞同 {{news_info.favoritnumber}}</span>
            </span>
                <span class="m-icon-btn" :class="news_info.is_trample == 1 ? 'active' : ''">
              <span class="m-icon-cai"></span>
              <span>反对 {{news_info.tramplenumber}}</span>
            </span>
          </div>
          <span class="m-circle-comment float-right">评论 {{news_info.commentnumber}}</span>
        </div>
        <div class="m-box">
          <div class="m-item" v-if="news_info.coupon.length">
            <div class="m-box-title">优惠领取</div>
            <coupon-card :couponList="news_info.coupon"></coupon-card>
          </div>
          <div class="m-item" v-if="news_info.product.length">
            <div class="m-box-title m-margin">相关推荐</div>
            <product :list="news_info.product"></product>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import elDragDialog from 'src/directive/el-dragDialog'
  import couponCard from './couponCard'
  import product from './product'

  export default {
    name: "previewCircle",
    data() {
      return {
        listDialog: false,
        detailDialog: false,
        where: '',
        news_info: { author: {}, coupon: [], product: [] },
        neid: ''
      }
    },
    props: {
      from: { type: String, default: '' },
      circle: { type: Object, default() { return {} }}
    },
    directives: { elDragDialog },
    components: { couponCard, product },
    mounted() {

    },
    methods: {
      // 预览
      preview(where) {
        this.where = where;
        if(where == 'list') {
          this.listDialog = true;
        }else if(where == 'detail') {
          if(this.from == 'detail') {
            this.news_info = this.circle;
            this.detailDialog = true;
          }else {
            this.neid = this.circle.neid;
            this.getNewsDetail();
          }
        }
      },
      // 获取资讯详情
      getNewsDetail(){
        this.$http.get(this.$api.get_news_content, { params:{ neid: this.neid }}).then(res => {
          if(res.data.status == 200){
            this.news_info = res.data.data;
            this.detailDialog = true;
          }
        })
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../styles/myIndex";

  .m-circle-body{
    padding: 20px 28px;
    background-color: #eee;
    .m-video-one{
      position: relative;
      width: 700px;
      border-radius: 10px;
      box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.16);
      margin-bottom: 30px;
      background-color: #fff;
      padding-bottom: 26px;
      .m-mark-label{
        position: absolute;
        top:10px;
        right:0;
        height: 33px;
        line-height: 33px;
        padding: 0 25px;
        background-color: #E9E9E9;
        border-radius: 10px  0   0  10px;
        box-shadow: 3px 5px 6px 0 rgba(0, 0, 0, 0.16);
        font-size: 18px;
        color: #999999;
        &.active{
          color: #C70000;
        }
      }
      h3{
        font-size: 28px;
        font-weight: bold;
        text-align: left;
        padding: 10px 20px;
      }
      .m-video-box{
        position: relative;
        .m-video{
          display: block;
          width: 700px;
          height: 360px;
          position: absolute;
          top:0;
          left: 0;
        }
        .m-icon-video{
          display: block;
          width: 109px;
          height: 109px;
          position: absolute;
          top: 125px;
          left: 298px;
          background: url("/static/images/icon-video.png") no-repeat;
          background-size: 100% 100%;
        }
        .m-video-time{
          position: absolute;
          bottom: 4px;
          right: 40px;
          color: #fff;
        }
      }
      .m-img-box {
        width: 700px;
        height: 360px;
        position: relative;
        background-color: #ffffff;
        .m-img {
          max-width: 700px;
          max-height: 360px;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
        }
      }
      .m-text{
        text-align: left;
        padding: 10px 22px;
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
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin: 18px 0 0;
        color: #999;
        li{
          width: 33.3%;
          text-align: center;
          line-height: 30px;
          align-items: center;
          font-size: 20px;
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
          margin-right: 10px;
          &.active{
            background: url("/static/images/icon-like-active.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .m-icon-comment{
          display: inline-block;
          width: 27px;
          height: 21px;
          background: url("/static/images/icon-comment.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 10px;
        }
        .m-icon-transmit{
          display: inline-block;
          width: 23px;
          height: 20px;
          background: url("/static/images/icon-transmit.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .m-invite-course {
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        z-index: 10;
      }
      .m-refuse-reason{
        padding: 14px 0;
        border-top: 1px solid #CCCCCC;
        text-align: left;
        margin: 30px 20px 0 20px;
        color: #C70000;
        font-size: 18px;
      }
    }
  }
  .m-circle-detail {
    position: relative;
    height: 780px;
    overflow: auto;
    overflow-x: hidden;
  }
  .m-circle-content{
     padding: 0 0 100px 0;
     .m-circle-title{
       font-size: 28px;
       font-weight: bold;
       margin-left: 28px;
       text-align: left;
     }
     .m-author-box {
       display: flex;
       align-items: center;
       margin: 25px 40px;
       font-size: 24px;
       .m-author-img {
         display: block;
         width: 40px;
         height: 40px;
         border-radius: 50%;
         margin-right: 18px;
         border: none;
         background: url("/static/images/logo.png") no-repeat;
         background-size: 100% 100%;
       }
       .m-author-name {
         flex: 1;
         text-align: left;
         color: #999999;
       }
     }
     .m-circle-img{
       display: block;
       width: 750px;
       max-height: 100%;
       background-color: #9fd0bf;
       /*margin: 14px 0 30px ;*/
     }
     .m-content{
       padding: 46px 46px 0 46px;
       text-align: left;
       .m-video-box{
         position: relative;
         .m-img-box {
           width: 700px;
           height: 360px;
           position: relative;
           background-color: #ffffff;
           .m-img {
             max-width: 700px;
             max-height: 360px;
             position: absolute;
             top: 0;
             right: 0;
             bottom: 0;
             left: 0;
             margin: auto;
           }
         }
         .m-video{
           display: block;
           width: 100%;
           height: 360px;
           border-radius: 10px;
           margin-bottom: 20px;
           /*border: 1px red solid;*/
         }
         .m-video-img{
           position: absolute;
           top:0;
           left: 0;
           width: 100%;
           height: 360px;
           border-radius: 10px;
         }
         .m-icon-video{
           display: block;
           width: 109px;
           height: 109px;
           position: absolute;
           top: 130px;
           left: 290px;
           background: url("/static/images/icon-video.png") no-repeat;
           background-size: 100% 100%;
         }
         .m-video-time{
           position: absolute;
           bottom: -150px;
           right: 13px;
           color: #fff;
         }
       }
       h3{
         font-size: 28px;
         font-weight: bold;
         margin-bottom: 20px;
       }
       p{
         margin-bottom: 20px;
         color: #666666;
       }
     }
   }
  .m-circle-foot{
    width: 750px;
    position: fixed;
    bottom: -70px;
    z-index: 200;
    display: flex;
    justify-content: space-between;
    box-shadow: 5px 5px 6px 5px rgba(0, 0, 0, 0.16);
    padding: 30px 49px 30px 45px;
    background-color: #fff;
    margin: 0 0 130px 0;
    font-size: 18px;
    &:after{
      content: '';
      display: block;
      clear: both;
    }
    .m-circle-comment{
      display: block;
      width: 90px;
      height: 45px;
      line-height: 35px;
      font-size: 24px;
      padding: 3px 10px;
      background: url("/static/images/icon-circle-comment.png") no-repeat;
      background-size: 100% 100%;
      color: #fff;
    }
    .m-icon-btn{
      display: inline-block;
      padding: 5px 18px 0 18px;
      background-color: #ccc;
      border-radius: 10px;
      color: #fff;
      font-size: 24px;
      line-height: 42px;
      margin-right: 30px;
      vertical-align: middle;
      &.active{
        background-color: #22A7D2;
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
        vertical-align: text-bottom;
      }
    }
  }
  .m-box {
    margin: -100px 0 120px 0;
    .m-item {
      text-align: left;
      .m-box-title {
        font-size: 28px;
        font-weight: bold;
        margin: 0 0 15px 46px;
        &.m-margin {
          margin: 20px 0 -10px 46px;
        }
      }
    }
  }
</style>
