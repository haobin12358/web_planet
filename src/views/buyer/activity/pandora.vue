<template>
  <div class="m-pandora">
    <div class="m-box-product">
      <div class="m-box-tip m-ft-28 m-ft-b">您的好友为您打开了魔力盒子！</div>
      <div class="m-gift-one animated bounceInLeft" @click="pandora"></div>
      <div class="m-gift-two animated bounceInDown" @click="pandora"></div>
      <div class="m-gift-three animated bounceInUp" @click="pandora"></div>
      <div class="m-cloud-one"></div>
      <div class="m-cloud-two"></div>
      <div class="m-cloud-three"></div>
      <div class="m-cloud-four" :class="!record ? 'active' : ''"></div>
      <img class="m-product-img animated bounceIn" :src="box.prpic">
    </div>
    <div class="m-product-detail">
      <div class="m-buy-product" v-if="box.infos.current_price">
        <div class="m-price-one m-ft-38 m-ft-b m-red">预设价格：￥{{box.infos.current_price | money}}</div>
        <div class="m-box-btn m-ft-38 m-ft-b">点击购买</div>
      </div>
      <div class="m-product-name m-ft-38 m-ft-b tl">{{box.acname}}</div>
      <div class="m-product-price">
        <div class="m-price-two">原价：￥{{box.infos.skuprice | money}}</div>
        <div class="m-price-three m-red">最低价：￥{{box.infos.skuminprice | money}}</div>
      </div>
    </div>
    <div class="m-share-rule tl">
      <div class="m-rule-text">第一档：随机减少<span class="m-red">{{box.infos.gearsone[0]}}</span>元</div>
      <div class="m-rule-text">第二档：随机减少<span class="m-red">{{box.infos.gearstwo[0]}}</span>元或增加<span class="m-red">{{box.infos.gearstwo[1]}}</span>元</div>
      <div class="m-rule-text">第三档：随机减少<span class="m-red">{{box.infos.gearsthree[0]}}</span>元或增加<span class="m-red">{{box.infos.gearsthree[1]}}</span>元</div>
      <div class="m-box-btn m-share-btn m-ft-38 m-ft-b animated infinite pulse" @click="share">点击分享</div>
    </div>
    <img class="m-invite-course" src="/static/images/invite.png" v-if="show_invite" @click="show_invite = false">

    <div class="m-record-text" :class="record ? 'active' : ''" v-if="record">
      <div class="m-rule-icon"></div>
      <div class="m-text-bg">
        <div class="m-rule-title" v-if="history">拆盒记录</div>
        <div class="m-rule-title" v-else>暂无拆盒记录</div>
        <div class="m-rule-row" v-for="(item, index) in history">
          <div class="m-rule-no">{{index + 1}}</div>
          <div>{{item.msg}}</div>
        </div>
        <div class="m-text m-ft-21">活动最终解释权归本公司所有</div>
      </div>
    </div>
    <div class="m-cloud-five" :class="record ? 'active' : ''"></div>

    <!--点击魔盒的popup-->
    <mt-popup class="m-box-popup" v-model="boxPopup" pop-transition="popup-fade">
      <div class="m-gift-icon"></div>
      <div class="m-popup-text m-ft-30 m-ft-b">您为您的好友减少了<span class="m-red">5元</span>购买金额！</div>
      <div class="m-popup-btn m-ft-30 m-ft-b">告诉好友</div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import wxapi from '../../../common/js/mixins';

  export default {
    data() {
      return {
        name: '',
        boxPopup: false,            // 点击魔盒的popup
        record: true,
        box: { infos: { current_price: '', skuprice: '', skuminprice: '', gearsone: [], gearstwo: [], gearsthree: [] }},
        history: [],
        mbaid: '',
        show_invite: false,
      }
    },
    mixins: [wxapi],
    methods: {
      // 点击魔盒
      pandora() {
        this.boxPopup = true;
      },
      // 分享
      wxRegCallback () {
        this.wxShare()
      },
      // 点击分享
      share() {
        // wxapi.wxRegister();
        // this.wxShare();

        this.show_invite = true;
        this.wxShare();
      },
      wxShare () {
        let options = {
          title: '魔法礼盒',
          desc: '快来帮您的好友拆开魔法礼盒吧',
          imgUrl: this.box.prpic
        };
        // 参与魔盒活动(获取分享所需的url参数)
        axios.post(api.join_magicbox + '?token='+ localStorage.getItem('token'), { mbaid: this.mbaid }).then(res => {
          if(res.data.status == 200) {
            options.link = window.location.origin + '/#/pandora?mbjid=' + res.data.data.mbjid;
          }
        });
        wxapi.onMenuShareAppMessage(options);
        // wxapi.updateAppMessageShareData(options);
      },
      // 获取该活动
      getBox() {
        axios.get(api.get_activity + "?actype=2").then(res => {
          if(res.data.status == 200){
            this.box = res.data.data;
            this.history = res.data.data.open_history;
            this.mbaid = res.data.data.infos.mbaid;
            if(this.history) {
              for(let i = 0; i < this.history.length; i ++) {
                this.history[i].msg = this.history[i].usname;
                if(this.history[i].mbohasshare) {
                  this.history[i].msg += '拆盒并分享，';
                }else {
                  this.history[i].msg += '拆盒，';
                }
                if(this.history[i].mboresult > 0) {
                  this.history[i].msg += '增加了' + this.history[i].mboresult + '元';
                }else {
                  this.history[i].msg += '减少了' + this.history[i].mboresult + '元';
                }
              }
            }
          }
        });
      }
    },
    mounted() {
      common.changeTitle('魔法礼盒');
      this.getBox();                 // 获取该活动的规则
      // wxapi.wxRegister(this.wxRegCallback)
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-pandora {
    /*position: relative;*/
    .m-box-product {
      position: relative;
      height: 500px;
      background-color: #845AFA;
      z-index: 1;
      .m-box-tip {
        color: #ffffff;
        padding-top: 23px;
      }
      .m-gift-one {
        width: 184px;
        height: 204px;
        background: url("/static/images/activity/gift-one.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 223px;
        left: 119px;
        z-index: 10;
      }
      .m-gift-two {
        width: 162px;
        height: 191px;
        background: url("/static/images/activity/gift-two.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 128px;
        right: 118px;
        z-index: 10;
      }
      .m-gift-three {
        width: 198px;
        height: 210px;
        background: url("/static/images/activity/gift-three.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 453px;
        right: 58px;
        z-index: 10;
      }
      .m-cloud-one {
        width: 750px;
        height: 431px;
        background: url("/static/images/activity/cloud-one.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 100px;
        left: 0;
        z-index: 1;
      }
      .m-cloud-two {
        width: 750px;
        height: 380px;
        background: url("/static/images/activity/cloud-two.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 275px;
        left: 0;
        z-index: 3;
      }
      .m-cloud-three {
        width: 750px;
        height: 877px;
        background: url("/static/images/activity/cloud-three.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 520px;
        left: 0;
        z-index: 5;
      }
      .m-cloud-four {
        width: 750px;
        height: 1200px;
        background: url("/static/images/activity/cloud-four.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 700px;
        left: 0;
        z-index: 6;
        &.active {
          height: 800px;
        }
      }
      .m-product-img {
        width: 383px;
        height: 383px;
        border: 20px solid #ffffff;
        box-shadow: 10px 10px 20px rgba(0,0,0,0.16);
        border-radius: 20px;
        position: absolute;
        top: 494px;
        left: 39px;
        z-index: 7;
      }
    }
    .m-product-detail {
      padding: 0 40px;
      z-index: 8;
      position: absolute;
      top: 940px;
      left: 0;
      .m-buy-product {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: -20px;
        .m-price-one {
          margin-right: 30px;
        }
      }
      .m-product-name {
        padding: 25px 0 30px 0;
      }
      .m-product-price {
        width: 670px;
        display: flex;
        justify-content: space-between;
        font-size: 30px;
        font-weight: bold;
        .m-price-two {

        }
        .m-price-three {

        }
      }
    }
    .m-box-btn {
      width: 230px;
      height: 51px;
      text-align: center;
      line-height: 55px;
      white-space: nowrap;
      color: #ffffff;
      padding: 16px 40px;
      background: linear-gradient(180deg, @subColor 0%, @mainColor 100%);
      box-shadow: 0 5px 10px rgba(0,0,0,0.16);
      border-radius: 50px;
    }
    .m-share-btn {
      width: 300px;
      margin: 35px 0 0 145px;
    }
    .m-share-rule {
      padding: 33px 40px;
      position: absolute;
      top: 1160px;
      left: 0;
      z-index: 8;
      .m-rule-text {
        color: #999999;
        font-size: 24px;
      }
    }
    .m-invite-course {
      position: fixed;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      z-index: 10;
    }
    .m-cloud-five {
      width: 750px;
      height: 226px;
      background: url("/static/images/activity/cloud-five.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 1310px;
      left: 0;
      z-index: 1;
      &.active {
        top: 1795px;
      }
    }
    .m-red {
      color: #C70000;
    }
    .m-record-text {
      width: 700px;
      height: 560px;
      background: #B0F4F5;
      border-radius: 20px 20px 0 0;
      position: absolute;
      top: 1500px;
      left: 25px;
      z-index: 2;
      &.active {
        top: 1460px;
      }
      .m-rule-icon {
        width: 99px;
        height: 39px;
        background: url("/static/images/activity/icon-rule.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 11px;
        left: 59px;
        z-index: 1;
      }
      .m-text-bg {
        width: 644px;
        height: 530px;
        background: #845AFA;
        border-radius: 20px 20px 0 0;
        position: absolute;
        top: 29px;
        left: 28px;
        color: #ffffff;
        font-size: 38px;
        .m-rule-title {
          margin: 24px 0 30px 0;
        }
        .m-rule-row {
          display: flex;
          .m-rule-no {
            width: 30px;
            height: 30px;
            font-size: 30px;
            font-weight: bold;
            line-height: 35px;
            padding: 10px;
            margin: 0 30px 30px 30px;
            background-color: @mainColor;
            border-radius: 50%;
          }
        }
        .m-text {
          position: absolute;
          bottom: 0;
          left: 188px;
        }
      }
    }
    .m-box-popup {
      width: 680px;
      height: 600px;
      margin: -300px 0 0 25px;
      border-radius: 30px;
      border: 10px #9A5AEB dashed;
      .m-gift-icon {
        width: 183px;
        height: 204px;
        background: url("/static/images/activity/gift-four.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: -90px;
        left: 1px;
      }
      .m-popup-text {
        margin-top: 230px;
      }
      .m-popup-btn {
        width: 250px;
        height: 70px;
        line-height: 75px;
        margin: 160px 0 0 225px;
        color: #ffffff;
        background-color: @mainColor;
        box-shadow: 2px 8px 8px rgba(0,0,0,0.16);
        border-radius: 10px;
      }
    }
  }
</style>
