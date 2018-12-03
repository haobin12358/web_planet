<template>
    <div >
      <h3 class="m-part-title">
        <span>
          <span class="m-part-title-icon"></span>
          <span>添加供应商</span>
        </span>
      </h3>
      <el-form ref="form" :model="form" :rules="rules" label-width="1.2rem" label-position="right" class="demo-ruleForm">
        <el-form-item label="名称：" required>
          <el-input v-model="form.name" class="m-input-m" placeholder="输入供应商名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" required>
          <el-input v-model="form.name" class="m-input-m" placeholder="联系人名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" required>
          <el-input v-model="form.name" class="m-input-m" placeholder="供应商联系方式"></el-input>
        </el-form-item>
        <el-form-item label="地址：" required>
          <el-input v-model="form.name" class="m-input-m" placeholder="供应商地址"></el-input>
        </el-form-item>
        <!--</el-form-item>-->
        <el-form-item label="合同：" required>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <span class="m-upload-img"></span>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>



        <div class="m-form-btn-box">
          <span class="m-form-btn active">保存</span>
          <span class="m-form-btn ">取消</span>
        </div>
      </el-form>
    </div>
</template>

<script>
    export default {
       data(){
         return{
           form:{
             resource:'',
             date1:'',
             name:'',
             desc:''
           },
           rules:{
             PRname:[
               { required: true, message: '请输入商品名称', trigger: 'blur' }
             ]
           },
           dialogImageUrl: '',
           dialogVisible: false,
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
           value: '',
           value5:[]
         }
       }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
