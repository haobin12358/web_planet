<template>
  <div class="container ">
    <section class="tool-bar space-between" v-if="$store.state.user.userInfo.level == 'personal'">
      <el-form :inline="true">

        <el-form-item label="游记时间">
          <el-date-picker
            v-model="formData.date"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search"  :loading="loading" @click="doSearch">查询</el-button>
        <el-button icon="el-icon-refresh"  :loading="loading" @click="doReset">重置</el-button>
      </el-form>
      <el-button type="primary" style="margin-bottom: 20px;" icon="el-icon-plus" @click="doAddScenic">新增</el-button>
    </section>

    <el-table :data="tableData" v-loading="loading" style="width: 100%" >
      <el-table-column align="center" prop="trtitle" label="游记标题" width="380"></el-table-column>

      <el-table-column align="center" prop="trcontent" label="游记内容" width="380">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="游记详情"
            width="400"
            trigger="hover"
          >
            <div v-html="scope.row.trcontent || '无'"></div>
            <el-button slot="reference" type="text" >预览</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="trlocation" label="景区" width="320"></el-table-column>
      <el-table-column align="center" prop="trstatus_zh" label="状态" width="280"></el-table-column>
      <el-table-column align="center" label="操作" v-if="$store.state.user.userInfo.level == 'personal'" width="240" fixed="right">
        <template slot-scope="scope">
<!--          <el-button type="text"  @click="doEditScenic(scope.row)">编辑</el-button>-->
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

  import {getStore} from "src/utils/index";

  export default {
    name: 'travelNotes',

    components: {},


    data() {
      return {
        formData: {
          date:''
        },
        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '草稿'
        }, {
          value: '1',
          label: '组队中'
        }, {
          value: '2',
          label: '活动中'
        }, {
          value: '3',
          label: '已关闭'
        }, {
          value: '4',
          label: '转让中'
        }, {
          value: '5',
          label: '待支付'
        }
        ],
      }

    },


    methods: {
      doSearch(){
        this.currentPage = 1;
        this.getTable();
      },
      doReset(){
        this.formData = {
          pltitle:'',
          plstatus:''
        };
        this.doSearch();
      },
      getTable() {
        this.loading = true;

          this.$http.get(this.$api.travelrecord_list, {
            noLoading: true,
            params: {
              page_size:this.pageSize,
              page_num:this.currentPage,
              trtype:1,
              option:this.$store.state.user.userInfo.level == 'personal' ?'my':'',
              date:this.formData.date
            },
          }).then(
            res => {
              this.loading = false;

              if (res.data.status == 200) {
                let resData = res.data,
                  data = res.data.data;

                this.tableData = data.travelrecord;
                this.total = resData.total_count;
              }
            }
          )


      },
      sizeChange(pageSize) {
        this.pageSize = pageSize;
        this.currentPage = 1;
        this.getTable();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getTable();
      },
      doAddScenic(){
        this.$router.push('/guide/editTravelNote');
      },
      doEditScenic(item){
        this.$router.push({path:'/guide/editTravelNote',query:{id:item.trid}})
      },
      doRemoveScenic(item){
        let that = this;
        this.$confirm('此操作将永久删除该游记, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          item.delete = true;
          that.$http.post(that.$api.del_travelrecord, {
            trid:item.trid
          }).then(res => {
            if (res.data.status == 200) {
              that.$notify({
                title: '删除成功',
                message: '游记删除成功',
                type: 'success'
              });
              that.getTable();
            }
          });
        }).catch(() => {

        });

      }





    },

    created() {
      this.getTable();

    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .m-scenic-img{
      display: inline-block;
      width: 220px;
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
