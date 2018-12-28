<template>
    <div class="container">
      <el-tabs type="border-card" closable>
        <el-tab-pane label="用户管理">
          <two-setting-table></two-setting-table>
        </el-tab-pane>
        <el-tab-pane label="配置管理">
          <two-setting-table></two-setting-table>
        </el-tab-pane>
        <el-tab-pane label="角色管理">
          <two-setting-table></two-setting-table>
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿">
          <two-setting-table></two-setting-table>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import TwoSettingTable from "./components/twoSettingTable";


  export default {
    name: 'approvalSetting',

    components: {TwoSettingTable},

    data() {
      return {}
    },

    computed: {},

    methods: {},

    created() {

    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {

    }
</style>
