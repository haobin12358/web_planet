<template>
  <div class="m-dailyGuess">
    每日竞猜
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
      common.changeTitle('每日竞猜');
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-dailyGuess {

  }
</style>
