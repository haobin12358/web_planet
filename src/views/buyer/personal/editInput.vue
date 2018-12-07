<template>
  <div class="m-personal m-editInput" >
    <div class="m-personal-content">
      <div class="m-personal-body">
        <div class="m-one-part">
          <ul class="m-edit-ul">
            <li v-if="from == 'new' || from == 'phone'">
              <div>
                <span>手机号</span>
              </div>
              <div>
                <input type="text" class="m-edit-input m-input-border" v-model="ustelphone">
              </div>
            </li>
            <li v-if="from == 'new' || from == 'phone'">
              <div>
                <span>验证码</span>
              </div>
              <div>
                <input type="text" class="m-edit-input-s m-input-border" v-model="identifyingcode" maxlength="6">
                <span class="m-get-code active" v-if="!getCode" @click="getInforcode">获取验证码</span>
                <span class="m-get-code" v-if="getCode">{{ count }} 秒后重发</span>
              </div>
            </li>
            <li v-if="from == 'passwd'">
              <div>
                <span>新支付密码</span>
              </div>
              <div>
                <input type="password" class="m-edit-input m-input-border" v-model="uspaycode">
              </div>
            </li>
            <li v-if="from == 'passwd'">
              <div>
                <span>确认支付密码</span>
              </div>
              <div>
                <input type="password" class="m-edit-input m-input-border" v-model="uspaycodeAgain">
              </div>
            </li>
          </ul>
        </div>
        <div class="m-editInput-alert" v-if="from == 'passwd'">
          <p class="m-ft-28">提示：</p>
          <p class="m-ft-24">支付密码用于装币/积分等支付验证</p>
          <p class="m-ft-24">让您的资金账户更加安全</p>
        </div>
        <div class="m-editInput-alert" v-if="from == 'new'">
          <p class="m-ft-28">提示：</p>
          <p class="m-ft-24">微信新登录用户请绑定手机号后再使用</p>
        </div>
      </div>
    </div>
    <div class="m-foot-btn">
      <span @click="saveUser">确 认</span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        getCode: false,               // 是否已获取验证码
        ustelphone: '',               // 手机号码
        identifyingcode: '',          // 验证码
        uspaycode: '',                // 支付密码
        uspaycodeAgain: '',           // 确认支付密码
        timer: null,                  // 倒计时
        count: "",                    // 倒计时
        from: ''                      // 从哪个页面进入此页面的
      }
    },
    components: {},
    methods: {
      // 跳转页面
      changeRoute(v){
        this.$router.push(v);
      },
      // 获取验证码
      getInforcode() {
        if(!this.ustelphone){
          Toast("请先输入手机号码");
          return false;
        }
        // 倒计时60秒
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.getCode = true;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count --;
            } else {
              this.getCode = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        axios.get(api.get_inforcode + "?ustelphone=" + this.ustelphone).then(res => {
          if(res.data.status == 200) {
            Toast(res.data.message);
          }
        });
      },
      // 保存信息
      saveUser() {
        // 更换手机号或者新人绑定手机号
        if(this.from == 'new' || this.from == 'phone') {
          if(!this.ustelphone){
            Toast("请先输入手机号码");
            return false;
          }
          if(!this.identifyingcode){
            Toast("请先输入验证码");
            return false;
          }
        }
        if(this.from == 'passwd') {
          if(!this.uspaycode){
            Toast("请先输入支付密码");
            return false;
          }
          if(!this.uspaycodeAgain){
            Toast("请再次输入支付密码");
            return false;
          }
          if(this.uspaycode != this.uspaycodeAgain){
            Toast("两次输入的支付密码不一致");
            return false;
          }
        }
        let params = {
          ustelphone: this.ustelphone,
          identifyingcode: this.identifyingcode
        };
        if(this.from == 'passwd') {
          params.uspaycode = this.uspaycode;
          params.uspaycodeAgain = this.uspaycodeAgain;
        }
        axios.post(api.update_user + '?token=' + localStorage.getItem('token'), params).then(res => {
          if(res.data.status == 200){
            if(this.from == 'new') {
              Toast('绑定成功');
              this.$router.push('/selected');
            }else {
              Toast(res.data.message);
              this.$router.go(-1);
            }
          }
        });
      }
    },
    mounted() {
      this.from = this.$route.query.from;
      if(this.from == 'new') {
        common.changeTitle('绑定账号');
      }else if(this.from == 'phone' || this.from == 'passwd') {
        common.changeTitle('安全中心');
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/personal";
  .m-editInput{
    .m-edit-input-s {
      display: inline-block;
      width: 170px;
      height: 42px;
      line-height: 42px;
      font-size: 28px;
    }
    .m-edit-input {
      display: inline-block;
      width: 310px;
      height: 42px;
      line-height: 42px;
    }
    .m-input-border {
      border: 2px #EEEEEE solid !important;
      border-radius: 30px;
      padding: 0 20px;
    }
    .m-editInput-alert{
      padding: 33px 55px;
      color: #999999;
    }
    .m-get-code{
      width: 110px;
      white-space: nowrap;
      display: inline-block;
      padding: 4px 15px;
      border-radius: 10px;
      background-color: #CCCCCC;
      color: #fff;
      box-shadow:0 3px 6px rgba(0,0,0,0.16);
      font-size: 21px;
      line-height: 40px;
      &.active{
        background-color: @mainColor;
      }
    }
  }
</style>
