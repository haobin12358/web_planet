<template>
  <div class="container">


    <el-table :data="tableData" v-loading="loading" style="width: 100%" >
      <el-table-column align="center" prop="uwname" label="联系人" ></el-table-column>
      <el-table-column align="center" prop="uwtelphone" label="联系电话" ></el-table-column>
      <el-table-column align="center" prop="uwemail" label="联系邮箱" ></el-table-column>
      <el-table-column align="center" prop="uwmessage" label="留言内容" >

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
    name: 'message',

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


    methods: {

      getMessage() {
        this.loading = true;
        this.$http.get(this.$api.get_userwords, {
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






    },

    created() {
      this.getMessage();
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";



</style>
