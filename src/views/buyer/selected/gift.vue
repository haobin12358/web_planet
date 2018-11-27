<template>
  <div class="m-gift">
    <div class="m-gift-img-box">
      <img class="m-gift-img" :src="gift.prmainpic" alt="">
    </div>
    <div class="m-gift-text">
      <div class="m-gift-row">
        <div class="m-ft-30 m-ft-b">{{gift.prtitle}}</div>
        <div class="m-ft-30 m-ft-b m-price-color">￥{{gift.prprice}}</div>
      </div>
      <div class="m-gift-row">
        <div class="m-row-999">月销：{{gift.month_sale_value}}笔</div>
        <div class="m-row-999">大行星平台</div>
      </div>
    </div>
    <div class="m-gift-btn" @click="buyGift">立即购买</div>
  </div>
</template>

<script>
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        name: 'gift',
        gift: {}
      }
    },
    methods: {
      // 获取商家礼包详情
      getGift() {
        axios.get(api.product_get + '?prid=pridgift').then(res => {
          if(res.data.status == 200){
            this.gift = res.data.data;
          }else{
            Toast(res.data.message);
          }
        });
      },
      // 购买礼包按钮
      buyGift() {
        let product = {};
        product.pb = this.gift.brand;
        product.cart = [];
        product.cart.push({ product: { prtitle: this.gift.prtitle }, sku: this.gift.skus[0], canums: "1", prid: this.gift.prid});
        let arr = [];
        arr.push(product);
        this.$router.push({ path: '/submitOrder', query: { product: JSON.stringify(arr), gift: true }});

        /*// 将商家大礼包加入到购物车
        let params = { skuid: this.gift.skus[0].skuid, canums: 1 };
        axios.post(api.cart_create + '?token=' + localStorage.getItem('token'), params).then(res => {
          if(res.data.status == 200){
            // 获取最新的购物车，拿到商家大礼包的信息
            let params = { token: localStorage.getItem('token'), page_size: 1, page_num: 1 };
            axios.get(api.cart_list, { params: params}).then(res => {
              if(res.data.status == 200){
                res.data.data[0].cart.splice(1, (res.data.data[0].cart.length - 1));
                let caid = res.data.data;
                // 将购物车中商家大礼包的数量改为 1
                caid[0].cart[0].canums = 1;
                let params = { caid: caid[0].cart[0].caid, skuid: caid[0].cart[0].sku.skuid, canums: 1 };
                axios.post(api.cart_update +'?token=' + localStorage.getItem('token'), params).then(res => {
                  if(res.data.status == 200){
                    // 去创建订单页
                    this.$router.push({ path: '/submitOrder', query: { product: JSON.stringify(caid), gift: true }});
                  }else{
                    Toast(res.data.message);
                  }
                });
              }else{
                Toast(res.data.message);
              }
            });
          }else{
            Toast(res.data.message);
          }
        });*/
      },
    },
    mounted() {
      common.changeTitle('购买礼包');
      this.getGift();            // 获取商家礼包详情
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-gift {
    min-height: 100%;
    .m-gift-img-box {
      width: 750px;
      height: 750px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16);
      .m-gift-img {
        max-width: 750px;
        max-height: 750px;
      }
    }
    .m-gift-text {
      padding: 10px 30px 15px 30px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16);
      .m-gift-row {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        .m-price-color {
          color: #EF9B2D;
        }
        .m-row-999 {
          color: #999999;
          font-size: 24px;
        }
      }
    }
    .m-gift-btn {
      width: 150px;
      font-size: 30px;
      letter-spacing: 3px;
      padding: 15px 270px;
      border-radius: 60px;
      background: linear-gradient(90deg,rgba(251,232,145,1) 0%,rgba(255,204,1,1) 100%);
      position: absolute;
      bottom: 100px;
      left: 30px;
    }
  }
</style>
