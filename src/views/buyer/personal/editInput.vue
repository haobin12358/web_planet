<template>
  <div class="m-personal m-editInput" >
    <div class="m-personal-content">
      <div class="m-personal-body">
        <div class="m-one-part">
          <ul class="m-edit-ul">
            <li>
              <div>
                <span>请输入新手机号码</span>
              </div>
              <div>
                <input type="text" class="m-edit-input" >
              </div>
            </li>
            <li>
              <div>
                <span>请输入验证码</span>
              </div>
              <div>
                <input type="text" class="m-edit-input-s" >
                <span class="m-get-code active">获取验证码</span>
              </div>
            </li>
            <li>
              <div>
                <span>新支付密码</span>
              </div>
              <div>
                <input type="password" class="m-edit-input" >
              </div>
            </li>
            <li>
              <div>
                <span>确认支付密码</span>
              </div>
              <div>
                <input type="password" class="m-edit-input" >
              </div>
            </li>
          </ul>
        </div>
        <div class="m-editInput-alert">
          <p>提示：</p>
          <p>支付密码必须6位数。</p>
          <p>支付密码用于装币/积分等支付验证。</p>
          <p>让您的资金账户更加安全。</p>
        </div>
      </div>
    </div>
    <div class="m-foot-btn">
      <span>确  认</span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        name: ''
      }
    },
    components: {},
    methods: {
      changeRoute(v){
        this.$router.push(v)
      }
    },
    created() {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/personal";
  .m-editInput{
    .m-edit-input-s{
      display: inline-block;
      width: 200px;
      height: 42px;
      line-height: 42px;
    }
    .m-edit-input{
      display: inline-block;
      width: 320px;
      height: 42px;
      line-height: 42px;
    }
    .m-editInput-alert{
      padding: 33px 55px;
      color: #999999;
      font-size: 30px;
    }
    .m-get-code{
      display: inline-block;
      padding: 4px 35px;
      border-radius: 10px;
      background-color: #CCCCCC;
      color: #fff;
      box-shadow:0 3px 6px rgba(0,0,0,0.16);
      font-size: 21px;
      &.active{
        background-color: @mainColor;
      }
    }
  }
</style>
