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
                <span class="m-personal-identity animated rubberBand" v-if="user.usidname == '登录 / 注册'" @click="changeRoute('/login')">{{user.usidname}}</span>
                <span class="m-personal-identity active" v-else>{{user.usidname}}</span>
              </p>
            </div>
            <img class="m-code-img" v-if="user.usqrcode" :src="user.usqrcode" @click="changeRoute('/personal/code')">
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
        <div class="m-one-part m-margin">
          <p class="m-one-part-title">
            <span class="m-name">我的活动</span>
          </p>
          <div class="m-activity-subtitle">账户余额</div>
          <div class="m-activity-money">
            <div class="m-money m-ft-28 m-red">￥ <span class="m-ft-58">0.00</span></div>
            <div class="m-money-btn m-ft-24" @click="outPopup = true">提现</div>
          </div>
          <ul class="m-part-icon-ul m-use">
            <li @click="changeRoute('/activityOrder')">
              <img src="/static/images/activity/icon-activity.png" alt="">
              <span>活动订单</span>
            </li>
            <!--<li @click="changeRoute('/personal/guess')">
              <img src="/static/images/activity/guess-history.png"  alt="">
              <span>竞猜历史</span>
            </li>-->
          </ul>
        </div>

        <!--提现-->
        <div class="m-out-popup-box">
          <mt-popup class="m-out-popup" v-model="outPopup">
            <div class="m-out-box" v-if="!outSubmit">
              <div class="m-out-title m-ft-30">提现金额</div>
              <div class="m-out-num-box">
                <div class="m-out-RMB">￥</div>
                <input type="text" v-model="moneyNum" class="m-out-num-input">
                <img class="m-out-num-clean" src="/static/images/icon-close.png" @click="moneyNum = '0.00'">
              </div>
              <div class="m-out-row">
                <div class="m-row-left">姓名</div>
                <div class="m-row-right">
                  <input type="text" class="m-row-input m-width-200">
                </div>
              </div>
              <div class="m-out-row">
                <div class="m-row-left">银行卡号</div>
                <div class="m-row-right">
                  <input type="text" class="m-row-input m-width-320">
                </div>
              </div>
              <div class="m-out-row">
                <div class="m-row-left">银行</div>
                <div class="m-row-right" @click="bankPopup = true">{{bank}}</div>
              </div>
              <div class="m-out-row">
                <div class="m-row-left">开户行</div>
                <div class="m-row-right">
                  <input type="text" class="m-row-input m-width-320">
                </div>
              </div>
              <div class="m-out-btn" @click="outBtn('submit')">提 交</div>
            </div>
            <div class="m-out-box" v-if="outSubmit">
              <img class="m-out-know-img" src="/static/images/icon-out-know.png" alt="">
              <div class="m-out-know-title">提交成功</div>
              <div class="m-out-know-text">已成功提交提现申请，我们将在3个工作日内完成审核，请及时关注您的账户余额。</div>
              <div class="m-out-btn" @click="outBtn('know')">我知道了</div>
            </div>
          </mt-popup>
          <!--银行picker-->
          <mt-popup class="m-bank-popup" v-model="bankPopup" position="bottom">
            <div class="m-popup-btn">
              <div @click="bankPopup = false">取消</div>
              <div @click="bankDone">确认</div>
            </div>
            <mt-picker :slots="slots" @change="bankChange"></mt-picker>
          </mt-popup>
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
        user: { usheader: '/static/images/logo.png', usidname: '登录 / 注册'},               // 个人信息
        pay: "0",               // 待付款
        send: "0",              // 待发货
        receive: "0",           // 待收货
        evaluate: "0",          // 待评价
        after_sales: "0",       // 售后
        outPopup: false,
        outSubmit: false,
        bankPopup: false,
        moneyNum: "0.00",
        slots: [{ values: ['中国银行', '中国工商银行', '交通银行', '中国建设银行'] }],
        bank: ""
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
      // 提现的提交按钮
      outBtn(where) {
        if(where == "submit") {
          this.outSubmit = true;
        }else if(where == "know") {
          this.outPopup = false;
        }
      },
      // 提现的选择银行确定按钮
      bankDone() {
        this.bankPopup = false;
      },
      // picker选择的银行改变
      bankChange(picker, values) {
        this.bank = values[0];
      },
      // 获取个人信息
      getUser() {
        axios.get(api.get_home + "?token=" + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            this.user = res.data.data;
            this.getOrderCount();       // 获取订单数量
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
              }else if(res.data.data[i].status == "40") {
                this.after_sales = res.data.data[i].count;
              }
            }
          }
        })
      }
    },
    mounted() {
      common.changeTitle('我的');
      this.getUser();             // 获取个人信息
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
 @import "../../../common/css/personal";
</style>
