<template>
  <div  class="m-addProduct">
    <h3 class="m-part-title">
      <span class="m-part-title-icon"></span>
      <span>发布商品</span>
    </h3>
    <div class="m-addProduct-step">
      <span>1.选择商品分类</span>
      <span>2.编辑基本信息</span>
      <span  class="active">3.编辑商品详情</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules"  label-position="right" class="demo-ruleForm">
      <h3 class="m-form-part-title">
        <span class="m-part-title-icon"></span>
        <span>商品简介</span>
      </h3>
      <el-form-item  required>
        <el-input v-model="input" type="textarea" class="m-input-m" placeholder="请输入商品简介"></el-input>
      </el-form-item>


      <h3 class="m-form-part-title">
        <span class="m-part-title-icon"></span>
        <span>商品详情</span>
      </h3>
      <el-form-item  required>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <span class="m-upload-img"></span>
        </el-upload>
        <p class="m-alert-text">建议尺寸：700*700像素，可以通过拖动图片调整前后顺序，最多上传5张商品图片</p>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

    </el-form>

    <div class="m-form-btn-box">
      <span class="m-form-btn active" @click="changeRoute('/product/addProductThree')">下一步</span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        form:{
          resource:'',
          date1:'',
          name:''
        },
        rules:{
          PRname:[
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ]
        },
        dialogVisible:false,
        dialogImageUrl:null,
        input:'',
        radio:1
      }
    },
    components: {},
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    created() {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .m-addProduct{
    .m-addProduct-step{
      width: 100%;
      padding: 0.1rem 0;
      display: flex;
      flex-flow: row;
      justify-content: space-around;
      align-items: center;
      border: 1px solid #97ADCB;
      margin: 0.25rem 0;
      font-size: 0.18rem;
      font-weight: bold;
      span.active{
        color: #CB7E88;
      }
    }
    .m-form-part-title{
      font-weight: bold;
      font-size: 0.18rem;
      margin-bottom: 0.2rem;
      .m-part-title-icon{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../common/images/icon-title.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: text-bottom;
        margin-right: 10px;
      }
    }
    .m-form-btn-box{
      margin-top: 1.6rem;
    }
  }
</style>
