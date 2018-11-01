<template>
  <div class="m-personal ">
    <div class="m-personal-bg">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-personal-content m-setUp m-addAddress">
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
          <ul class="m-edit-ul m-addAddress-ul">
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label"><span class="m-must">*</span> 收件人</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" placeholder="收件人姓名">
              </div>
            </li>
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label"><span class="m-must">*</span> 手机号</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" placeholder="收件人姓名">
              </div>
            </li>
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label"><span class="m-must">*</span> 省市区</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" placeholder="收件人姓名">
                <span class="m-icon-more"></span>
              </div>
            </li>
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label"><span class="m-must">*</span> 详细地址</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" placeholder="收件人姓名">
              </div>
            </li>
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label">邮政编码</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" placeholder="收件人姓名">
              </div>
            </li>
            <li class="m-no-border m-default-address">
              <div>
                <span class="m-border"></span>
                <span>设为默认地址</span>
              </div>
              <div>
                 <span class="m-icon-default"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="m-foot-btn">
      <span>保存地址</span>
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
      changeRoute(v) {
        this.$router.push(v)
      }
    },
    created() {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/personal";
</style>
