<template>
    <div class="m-circle">
      <!--搜索-->
      <div class="m-selected-search">
        <div class="m-search-input-box" @click="changeRoute('/search','shtype','news' )">
          <span class="m-icon-search"></span>
          <span>搜索圈子关键词</span>
        </div>
        <span class="m-icon-upload" @click="changeRoute('/circle/editCircle')"></span>
      </div>
      <div class="m-circle-content">
        <nav-list :navlist="nav_list" :isScroll="true" :is-get="true" @navClick="navClick"></nav-list>
        <div class="m-circle-body">
          <div class="m-video-one">
            <span class="m-mark-label">审核中</span>
            <h3>谈谈我健身3年的体验</h3>
            <video src="" class="m-video"></video>
            <span class="m-icon-video"></span>
            <!--<span class="m-video-like">-->
              <!--<span class="m-like-icon"></span>-->
              <!--<span>12545</span>-->
            <!--</span>-->
            <ul class="m-video-icon-ul">
              <li>
                <span class="m-icon-like active"></span>
                <span>123</span>
              </li>
              <li class="m-border">
                <span class="m-icon-comment"></span>
                <span>123</span>
              </li>
              <li>
                <span class="m-icon-transmit"></span>
              </li>
            </ul>
          </div>
          <div class="m-video-one" @click="changeRoute('/circle/detail')">
            <!--<span class="m-video-label">【运动健身】</span>-->
            <span class="m-mark-label active">未通过</span>
            <h3>谈谈我健身3年的体验</h3>
            <img src="" class="m-img">
            <!--<span class="m-icon-video"></span>-->
            <!--<span class="m-video-like">-->
            <!--&lt;!&ndash;<span class="m-like-icon active"></span>&ndash;&gt;-->
            <!--<span>12545</span>-->
          <!--</span>-->
            <ul class="m-video-icon-ul">
              <li>
                <span class="m-icon-like"></span>
                <span>123</span>
              </li>
              <li class="m-border">
                <span class="m-icon-comment"></span>
                <span>123</span>
              </li>
              <li>
                <span class="m-icon-transmit"></span>
              </li>
            </ul>
            <div class="m-refuse-reason">
              未通过理由未通过理由未通过理由未通过理由未通过理由未通过理由未通过理由未通过理由未通过理由未通过理由理由未通过理由未通过理由，请重新发布。
            </div>
          </div>
          <div class="m-video-one" @click="changeRoute('/circle/detail')">
            <!--<span class="m-video-label">【运动健身】</span>-->
            <h3>谈谈我健身3年的体验</h3>
            <p class="m-text">
              分享我的2018年秋季莫干山露营体验分享我的2018年秋季莫干山露营体验分享我的2018年秋季莫干山露营体验分享我的2018年秋季莫干山露营体验分享我的2018年秋季莫干山露...
            </p>
            <ul class="m-video-icon-ul">
              <li>
                <span class="m-icon-like"></span>
                <span>123</span>
              </li>
              <li class="m-border">
                <span class="m-icon-comment"></span>
                <span>123</span>
              </li>
              <li>
                <span class="m-icon-transmit"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import navList from '../../../components/common/navlist';
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
    export default {
        data() {
            return {
                name: '',
              nav_list:[
                {
                  itdesc: "我是描述",
                  itid: "1",
                  itname: "全部",
                  itrecommend: true,
                  itsort: null,
                  ittype: 10,
                  psid: ""
                },
                {
                  itdesc: "我是描述",
                  itid: "2",
                  itname: "我发起的",
                  itrecommend: true,
                  itsort: null,
                  ittype: 10,
                  psid: ""
                }
              ],
              page_info:{
                page_num:1,
                page_size:10
              }
            }
        },
        components: {
          navList
        },
        mounted(){
           common.changeTitle('圈子');
           this.getNav();
        },
        methods: {
          /*跳转路由*/
          changeRoute(v,params,value){
            if(params == 'shtype'){
              this.$router.push({path:v,query:{shtype:value}})
            }else{
              this.$router.push({path:v})
            }
          },
          /*导航切换*/
          navClick(index){
            let arr = [].concat(this.nav_list);
            for(let i=0;i<arr.length;i++){
              arr[i].active = false;
            }
            arr[index].active = true;
            this.nav_list = [].concat(arr)
          },
          /*获取导航*/
          getNav(){
            axios.get(api.items_list,{
              params:{
                ittype:10
              }
            }).then(res => {
              if(res.data.status == 200){
                if(res.data.data.length == 0){
                  this.nav_list = this.nav_list.concat([])
                }else{
                  let arr=this.nav_list.concat( res.data.data);
                  for(let i=0;i<arr.length;i++){
                    arr[i].active = false;
                  }
                  arr[0].active = true;
                  this.nav_list = [].concat(arr);
                }
              }
            })
          },
          /*获取资讯列表*/
          getNews(){
            axios.get(api.get_all_news)
          }
        },
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../../common/css/index";
  .m-circle{
    min-height: 100vh;
    overflow-x: hidden;
    .m-circle-content{
      .m-scroll-l{
        width: 700px;
        overflow-x: auto;
        overflow-y: hidden;
        margin: 20px 0 0;
        padding: 0 28px;
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
      .m-circle-body{
        padding: 20px 28px;
        background-color: #eee;
        .m-video-one{
          position: relative;
          width: 700px;
          /*height: 260px;*/
          border-radius: 10px;
          box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.16);
          margin-bottom: 30px;
          background-color: #fff;
          padding-bottom: 26px;
          /*.m-video-label{*/
          /*position: absolute;*/
          /*top:-21px;*/
          /*left:16px;*/
          /*height: 43px;*/
          /*line-height: 43px;*/
          /*padding: 0 25px;*/
          /*background-color: #fcd316;*/
          /*border-radius: 40px;*/
          /*box-shadow: 3px 5px 6px 0 rgba(0, 0, 0, 0.16);*/
          /*}*/
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
          .m-video{
            display: block;
            width: 700px;
            height: 360px;
            background-color: #9fd0bf;
          }
          .m-img{
            display: block;
            width: 700px;
            height: 360px;
            background-color: #9fd0bf;
          }
          .m-text{
            text-align: left;
            padding: 10px 22px;
          }
          .m-icon-video{
            display: block;
            width: 109px;
            height: 109px;
            position: absolute;
            top: 210px;
            left: 298px;
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
            margin: 18px 0 0;
            color: #999;
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

    }
  }
</style>
