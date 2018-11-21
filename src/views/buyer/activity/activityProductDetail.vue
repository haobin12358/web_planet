<template>
  <div class="m-activity-product-detail">
    活动商品详情
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

    },
    mounted() {
      common.changeTitle('活动商品详情');
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-activity-product-detail {

  }
</style>
