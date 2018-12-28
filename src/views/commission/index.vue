<template>
    <div class="container">
      <!--工具栏-->
      <section class="tool-bar space-between">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="店主名称">
            <el-input v-model.trim="searchForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model.trim="searchForm.mobile" clearable></el-input>
          </el-form-item>

          <el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
          <el-button icon="el-icon-refresh" @click="doReset" style="margin-bottom: 20px;">重置</el-button>
        </el-form>
        <el-button type="primary" icon="el-icon-setting" @click="gotoCommissionSetting">佣金设置</el-button>
      </section>

      <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
        <el-table-column label="店主姓名" align="center" prop="usname"></el-table-column>
        <el-table-column label="手机号" align="center" prop="ustelphone"></el-table-column>
        <el-table-column label="账户余额" align="center" prop="remain"></el-table-column>
        <el-table-column label="粉丝数量" align="center" prop="fans_num"></el-table-column>
        <el-table-column label="获得佣金" align="center" prop="total"></el-table-column>
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
    name: 'CommissionIndex',

    components: {},

    data() {
      return {
        searchForm: {
          name: '',
          mobile: '',
        },

        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
      }
    },

    computed: {},

    methods: {
      doSearch(){
        this.getUserCommissionList();
      },
      doReset(){
        this.searchForm = {
          name: '',
          mobile: '',
        }
      },

      getUserCommissionList(){
        this.loading = true
        this.$http.get(this.$api.list_user_commison,{
          noLoading: true,
          params: {
            page_size: this.pageSize,
            page_num: this.currentPage,

            ...this.searchForm
          }
        }).then(
          res => {
            this.loading = false

            if (res.data.status == 200) {
              let resData = res.data,
                  data = res.data.data;

              this.tableData = data;
            }
          }
        )
      },
      sizeChange(pageSize) {
        this.pageSize = pageSize;
        this.currentPage = 1;

        this.getUserCommissionList();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getUserCommissionList();
      },

      gotoCommissionSetting(){
          this.$router.push({
            path: '/commission/commissionSetting'
          })
      },
    },

    created() {
      this.getUserCommissionList();

    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {

    }
</style>
