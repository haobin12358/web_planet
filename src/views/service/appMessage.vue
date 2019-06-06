<template>
  <div class="container">
    <section class="tool-bar space-between">
      <el-button type="primary" style="margin-bottom: 20px;" icon="el-icon-plus" @click="doAddMessage">新增</el-button>
    </section>

    <el-table :data="tableData" v-loading="loading" style="width: 100%" >
      <el-table-column align="center" prop="pmtitle" label="头像" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.pmhead" alt="" class="m-head">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="pmname" label="名称" width="180"></el-table-column>
      <el-table-column align="center" prop="createtime" label="发布时间" width="180"></el-table-column>
      <el-table-column align="center" prop="pmtitle" label="标题" width="280"></el-table-column>
      <el-table-column align="center" prop="createtime" label="发布时间" width="280"></el-table-column>
      <el-table-column align="center" prop="pmtext" label="站内信内容" width="280">
        <template slot-scope="scope">
          <div  class="m-quill-box" >
            <div v-html="scope.row.pmtext"></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="pmreadcount" label="已读数" width="80"></el-table-column>
      <el-table-column align="center" prop="pmstatus" label="状态" width="80" >
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.pmstatus  ==  0">草稿</el-tag>
          <el-tag v-else-if="scope.row.pmstatus  ==  1">上架</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="240" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.pmstatus == 0" @click="doEditMessage(scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text" @click="doRemoveMessage(scope.row)">删除</el-button>
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
        this.getMessage();
      },
      doReset(){
        this.searchForm = {
          kw: '',
        };
        this.doSearch();
      },

      getMessage() {
        this.loading = true;
        this.$http.get(this.$api.message_get, {
          noLoading: true,
          params: {
            page_size:this.pageSize,
            page_num:this.currentPage,
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
        this.getMessage();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getMessage();
      },

      doAddMessage(){
        this.$router.push('/service/addMessage')
      },
      doEditMessage(item){
        this.$router.push({path:'/service/addMessage',query:{data:JSON.stringify(item)}})
      },
      doRemoveMessage(item){
        let that = this;
        this.$confirm('此操作将永久删除该站内信, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          item.delete = true;
          that.$http.post(that.$api.message_set, item).then(res => {
            if (res.data.status == 200) {
              that.$notify({
                title: '删除成功',
                message: '站内信删除成功',
                type: 'success'
              });
              that.getMessage();
            }
          });
        }).catch(() => {

        });

      }





    },

    created() {
      this.getMessage();
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .m-head{
      display: inline-block;
      width: 100px;
      height: 100px;
    }
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
