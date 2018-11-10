<template>
  <div class="m-personal">
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
            <li @click="changeRoute('/personal/addressManagement')">
              <div>
                <span>姓名</span>
              </div>
              <div>
                <span>居居</span>
              </div>
            </li>
            <li>
              <div>
                <span>性别</span>
              </div>
              <div>
                <span>保密</span>
              </div>
              <!--<div>
                <span class="m-icon-down"></span>
              </div>-->
            </li>
            <li>
              <div>
                <span>电话</span>
              </div>
              <div>
                <input type="text" class="m-edit-input" placeholder="18356543566">
              </div>
            </li>
            <li @click="changeRoute('/storekeeper/IDCardApprove')">
              <div>
                <span>身份证认证</span>
              </div>
              <div>
                <span></span>
                <span class="m-icon-more"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="m-submit-status" v-if="submitStatus">{{submitStatus}}</div>
    <div class="m-foot-btn">
      <span @click="submitApply" v-if="!submitDone">提交申请</span>
      <span class="foot-btn" v-if="submitDone">提交申请</span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import { MessageBox } from 'mint-ui';

  export default {
    data() {
      return {
        name: '',
        submitStatus: "",       // 成为店主的申请状态
        submitDone: false,             // 成为店主的申请是否已提交
      }
    },
    components: {},
    methods: {
      // 跳转页面
      changeRoute(v){
        this.$router.push(v);
      },
      // 提交申请
      submitApply() {
        MessageBox.confirm('是否确认提交该申请?').
        then(() => {
          this.submitStatus = "申请中";
          this.submitDone = true;
        }).catch(() => {
          this.submitStatus = "";
          this.submitDone = false;
        });
      }
    },
    created() {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/personal";

</style>
