<template>
    <div class="m-product-detail" v-if="product_info">
      <div class="m-product-swipe">
        <mt-swipe :auto="3000">
          <mt-swipe-item class="product-swipe" v-for="item in product_info.images" v-bind:key="item.piid">
            <img :src="item.pipic" class="product-img" alt="">
          </mt-swipe-item>
        </mt-swipe>
        <span class="m-icon-back" @click="changeBack"></span>
      </div>
      <div class="m-product-detail-info">
        <h3 v-if="user.uslevel == 2">
          <span class="m-profict-title">预计赚：</span>
          <span class="m-red">￥{{product_info.profict | money}}</span>
        </h3>
        <h3>
          <span class="m-product-title">{{product_info.prtitle}}</span>
          <span class="m-red">￥{{product_info.prprice | money}}</span>
        </h3>
        <div class="m-info-list">
          <span>快递：{{product_info.prfreight | money}} 元</span>
          <span>月销：{{product_info.month_sale_value}}</span>
          <span>
            {{product_info.brand.pbname}}
          </span>
        </div>
      </div>
      <div class="m-product-detail-more" @click="changeModal('show_sku',true)">
        <div>
          <span class="m-label">规格</span>
          <span class="m-select m-black">选择
            <template  v-if="select_value">
               <span v-for="(item,index) in select_value.skuattritedetail">{{product_info.prattribute[index]}} {{item}}</span>
            </template>
             <template  v-else>
                 <span v-for="item in product_info.prattribute">{{item}} </span>
             </template>
          </span>
        </div>
        <div>
          <span class="m-more"></span>
        </div>
      </div>
      <div class="m-product-detail-more" @click="changeRoute('/evaluate')">
        <div>
          <span class="m-label">评价</span>
          <span class="m-start" v-for="(a, b) in star" :class="b <= product_info.praveragescore - 1 ?
           'active' : ((b < product_info.praveragescore && b > product_info.praveragescore - 1) ? 'half' : '')"></span>
        </div>
        <div>
          <span class="m-ft-20">查看详情</span>
          <span class="m-more"></span>
        </div>
      </div>
      <div class="m-product-detail-img-box" v-if="product_info.prdesc">
        <img v-for="item in product_info.prdesc" :src="item">
      </div>
      <div class="m-product-detail-foot">
        <span class="m-icon-car" @click.stop="changeRoute('/shop')"></span>
        <span class="m-icon-service"></span>
        <div class="m-product-detail-btn">
          <span @click="addCart">加入购物车</span>
          <span class="active" @click="buyNow">立即购买</span>
        </div>
      </div>

      <sku v-if="show_sku" :now_select="select_value" :now_num="canums" :product="product_info" @changeModal="changeModal" @sureClick="sureClick"></sku>
    </div>
</template>

<script>
  import sku from '../components/sku';
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import {Toast} from 'mint-ui'
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
            show_sku:false,
            product_info:null,
            sku:null,
            select_value:null,
            canums:1,
            cart_buy:null,
            star:['','','','',''],
            user: { uslevel: '1' }
          }
        },
      components:{
          sku
      },
      mounted(){
        common.changeTitle('商品详情');
        this.getInfo();
        this.getUser();
      },
      methods:{
        // 获取个人信息
        getUser() {
          if(localStorage.getItem('token')) {
            axios.get(api.get_home + "?token=" + localStorage.getItem('token')).then(res => {
              if(res.data.status == 200){
                this.user = res.data.data;
              }
            });
          }
        },
         // 改变模态框
         changeModal(v,bool) {
           this[v] = bool;
           if(bool){
             scroll.afterOpen();
           }else{
             scroll.beforeClose();
           }
         },
        //改变路由
        changeRoute(v){
           if(v == '/evaluate'){
             this.$router.push({path:v,query:{prid:this.product_info.prid}});
           }else{
             this.$router.push(v);
           }
        },
        //返回{
        changeBack(){
          this.$router.go(-1);
        },
        //获取商品信息
        getInfo(){
           axios.get(api.product_get,{
             params:{
               prid:this.$route.query.prid
             }
           }).then(res => {
             if(res.data.status == 200){
               this.product_info = res.data.data;
               this.product_info.praveragescore = this.product_info.praveragescore / 2;
             }
           },error => {
             Toast({ message: error.data.message,duration:1000, className: 'm-toast-fail' });
           })
        },
        //获取评价
        getEvaluation(){
          // axios.get(api.get_evaluation,)
        },
        //购物车确定
        sureClick(item,num){
          this.canums = num;
          this.select_value = item;
          if(this.cart_buy == 'cart'){
            this.postCart();
            this.cart_buy = null;
          }else if(this.cart_buy == 'buy'){
            this.buyNow();
            this.cart_buy = null;
          }
          this.changeModal('show_sku',false);
        },
      //  加入购物请求
        postCart(){
          axios.post(api.cart_create + '?token=' + localStorage.getItem('token'),{
            skuid:this.select_value.skuid,
            canums:this.canums
          }).
          then(res => {
            if(res.data.status == 200){
              Toast({ message: res.data.message,duration:1000, className: 'm-toast-success' });
            }
          },error => {
            Toast({ message: error.data.message,duration:1000, className: 'm-toast-fail' });
          })
        },
      //  加入购物车
        addCart(){
           if(this.select_value){
               this.postCart();
           }else{
             this.show_sku = true;
           }
           this.cart_buy = 'cart';
        },
        //立即购买
        buyNow(){
          if(this.select_value){
            let product = {};
            product.pb = this.product_info.brand;
            product.cart = [];
            product.cart.push({product:{prtitle:this.product_info.prtitle},sku:this.select_value,canums:this.canums,prid:this.product_info.prid});
            let arr = [];
            arr.push(product);
            this.$router.push({path:'/submitOrder',query:{product:JSON.stringify(arr)}});
          }else{
            this.show_sku = true;
            this.cart_buy = 'buy';
          }
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
.m-product-detail{
  padding-bottom: 100px;
  .m-product-swipe{
    position: relative;
    width: 100%;
    height: 784px;
    .m-icon-back{
      position: absolute;
      top: 30px;
      left: 40px;
      width: 24px;
      height: 41px;
      background: url("/static/images/icon-detail-back.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .m-product-detail-info{
    padding: 30px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    h3{
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      font-size: 30px;
      font-weight: bold;
      color: #666666;
      margin-bottom: 40px;
      .m-product-title{
        margin-right: 20px;
        text-align: left;
      }
      .m-profict-title {
        white-space: nowrap;
        margin-left: 420px;
      }
      .m-red{
        color: #EF9B2D;
      }
    }
    .m-info-list{
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-between;
      color: #999999;
    }
  }
  .m-product-detail-more{
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    padding: 24px 30px;
    color: #999999;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    .m-label{
      display: inline-block;
      margin-right: 30px;
    }
    .m-black{
      color: #666666;
    }
    .m-more{
      display: inline-block;
      width: 13px;
      height: 19px;
      background: url("/static/images/icon-right.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 20px;
    }
  }
  .m-product-detail-img-box{
    margin-bottom: 15px;
    img{
      display: block;
      width: 750px;
      max-height: 100%;
    }
  }
  .m-product-detail-foot{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 26px 0;
    /*padding: 26px 0 98px;*/
    background-color: #fff;
    text-align: left;
    .m-icon-car{
      display: inline-block;
      width: 53px;
      height: 53px;
      background: url("/static/images/icon-car.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 29px 0 15px;
      vertical-align: middle;
    }
    .m-icon-service{
      display: inline-block;
      width: 53px;
      height: 53px;
      background: url("/static/images/icon-service.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 20px;
      vertical-align: middle;
    }
    .m-product-detail-btn{
      display: inline-block;
      height: 62px;
      line-height: 62px;
      span{
        color: #ffffff;
        display: inline-block;
        width: 271px;
        text-align: center;
        background-color: @subColor;
        margin: 0;
        border-radius: 10px 0 0 10px;
        &.active{
          background-color: @mainColor;
          margin-left: -8px;
          border-radius: 0 10px 10px 0;
        }
      }
    }
  }

}

</style>
