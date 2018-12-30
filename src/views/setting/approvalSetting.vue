<template>
    <div class="container">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane v-for="(item,index) in list" :label="item" :key="item">
          <keep-alive>
            <two-setting-table v-if="activeName == index"></two-setting-table>
          </keep-alive>
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
      return {
        list: [
          '提现审批',
          '退货审批',
          '代理商审批',
          '供应商商品审批',
          '圈子审批',
          '活动审批',
        ],

        activeName: '0',
      }
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
