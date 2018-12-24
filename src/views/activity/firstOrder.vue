<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <el-form :model="formData" :rules="rules" ref="circleFormRef" label-position="left"
                 label-width="100px" style="width: 600px;">
          <el-form-item label="活动封面图" prop="mainpic">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              accept="image/*"
              :on-success="handleMainPicSuccess"
              :before-upload="beforeImgUpload">
              <img v-if="formData.mainpic" v-lazy="formData.mainpic" class="avatar activity-logo">
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
              :on-success="handleMainPicSuccess"
              :before-upload="beforeImgUpload">
              <img v-if="formData.mainpic" v-lazy="formData.mainpic" class="avatar activity-avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon activity-avatar"></i>
              <div slot="tip" class="el-upload__tip">
                建议为750 * 360，大小不要超过15M，上传成功后会显示，上传大图请耐心等待
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="Slogan" prop="netitle">
            <el-input v-model="formData.slogan"></el-input>
          </el-form-item>
          <el-form-item label="持续时间:">
            <el-date-picker v-model="formData.time" type="datetimerange" start-placeholder="开始日期"
                            range-separator="至" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            选择商品
            <el-button type="primary">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getStore } from "src/utils/index";

  export default {
    name: "FirstOrder",
    data() {
      return {
        formData: {
          mainpic: '',
          slogan: '',
          time: '',
        },
        rules: {

        },
        activityRule: []
      }
    },
    components: {},
    computed: {
      // 上传图片
      uploadUrl() {
        return this.$api.upload_file + getStore('token') + '&type=activity'
      }
    },
    methods: {
      // 封面图上传
      handleMainPicSuccess(res, file) {
        this.formData.mainpic = res.data;
      },
      // 上传前限制要小于15M
      beforeImgUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;
        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }
        return isLt15M;
      },
    }
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

