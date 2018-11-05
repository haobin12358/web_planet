<template>
  <div class="m-personal m-safeCenter" >
    <div class="m-personal-bg">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-personal-content m-setUp">
      <div class="m-personal-info">
        <img src="" class="m-personal-head-portrait" alt="">
        <div class="m-personal-info-box">
          <div class="m-personal-info-text">
            <div>
              <p>居居女孩</p>
              <p>
                <span class="m-personal-identity">行装会员</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="m-personal-body">
        <div class="m-one-part">
          <ul class="m-edit-ul">
            <li>
              <div>
                <span>真实姓名</span>
              </div>
              <div>
                <input type="text" class="m-edit-input" v-model="username">
              </div>
            </li>
            <li>
              <div>
                <span>身份证号</span>
              </div>
              <div>
                <input type="text" class="m-edit-input" v-model="card">
              </div>
            </li>
            <li @click="changeRoute('/personal/editInput')">
              <div>
                <span>手机号</span>
              </div>
              <div>
                <span class="m-grey">去绑定手机号</span>
                <span class="m-icon-more"></span>
              </div>
            </li>
            <li @click="changeRoute('/personal/editInput')">
              <div>
                <span>支付密码</span>
              </div>
              <div>
               <span class="m-grey">设置修改</span>
                <span class="m-icon-more"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        card:'339000000000000000',
        username:'居居女孩'
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
  .m-safeCenter{
    .m-edit-input{
      display: inline-block;
      width: 380px;
      height: 40px;
      line-height: 40px;
      font-size: 30px;
    }
  }
</style>
