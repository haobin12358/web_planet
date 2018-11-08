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
        <span class="m-circle-comment float-right" @click="changeModal('show_modal',true)">评论</span>
      </div>

      <div class="m-comment-modal" v-if="show_modal">
        <div class="m-modal-state">
          <span class="m-icon-close" @click="changeModal('show_modal',false)"></span>
          <div class="m-modal-content">
             <h3>全部52条评论</h3>
            <div class="m-scroll">
              <ul class="m-comment-ul">
                <li>
                  <img src="" class="m-user-img" alt="">
                  <div class="m-comment-text">
                    <div>
                      <p class="m-user-name">momo酱</p>
                      <p>很有收获学习~</p>
                      <div class="m-icon-list">
                        <span >18/09/25</span>
                        <div>
                          <span class="m-icon-like"></span>
                          <span>25</span>
                          <span class="m-icon-comment"></span>
                          <span>2</span>
                        </div>
                      </div>
                    </div>
                    <p class="m-comment-content">
                      <span class="m-user-name">jojo</span>
                      <span class="m-comment-back">回复</span>
                      <span class="m-user-name m-mr">jojo</span>
                      <span>我也很有收获学习~</span>
                    </p>
                    <p class="m-comment-content">
                      <span class="m-user-name">jojo</span>
                      <span class="m-comment-back">回复</span>
                      <span class="m-user-name m-mr">jojo</span>
                      <span>我也很有收获学习~</span>
                    </p>
                  </div>
                </li>
                <li>
                  <img src="" class="m-user-img" alt="">
                  <div class="m-comment-text">
                    <div>
                      <p class="m-user-name">momo酱</p>
                      <p>很有收获学习~</p>
                      <div class="m-icon-list">
                        <span >18/09/25</span>
                        <div>
                          <span class="m-icon-like"></span>
                          <span>25</span>
                          <span class="m-icon-comment"></span>
                          <span>2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <img src="" class="m-user-img" alt="">
                  <div class="m-comment-text">
                    <div>
                      <p class="m-user-name">momo酱</p>
                      <p>很有收获学习~</p>
                      <div class="m-icon-list">
                        <span >18/09/25</span>
                        <div>
                          <span class="m-icon-like"></span>
                          <span>25</span>
                          <span class="m-icon-comment"></span>
                          <span>2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <img src="" class="m-user-img" alt="">
                  <div class="m-comment-text">
                    <div>
                      <p class="m-user-name">momo酱</p>
                      <p>很有收获学习~</p>
                      <div class="m-icon-list">
                        <span >18/09/25</span>
                        <div>
                          <span class="m-icon-like"></span>
                          <span>25</span>
                          <span class="m-icon-comment"></span>
                          <span>2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <img src="" class="m-user-img" alt="">
                  <div class="m-comment-text">
                    <div>
                      <p class="m-user-name">momo酱</p>
                      <p>很有收获学习~</p>
                      <div class="m-icon-list">
                        <span >18/09/25</span>
                        <div>
                          <span class="m-icon-like"></span>
                          <span>25</span>
                          <span class="m-icon-comment"></span>
                          <span>2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <img src="" class="m-user-img" alt="">
                  <div class="m-comment-text">
                    <div>
                      <p class="m-user-name">momo酱</p>
                      <p>很有收获学习~</p>
                      <div class="m-icon-list">
                        <span >18/09/25</span>
                        <div>
                          <span class="m-icon-like"></span>
                          <span>25</span>
                          <span class="m-icon-comment"></span>
                          <span>2</span>
                        </div>
                      </div>
                    </div>
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
            show_modal:false
          }
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
