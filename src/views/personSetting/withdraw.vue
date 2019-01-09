<template>
  <div class="container">
    <el-dialog v-el-drag-dialog :visible.sync="dialogVisible" width="700px" top="5vh" :close-on-click-modal="false"
               title="提现申请">
      <block-title title="可用余额"></block-title>
      <h1>￥10000</h1>
      <block-title title="可用余额"></block-title>
    </el-dialog>
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px;" @click="doNewApply">新增申请</el-button>

    <el-table :data="tableData" v-loading="loading">
      <el-table-column label="提现金额" prop="cncashnum" align="center"></el-table-column>
      <el-table-column label="开户行" prop="cnbankname" align="center"></el-table-column>
      <el-table-column label="银行网点" prop="cnbankdetail" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="户名" prop="cncardname" align="center"></el-table-column>
      <el-table-column label="卡号" prop="cncardno" align="center" width="260"></el-table-column>
      <el-table-column label="状态" prop="cnstatus" align="center"></el-table-column>
      <el-table-column label="拒绝原因" prop="cnrejectreason" align="center"></el-table-column>
      <el-table-column label="申请时间" prop="createtime" align="center" width="180"></el-table-column>
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
  import elDragDialog from 'src/directive/el-dragDialog'

  export default {
    name: "Withdraw",

    components: {},

    directives: {elDragDialog},

    data() {
      return {
        dialogVisible: false,

        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
      }
    },

    computed: {},

    methods: {
      getList() {
        this.$http.get(this.$api.get_cash_notes, {
          params: {}
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.tableData = data;
              this.total = resData.total_count;
            }
          }
        )
      },
      sizeChange(pageSize) {
        this.pageSize = pageSize;
        this.currentPage = 1;

        this.getList();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getList();
      },

      doNewApply(){
        this.dlgVisible = true;
      },
    },

    created() {
      this.getList();
    },
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {

  }
</style>
