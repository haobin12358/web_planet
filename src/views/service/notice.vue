<template>
  <div class="container">
    <section class="tool-bar space-between">
<!--      <el-form :inline="true">-->
<!--&lt;!&ndash;        <el-form-item label="姓名">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input v-model.trim="searchForm.kw" maxlength="100" ></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->

<!--&lt;!&ndash;        <el-button type="primary" icon="el-icon-search"  :loading="loading" @click="doSearch">查询</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button icon="el-icon-refresh"  :loading="loading" @click="doReset">重置</el-button>&ndash;&gt;-->
<!--      </el-form>-->
      <el-button type="primary" style="margin-bottom: 20px;" icon="el-icon-plus" @click="doAddNotice">新增</el-button>


    </section>

    <el-table :data="tableData" v-loading="loading" style="width: 100%" >

      <el-table-column align="center" prop="cmtitle" label="标题" width="280"></el-table-column>
      <el-table-column align="center" prop="createtime" label="发布时间" width="280"></el-table-column>
      <el-table-column align="center" prop="cmmessage" label="公告内容" >
        <template slot-scope="scope">
         <div  class="m-quill-box" >
           <div v-html="scope.row.cmmessage"></div>
         </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="240" >
        <template slot-scope="scope">
          <el-button type="text" @click="doEditNotice(scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text" @click="doRemoveNotice(scope.row)">删除</el-button>
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

  import {getStore} from "src/utils/index";

  export default {
    name: 'notice',

    components: {},


    data() {
      return {
        searchForm: {
          kw: ''
        },

        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],



      }
    },


    methods: {
      doSearch(){
        this.getNotice();
      },
      doReset(){
        this.searchForm = {
          kw: '',
        };
        this.doSearch();
      },

      getNotice() {
        this.loading = true;
        this.$http.get(this.$api.get_club_list, {
          noLoading: true,
          params: {
            page_size:this.pageSize,
            page_num:this.currentPage,
            cmindex: 2,
          },
        }).then(
          res => {
            this.loading = false;

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
        this.getNotice();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getNotice();
      },

      doAddNotice(){
        this.$router.push('/service/addNotice')
      },
      doEditNotice(item){
        this.$router.push({path:'/service/addNotice',query:{id:item.cmid}})
      },
      doRemoveNotice(item){
        let that = this;
        this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          item.delete = true;
          that.$http.post(that.$api.update_club, item).then(res => {
            if (res.data.status == 200) {
              that.$notify({
                title: '删除成功',
                message: '公告删除成功',
                type: 'success'
              });
              that.getNotice();
            }
          });
        }).catch(() => {

        });

      }





    },

    created() {
      this.getNotice();
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }

    .contract-img {
      .wl(300px, auto);
      max-height: 100%;
      margin-right: 30px;
      border: 1px solid black;
    }

  }
</style>
