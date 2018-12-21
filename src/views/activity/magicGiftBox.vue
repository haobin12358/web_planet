<template>
  <div class="container">
    <el-form label-width="120px">
      <el-form-item label="商品图:">
        <el-upload class="avatar-uploader" :show-file-list="false" accept="image/*" action="asd">
          <img v-if="imageUrl" v-lazy="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>

          <div slot="tip" class="el-upload__tip">
            建议尺寸:600*600,大小不要超过10M,上传成功后会显示,上传大图请耐心等待
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="原始价格:">
        <el-input class="item-input"></el-input>
      </el-form-item>
      <el-form-item label="最低价格:">
        <el-input class="item-input"></el-input>
      </el-form-item>
      <el-form-item label="三挡范围:">
      </el-form-item>
      <el-form-item label="第一档:">
        <el-input type="number" class="item-input"></el-input>
        <span>至</span>
        <el-input type="number" class="item-input"></el-input>
      </el-form-item>
      <el-form-item label="第二档:">
        <el-input type="number" class="item-input"></el-input>
        <span>至</span>
        <el-input type="number" class="item-input"></el-input>

        <span class="span-or">或</span>

        <el-input type="number" class="item-input"></el-input>
        <span>至</span>
        <el-input type="number" class="item-input"></el-input>
      </el-form-item>
      <el-form-item label="第三档:">
        <el-input type="number" class="item-input"></el-input>
        <span>至</span>
        <el-input type="number" class="item-input"></el-input>

        <span class="span-or">或</span>

        <el-input type="number" class="item-input"></el-input>
        <span>至</span>
        <el-input type="number" class="item-input"></el-input>
      </el-form-item>

      <el-form-item label="规则:">
        <el-input type="textarea" :rows="6" style="width: 7rem;"></el-input>
      </el-form-item>

      <el-form-item label="封面图:">
        <el-upload class="avatar-uploader" :show-file-list="false" accept="image/*" action="asd">
          <img v-if="imageUrl" v-lazy="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>

          <div slot="tip" class="el-upload__tip">
            建议尺寸:700*500,大小不要超过10M,上传成功后会显示,上传大图请耐心等待
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="持续时间:">
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
    name: "MagicGiftBox",

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
  @import "../../styles/myIndex";

  .container {
    .item-input {
      .wl(2.5rem, 0.4rem);
    }

    .span-or {
      margin: 0 .3rem;
    }

    .action-button {
      padding: .1rem .2rem;
    }
  }
</style>
