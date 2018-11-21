<template>
    <div class="m-circle" @touchmove.stop="touchMove">
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
          <template v-for="(items,index) in news_list">
            <div class="m-video-one" @click="changeRoute('/circle/detail')">
              <template v-if="select_nav.itid == 'mynews'">
                <span class="m-mark-label active" v-if="items.nestatus == 'refuse'">未通过</span>
                <span class="m-mark-label" v-else-if="items.nestatus == 'usual'">审核通过</span>
                <span class="m-mark-label" v-else>审核中</span>
              </template>

              <h3>{{items.netitle}}</h3>
              <div class="m-video-box" v-if="items.showtype == 'video'">
                <video :src="items.video" class="m-video"></video>
                <img :src="items.videothumbnail" class="m-video-img" alt="">
                <span class="m-video-time">{{items.videoduration}}</span>
                <span class="m-icon-video"></span>
              </div>
              <img :src="items.mainpic" class="m-img"  v-else-if="items.showtype == 'picture'">
              <p class="m-text" v-else>
                {{items.netext}}
              </p>
              <ul class="m-video-icon-ul">
                <li @click.stop="likeClick(index)">
                  <span class="m-icon-like " :class="items.is_favorite?'active':''"></span>
                  <span>{{items.favoritnumber}}</span>
                </li>
                <li class="m-border">
                  <span class="m-icon-comment"></span>
                  <span>{{items.commentnumber}}</span>
                </li>
                <li>
                  <span class="m-icon-transmit"></span>
                </li>
              </ul>
              <div class="m-refuse-reason" v-if="select_nav.itid == 'mynews' && items.nestatus == 'refuse'">
                {{items.refuse_info}}
              </div>
            </div>
          </template>
          <bottom-line v-if="bottom_show"></bottom-line>
        </div>
      </div>

    </div>

</template>

<script type="text/ecmascript-6">
  import navList from '../../../components/common/navlist';
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import bottomLine from '../../../components/common/bottomLine';
    export default {
        data() {
            return {
                name: '',
              nav_list:[
                {
                  itdesc: "我是描述",
                  itid: "",
                  itname: "全部",
                  itrecommend: true,
                  itsort: null,
                  ittype: 10,
                  psid: ""
                },
                {
                  itdesc: "我是描述",
                  itid: "mynews",
                  itname: "我发起的",
                  itrecommend: true,
                  itsort: null,
                  ittype: 10,
                  psid: ""
                }
              ],
              news_list:null,
              page_info:{
                page_num:1,
                page_size:10
              },
              select_nav:null,
              isScroll:true,
              total_count:0,
              bottom_show:false,
            }
        },
        components: {
          navList,
          bottomLine
        },
        mounted(){
           common.changeTitle('圈子');
           this.getNav();
           this.getNews();
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
            this.select_nav = arr[index];
            this.getNews(this.nav_list[index].itid)
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
                this.select_nav = this.nav_list[0];
              }
            })
          },
          /*获取资讯列表*/
          getNews(itid){
            axios.get(api.get_all_news,{
              params:{
                token:localStorage.getItem('token'),
                page_num:this.page_info.page_num,
                page_size: this.page_info.page_size,
                itid:itid,
                nestatus:''
              }
            }).then(res => {
              if(res.data.status == 200){
                this.isScroll =true;
                if(res.data.data.length >0){
                  if(this.page_info.page_num >1){
                    this.news_list =  this.news_list.concat(res.data.data);
                  }else{
                    this.news_list = res.data.data;
                  }
                  this.page_info.page_num = this.page_info.page_num + 1;
                  this.total_count = res.data.total_count;
                }else{
                  this.news_list = null;
                  this.page_info.page_num = 1;
                  this.total_count = 0;
                }

              }
            })
          },
          /*点赞*/
          likeClick(i){
            axios.post(api.favorite_news + '?token='+localStorage.getItem('token'),{
              neid:this.news_list[i].neid,
              tftype:1
            }).then(res => {
              if(res.data.status == 200){
                let arr = [].concat(this.news_list);
                if(arr[i].is_favorite){
                  arr[i].favoritnumber = arr[i].favoritnumber-1;
                }else{
                  arr[i].favoritnumber = arr[i].favoritnumber+1;
                }
                arr[i].is_favorite = !arr[i].is_favorite;
                this.news_list = [].concat(arr);
              }
            })
          },
          //滚动加载更多
          touchMove(e){
            let scrollTop = common.getScrollTop();
            let scrollHeight = common.getScrollHeight();
            let ClientHeight = common.getClientHeight();
            if (scrollTop + ClientHeight  >= scrollHeight -10) {
              if(this.isScroll){
                this.isScroll = false;
                if(this.news_list.length == this.total_count){
                  this.bottom_show = true;
                }else{
                  for(let i=0;i<this.nav_list.length;i++){
                    if(this.nav_list[i].active){
                      this.getNews(this.nav_list[i].neid);
                    }
                  }
                }
              }

            }
          },
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
          .m-video-box{
            position: relative;
            .m-video{
              display: block;
              width: 700px;
              height: 360px;
              /*background-color: #9fd0bf;*/
            }
            .m-video-img{
             position: absolute;
              top:0;
              left: 0;
              width: 700px;
              height: 360px;
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
