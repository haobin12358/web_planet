<template>
  <div class="container">
    <!--工具栏-->
    <section class="tool-bar space-between">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="商品名">
          <el-input v-model.trim="searchForm.kw"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.prstatus" @change="doSearch">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search"  :loading="loading" @click="doSearch">查询</el-button>
        <el-button icon="el-icon-refresh" style="margin-bottom: 20px;"  :loading="loading" @click="doReset">重置</el-button>
      </el-form>

      <section>
        <el-button type="primary" icon="el-icon-plus" @click="doAdd">新增</el-button>
      </section>
    </section>

    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
      <el-table-column type="index" width="55"></el-table-column>
      <el-table-column align="center" width="120" label="图片">
        <template slot-scope="scope">
          <table-cell-img :src="[scope.row.tcmainpic]" :key="scope.row.tcid"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="tctitle" label="商品名" width="280"></el-table-column>
      <el-table-column align="center" prop="brand.pbname" label="品牌" width="180"></el-table-column>
      <el-table-column align="center" prop="tcdeposit" label="押金/期限(天)" width="180">
        <template slot-scope="scope">
          {{scope.row.tcdeposit + ' / ' + scope.row.tcdeadline}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="prstatus_zh" label="状态" width="180">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.tcstatus == -10"

            placement="top-start" title="拒绝理由" width="200" trigger="click">
            {{scope.row.reject_reason}}
            <el-tag slot="reference" :type="statusTagType(scope.row.tcstatus)">{{scope.row.zh_tcstatus}}</el-tag>
          </el-popover>
          <el-tag v-else :type="statusTagType(scope.row.tcstatus)">{{scope.row.zh_tcstatus}}</el-tag>
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
      <el-table-column align="center" prop="tcdescription" label="商品描述" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="tcremarks" label="备注" width="180" show-overflow-tooltip></el-table-column>

      <el-table-column align="center" width="180" label="操作" fixed="right">
        <template slot-scope="scope">
          <template v-if="[0,-10,30].includes(scope.row.tcstatus)">
            <el-button type="text"  @click="doEdit(scope.row)">编辑</el-button>
          </template>
          <template v-if="[20].includes(scope.row.tcstatus)">
            <el-button type="text" class="info-text"  @click="doCancel(scope.row)">撤销</el-button>
          </template>
          <template v-if="[0,-10,30].includes(scope.row.tcstatus)">
<!--            <el-button  type="text" class="success-text" @click="doResubmit(scope.row)">重新提交</el-button>-->
            <el-button  type="text" class="danger-text" @click="doDelete(scope.row)">删除</el-button>
          </template>
          <el-button v-if="scope.row.tcstatus == 0" type="text" class="warning-text" @click="doShelves(scope.row)">下架</el-button>
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

    <el-dialog title="活动配置" :visible.sync="settingVisible" width="700px" :close-on-click-modal="false">
      <el-form :model="formData" :rules="rules" ref="actiSettingForm" label-position="left"
               label-width="100px">
        <el-form-item label="活动封面图" prop="acbackground">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleBGcSuccess"
            :before-upload="beforeImgUpload">
            <img v-if="formData.acbackground" v-lazy="formData.acbackground" class="avatar activity-logo">
            <i v-else class="el-icon-plus avatar-uploader-icon activity-logo"></i>
            <div slot="tip" class="el-upload__tip">
              建议为700 * 500，大小不要超过15M，上传成功后会显示，上传大图请耐心等待
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="顶部图" prop="mainpic">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleTopPicSuccess"
            :before-upload="beforeImgUpload">
            <img v-if="formData.actoppic" v-lazy="formData.actoppic" class="avatar activity-avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon activity-avatar"></i>
            <div slot="tip" class="el-upload__tip">
              建议为750 * 360，大小不要超过15M，上传成功后会显示，上传大图请耐心等待
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情页描述" prop="netitle">
          <el-input type="textarea" v-model.trim="formData.acdesc"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="settingVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSaveSetting">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getStore} from "src/utils/index";
  import TableCellImg from "src/components/TableCellImg";

  export default {
    name: "TrialProduct",


    data() {
      return {
        statusOption: [
          {
            value: 'all',
            label: '全部',
          }, {
            value: 'cancel',
            label: '已撤销',
          },  {
            value: 'upper',
            label: '上架中',
          }, {
            value: 'auditing',
            label: '审核中',
          }, {
            value: 'reject',
            label: '已下架',
          }, {
            value: 'lose_effect',
            label: '已失效',
          }, {
            value: 'lose_upper',
            label: '重新审核中',
          },

        ],
        searchForm: {
          kw: '',
          prstatus: 'all',
        },

        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],

        settingVisible: false,

        formData: {
          acbackground: '', //  活动封面图
          actoppic: '', //  详情页顶部图
          acdesc: '',
          acbutton: '',
        },
        rules: {
          acbackground: [
            {required: true, message: '活动封面图必传', trigger: 'change'},
          ],
          acbutton: [
            {required: true, message: '活动按钮文字必填', trigger: 'blur'},
          ],
          actoppic: [
            {required: true, message: '详情页顶部图必传', trigger: 'change'},
          ],
          acdesc: [
            {required: true, message: '活动描述必填', trigger: 'blur'},

          ],
        },
      }
    },

    components: {TableCellImg},

    computed: {
      // 上传图片
      uploadUrl() {
        return this.$api.upload_file + getStore('token') + '&type=activity'
      }
    },
    methods: {
      doSearch() {
        this.currentPage = 1;
        this.getProductList();
      },
      doReset() {
        this.searchForm = {
          kw: '',
          prstatus: 'all',
        };
        this.doSearch();
      },

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
      getProductList() {
        this.loading = true;

        this.$http.get(this.$api.get_commodity, {
          noLoading: true,
          params: {
            page_size: this.pageSize,
            page_num: this.currentPage,

            kw: this.searchForm.kw,
            tcstatus: this.searchForm.prstatus,
          }
        }).then(
          res => {
            this.loading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.tableData = data.commodity;
              this.total = resData.total_count;
            }
          }
        )
      },
      sizeChange(pageSize) {
        this.pageSize = pageSize;
        this.currentPage = 1;

        this.getProductList();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getProductList();
      },

      doAdd() {
        this.$router.push({
          path: '/activity/trialProductEdit'
        })
      },
      doEdit(row) {
        this.$router.push({
          path: '/activity/trialProductEdit',
          query: {
            tcid: row.tcid
          }
        })
      },

      doResubmit(row){
        this.$confirm(`确认重新提交商品(${row.tctitle})申请?`,'提示').then(
          ()=>{
            this.$http.post(this.$api.resubmit_commodity,{
              tcid: row.tcid
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                      data = res.data.data;

                  this.$notify({
                    title: '试用商品重新提交成功',
                    message: `商品名:${row.tctitle}`,
                    type: 'success'
                  });
                  this.getProductList();
                }
              }
            )
          }
        )
      },

      doCancel(row){
        this.$confirm(`确认撤销商品(${row.tctitle})申请?`,'提示').then(
          ()=>{
            this.$http.post(this.$api.cancel_commodity,{
              tcid: row.tcid
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.$notify({
                    title: '试用商品撤销成功',
                    message: `商品名:${row.tctitle}`,
                    type: 'success'
                  });
                  this.getProductList();
                }
              }
            )
          }
        )
      },


      doDelete(row){
        this.$confirm(`确认下架商品(${row.tctitle})?`,'提示').then(
          ()=>{
            this.$http.post(this.$api.del_commodity,{
              tcid: row.tcid
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.$notify({
                    title: '试用商品删除成功',
                    message: `商品名:${row.tctitle}`,
                    type: 'success'
                  });
                  this.getProductList();
                }
              }
            )
          }
        )

      },
      doShelves(row){
        this.$confirm(`确认下架试用商品(${row.tctitle})?`,'提示').then(
          ()=>{
            this.$http.post(this.$api.shelves_commodity,{
              tcids: [row.tcid]
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.$notify({
                    title: '试用商品下架成功',
                    message: `商品名:${row.tctitle}`,
                    type: 'success'
                  });
                  this.getProductList();
                }
              }
            )
          }
        )

      },

      // 封面图上传
      handleBGcSuccess(res, file) {
        this.formData.acbackground = res.data;
      },
      handleTopPicSuccess(res, file) {
        this.formData.actoppic = res.data;
      },
      // 上传前限制要小于15M
      beforeImgUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;
        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }
        return isLt15M;
      },

      doSaveSetting() {

      },
    },

    created() {
      this.getProductList();
    },
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .date-pick-range {

    }
    .action-button {
      padding: .1rem .2rem;
    }
    .activity-logo {

    }
    .activity-avatar {

    }
  }
</style>

