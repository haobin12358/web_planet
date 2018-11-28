<template>
    <div  class="m-addProduct">
      <h3 class="m-part-title">
        <span class="m-part-title-icon"></span>
        <span>发布商品</span>
      </h3>
      <div class="m-addProduct-step">
        <span>1.选择商品分类</span>
        <span class="active">2.编辑基本信息</span>
        <span>3.编辑商品详情</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="1.3rem" label-position="right" class="demo-ruleForm">
        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>基本信息</span>
        </h3>
        <el-form-item label="商品名称：" required>
          <el-input v-model="input" class="m-input-m" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="添加描述：" required>
          <el-input v-model="input" class="m-input-m" placeholder="请输入内容"></el-input>
          <p class="m-alert-text">建议描述文字在36字以内</p>
        </el-form-item>
        <el-form-item label="商品图片："  required>
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
        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>商品价格/库存</span>
        </h3>
        <el-form-item label="商品价格：" required>
          <el-radio v-model="radio" label="1">统一规格</el-radio>
          <el-radio v-model="radio" label="2">不同规格</el-radio>
        </el-form-item>
        <el-form-item label="价格：" >
          <el-input v-model="input" class="m-input-s" placeholder="￥"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="商品库存：" required>
          <el-input v-model="input" class="m-input-s" placeholder=""></el-input>
          <span>件</span>
        </el-form-item>

        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>其它</span>
        </h3>
        <el-form-item label="上架时间：" required>
          <p>
            <el-radio v-model="radio" label="1">立即上架售卖</el-radio>
          </p>
          <p>
            <el-radio v-model="radio" label="2">自定义上架时间</el-radio>
            <el-date-picker
              v-model="value8"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </p>
          <p  class="m-alert-text">需等待管理员审批完成，上架时间请选择24小时以后</p>
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
              options: [{
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
              value8: '',
              input:'',
              radio:1,
              dialogVisible:false,
              dialogImageUrl:null,
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
          },
          changeRoute(v){
            this.$router.push(v)
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
        background: url("../../common/images/icon-title-child.png") no-repeat;
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
