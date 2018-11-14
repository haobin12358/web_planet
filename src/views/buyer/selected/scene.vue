<template>
    <div class="m-scene" id="header" @touchmove.stop="touchMove">
      <div class="m-scroll m-margin">
        <ul class="m-selected-scene-ul">
          <li v-for="(item,index) in scene_list" @click="sceneClick(index)">
            <img :src="item.pspic" class="m-selected-scene-img" :class="item.active?'active':''" alt="">
          </li>
        </ul>
      </div>
      <div class="m-scroll-l">
        <ul class="m-scene-label">
          <li v-for="(item,index) in nav_list" :class="item.active?'active':''" @click="navClick(index)">{{item.itname}}</li>
        </ul>
      </div>
      <product :list="product_list"></product>
      <bottom-line v-if="bottom_show"></bottom-line>
      <span class="m-icon-top"></span>
    </div>

</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import product from '../components/product';
  import axios from 'axios';
  import api from '../../../api/api'
  import {Toast} from 'mint-ui';
  import bottomLine from '../../../components/common/bottomLine';
    export default {
        data() {
            return {
                scene_list:'',
                nav_list:'',
                product_list:[],
                page_info:{
                  page_num:1,
                  page_size:10
                },
                isScroll:true,
                total_count:0,
                bottom_show:false,
            }
        },
        components: {
          product,
          bottomLine
        },
        mounted(){
            common.changeTitle('场景推荐');
            this.getScene();
        },
        methods: {
          //获取场景
          getScene(){
            axios.get(api.scene_list).then(res => {
              if(res.data.status == 200){
                for(let i=0;i<res.data.data.length;i++){
                  res.data.data[i].active = false;
                }
                res.data.data[0].active = true;
                this.scene_list = [].concat(res.data.data);
                this.getNav(res.data.data[0].psid);
              }
            })
          },
          //获取商品标签
          getNav(psid){
            axios.get(api.items_list,{
              params:{
                ittype:0,
                psid:psid
              }
            }).then(res => {
              if(res.data.status == 200){
                if(res.data.data.length == 0){
                  this.nav_list = []
                }else{
                  for(let i=0;i<res.data.data.length;i++){
                    res.data.data[i].active = false;
                  }
                  res.data.data[0].active = true;
                  this.nav_list = [].concat(res.data.data);
                  this.getProduct(this.nav_list[0].itid);
                }
              }
            })
          },
          //获取商品列表
          getProduct(itid){
            let start = this.page_info.page_num;
            axios.get(api.product_list,{
              params:{
                page_size:this.page_info.page_size,
                page_num:start,
                token:localStorage.getItem('token'),
                itid:itid
              }
            }).then(res => {
              if(res.data.status == 200){
                if(res.data.data.length >0){
                  if(start >1){
                    this.product_list = this.product_list.concat(res.data.data);
                  }else{
                    this.product_list = res.data.data;
                  }
                  this.isScroll = true;
                  this.total_count = res.data.total_count;
                  this.page_info.page_num = this.page_info.page_num +1;
                }else{
                  return false;
                }
              } else{
                Toast({ message: res.data.message,duration:1000, className: 'm-toast-fail' });
              }
            },error => {
              Toast({ message: error.data.message,duration:1000, className: 'm-toast-fail' });
            })
          },
        //  导航点击
          sceneClick(index){
            if(this.scene_list[index].active){
              return false;
            }
            let arr = [].concat(this.scene_list);
            for(let i =0;i<arr.length;i++){
              arr[i].active = false;
            }
            arr[index].active = true;
            this.scene_list = [].concat(arr);
            this.getNav(arr[index].psid);
          },
          //  导航点击
          navClick(index){
            if(this.nav_list[index].active){
              return false;
            }
            let arr = [].concat(this.nav_list);
            for(let i =0;i<arr.length;i++){
              arr[i].active = false;
            }
            arr[index].active = true;
            this.nav_list = [].concat(arr);
            this.getProduct(arr[index].itid);
          },
          //滚动到顶部
          returnTop:function(){
            document.querySelector("#header").scrollIntoView(true);
          },
          //滚动加载更多
          touchMove(e){
            let scrollTop = common.getScrollTop();
            let scrollHeight = common.getScrollHeight();
            let ClientHeight = common.getClientHeight();
            if (scrollTop + ClientHeight  >= scrollHeight -10) {
              if(this.isScroll){
                this.isScroll = false;
                if(this.product_list.length == this.total_count){
                  this.bottom_show = true;
                }else{
                  for(let i =0;i<this.nav_list.length;i++){
                    if(this.nav_list[i].active ){
                      this.getProduct(this.nav_list[i].itid);
                    }
                  }
                }
              }
            }
          }
        },
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/scroll";
  .m-scene{
    background-color: #eeeeee;
    .m-margin{
      margin: 0 0 10px 33px;
      .m-selected-scene-ul{
        padding: 10px 0;
      }
    }
  }
  .m-scroll-l{
    margin: 0 0 0 33px ;
    width: 717px;
    overflow-x: auto;
    overflow-y: hidden;
    text-align: left;
    .m-scene-label{
      height: 53px;
      min-width: 101%;
      overflow-y: hidden;
      text-align: left;
      display: inline;
      white-space: nowrap;
      overflow-x: scroll;
      li{
        display: inline-block;
        padding: 0 27px;
        /*width: 150px!important;*/
        height: 53px;
        line-height: 53px;
        background-color: #ccc;
        margin-right: 30px;
        border-radius: 10px;
        &.active{
          background-color: #fcd316;
          color: #fff;
        }
      }
    }
  }
 .m-icon-top{
   position: fixed;
   bottom: 40px;
   right: 15px;
   width: 78px;
   height: 78px;
   background: url("/static/images/icon-top.png") no-repeat;
   background-size: 100% 100%;
 }
</style>
