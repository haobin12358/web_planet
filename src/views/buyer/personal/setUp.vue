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
            <div @click="changeRoute('/personal/personalInfo')">
              <span>个人资料</span>
              <span class="m-icon-more"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="m-personal-body">
        <div class="m-one-part">
           <ul class="m-edit-ul">
             <li @click="changeRoute('/personal/addressManagement')">
               <div>
                 <span class="m-icon m-icon-loc"></span>
                 <span>收货地址</span>
               </div>
               <div>
                 <span></span>
                 <span class="m-icon-more"></span>
               </div>
             </li>
             <li>
               <div>
                 <span class="m-icon m-icon-delete"></span>
                 <span>清楚缓存</span>
               </div>
               <div>
                 <span>1.5M</span>
                 <span class="m-icon-more"></span>
               </div>
             </li>
             <li>
               <div>
                 <span class="m-icon m-icon-about"></span>
                 <span>关于大行星</span>
               </div>
               <div>
                 <span>1.0</span>
                 <span class="m-icon-more"></span>
               </div>
             </li>
           </ul>
        </div>
      </div>
    </div>
    <div class="m-foot-btn">
      <span>退出登录</span>
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
