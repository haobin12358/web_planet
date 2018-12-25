<template>
  <div class="m-storekeeper">
    <!--顶部图片-->
    <img class="m-storekeeper-bg" src="/static/images/icon-integral-bg.png" alt="">
    <!--顶部文字-->
    <div class="m-total-earnings">累计收益 : ￥{{user.uc_count | money}}</div>
    <div class="m-month-earnings">本月收益<span class="m-month-earnings-text">{{user.mounth_count | money}}</span>元</div>
    <div class="m-total-jump-box m-earnings-detail">
      <div class="m-earnings-out m-text-bottom" @click="outPopup = true">提现</div>
      <div class="m-detail-box" @click="changeRoute('/storekeeper/incomeDetail')">
        <div class="m-text-bottom">收益详情</div>
        <img class="m-jump-img" src="/static/images/icon-more-black.png">
      </div>
    </div>

    <!--提现-->
    <div class="m-out-popup-box">
      <mt-popup class="m-out-popup" v-model="outPopup">
        <div class="m-out-box" v-if="!outSubmit">
          <div class="m-popup-close m-ft-26" @click="outPopup = false">X</div>
          <div class="m-out-title m-ft-30">提现金额</div>
          <div class="m-out-num-box">
            <div class="m-out-RMB">￥</div>
            <input type="text" class="m-out-num-input" v-model="moneyNum" @focus="moneyFocus">
            <img class="m-out-num-clean" src="/static/images/icon-close.png" @click="moneyNum = '0'">
          </div>
          <div class="m-out-row">
            <div class="m-row-left">姓名</div>
            <div class="m-row-right">
              <input type="text" v-model="realName" class="m-row-input m-width-200">
            </div>
          </div>
          <div class="m-out-row">
            <div class="m-row-left">银行卡号</div>
            <div class="m-row-right">
              <input type="text" v-model="bankNo" maxlength="20" class="m-row-input m-width-320">
            </div>
          </div>
          <div class="m-out-row">
            <div class="m-row-left">银行</div>
            <div class="m-row-right" @click="getBankName">{{bank}}</div>
          </div>
          <div class="m-out-row">
            <div class="m-row-left">开户行</div>
            <div class="m-row-right">
              <input type="text" v-model="bankName" class="m-row-input m-width-320">
            </div>
          </div>
          <div class="m-out-btn" @click="outBtn('submit')">提 交</div>
        </div>
        <div class="m-out-box" v-if="outSubmit">
          <img class="m-out-know-img" src="/static/images/icon-out-know.png" alt="">
          <div class="m-out-know-title">提交成功</div>
          <div class="m-out-know-text">{{msg}}</div>
          <!--<div class="m-out-know-text">已成功提交提现申请，我们将在3个工作日内完成审核，请及时关注您的账户余额。</div>-->
          <div class="m-out-btn" @click="outBtn('know')">我知道了</div>
        </div>
      </mt-popup>
      <!--银行picker-->
      <mt-popup class="m-bank-popup" v-model="bankPopup" position="bottom">
        <div class="m-popup-btn">
          <div @click="bankPopup = false">取消</div>
          <div @click="bankDone">确认</div>
        </div>
        <div class="m-out-row m-out-bank">
          <div class="m-row-left">银行名称</div>
          <div class="m-row-right">
            <input type="text" v-model="bankResult" class="m-row-input m-width-300">
          </div>
        </div>
        <mt-picker :slots="slots" @change="bankChange"></mt-picker>
      </mt-popup>
    </div>

    <!--我的订单-->
    <!--<div class="m-border-radius m-my-order">
      <div class="m-total-jump-box" @click="changeRoute('/storekeeper/orderManagement')">
        <div class="m-jump-title">我的订单</div>
        <div class="m-jump-text">订单管理</div>
        <img class="m-jump-img" src="/static/images/icon-more.png" alt="">
      </div>
    </div>-->
    <!--我的商品-->
    <!--<div class="m-border-radius">
      <div class="m-total-jump-box" @click="changeRoute('/storekeeper/productManagement')">
        <div class="m-jump-title">我的商品</div>
        <div class="m-jump-text">商品管理</div>
        <img class="m-jump-img" src="/static/images/icon-more.png" alt="">
      </div>
      &lt;!&ndash;商品展示&ndash;&gt;
      <div class="m-most-product">最新发布</div>
      <div class="m-product-box">
        <div class="m-product-part" @click="changeRoute('/member/productDetail')">
          <div class="m-part-left">
            <img class="m-product-img" src="http://dummyimage.com/200x200" alt="">
          </div>
          <div class="m-part-right">
            <div class="m-right-row">
              <div class="m-product-name">哑铃</div>
            </div>
            <div class="m-product-description">商品描述活动描述商品描述活动描述商品描述活动描述商品描述活动描述商品</div>
            <div class="m-price-share">
              <div class="m-product-price">押金：<span class="m-price-time">3个月500元</span></div>
              <img class="m-share-img" src="/static/images/icon-gray-share.png" alt="">
              <div class="m-share-text">分享</div>
            </div>
          </div>
        </div>
        &lt;!&ndash;暂无最新发布商品&ndash;&gt;
        &lt;!&ndash;<img class="m-no-order-img" src="/static/images/icon-no-order.png" alt="">
        <div class="m-no-order-text">暂无最新发布商品</div>&ndash;&gt;
      </div>
      &lt;!&ndash;商品展示&ndash;&gt;
      <div class="m-most-product">最热商品</div>
      <div class="m-product-box">
        <div class="m-product-part" @click="changeRoute('/member/productDetail')">
          <div class="m-part-left">
            <img class="m-product-img" src="http://dummyimage.com/200x200" alt="">
          </div>
          <div class="m-part-right">
            <div class="m-right-row">
              <div class="m-product-name">哑铃</div>
            </div>
            <div class="m-product-description">商品描述活动描述商品描述活动描述商品描述活动描述商品描述活动描述商品</div>
            <div class="m-price-share">
              <div class="m-product-price">押金：<span class="m-price-time">3个月500元</span></div>
              <img class="m-share-img" src="/static/images/icon-gray-share.png" alt="">
              <div class="m-share-text">分享</div>
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <!--我的活动-->
    <!--<div class="m-border-radius">
      <div class="m-total-jump-box" @click="changeRoute('/storekeeper/activityManagement')">
        <div class="m-jump-title">我的活动</div>
        <div class="m-jump-text">活动管理</div>
        <img class="m-jump-img" src="/static/images/icon-more.png" alt="">
      </div>
      &lt;!&ndash;内容文字&ndash;&gt;
      <div class="m-content-box">
        <div class="m-content-text">正在参与活动：2</div>
      </div>
    </div>-->
    <!--我的粉丝-->
    <div class="m-border-radius">
      <div class="m-total-jump-box" @click="changeRoute('/storekeeper/group')">
        <div class="m-jump-title">我的团队</div>
        <div class="m-jump-text"></div>
        <img class="m-jump-img" src="/static/images/icon-more.png" alt="">
      </div>
      <!--内容文字-->
      <div class="m-content-box">
        <div class="m-content-text">粉丝总数：{{user.fens_count}}</div>
        <div class="m-content-text">本月新增：{{user.fens_mouth_count}}</div>
      </div>
    </div>
    <!--购买邀请码-->
    <div class="m-border-radius">
      <div class="m-total-jump-box" @click="changeRoute('/storekeeper/activationCode')">
        <div class="m-jump-title">购买激活码</div>
        <div class="m-jump-text"></div>
        <img class="m-jump-img" src="/static/images/icon-more.png" alt="">
      </div>
    </div>
    <!--我的邀请码-->
    <div class="m-border-radius">
      <div class="m-total-jump-box" @click="changeRoute('/storekeeper/myActivationCode')">
        <div class="m-jump-title">我的激活码</div>
        <div class="m-jump-text"></div>
        <img class="m-jump-img" src="/static/images/icon-more.png" alt="">
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
        outPopup: false,
        outSubmit: false,
        bankPopup: false,
        slots: [{ values: ['请点击选择银行'] }],
        bank: "",
        user: { uc_count: '', mounth_count: '' },
        realName: '',
        bankName: '',
        bankResult: "",
        moneyNum: '',
        bankNo: '',
        msg: '',
        validated: true         // 银行卡是否已失效
      }
    },
    components: {},
    methods: {
      // 跳转其他页面的方法
      changeRoute(v) {
        this.$router.push(v)
      },
      // 提现的选择银行确定按钮
      bankDone() {
        if(this.bankResult) {
          this.bank = this.bankResult;
        }
        this.bankPopup = false;
      },
      // 提现的提交按钮
      outBtn(where) {
        if(where == "submit") {
          if(this.moneyNum < 0.01) {
            Toast({ message: '提现金额应大于0', position: 'bottom' });
            return false;
          }
          if(this.moneyNum > this.user.usbalance) {
            Toast({ message: '提现金额应不大于可用余额', position: 'bottom' });
            return false;
          }
          if(!this.realName) {
            Toast({ message: '请先输入姓名', position: 'bottom' });
            return false;
          }
          if(this.bankNo.length < 10) {
            Toast({ message: '请先输入正确的银行卡号', position: 'bottom' });
            return false;
          }
          if((this.bank == '请点击选择银行' || this.bank == '可输入银行名称' || !this.bank) && !this.bankResult) {
            Toast({ message: '请先选择银行', position: 'bottom' });
            return false;
          }
          if(!this.bankName) {
            Toast({ message: '请先输入开户行', position: 'bottom' });
            return false;
          }
          /*if(!this.validated) {
            Toast({ message: '该银行卡已失效', position: 'bottom' });
            return false;
          }*/
          let params = {
            cncashnum: this.moneyNum,
            cncardno: this.bankNo,
            cncardname: this.realName,
            cnbankname: this.bank,
            cnbankdetail: this.bankName
          };
          axios.post(api.apply_cash + '?token='+ localStorage.getItem('token'), params).then(res => {
            if(res.data.status == 200) {
              this.msg = res.data.message;
              this.outSubmit = true;

              this.realName = '';
              this.bankNo = '';
              this.bank = '';
              this.bankName = '';
              this.slots[0].values = ['请点击选择银行'];
            }
          });
        }else if(where == "know") {
          this.outPopup = false;
          // 倒计时
          const TIME_COUNT = 1;
          let count = TIME_COUNT;
          let time = setInterval(() => {
            if (count > 0 && count <= TIME_COUNT) {
              count --;
            } else {
              this.outSubmit = false;
              clearInterval(time);
            }
          }, 1000);
        }
      },
      // 提现金额输入框获取焦点
      moneyFocus() {
        if(this.moneyNum == '0') {
          this.moneyNum = '';
        }
      },
      // 获取银行名称
      getBankName() {
        if(this.bankNo.length < 16) {
          Toast({ message: '请先输入正确的银行卡号', position: 'bottom' });
          return false;
        }
        this.bankPopup = true;
        axios.get(api.get_bankname + "?cncardno=" + this.bankNo).then(res => {
          if(res.data.status == 200) {
            /*if(!res.data.data.validated) {
              Toast('该银行卡已失效');
            }else {
              this.slots[0].values = ['请点击选择银行', res.data.data.cnbankname];
            }*/
            this.slots[0].values = ['可输入银行名称', res.data.data.cnbankname];
            this.validated = res.data.data.validated;
          }else {
            this.slots[0].values = ['可输入银行名称'];
          }
        })
      },
      // picker选择的银行改变
      bankChange(picker, values) {
        this.bank = values[0];
      },
      // 获取个人信息
      getUser() {
        axios.get(api.get_agent_center + "?token=" + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200) {
            this.user = res.data.data;
            this.moneyNum = this.user.usbalance;
            // console.log(this.user);
          }
        })
      },
    },
    mounted() {
      common.changeTitle('店主');
      this.getUser();               // 获取个人信息
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-storekeeper {
    min-height: 100vh;
    background-color: #EEEEEE;
    /*padding-bottom: 300px;*/
    .m-storekeeper-bg {
      width: 750px;
      height: 400px;
      margin-bottom: 40px;
    }
    .m-total-earnings {
      font-size: 24px;
      position: absolute;
      top: 110px;
      left: 60px;
    }
    .m-month-earnings {
      font-size: 21px;
      position: absolute;
      top: 190px;
      left: 110px;
      .m-month-earnings-text {
        font-size: 90px;
        padding: 0 16px;
      }
    }
    .m-border-radius {
      width: 700px;
      margin: 0 auto 30px auto;
      border-radius: 20px;
      background-color: #ffffff;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16);
      &:last-child {
        margin-bottom: -100px;
      }
      .m-most-product {
        font-size: 24px;
        text-align: left;
        margin: 0 0 20px 42px;
      }
      .m-product-box {
        padding: 0 24px 0 42px;
      }
      .m-no-order-img {
        width: 200px;
        height: 200px;
      }
      .m-no-order-text {
        font-size: 18px;
        padding-bottom: 40px;
      }
    }
    .m-total-jump-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 25px 25px 25px 50px;
      .m-jump-title {
        flex: 1;
        font-size: 28px;
        font-weight: bold;
        text-align: left;
      }
      .m-jump-text {
        font-size: 24px;
      }
      .m-earnings-out {
        /*flex: 1;*/
        text-align: left;
      }
      .m-detail-box {
        display: flex;
        align-items: center;
      }
      .m-text-bottom {
        text-decoration: underline;
      }
      .m-jump-img {
        width: 22px;
        height: 22px;
        margin-left: 5px;
      }
    }
    .m-content-box {
      display: flex;
      padding: 0 25px 34px 50px;
      justify-content: space-between;
      .m-content-text {
        font-size: 28px;
      }
    }
    .m-out-popup-box {
      .m-out-popup {
        width: 700px;
        height: 750px;
        margin: -400px 25px 0 25px;
        border-radius: 30px;
        .m-out-box {
          padding: 60px;
          .m-popup-close {
            text-align: right;
            margin: -40px -20px 0 0;
          }
          .m-out-title {
            text-align: left;
            margin-bottom: 60px;
          }
          .m-out-num-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px #C1C1C1 solid;
            .m-out-RMB {
              color: @mainColor;
              font-size: 50px;
              font-weight: bold;
            }
            .m-out-num-input {
              width: 400px;
              height: 70px;
              font-size: 50px;
              font-weight: bold;
            }
            .m-out-num-clean {
              width: 40px;
              height: 40px;
            }
          }
          .m-out-know-img {
            width: 85px;
            height: 85px;
            padding: 40px;
          }
          .m-out-know-title {
            font-size: 30px;
            font-weight: bold;
            padding: 20px 0 35px 0;
          }
          .m-out-know-text {
            font-size: 24px;
            padding-bottom: 140px;
          }
          .m-out-btn {
            width: 120px;
            white-space: nowrap;
            color: #ffffff;
            background-color: @mainColor;
            font-size: 30px;
            font-weight: bold;
            padding: 15px 60px;
            border-radius: 10px;
            box-shadow: 2px 8px 8px rgba(0,0,0,0.16);
            margin: 50px 0 0 170px;
          }
        }
      }
      .m-out-row {
        display: flex;
        justify-content: space-between;
        font-size: 28px;
        padding: 20px 0 10px 0;
        text-align: right;
        .m-row-left {

        }
        .m-row-right {
          .m-row-input {
            text-align: right;
            height: 40px;
            border: 1px #999999 solid;
            border-radius: 10px;
            font-size: 24px;
            padding: 3px 20px;
          }
          .m-width-200 {
            width: 200px;
          }
          .m-width-320 {
            width: 320px;
          }
        }
      }
      .m-out-bank {
        align-items: center;
        margin: 60px 120px -20px 120px;
      }
      .m-bank-popup {
        width: 750px;
        .m-popup-btn {
          display: flex;
          justify-content: space-between;
          font-size: 28px;
          padding: 20px 40px 0 40px;
        }
      }
    }
    .m-earnings-detail {
      width: 650px;
      display: flex;
      font-size: 21px;
      position: absolute;
      top: 290px;
      left: 0;
      right: 25px;
    }
    .m-my-order {
      position: absolute;
      top: 360px;
      left: 25px;
    }
  }
</style>
