<template>
  <div class="m-IDCard-box">
    <div class="m-IDCard-bg"></div>
    <div class="m-IDCard">
      <div>
        <div class="m-IDCard-row">
          <div class="m-row-title">真实姓名</div>
          <input type="text" class="m-row-input m-width-220" v-model="user.usrealname" placeholder="请填写真实姓名">
        </div>
        <div class="m-IDCard-row" @click="genderPopup = true">
          <div class="m-row-title">性别</div>
          <div class="m-row-input m-width-450">{{user.usGender}}</div>
        </div>
        <!--性别picker-->
        <mt-popup class="m-gender-popup" v-model="genderPopup" position="bottom">
          <div class="m-popup-btn">
            <div @click="genderPopup = false">取消</div>
            <div @click="genderDone">确认</div>
          </div>
          <mt-picker :slots="slots" @change="genderChange"></mt-picker>
        </mt-popup>

        <div class="m-IDCard-row">
          <div class="m-row-title">手机号码</div>
          <input type="text" class="m-row-input m-width-450" placeholder="请填写手机号码">
        </div>
        <div class="m-IDCard-row">
          <div class="m-row-title">身份证号</div>
          <input type="text" class="m-row-input m-width-450" v-model="user.usidentification" maxlength="18" placeholder="请填写身份证号">
        </div>
        <div class="m-IDCard-row">
          <div class="m-row-title">身份证照片</div>
        </div>
      </div>
      <img class="m-IDCard-img" v-if="user.umfront" :src="user.umfront" alt="">
      <img class="m-IDCard-img" v-if="!user.umfront" src="/static/images/icon-upload-IDCard-img.png" alt="">
      <img class="m-IDCard-img" v-if="user.umback" :src="user.umback" alt="">
      <img class="m-IDCard-img" v-if="!user.umback" src="/static/images/icon-upload-IDCard-img.png" alt="">

      <div class="m-foot-btn">
        <span @click="submitUser">提交认证</span>
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
        name: 'IDCardApprove',
        user: { usGender: "请选择性别" },      // 用户信息
        genderPopup: false,                   // 性别picker
        slots: [{ values: ['男', '女'] }],
        gender: "",                           // 暂存性别
      }
    },
    methods: {
      // 获取个人身份证详情
      getIdentifyinginfo() {
        axios.get(api.get_identifyinginfo + '?token=' + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            this.user = res.data.data;
            // 性别判断
            if(this.user.usgender == "0") {
              this.user.usGender = "男";
            }else if(this.user.usgender == "1") {
              this.user.usGender = "女";
            }
          }else{
            Toast(res.data.message);
          }
        });
      },
      // 性别picker的确认按钮
      genderDone() {
        this.genderPopup = false;
        this.user.usGender = this.gender;
      },
      // picker选择的性别改变
      genderChange(picker, values) {
        this.gender = values[0];
      },
      // 提交认证按钮
      submitUser() {
        if(!this.user.usrealname){
          Toast("请输入真实姓名");
          return false;
        }else if(!this.user.usidentification){
          Toast("请输入身份证号");
          return false;
        }
        this.user.token = localStorage.getItem('token');
        this.user.umfront = "http://img.mp.sohu.com/q_mini,c_zoom,w_640/upload/20170704/83902139496349e2a6e88d2486150248_th.jpg";       // 身份证正面
        this.user.umback = "http://5b0988e595225.cdn.sohucs.com/images/20170829/c44fb84d1c224476a0c905d98a50551c.jpeg";        // 身份证反面

        axios.get(api.check_idcode, { params: this.user }).then(res => {
          if(res.data.status == 200){
            Toast(res.data.data.reason);
            // 验证通过则返回上一页
            if(!res.data.data.result) {
              this.$router.go(-1);
            }
          }else{
            Toast(res.data.message);
          }
        });
      }
    },
    mounted() {
      common.changeTitle('身份证认证');
      this.getIdentifyinginfo();            // 获取个人身份证详情
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
      background: linear-gradient(180deg,rgba(252,211,22,1) 0%,rgba(239,232,197,1) 100%);
    }
    .m-IDCard {
      width: 600px;
      padding: 60px 50px;
      margin-bottom: 260px;
      border-radius: 10px;
      background-color: #ffffff;
      position: absolute;
      top: 25px;
      left: 25px;
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
          font-size: 30px;
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
      .m-gender-popup {
        width: 750px;
        .m-popup-btn {
          display: flex;
          justify-content: space-between;
          font-size: 28px;
          padding: 20px 40px 0 40px;
        }
      }
      .m-IDCard-img {
        float: left;
        width: 377px;
        height: 247px;
        margin-bottom: 30px;
        border-radius: 30px;
      }
      .m-foot-btn{
        position: absolute;
        bottom: -150px;
        left: 0;
        span{
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
      }
    }
  }
</style>
