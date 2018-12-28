<template>
  <div class="container ">
    <block-title title="公共佣金比"></block-title>
    <section class="tool-bar">
      <el-form inline style="display: flex;justify-content: space-between;">
        <span style="line-height: 40px;">100%</span>
        <el-form-item label="二级代理佣金比例">
          <el-input v-model.number="secLevelRate">
            <template slot="append">%</template>

          </el-input>
        </el-form-item>
        <el-form-item label="一级代理佣金比例">
          <el-input v-model.number="firstLevelRate">
            <template slot="append">%</template>

          </el-input>
        </el-form-item>
        <el-form-item label="平台佣金比例">
          <el-input v-model.number="platformRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <span style="line-height: 40px;">{{100- secLevelRate-firstLevelRate-platformRate}}%</span>
        <el-form-item>
          <el-button icon="el-icon-save" type="primary" @click="doSaveCommonRate">保存</el-button>
        </el-form-item>
      </el-form>
    </section>

    <block-title title="个人佣金比"></block-title>
    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
      <el-table-column label="代理商" align="center" prop="name"></el-table-column>
      <el-table-column label="佣金比例" align="center" prop="usname">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.rate" style="width: 200px;">
            <template slot="append">%</template>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" prop="usname">
        <template slot-scope="scope">
          <el-button type="text">修改佣金比</el-button>
        </template>
      </el-table-column>
    </el-table>

    <section class="table-bottom">
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="sizeChange"
        @current-change="pageChange">
      </el-pagination>
    </section>
  </div>
</template>

<script>
  export default {
    name: "CommissionSetting",

    components: {},

    data() {
      return {
        secLevelRate: 10,
        firstLevelRate: 10,
        platformRate: 10,

        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [
          {
            name: 'yyy',
            rate: 40,
          }
        ],
      }
    },

    computed: {},

    methods: {
      doSaveCommonRate(){

      },

      sizeChange(pageSize) {
        this.pageSize = pageSize;
        this.currentPage = 1;

        // this.getUserCommissionList();
      },
      pageChange(page) {
        this.currentPage = page;
        // this.getUserCommissionList();
      },

      doSavePersonRate(){

      },
    },

    created() {

    },
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {

  }
</style>
