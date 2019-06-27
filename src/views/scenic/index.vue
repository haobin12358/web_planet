<template>
  <div class="container">
    <section class="tool-bar space-between">
            <el-form :inline="true">
              <el-form-item label="景区名称">
                <el-select v-model="formData.sspname" multiple clearable placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="省市区">
                <el-select v-model="apid"  clearable @blur="apBlur" placeholder="请选择省">
                  <el-option
                    v-for="item in ap_list"
                    :key="item.apid"
                    :label="item.apname"
                    :value="item.apid">
                  </el-option>
                </el-select>
                <el-select v-model="acid" @blur="acBlur"  clearable placeholder="请选择市">
                  <el-option
                    v-for="item in ac_list"
                    :key="item.acid"
                    :label="item.acname"
                    :value="item.acid">
                  </el-option>
                </el-select>
                <el-select v-model="formData.aaid"  clearable placeholder="请选择区">
                  <el-option
                    v-for="item in aa_list"
                    :key="item.aaid"
                    :label="item.aaname"
                    :value="item.aaid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-button type="primary" icon="el-icon-search"  :loading="loading" @click="doSearch">查询</el-button>
              <el-button icon="el-icon-refresh"  :loading="loading" @click="doReset">重置</el-button>
            </el-form>
      <el-button type="primary" style="margin-bottom: 20px;" icon="el-icon-plus" @click="doAddScenic">新增</el-button>


    </section>

    <el-table :data="tableData" v-loading="loading" style="width: 100%" >

      <el-table-column align="center" prop="cmtitle" label="景区主图" width="280">
        <template slot-scope="scope">
          <img :src="scope.row.sspmainimg" class="m-scenic-img" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sspname" label="景区" width="280"></el-table-column>
      <el-table-column align="center" prop="ssparea" label="省市区" width="280"></el-table-column>
      <el-table-column align="center" prop="ssplevel" label="等级" width="280">
        <template slot-scope="scope">
          <span>{{scope.row.ssplevel}}A</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否有关联性" >
        <template slot-scope="scope">
          <el-switch v-model="scope.row.associated" disabled active-color="#409EFF"
                     inactive-color="#DBDCDC">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="parent_scenicspot.sspname" label="归属景区" width="280"></el-table-column>
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
          aaid: '',
          sspname:''
        },
        apid:'',
        acid:'',
        ap_list:[],
        ac_list:[],
        aa_list:[],
        options1: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],

      }

    },


    methods: {
      doSearch(){
        this.getScenic();
      },
      doReset(){
        this.formData = {
            aaid: '',
            sspname:''
        };
        this.doSearch();
      },
//  获取省
      dealProps(){
        this.$http.get(this.$api.get_provinces, {
          noLoading: true,
          params: {
          },
        }).then(
          res => {
            this.loading = false;

            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              this.ap_list = data;
            }
          }
        )
      },
      //获取市
      apBlur(){
        this.$http.get(this.$api.get_citys, {
          noLoading: true,
          params: {
            apid:this.apid
          },
        }).then(
          res => {
            this.loading = false;

            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              this.ac_list = data;
            }
          }
        )
      },
      //获取地区
      acBlur(){
        this.$http.get(this.$api.get_areas, {
          noLoading: true,
          params: {
            acid:this.acid
          },
        }).then(
          res => {
            this.loading = false;

            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              this.aa_list = data;
            }
          }
        )
      },
      getScenic() {
        this.loading = true;
        this.$http.get(this.$api.scenicspot_list, {
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
        this.getScenic();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getScenic();
      },
      doAddScenic(){
        this.$router.push('/scenic/editScenic');
      },
      doEditScenic(item){
        this.$router.push({path:'/scenic/editScenic',query:{id:item.sspid}})
      },
      doRemoveScenic(item){
        let that = this;
        this.$confirm('此操作将永久删除该景区, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          item.delete = true;
          that.$http.post(that.$api.scenicspot_delete, {
              sspid:item.sspid
          }).then(res => {
            if (res.data.status == 200) {
              that.$notify({
                title: '删除成功',
                message: '景区删除成功',
                type: 'success'
              });
              that.getScenic();
            }
          });
        }).catch(() => {

        });

      }





    },

    created() {
      this.getScenic();
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
