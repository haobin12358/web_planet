<template>
  <div class="container">
    <section class="tool-bar space-between">

      <el-button type="primary" style="margin-bottom: 20px;" icon="el-icon-plus" @click="doAddScenic">新增</el-button>


    </section>
    <el-table :data="tableData" v-loading="loading" style="width: 100%" >

      <el-table-column align="center" prop="cmtitle" label="厕所图片" width="280">
        <template slot-scope="scope">
          <img :src="scope.row.toimage" class="m-scenic-img" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="longitude" label="经度" width="280"></el-table-column>
      <el-table-column align="center" prop="latitude" label="纬度" width="280"></el-table-column>
      <el-table-column align="center" prop="tostatus_zh" label="审批状态" width="280">
        <template slot-scope="scope">
          <span>{{scope.row.tostatus_zh}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="240" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="doEditScenic(scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text" @click="doRemoveScenic(scope.row)">删除</el-button>
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
        name: "toilet",
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

        getData() {
          this.loading = true;
          this.$http.get(this.$api.toilet_list, {
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
          this.getData();
        },
        pageChange(page) {
          this.currentPage = page;
          this.getData();
        },
        doAddScenic(){
          this.$router.push('/scenic/editToilet');
        },
        doEditScenic(item){
          this.$router.push({path:'/scenic/editToilet',query:{id:item.toid}})
        },
        doRemoveScenic(item){
          let that = this;
          this.$confirm('此操作将永久删除该厕所, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            item.delete = true;
            that.$http.post(that.$api.update_toilet, item).then(res => {
              if (res.data.status == 200) {
                that.$notify({
                  title: '删除成功',
                  message: '厕所删除成功',
                  type: 'success'
                });
                that.getData();
              }
            });
          }).catch(() => {

          });

        }





      },

      created() {
        this.getData();

      }
    }
</script>

<style scoped lang="less">
  .container {
    .m-scenic-img {
      display: inline-block;
      width: 220px;
      height: 100px;
    }
  }
</style>
