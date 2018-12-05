<template>
  <div class="container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/activity?index=2'}" replace>试用商品首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <h3 class="m-part-title m-flex-between">
      <span>
        <span class="m-part-title-icon"></span>
        <span>试用商品编辑</span>
      </span>
    </h3>
  </div>
</template>

<script>
  export default {
    name: "trialProductEdit",

    components: {},

    data() {
      return {}
    },

    computed: {},

    methods: {},

    created() {

    },
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/index";

  .container {

  }
</style>
