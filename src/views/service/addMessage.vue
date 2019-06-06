<template>
  <div class="container">
    <el-row>
      <el-col :span="14">
        <el-form :model="formData" :rules="rules" ref="formData" label-position="left"
                 label-width="100px">
          <el-form-item label="标题" prop="pmtitle">
            <el-input v-model="formData.pmtitle" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="pmtext">
            <!--            <el-input v-model="formData.cmmessage" placeholder="请输入内容"></el-input>-->
            <div class="editor">
              <quill-editor ref="myTextEditor" :options="editorOption" v-model="formData.pmtext" :config="editorOption"></quill-editor>
            </div>

          </el-form-item>
          <el-form-item label="状态" >
            <el-switch
              v-model="formData.pmstatus"
              active-text="上架"
              inactive-text="草稿">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="checkFormData">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { quillEditor } from "vue-quill-editor";
  import 'quill/dist/quill.js';
  export default {
    name: 'addMessage',
    data() {
      return {
        formData: {
          pmtitle: '',
          pmtext: '',
          pmstatus:false
        },
        rules: {
          pmtitle: [
            { required: true, message: '站内信标题必填', trigger: 'blur' }
          ],
          pmtext: [
            { required: true, message: '站内信内容必填', trigger: 'blur' }
          ]
        },
        editorOption: {
          // placeholder: "placeholder",
          // 编辑器的配置
          // something config
          // theme: "bubble"
        }
      }
    },
    components: {quillEditor},
    mounted() {
      if(this.$route.query.data){
        this.getFormData(this.$route.query.data);           //
      }

    },
    methods: {

      getFormData(data){
        this.formData = JSON.parse(data);
        this.formData.pmstatus = Boolean(this.formData.pmstatus);
      },
      // 保存按钮
      checkFormData() {
        this.$refs.formData.validate(valid => {
          if (valid) {
            this.formData.pmstatus = Number(this.formData.pmstatus);
            if(this.$route.query.data){
              this.$http.post(this.$api.message_set, this.formData).then(res => {
                if (res.data.status == 200) {
                  this.$notify({
                    title: '保存成功',
                    message: '站内信发布成功',
                    type: 'success'
                  });
                  this.$router.push('/service/appMessage')
                }
              });
            }else{
              this.$http.post(this.$api.message_set, this.formData).then(res => {
                if (res.data.status == 200) {
                  this.$notify({
                    title: '保存成功',
                    message: '站内信发布成功',
                    type: 'success'
                  });
                  this.$router.push('/service/appMessage')
                }
              });
            }

          }else {
            this.$message.warning('请根据校验信息完善表单!');
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {

  }
</style>
