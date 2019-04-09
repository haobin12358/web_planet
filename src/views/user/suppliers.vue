<template>
  <div class="container">
    <section class="tool-bar space-between">
      <el-form :inline="true">
        <el-form-item label="供应商姓名">
          <el-input v-model.trim="searchForm.kw" maxlength="100" ></el-input>
        </el-form-item>
        <el-form-item label="供应商手机号">
          <el-input v-model.trim="searchForm.mobile" maxlength="100" ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.sustatus" placeholder="请选择">
            <el-option
              v-for="item in statusoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search"  :loading="loading" @click="doSearch">查询</el-button>
        <el-button icon="el-icon-refresh"  :loading="loading" @click="doReset">重置</el-button>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="doAddSupplier">新增</el-button>


    </section>

    <el-table :data="tableData" v-loading="loading" style="width: 100%" :cell-class-name="cellFunction">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="头像">
              <img :src="props.row.suheader" class="table-pic" alt="">
            </el-form-item>
            <el-form-item label="银行">
              <span>{{props.row.subankname}}</span>
            </el-form-item>
            <el-form-item label="登录账号">
              <span>{{props.row.suloginphone}}</span>
            </el-form-item>
            <el-form-item label="卡号">
              <span>{{props.row.subanksn}}</span>
            </el-form-item>
            <el-form-item style="width: 100%" label="合同">
              <img v-for="url in props.row.sucontract" :src="url" @click="previewImg(url)" class="contract-img" alt="">
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="suname" label="供应商名称" width="180"></el-table-column>
      <el-table-column align="center" prop="brand" label="品牌" width="280">
        <template slot-scope="scope">
          <el-tag  v-for="item in scope.row.pbs" :key="item.pbid" type="primary" style="margin-right: 10px;margin-bottom: 10px;">
            {{item.pbname}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sulinkman" label="联系人" width="180"></el-table-column>
      <el-table-column label="可提现余额" prop="uwbalance" align="center" width="100"></el-table-column>
      <el-table-column label="余额" prop="uwcash" align="center" width="100"></el-table-column>
      <el-table-column label="总销售额" prop="uwtotal" align="center" width="100"></el-table-column>
      <el-table-column align="center" prop="sulinkphone" label="手机号" width="200"></el-table-column>
      <el-table-column align="center" prop="suaddress" label="地址" width="200"></el-table-column>
      <el-table-column align="center" prop="sustatus" label="状态" width="180">
        <template slot-scope="scope">
          <el-tag  v-if="scope.row.sustatus == 0" type="primary">正常</el-tag>
          <el-tag  v-if="scope.row.sustatus == 10" type="warning">审核中</el-tag>
          <el-tag v-if="scope.row.sustatus == -10" type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="prtitle" label="操作" width="240" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="doEditSupplier(scope.row)">编辑</el-button>
          <el-button type="text" @click="doEditSupplierPwd(scope.row)">修改密码</el-button>
          <el-button type="text" class="danger-text" @click="doRemoveSupplier(scope.row)">删除</el-button>
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

    <!--预览大图dialog-->
    <el-dialog :visible.sync="dialogVisible" top="8vh">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import elDragDialog from 'src/directive/el-dragDialog'
  import {getStore} from "src/utils/index";

  export default {
    name: 'Suppliers',

    components: {},

    directives: {elDragDialog},

    data() {
      return {
        searchForm: {
          kw: '',
          mobile: '',
          sustatus:''
        },

        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],


        //  大图预览
        dialogImageUrl: '',
        dialogVisible: false,
        statusoptions:[
          {
            label:'正常',
            value:'usual'
          },
          {
            label:'禁止',
            value:'forbidden'
          },
          {
            label:'审核中',
            value:'auditing'
          }
        ]
      }
    },


    methods: {
      doSearch(){
        this.getSupplier();
      },
      doReset(){
        this.searchForm = {
          kw: '',
          mobile: '',
          sustatus:''
        };
        this.doSearch();
      },

      getSupplier() {
        this.loading = true;
        this.$http.get(this.$api.supplizer_list, {
          noLoading: true,
          params: {
            kw: this.searchForm.kw,
            mobile: this.searchForm.mobile,
            sustatus: this.searchForm.sustatus
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
      },
      pageChange(page) {
        this.currentPage = page;
      },

      cellFunction({row, column}){
        if (['uwtotal', 'uwbalance', 'uwcash'].includes(column.property)) {
          return 'money-cell'
        }
      },

      previewImg(url) {
        this.dialogImageUrl = url;
        this.dialogVisible = true;
      },

      doAddSupplier() {
        this.$router.push({
          path: '/user/supplierEdit'
        })
      },
      doEditSupplier(row) {
        this.$router.push({
          path: '/user/supplierEdit',
          query: {
            suid: row.suid
          }
        })
      },

      doRemoveSupplier(row) {
        this.$confirm(`确认弃用供应商(${row.suname})?其下的品牌及品牌下面的商品也会一并删除!`, '提示',{
          type: 'warning'
        }).then(
          ()=>{
            this.$http.post(this.$api.delete_supplizer,{
              suid: row.suid
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                      data = res.data.data;

                  this.getSupplier();
                  this.$notify({
                    title: '供应商删除成功',
                    message: `供应商名称:${row.suname}`,
                    type: 'success'
                  });
                }
              }
            )
          }
        )
      },

      doEditSupplierPwd(row){
        this.$prompt('请输入新密码', `提示-${row.suname}`, {
          inputValidator: value => {
            if (!value) {
              return '密码不能为空'
            }
          }
        }).then(
          prompt => {
            this.$http.post(this.$api.update_supplizer_password,{
              suid: row.suid,
              supassword: prompt.value,
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                      data = res.data.data;

                  this.getSupplier();
                  this.$notify({
                    title: '密码修改成功',
                    message: `供应商:${row.suname}`,
                    type: 'success'
                  });
                }
              }
            )
          }
        )
      },
    },

    created() {
      this.getSupplier();
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
