<template>
    <div class="m-circle-detail">
      <!--搜索-->
      <div class="m-selected-search">
        <span class="m-icon-back" @click="changeRoute"></span>
        <div class="m-search-input-box">
          <span class="m-icon-search"></span>
          <span>搜索圈子关键词</span>
        </div>
      </div>
      <div class="m-circle-content" v-if="news_info">
        <h3 class="m-circle-title">{{news_info.netitle}}</h3>
        <template v-if="news_info.image" v-for="(item,index) in news_info.image">
          <img :src="item.niimage" class="m-circle-img" alt="">
        </template>
        <div class="m-content">
          <!--<h3>健身的注意事项</h3>-->
          <p>{{news_info.netext}}</p>
          <div class="m-video-box" v-if="news_info.video">
            <video :src="news_info.video.nvvideo" class="m-video"></video>
            <img :src="news_info.video.nvthumbnail" class="m-video-img" alt="">
            <span class="m-video-time">{{news_info.video.nvduration}}</span>
            <span class="m-icon-video"></span>
          </div>
          <!--<p>什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么...</p>-->
        </div>
      </div>
      <div class="m-circle-foot" v-if="news_info">
        <div class="float-left">
          <span class="m-icon-btn active" @click.stop="isLickClick(1)">
            <span class="m-icon-zan"></span>
            <span>赞同{{news_info.favoritnumber}}</span>
          </span>
          <span class="m-icon-btn" @click.stop="isLickClick(0)">
            <span class="m-icon-cai"></span>
            <span>踩{{news_info.tramplenumber}}</span>
          </span>
        </div>
        <span class="m-circle-comment float-right" @click="changeModal('show_modal',true)">评论</span>
      </div>

      <div class="m-comment-modal" v-if="show_modal">
        <div class="m-modal-state">
          <span class="m-icon-close" @click="changeModal('show_modal',false)"></span>
          <div class="m-modal-content">
             <h3>全部{{total_count}}条评论</h3>
            <div class="m-scroll">
              <ul class="m-comment-ul">
                <li v-for="(items,index) in comment_list">
                  <img :src="items.user.usheader" class="m-user-img" alt="">
                  <div class="m-comment-text">
                    <div>
                      <p class="m-user-name">{{items.user.usname}}</p>
                      <p>{{items.nctext}}</p>
                      <div class="m-icon-list">
                        <span >{{items.createtime}}</span>
                        <div>
                          <span class="m-icon-like" :class="items.is_favorite?'active':''"></span>
                          <span>0</span>
                          <span class="m-icon-comment"></span>
                          <span>2</span>
                        </div>
                      </div>
                    </div>
                    <p class="m-comment-content" v-for="(item,i) in items.reply">
                      <span class="m-user-name">{{item.commentuser}}</span>
                      <span class="m-comment-back" v-if="item.replieduser">回复</span>
                      <span class="m-user-name m-mr" v-if="item.replieduser"> {{item.replieduser}}</span>
                      <span>{{item.nctext}}</span>
                    </p>
                    <input type="text" class="m-comment-input" v-if="items.comment">
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import api from '../../../api/api';
  var scroll = (function (className) {
    var scrollTop;
    return {
      afterOpen: function () {
        scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop;
        document.body.classList.add(className);
        document.body.style.top = -scrollTop + 'px';
      },
      beforeClose: function () {
        document.body.classList.remove(className);
        document.scrollingElement.scrollTop = scrollTop;
        document.body.scrollTop = scrollTop;
      }
    };
  })('scroll');
    export default {
        name: "detail",
      data(){
          return{
            show_modal:false,
            news_info:null,
            page_info:{
              page_num:1,
              page_size:10
            },
            isScroll:true,
            total_count:0,
            bottom_show:false,
            comment_list:null
          }
      },
      mounted(){
        this.getNewsDetail();
      },
      methods:{
        changeRoute(){
          this.$router.push('/circle')
        },
        changeModal(v,bool){
          this[v] = bool;
          if(bool){
            scroll.afterOpen();
          }else{
            scroll.beforeClose();
          }
          if(v == 'show_modal'){
            this.getComment();
          }
        },
        /*获取资讯详情*/
        getNewsDetail(){
          axios.get(api.get_news_content,{
            params:{
              neid:this.$route.query.neid,
              token:localStorage.getItem('token')
            }
          }).then(res => {
            if(res.data.status == 200){
              this.news_info = res.data.data;
            }
          })
        },
        /*点赞*/
        isLickClick(v){
          if(this.news_info.is_favorite == 1 || this.news_info.is_trample == 1){
            return false;
          }
          axios.post(api.favorite_news + '?token='+localStorage.getItem('token'),{
            neid:this.$route.query.neid,
            tftype:v
          }).then(res => {
            if(res.data.status == 200){
              if(v){
                this.news_info.favoritnumber =  this.news_info.favoritnumber +1;
                this.news_info.is_favorite = 1;
              }else{
                this.news_info.tramplenumber =  this.news_info.tramplenumber-1;
                this.news_info.is_trample =  1;
              }
            }
          })
        },
        /*获取评论*/
        getComment(){
          axios.get(api.get_news_comment,{
            params:{
              neid:this.$route.query.neid,
              token:localStorage.getItem('token'),
              page_num:this.page_info.page_num,
              page_size: this.page_info.page_size
            }
          }).then(res => {
            if(res.data.status == 200){
              this.isScroll =true;
              if(res.data.data.length >0){
                for(let i=0;i<res.data.data.length;i++){
                  res.data.data.comment = false;
                }
                if(this.page_info.page_num >1){
                  this.comment_list =  this.comment_list.concat(res.data.data);
                }else{
                  this.comment_list = res.data.data;
                }
                this.page_info.page_num = this.page_info.page_num + 1;
                this.total_count = res.data.total_count;
              }else{
                this.comment_list = null;
                this.page_info.page_num = 1;
                this.total_count = 0;
              }
            }
          })
        }
      }
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
    .m-video-box{
      position: relative;
      .m-video{
        display: block;
        width: 100%;
        height: 360px;
        border-radius: 10px;
        margin-bottom: 20px;
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
        top: 148px;
        left: 298px;
        background: url("/static/images/icon-video.png") no-repeat;
        background-size: 100% 100%;
      }
      .m-video-time{
        position: absolute;
        bottom: 4px;
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
.m-comment-modal{
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0,0,0,0.2);
  z-index: 1001;
  transition: opacity .5s;
  .m-modal-state{
    background-color: #fff;
    position: absolute;
    width: 100%;
    height: 80%;
    right:0;
    bottom:0;
    margin: auto;
    border: 1px solid @borderColor;
    border-radius: 50px 50px 0 0;
    -webkit-transition: height 0.88s;
    transition: height 0.88s;
    .m-icon-close{
      position: absolute;
      top:30px;
      right: 32px;
      width: 35px;
      height: 35px;
      background: url("/static/images/icon-close.png") no-repeat;
      background-size: 100% 100%;
    }
    .m-modal-content{
      padding: 28px 48px;
      h3{
        font-size: 28px;
      }
      .m-scroll{
        width: 650px;
        height: 880px;
        overflow-y: auto;
        .m-comment-ul{
          li{
            display: flex;
            flex-flow: row;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 80px;
            .m-user-img{
              display: block;
              width: 96px;
              height: 96px;
              border-radius: 50%;
              background-color: #9fd0bf;
              margin-right: 20px;
            }
            .m-user-name{
              font-weight: bold;
              text-align: left;
              &.m-mr{
                margin-right: 30px;
              }
            }
            .m-comment-text{
              width: 560px;
              text-align: left;
            }
            .m-icon-list{
              color: #999;
              .flex-row(space-between);
              margin: 25px 0 15px;
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
                margin-left: 34px;
              }
            }
            .m-comment-content{
              margin: 8px 0;
            }
            .m-comment-input{
              height: 40px;
              line-height: 40px;
              border: 1px solid #ccc;
              width: 80%;
            }
            .m-comment-back{
              display: inline-block;
              color: #999;
              margin: 0 16px;
            }
          }
        }
      }
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
    vertical-align: middle;
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
      vertical-align: text-bottom;
    }
  }
}
</style>
