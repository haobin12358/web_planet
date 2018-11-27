<template>
  <div class="m-personal" >
    <div class="m-personal-bg">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-personal-content">
      <p class="m-set-box">
        <span class="m-icon-set" @click="changeRoute('/personal/setUp')"></span>
      </p>
      <div class="m-personal-info">
        <img class="m-personal-head-portrait" :src="user.usheader" alt="">
        <div class="m-personal-info-box">
          <div class="m-personal-info-text">
            <div>
              <p>{{user.usname}}</p>
              <p>
                <span class="m-personal-identity">{{user.usidname}}</span>
              </p>
            </div>
            <img class="m-code-img" :src="user.usqrcode" @click="changeRoute('/personal/code')">
          </div>
          <ul class="m-personal-ul">
            <li @click="changeRoute('/personal/coupon')">
              <span class="m-icon-gift"></span>
              <span class="m-name">优惠券</span>
              <span>{{user.uscoupon}}</span>
            </li>
            <li @click="changeRoute('/personal/integral')">
              <span class="m-icon-integral"></span>
              <span class="m-name">可用积分</span>
              <span>{{user.usintegral}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="m-personal-body">
        <div class="m-one-part">
          <p class="m-one-part-title">
            <span class="m-name">我的订单</span>
            <span @click="changeRoute('/orderList')">
              <span>全部订单</span>
              <span class="m-icon-more"></span>
            </span>
          </p>
          <ul class="m-part-icon-ul">
            <li @click="changeRoute('orderList', 1)">
              <img src="/static/images/icon-order-pay.png" alt="">
              <span>待支付</span>
              <div class="m-order-num" v-if="pay != 0">{{pay}}</div>
            </li>
            <li @click="changeRoute('orderList', 2)">
              <img src="/static/images/icon-order-send.png" class="m-square" alt="">
              <span>待发货</span>
              <div class="m-order-num" v-if="send != 0">{{send}}</div>
            </li>
            <li @click="changeRoute('orderList', 3)">
              <img src="/static/images/icon-receive.png" class="m-square" alt="">
              <span>待收货</span>
              <div class="m-order-num" v-if="receive != 0">{{receive}}</div>
            </li>
            <li @click="changeRoute('orderList', 4)">
              <img src="/static/images/m-serviceCenter-after.png" class="m-square" alt="">
              <span>待评价</span>
              <div class="m-order-num" v-if="evaluate != 0">{{evaluate}}</div>
            </li>
            <li @click="changeRoute('personal/afterSales')">
              <img src="/static/images/icon-personal-back.png" alt="">
              <span>售后</span>
              <div class="m-order-num" v-if="after_sales != 0">{{after_sales}}</div>
            </li>
          </ul>
        </div>
        <div class="m-one-part">
          <p class="m-one-part-title">
            <span class="m-name">常用工具</span>
          </p>
          <ul class="m-part-icon-ul m-use">
            <li @click="changeRoute('personal/serviceCenter')">
              <img src="/static/images/icon-personal-service.png" alt="">
              <span>客服中心</span>
            </li>
            <li @click="changeRoute('personal/safeCenter')">
              <img src="/static/images/icon-personal-security-center.png"  alt="">
              <span>安全中心</span>
            </li>
            <li @click="changeRoute('/personal/couponCenter')">
              <img src="/static/images/icon-personal-coupon.png"  alt="">
              <span>优惠中心</span>
            </li>
            <li @click="changeRoute('/personal/guess')">
              <img src="/static/images/icon-personal-guess.png"  alt="">
              <span>竞猜记录</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import api from '../../../api/api'
  import { Toast } from 'mint-ui';
  import axios from 'axios';

  export default {
    data() {
      return {
        name: '',
        user: {},               // 个人信息
        pay: "0",               // 待付款
        send: "0",              // 待发货
        receive: "0",           // 待收货
        evaluate: "0",          // 待评价
        after_sales: "0",       // 售后
      }
    },
    components: {},
    methods: {
      // 跳转页面
      changeRoute(v, which){
        if(which) {
          this.$router.push({ path: v,query: { which: which}});
        }else {
          this.$router.push(v);
        }
      },
      // 获取个人信息
      getUser() {
        axios.get(api.get_home + "?token=" + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            this.user = res.data.data;
          }else{
            Toast(res.data.message);
          }
        })
      },
      // 获取订单数量
      getOrderCount() {
        axios.get(api.order_count + "?extentions=refund&token=" + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            for(let i = 0; i < res.data.data.length; i ++) {
              if(res.data.data[i].status == "0") {
                this.pay = res.data.data[i].count;
              }else if(res.data.data[i].status == "10") {
                this.send = res.data.data[i].count;
              }else if(res.data.data[i].status == "20") {
                this.receive = res.data.data[i].count;
              }else if(res.data.data[i].status == "35") {
                this.evaluate = res.data.data[i].count;
              }else if(res.data.data[i].status == "refund") {
                this.after_sales = res.data.data[i].count;
              }
            }
          }else{
            Toast(res.data.message);
          }
        })
      }
    },
    mounted() {
      common.changeTitle('我的');
      this.getUser();             // 获取个人信息
      this.getOrderCount();       // 获取订单数量
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
 @import "../../../common/css/personal";
</style>
