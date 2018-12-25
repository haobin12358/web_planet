<template>
  <div class="container">
    <!--工具栏-->
    <section class="tool-bar space-between">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="商品名">
          <el-input v-model.trim="searchForm.kw"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.prstatus">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
        <el-button icon="el-icon-refresh" style="margin-bottom: 20px;">重置</el-button>
      </el-form>

      <section>
        <el-button type="info" icon="el-icon-setting" @click="settingVisible = true">活动配置</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="doAdd">新增</el-button>
      </section>
    </section>

    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
      <el-table-column
        type="index"></el-table-column>
      <el-table-column align="center" width="120" label="图片">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.tcmainpic" :key="scope.row.tcid"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="tctitle" label="商品名" width="280"></el-table-column>
      <el-table-column align="center" prop="brand.pbname" label="品牌" width="180"></el-table-column>
      <el-table-column align="center" prop="tcdeposit" label="押金/押金期限(天)" width="180">
        <template slot-scope="scope">
          {{scope.row.tcdeposit + ' / ' + scope.row.tcdeadline}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="tcstocks" label="库存" width="120"></el-table-column>
      <el-table-column align="center" prop="tcsalesvalue" label="销量" width="120"></el-table-column>
      <el-table-column align="center" prop="prstatus_zh" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="statusTagType(scope.row.tcstatus)">{{scope.row.zh_tcstatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="tcdeposit" label="活动时间(执行)" width="280">
        <template slot-scope="scope">
          {{scope.row.agreestarttime + '-' + scope.row.agreeendtime}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="tcdeposit" label="活动时间(申请)" width="280">
        <template slot-scope="scope">
          {{scope.row.applystarttime + '-' + scope.row.applyendtime}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="zh_remarks" label="备注" width="180"></el-table-column>

      <el-table-column align="center" width="180" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="doEdit(scope.row)">编辑</el-button>
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

    <el-dialog title="活动配置" :visible.sync="settingVisible">
      <el-form :model="formData" :rules="rules" ref="actiSettingForm" label-position="left"
               label-width="100px" style="width: 600px;">
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
            value: 'usual',
            label: '上架中',
          }, {
            value: 'auditing',
            label: '审核中',
          }, {
            value: 'off_shelves',
            label: '已下架',
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
        this.$http.get(this.$api.get_commodity, {
          params: {
            page_size: this.pageSize,
            page_num: this.currentPage,

            tcstatus: this.searchForm.prstatus,
          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.tableData = data.commodity;
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
      width: 280px;
      height: 200px;
      line-height: 200px;
    }
    .activity-avatar {
      width: 280px;
      height: 135px;
      line-height: 135px;
    }
  }
</style>

