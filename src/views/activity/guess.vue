<template>
  <div class="container">
    <h3 class="m-part-title m-flex-between">
      <div class="m-flex-start">
        <span class="m-part-title-icon"></span>
        <span>竞猜设置</span>
      </div>
    </h3>

    <el-form label-width="120px">
      <el-form-item label="商品图">
        <el-upload class="avatar-uploader" :show-file-list="false" accept="image/*" action="asd">
          <img v-if="imageUrl" v-lazy="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>

          <div slot="tip" class="el-upload__tip">
            建议尺寸:600*600,大小不要超过10M,上传成功后会显示,上传大图请耐心等待
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="规则">
        <el-input type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="封面图">
        <el-upload class="avatar-uploader" :show-file-list="false" accept="image/*" action="asd">
          <img v-if="imageUrl" v-lazy="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>

          <div slot="tip" class="el-upload__tip">
            建议尺寸:700*500,大小不要超过10M,上传成功后会显示,上传大图请耐心等待
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="持续时间">
        <el-date-picker
          style="height: .6rem;"
          v-model="value6"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="action-button">重置</el-button>
        <el-button type="primary" class="action-button">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "guess",

    components: {},

    data() {
      return {
        imageUrl: '',
        value6: '',
      }
    },

    computed: {},

    methods: {},

    created() {

    },
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/index";

  .container {
    .date-pick-range {
      /*height: .3rem;*/
      /*line-height: .4rem;*/
    }

    .action-button {
      padding: .1rem .2rem;
    }
  }
</style>
