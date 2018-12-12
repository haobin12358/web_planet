<template>
  <div class="m-IDCard-box">
    <div class="m-IDCard-bg"></div>
    <div class="m-content">
      <div class="m-IDCard">
        <div>
          <p class="m-title m-ft-32">打款信息</p>
          <div class="m-IDCard-row">
            <div class="m-row-title">姓名</div>
            <input type="text" class="m-row-input m-width-450" v-model="name" placeholder="请填写姓名">
          </div>
          <div class="m-IDCard-row">
            <div class="m-row-title">银行卡号</div>
            <input type="text" class="m-row-input m-width-450" v-model="bankNo" maxlength="18" placeholder="请填写银行卡号">
          </div>
          <div class="m-IDCard-row">
            <div class="m-row-title">开户行</div>
            <input type="text" class="m-row-input m-width-450" v-model="bank" maxlength="18" placeholder="请选择银行">
          </div>
          <div class="m-IDCard-row">
            <div class="m-row-title">打款凭证</div>
          </div>
        </div>
        <div class="m-IDCard-img">
          <img class="m-IDCard-img" v-if="umfrontTemp" :src="umfrontTemp" alt="">
          <input type="file" name="file" class="m-upload-input" value="" accept="image/jpeg,image/png,image/jpg,image/gif" @change="uploadFrontImg">
        </div>
        <div class="m-IDCard-img">
          <img class="m-IDCard-img" v-if="umbackTemp" :src="umbackTemp" alt="">
          <input type="file" name="file" class="m-upload-input" value="" accept="image/jpeg,image/png,image/jpg,image/gif" @change="uploadBackImg">
        </div>
        <div class="m-rule">
          <img class="m-agree-img" v-if="!agree" src="/static/images/icon-radio.png" @click="agree = true">
          <img class="m-agree-img" v-if="agree" src="/static/images/icon-radio-active.png" @click="agree = false">
          <p class="m-rule-text">我已阅读并同意 <span class="m-rule-popup-text" @click="rulePopup = true">规则</span></p>
        </div>
        <!--按钮-->
        <div class="m-foot-btn">
          <span :class="!agree ? 'not-agree':''" @click="submitUser">提交申请</span>
        </div>
        <!--规则弹窗-->
        <mt-popup class="m-rule-popup" v-model="rulePopup" pop-transition="popup-fade">
          <div class="m-rule-title m-ft-32">规 则</div>
          <div class="m-rule-text-box m-ft-28">规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则</div>
          <div class="m-rule-row">
            <div class="m-rule-left">卡号</div>
            <div class="m-rule-right" @click="copyText('622394354582957258234')">622394354582957258234</div>
          </div>
          <div class="m-rule-row">
            <div class="m-rule-left">开户行</div>
            <div class="m-rule-right" @click="copyText('中国工商银行 萧山支行')">中国工商银行 萧山支行</div>
          </div>
          <div class="m-rule-row">
            <div class="m-rule-left">开户人</div>
            <div class="m-rule-right" @click="copyText('张三')">张三</div>
          </div>
          <div class="m-rule-row">
            <div class="m-rule-left">电话</div>
            <div class="m-rule-right" @click="copyText('17777777777')">17777777777</div>
          </div>
          <div class="m-rule-row">
            <div class="m-rule-left">地址</div>
            <div class="m-rule-right" @click="copyText('杭州市萧山区宁围镇')">杭州市萧山区宁围镇</div>
          </div>
          <div class="m-rule">
            <img class="m-agree-img" v-if="!agree" src="/static/images/icon-radio.png" @click="agree = true">
            <img class="m-agree-img" v-if="agree" src="/static/images/icon-radio-active.png" @click="agree = false">
            <p class="m-rule-text">我已阅读并同意以上规则</p>
          </div>
          <div class="m-rule-row">
            <div class="m-rule-left m-ft-22"><span style="color: red">* </span>以上打款信息可点击复制</div>
            <div class="m-rule-right"></div>
          </div>
        </mt-popup>
        <!--提交成功弹窗-->
        <mt-popup class="m-submit-popup" v-model="submitPopup" pop-transition="popup-fade">
          <img class="m-submit-loading" src="/static/images/icon-loading.png" alt="">
          <div class="m-ft-30 m-ft-b">提交成功</div>
          <div class="m-submit-text m-ft-24">管理员审核中，请耐心等待</div>
        </mt-popup>
        <!--审核通过弹窗-->
        <mt-popup class="m-submit-popup" v-model="auditPopup" pop-transition="popup-fade">
          <!--<div>
            <img class="m-submit-loading" src="/static/images/icon-no.png" alt="">
            <div class="m-ft-30 m-ft-b">审核未通过</div>
            <div class="m-submit-text m-ft-24">请检查所输入的信息后，再次提交</div>
          </div>-->
          <div>
            <img class="m-submit-loading" src="/static/images/icon-out-know.png" alt="">
            <div class="m-ft-30 m-ft-b">审核通过</div>
            <div class="m-submit-text m-ft-24">请依据给出的网址、用户名和密码登录</div>
          </div>
        </mt-popup>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import { Toast } from 'mint-ui';

  export default {
    name: "IDCardApprove",
    data() {
      return {
        submitPopup: false,
        auditPopup: false,
        rulePopup: true,
        name: "",
        bankNo: "",
        bank: "",
        agree: false,
        umfrontTemp: "",                      // 暂存正面
        umbackTemp: "",                       // 暂存反面
      }
    },
    methods: {
      // 复制文本
      copyText(text) {
        // let text = document.getElementById(v).innerText;
        this.$copyText(text).then(function (e) {
          Toast({ message: '已复制到剪切板', position: 'bottom' });
        });
      },
      //上传正面图片
      uploadFrontImg(e){
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        let reader = new FileReader();
        let that = this;
        let form = new FormData();
        form.append("file", files[0]);
        axios.post(api.upload_file + '?type=avatar&token=' + localStorage.getItem('token'), form).then(res => {
          if(res.data.status == 200) {
            this.user.umfront = res.data.data;
            reader.readAsDataURL(files[0]);
            reader.onload = function(e) {
              that.umfrontTemp = this.result;
            }
          }
        })
      },
      //上传反面图片
      uploadBackImg(e){
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        let reader = new FileReader();
        let that = this;
        let form = new FormData();
        form.append("file", files[0]);
        axios.post(api.upload_file + '?type=avatar&token=' + localStorage.getItem('token'), form).then(res => {
          if(res.data.status == 200) {
            this.user.umback = res.data.data;
            reader.readAsDataURL(files[0]);
            reader.onload = function(e) {
              that.umbackTemp = this.result;
            }
          }
        })
      },
      // 获取个人身份证详情
      getIdentifyinginfo() {
        axios.get(api.get_identifyinginfo + '?token=' + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            // console.log(res.data.data);
            this.user = res.data.data;
            this.umfrontTemp = this.user.umfront;
            this.umbackTemp = this.user.umback;
            // 性别判断
            if(this.user.usgender == "0") {
              this.user.usGender = "男";
            }else if(this.user.usgender == "1") {
              this.user.usGender = "女";
            }
          }
        });
      },
      // 提交认证按钮
      submitUser() {
        if(!this.name){
          Toast("请填写姓名");
          return false;
        }
        if(!this.bankNo){
          Toast("请填写银行卡号");
          return false;
        }
        if(!this.bank){
          Toast("请选择银行");
          return false;
        }
        if(!this.agree){
          Toast("请阅读并勾选同意购买激活码的规则");
          return false;
        }
        axios.post(api.upgrade_agent + "?token=" + localStorage.getItem('token'), params).then(res => {
          if(res.data.status == 200){
            Toast(res.data.message);
            // 申请提交成功则返回上一页
            this.$router.go(-1);
            this.submitPopup = true;
          }
        });
      }
    },
    mounted() {
      common.changeTitle('购买激活码');
      // this.getIdentifyinginfo();            // 获取个人身份证详情
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-IDCard-box {
    min-height: 100%;
    background-color: #EEEEEE;
    .m-IDCard-bg {
      width: 750px;
      height: 371px;
      background: linear-gradient(180deg, @mainColor 0%, @subColor 100%);
    }
    .m-content {
      position: absolute;
      top: 25px;
      .m-IDCard {
        width: 600px;
        padding: 60px 50px 30px 50px;
        margin: 0 0 260px 25px;
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: 0 5px 6px rgba(0,0,0,0.16);
        .m-title {
          color: #999999;
          text-align: left;
          margin: -20px 0 40px 0;
        }
        .m-IDCard-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px #CCCCCC solid;
          &:last-child {
            border-bottom: 0;
          }
          .m-row-title {
            color: #999999;
            font-size: 26px;
            margin-right: 32px;
          }
          .m-row-input {
            color: #999999;
            border-radius: 30px;
            font-size: 24px;
            text-align: right;
          }
          .m-width-220 {
            width: 220px;
          }
          .m-width-450 {
            width: 400px;
          }
        }
        .m-IDCard-img {
          text-align: left;
          width: 377px;
          height: 247px;
          margin-bottom: 30px;
          border-radius: 30px;
          background: url('/static/images/icon-upload-IDCard-img.png') no-repeat;
          background-size: 100% 100%;
        }
        .m-upload-input {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          width: 377px;
          height: 247px;
        }
        .m-rule {
          display: flex;
          padding-bottom: 10px;
          .m-agree-img {
            width: 35px;
            height: 35px;
            margin-right: 20px;
          }
          .m-rule-text {
            color: #999999;
            font-size: 24px;
            .m-rule-popup-text {
              color: #333333;
              border-bottom: 1px #333333 solid;
            }
          }
        }
        .m-foot-btn{
          position: absolute;
          bottom: 50px;
          left: 25px;
          span{
            color: #ffffff;
            display: inline-block;
            width: 700px;
            height: 106px;
            line-height: 106px;
            background-color: @mainColor;
            font-size: 38px;
            font-weight: bold;
            border-radius: 10px;
            box-shadow: 0 5px 6px rgba(0,0,0,0.16);
          }
          .not-agree {
            color: #999999;
            background-color: #EEEEEE;
          }
        }
        .m-submit-popup {
          width: 700px;
          height: 440px;
          margin: -300px 0 0 25px;
          border-radius: 30px;
          .m-submit-loading {
            width: 85px;
            height: 85px;
            margin: 99px 0 36px 0;
          }
          .m-submit-text {
            margin-top: 53px;
          }
        }
        .m-rule-popup {
          width: 620px;
          height: 820px;
          margin: -480px 0 0 25px;
          border-radius: 30px;
          padding: 40px 40px 60px 40px;
          .m-rule-title {

          }
          .m-rule-text-box {
            text-align: left;
            text-indent: 2em;
            margin: 40px 0 70px 0;
          }
          .m-rule-row {
            font-size: 28px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            .m-rule-left {
              color: #999999;
            }
            .m-rule-right {
              color: #333333;
            }
          }
        }
      }
    }
  }
</style>
