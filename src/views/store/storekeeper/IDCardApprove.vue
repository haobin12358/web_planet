<template>
  <div class="m-IDCard">
    <div class="m-IDCard-row">
      <div class="m-row-title">真实姓名</div>
      <input type="text" class="m-row-input m-name-input" v-model="user.usrealname" placeholder="请输入真实姓名">
    </div>
    <div class="m-IDCard-row">
      <div class="m-row-title">身份证号</div>
      <input type="text" class="m-row-input m-num-input" v-model="user.usidentification" maxlength="18" placeholder="请输入身份证号">
    </div>

    <div class="m-IDCard-row">
      <div class="m-row-title">身份证正面</div>
    </div>
    <img class="m-IDCard-img" v-if="user.umfront" :src="user.umfront" alt="">
    <img class="m-IDCard-img" v-if="!user.umfront" src="/static/images/icon-upload-IDCard-img.png" alt="">
    <div class="m-IDCard-row">
      <div class="m-row-title">身份证反面</div>
    </div>
    <img class="m-IDCard-img" v-if="user.umback" :src="user.umback" alt="">
    <img class="m-IDCard-img" v-if="!user.umback" src="/static/images/icon-upload-IDCard-img.png" alt="">

    <div class="m-foot-btn">
      <span @click="submitUser" v-if="!user.usidentification">提交认证</span>
      <div class="m-footer-btn-box" v-if="user.usidentification">
        <div class="m-footer-btn m-grey" @click="goBack">返 回</div>
        <div class="m-footer-btn m-yellow" @click="editAgain">再次认证</div>
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
        user: {},                     // 用户信息
      }
    },
    methods: {
      // 获取个人身份证详情
      getIdentifyinginfo() {
        axios.get(api.get_identifyinginfo + '?token=' + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            this.user = res.data.data;
          }else{
            Toast(res.data.message);
          }
        });
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
      },
      // 返回上一页
      goBack() {
        this.$router.go(-1);
      },
      // 再次编辑
      editAgain() {
        this.user.usidentification = "";
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

  .m-IDCard {
    padding: 60px 50px;
    .m-IDCard-row {
      display: flex;
      margin-bottom: 25px;
      .m-row-title {
        color: #666666;
        font-size: 30px;
        margin-right: 32px;
      }
      .m-row-input {
        border: 1px #999999 solid;
        border-radius: 30px;
        font-size: 24px;
        padding: 3px 0 0 30px;
      }
      .m-name-input {
        width: 220px;
      }
      .m-num-input {
        width: 450px;
      }
    }
    .m-IDCard-img {
      width: 655px;
      height: 429px;
      margin-bottom: 30px;
      border-radius: 30px;
    }
    .m-foot-btn{
      margin: 30px -25px;
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
      .m-footer-btn-box {
        margin: 50px 30px 0 30px;
        display: flex;
        justify-content: space-between;
        .m-footer-btn {
          width: 300px;
          height: 106px;
          line-height: 106px;
          font-size: 30px;
          font-weight: bold;
          border-radius: 10px;
          box-shadow: 0 5px 6px rgba(0,0,0,0.16);
        }
        .m-yellow {
          background-color: @mainColor;
        }
        .m-grey {
          background-color: #CCCCCC;
        }
      }
    }
  }
</style>
