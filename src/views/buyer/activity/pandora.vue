<template>
  <div class="m-pandora">
    魔法礼盒
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
      common.changeTitle('魔法礼盒');
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-pandora {

  }
</style>
