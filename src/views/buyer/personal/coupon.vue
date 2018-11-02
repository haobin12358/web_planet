<template>
    <div class="m-coupon">
      <ul class="m-nav-list">
        <li class="active">
          <span>未使用</span>
        </li>
        <li>
          <span>已使用</span>
        </li>
        <li>
          <span>已过期</span>
        </li>
      </ul>
      <div class="m-coupon-content">
          <coupon-card></coupon-card>
        <coupon-card></coupon-card>
        <coupon-card></coupon-card>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import couponCard from '../components/couponCard'
    export default {
        data() {
            return {
                name: ''
            }
        },
        components: {
          couponCard
        },
        methods: {},
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../../common/css/index";
.m-coupon{
  .m-nav-list{
    padding: 0 80px;
  }
  .m-coupon-content{
    padding: 65px;
  }
}


</style>
