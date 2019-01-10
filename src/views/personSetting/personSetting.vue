<template>
  <div class="container">
    <el-col :span="16">
      <block-title title="提现账户"></block-title>
      <el-form label-position="left" label-width="120px">
        <el-form-item label="开户行">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="开户网点">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="卡号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保 存</el-button>
        </el-form-item>
      </el-form>
      <block-title title="开票账户"></block-title>
      <el-form label-position="left" label-width="120px">
        <el-form-item label="公司名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="纳税识别码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="地址电话">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="银行账户">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-col>

  </div>
</template>

<script>
  export default {
    name: "PersonSetting",

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
  @import "../../styles/myIndex";

  .container {

  }
</style>
