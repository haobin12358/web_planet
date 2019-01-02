<template>
  <div class="container">
    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
      <el-table-column
        type="index"></el-table-column>
      <el-table-column align="center" width="120" label="图片">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.tcmainpic" :key="scope.row.tcid"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="tctitle" label="商品名" width="280"></el-table-column>
      <el-table-column align="center" prop="brand.pbname" label="品牌" width="180"></el-table-column>
      <el-table-column align="center" prop="tcdeposit" label="押金/期限(天)" width="180">
        <template slot-scope="scope">
          {{scope.row.tcdeposit + ' / ' + scope.row.tcdeadline}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="prstatus_zh" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="statusTagType(scope.row.tcstatus)">{{scope.row.zh_tcstatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="tcstocks" label="库存" width="120"></el-table-column>
      <el-table-column align="center" prop="tcsalesvalue" label="销量" width="120"></el-table-column>
      <el-table-column align="center" prop="tcdeposit" label="活动时间(执行)" width="280">
        <template slot-scope="scope" v-if="scope.row.agreestarttime">
          {{scope.row.agreestarttime + ' - ' + scope.row.agreeendtime}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="tcdeposit" label="活动时间(申请)" width="280">
        <template slot-scope="scope">
          {{scope.row.applystarttime + '-' + scope.row.applyendtime}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="zh_remarks" label="备注" width="180"></el-table-column>

      <el-table-column align="center" width="180" label="操作" fixed="right">
        <template slot-scope="scope">
          <!--<el-button type="text" v-if="scope.row.tcstatus == 20" @click="doEdit(scope.row)">编辑</el-button>-->
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
  //  totrialcommodity
  export default {
    name: "TrialProductAudit",

    components: {},

    data() {
      return {
        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],

      }
    },

    computed: {},

    methods: {
      statusTagType(status) {
        switch (status) {
          case 0:
            return 'primary';
          case 10:
            return 'danger'
          case 20:
            return 'warning'
          case 30:
            return 'info'
          case 40:
            return 'info'
        }
      },

      getList(){
        this.loading = true;
        this.$http.get(this.$api.get_approval_list,{
          noLoading: true,
          params: {
            ptid: 'totrialcommodity'
          }
        }).then(
          res => {
            this.loading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                  data = res.data.data;

              console.log(data);
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
