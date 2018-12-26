<template>
  <div class="container">
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
          <img v-if="formData.mainpic" v-lazy="formData.mainpic" class="avatar circle-avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon circle-main-img"></i>
          <div slot="tip" class="el-upload__tip">
            建议为750 * 360，大小不要超过15M，上传成功后会显示，文件较大时请耐心等待
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动规则" prop="prlineprice">
        <el-input style="width: 400px; margin: 0 20px 20px 0" :placeholder="'请输入活动规则' + (i + 1) + '，不超过13个汉字'"
                  v-for="i in [0, 1, 2]" :key="i" v-model="activityRule[i]">
          <template slot="prepend">序号{{i + 1}}</template>
          <template slot="append" v-if="activityRule[i]">{{activityRule[i].length}}</template>
        </el-input>
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
  </div>
</template>

<script>
  import { getStore } from "src/utils/index";

  export default {
    name: "Guess",
    data() {
      return {
        formData: {
          mainpic: '',
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
  }
</style>

