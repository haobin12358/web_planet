<template>
  <div class="container">
    <block-title title="提现审批层级管理"></block-title>
    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
      <el-table-column type="index" width="55"></el-table-column>
      <el-table-column label="关联标签用户组" align="center">
        <template slot-scope="scope">
          <el-select>
            <el-option label="标签组1"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text">保存</el-button>
        </template>
      </el-table-column>

    </el-table>
    <block-title title="权限标签管理"></block-title>
    <el-table :data="tableData2" v-loading="loading" stripe style="width: 100%">
      <el-table-column type="index" width="55"></el-table-column>
      <el-table-column label="标签组名称" prop="name"></el-table-column>
      <el-table-column label="管理员" prop="name">
        <template slot-scope="scope">
          <el-select v-model="scope.row.value" :multiple="true">
            <el-option v-for="item in select" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "twoSettingTable",

    components: {},

    data() {
      return {
        tableData: [],
        tableData2: [
          {
            name: '标签1',
            value: [],
          }
        ],
        select: [
          '小米',
          '红',
          '小可',
          '小好',
        ],
        loading: false,
      }
    },

    computed: {},

    methods: {},

    created() {

    },
  }
</script>

<style lang="less" scoped>
  @import "../../../styles/myIndex";

  .container {

  }
</style>
