<template>
  <div class="m-activity-product">
    活动商品
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';

  export default {
    data() {
      return {
        name: '',

      }
    },
    components: {},
    methods: {
      // 跳转页面
      changeRoute(v){
        this.$router.push(v)
      }
    },
    mounted() {
      common.changeTitle('活动商品');
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-activity-product {

  }
</style>
