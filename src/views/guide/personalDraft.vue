<template>
  <div class="container">
    <section class="tool-bar space-between">
      <el-form :inline="true">
        <el-form-item label="活动">
          <el-input v-model="formData.sspname" placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item label="活动标题">
          <el-input v-model="formData.ssparea" placeholder="标题"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search"  :loading="loading" @click="doSearch">查询</el-button>
        <el-button icon="el-icon-refresh"  :loading="loading" @click="doReset">重置</el-button>
      </el-form>
      <el-button type="primary" style="margin-bottom: 20px;" icon="el-icon-plus" @click="doAddScenic">新增</el-button>


    </section>

    <el-table :data="tableData" v-loading="loading" style="width: 100%" >

      <el-table-column align="center" prop="cmtitle" label="活动封面" width="280">
        <template slot-scope="scope">
          <img :src="scope.row.plimg" class="m-scenic-img" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sspname" label="起止时间" width="180">
        <template slot-scope="scope">
          {{scope.row.plstarttime}} - {{scope.row.plstarttime}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="ssparea" label="地点" width="280">
        <template slot-scope="scope">
          {{scope.row.pllocation.join('-')}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="plnum" label="最大承载人数" width="120">
      </el-table-column>
      <el-table-column align="center" label="活动费用" >
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="费用明细"
            width="400"
            trigger="hover"
          >
            <el-table
              :data="scope.row.costs"
              style="width: 100%">
              <el-table-column
                prop="cosname"
                label="费用名称"
              >
              </el-table-column>
              <el-table-column
                prop="cossubtotal"
                label="金额"
              >
              </el-table-column>
              <el-table-column
                prop="cosdetail"
                label="费用详情">
              </el-table-column>
            </el-table>
            <el-button slot="reference" type="text">预览</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="parent_scenicspot.sspname" label="活动保险" width="280">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="费用明细"
            width="400"
            trigger="hover"
          >
            <el-table
              :data="scope.row.insurances"
              style="width: 100%">
              <el-table-column
                prop="inname"
                label="费用名称"
              >
              </el-table-column>
              <el-table-column
                prop="incost"
                label="金额"
              >
              </el-table-column>
              <el-table-column
                prop="incontent"
                label="费用详情">
              </el-table-column>
            </el-table>
            <el-button slot="reference" type="text">预览</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="ssplevel" label="报名填写项" width="280">
        <template slot-scope="scope">
          {{scope.row.playrequires.join(',')}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="建议携带" width="280">
        <template slot-scope="scope">
          {{scope.row.plproducts.join('、')}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="parent_scenicspot.sspname" label="推文" width="280">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="推文详情"
            width="400"
            trigger="hover"
          >
            <div v-html="scope.row.plcontent || '无'"></div>
            <el-button slot="reference" type="text">预览</el-button>
          </el-popover>
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

  import {getStore} from "src/utils/index";

  export default {
    name: 'scenic',

    components: {},


    data() {
      return {
        formData: {
          ssparea: '',
          sspname:''
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
        this.currentPage = 1;
        this.getTable();
      },
      doReset(){
        this.formData = {
          aaid: '',
          sspname:''
        };
        this.doSearch();
      },
      getTable() {
        this.loading = true;
        this.$http.get(this.$api.get_all_play, {
          noLoading: true,
          params: {
            page_size:this.pageSize,
            page_num:this.currentPage
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
        this.getTable();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getTable();
      },
      doAddScenic(){
        this.$router.push('/guide/editDraft');
      },
      doEditScenic(item){
        this.$router.push({path:'/guide/editDraft',query:{id:item.plid}})
      },
      doRemoveScenic(item){
        let that = this;
        this.$confirm('此操作将永久删除该草稿, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          item.delete = true;
          that.$http.post(that.$api.set_play, item).then(res => {
            if (res.data.status == 200) {
              that.$notify({
                title: '删除成功',
                message: '草稿删除成功',
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
