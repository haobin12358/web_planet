<template>
    <div class="m-product" @touchmove.stop="touchMove">
      <!--<div class="m-product-title">-->
        <!--<span class="m-icon-back" @click="changeRoute"></span>-->
        <!--<h3>商品列表</h3>-->
      <!--</div>-->
      <!--<div class="m-product-brand" v-if="brand_info">-->
        <!--<img src="" class="m-brand-img" alt="">-->
        <!--<span class="m-icon-bg"></span>-->
        <!--<div class="m-flex-between m-brand-info">-->
          <!--<div class="m-flex-start">-->
            <!--<span class="m-brand-logo"></span>-->
            <!--<div>-->
              <!--<p class="m-brand-name">TAWA</p>-->
              <!--<p><span class="m-brand-country"></span><span class="m-ft-22">德国</span></p>-->
            <!--</div>-->
          <!--</div>-->
          <!--<span class="m-brand-btn">进店</span>-->
        <!--</div>-->
        <!--<div></div>-->
      <!--</div>-->
      <nav-list :navlist="nav_list" @navClick="navClick"></nav-list>
      <product :list="product_list"></product>
      <bottom-line v-if="bottom_show"></bottom-line>
      <div class="m-modal-select" v-if="show_modal" @click="changeModal('show_modal',false)">
        <div class="m-modal-state">
          <div class="m-state-content">
            <div class="m-one-select">
              <p>防风衣/运动外套</p>
              <div class="m-sku-list">
                <span class="m-one-sku">运动衣</span>
                <span class="m-one-sku">运动衣</span>
                <span class="m-one-sku">运动衣</span>
                <span class="m-one-sku">运动衣</span>
                <span class="m-one-sku">运动衣</span>
              </div>
            </div>
            <!--<div class="m-one-select">-->
              <!--<p>防风衣/运动外套</p>-->
              <!--<div class="m-sku-list">-->
                <!--<input type="text" placeholder="最低价">-->
                <!--<span class="m-grey">——</span>-->
                <!--<input type="text" placeholder="最低价">-->
              <!--</div>-->
            </div>
          </div>
          <div class="m-state-foot">
            <div class="m-product-detail-btn">
              <span>重置</span>
              <span class="active">确定</span>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  import product from '../components/product';
  import navList from '../../../components/common/navlist';
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api'
  import {Toast} from 'mint-ui';
  import bottomLine from '../../../components/common/bottomLine'
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
      data(){
        return{
          nav_list:[
            {
              name:'销量',
              params:'sale_value',
              active:true,
              desc_asc:true
            },
            {
              name:'新品',
              params:'time',
              active:false,
              desc_asc:true
            },
            {
              name:'价格',
              params:'price',
              active:false,
              icon:true,
              desc_asc:true
            },
            {
              name:'筛选',
              params:'',
              active:false,
              desc_asc:true
            }
          ],
          show_modal:false,
          // brand_info:null,
          product_list:[],
          page_info:{
            page_num:1,
            page_size:5
          },
          isScroll:true,
          total_count:0,
          bottom_show:false,
          category_list:null
        }
      },
      components:{
        product,
        navList,
        bottomLine
      },
      mounted(){
        common.changeTitle('商品列表');
        this.getProduct(1,'sale_value|asc');
      },
     methods:{
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
               for(let i=0;i<this.nav_list.length;i++){
                 if(this.nav_list[i].active){
                   this.getProduct(this.page_info.page_num,this.nav_list[i].params + (this.nav_list[i].desc_asc?'|asc':'|desc'));
                 }
               }
             }
           }

         }
       },
       // 页面跳转
       changeRoute(){
         this.$router.push(1,'/equipment/detail')
       },
       //导航切换
       navClick(index){
         let arr = [].concat(this.nav_list);
         for(let i=0;i<arr.length;i++){
           arr[i].active = false;
         }
         arr[index].active = true;
         arr[index].desc_asc = !arr[index].desc_asc;
         this.nav_list = [].concat(arr);
         if(arr[index].desc_asc){
           this.getProduct(1,arr[index].params +'|asc')
         }else{
           this.getProduct(1,arr[index].params +'|desc')
         }
         this.page_info.page_num = 1;
         this.bottom_show = false;
         if(index == 3){
           this.changeModal('show_modal',true);
           this.getCategory();
         }
       },
       //显示隐藏模态框
       changeModal(v,bool) {
         this[v] = bool;
         if(bool){
           scroll.afterOpen();
         }else{
           scroll.beforeClose();
         }
       },
       //获取商品列表
       getProduct(start,desc_asc){
         axios.get(api.product_list,{
           params:{
             pcid:this.$route.query.pcid,
             page_size:this.page_info.page_size,
             order_type:desc_asc,
             page_num:start
           }
         }).then(res => {
           if(res.data.status == 200){
             if(res.data.data.length >0){
               this.page_info.page_num = this.page_info.page_num +1;
             }else{
               return false;
             }
             if(start >1){
               this.product_list = this.product_list.concat(res.data.data);
             }else{
               this.product_list = res.data.data;
             }
             this.isScroll = true;
             this.total_count = res.data.total_count;
           } else{
             Toast({ message: res.data.message,duration:1000, className: 'm-toast-fail' });
           }
         },error => {
           Toast({ message: error.data.message,duration:1000, className: 'm-toast-fail' });
         })
       },
       //获取装备信息
       getCategory(){
         axios.get(api.category_list,{params:{
           deep:2
           }}).then(res => {
           if(res.data.status == 200){

           }
         })
       }
     }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
.m-product{
  .m-product-brand{
    position: relative;
    width: 100%;
    height: 650px;
    background-color: #9fd0bf;
    margin-bottom: 30px;
    .m-icon-bg{
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 67px;
      background: url("/static/images/icon-bg.png") no-repeat;
      background-size: 100% 100%;
    }
    .m-brand-info{
      position: absolute;
      bottom: 0;
      left: 37px;
      width: 676px;
      height: 110px;
      border-radius: 10px;
      background-color: rgba(255,255,255,0.7);
      box-shadow:0 3px 6px rgba(0,0,0,0.16);
      .m-brand-logo{
        display: block;
        width: 76px;
        height: 76px;
        border-radius: 50%;
        box-shadow:0 5px 20px rgba(0,0,0,0.16);
        margin: 0 34px;
      }
      .m-brand-name{
        font-size: 30px;
        font-weight: bold;
      }
      .m-brand-country{
        display: inline-block;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: #9fd0bf;
        margin-right: 10px;
        vertical-align: middle;
      }
      .m-brand-btn{
        display: block;
        width: 129px;
        height: 41px;
        line-height: 41px;
        text-align: center;
        background-color: @mainColor;
        border-radius: 30px;
        margin-right: 25px;
      }
    }
  }
  .m-product-title{
    position: relative;
    font-size: 32px;
    font-weight: bold;
    .m-icon-back{
      position: absolute;
      top: 0;
      left: 68px;
      width: 24px;
      height: 41px;
      background: url("/static/images/icon-back.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .m-nav-list{
    padding: 0 64px;
  }
  .m-modal-select{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.2);
    z-index: 1001;
    transition: opacity .5s;
    .m-modal-state{
      width: 563px;
      position: absolute;
      top:0;
      right: 0;
      height: 100vh;
      background-color: #fff;
      .m-state-content{
        padding: 76px 30px;
        text-align: left;
        .m-one-select{
          padding: 21px 0;
          border-bottom: 1px solid #ccc;
          &:last-child{
            border-bottom: none;
          }
          input{
            display: inline-block;
            width: 200px;
            height: 40px;
            background-color: #e9e9e9;
            border-radius: 30px;
            text-align: center;
            margin: 20px 10px;
          }
          .m-one-sku{
            display: inline-block;
            padding: 6px 34px;
            background-color: #E9E9E9;
            border-radius: 10px;
            margin-right: 20px;
            margin-top: 20px;
          }
        }
      }
      .m-state-foot{
        position: absolute;
        bottom: 100px;
        right: 36px;
        .m-product-detail-btn{
          display: inline-block;
          height: 62px;
          line-height: 62px;
          span{
            display: inline-block;
            width: 171px;
            text-align: center;
            background-color: #fbe891;
            margin: 0;
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
            &.active{
              background-color: #fcd316;
              margin-left: -8px;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              border-top-right-radius: 30px;
              border-bottom-right-radius: 30px;
            }
          }
        }
      }
    }
  }
  input::-webkit-input-placeholder{
    color: #999;
    text-align: center;
  }
}
</style>
