<template>
  <div class="activity-index">
    <!--管理tabel-->
    <el-table v-loading="activityLoading" :data="activityList" stripe>
      <el-table-column label="活动封面图" align="center" prop="acbackground">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.acbackground" :key="scope.row.acbackground"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" align="center" prop="acname"></el-table-column>
      <el-table-column label="类别" align="center" prop="actype_zh"></el-table-column>
      <el-table-column label="商品数" align="center" prop="pblogo"></el-table-column>
      <el-table-column label="关闭/开启" align="center" prop="pblogo">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.acshow" @change="showActivity(scope.row)" active-color="#409EFF"
                     inactive-color="#DBDCDC">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <!--活动配置-->
    <el-dialog title="活动配置" :visible.sync="settingVisible" width="700px">
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
  import TableCellImg from "src/components/TableCellImg";
  import {getStore} from "src/utils/index";

  export default {
    name: 'ActivityIndex',
    data() {
      return {
        activityLoading: false,
        activityList: [],

        //  试用商品
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
    mounted() {
      this.getActivity();         // 获取所有活动
    },
    methods: {
      // 获取所有活动
      getActivity() {
        this.activityLoading = true;
        this.$http.get(this.$api.activity_list, {noLoading: true}).then(res => {
          if (res.data.status == 200) {
            this.activityList = res.data.data;
            this.activityLoading = false;
          }
        })
      },
      // 关闭或开启活动
      showActivity(row) {
        let params = {
          actype: row.actype,
          acshow: row.acshow
        };
        let title = '';
        if (row.acshow) {
          title = '开启';
        } else {
          title = '关闭';
        }
        this.$http.post(this.$api.activity_update, params).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: `${title}成功`,
                message: `${row.acname}${title}成功`,
                type: 'success'
              });
            }
          }
        );
      },
      // 编辑活动
      editActivity(row) {

      },
      // 删除活动
      deleteActivity(row) {

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
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .activity-index {
    .action-button {
      padding: .1rem .2rem;
    }
    .activity-logo {

    }
    .activity-avatar {

    }
  }
</style>
