<template>
  <div>添加商品</div>
</template>

<script>
  import common from '../../../common/js/common';
  export default {
    name: "addProduct",
    data() {
      return {

      }
    },
    components: {},
    methods: {},
    mounted() {
      common.changeTitle('添加商品');
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

</style>
