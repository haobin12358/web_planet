<template>
  <div class="m-personal " >
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
                <span>收货地址</span>
              </div>
              <div>
                <input type="text" class="m-edit-input" placeholder="居居女孩">
              </div>
            </li>
            <li>
              <div>
                <span>收货地址</span>
              </div>
              <div>
                <span>保密</span>
              </div>
            </li>
            <li>
              <div>
                <span>出生日期</span>
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
</style>
