<template>
  <div class="container">
    <el-row>
      <el-col :span="14">
        <el-form :model="formData" :rules="rules" ref="formData" label-position="left"
                 label-width="100px">
          <el-form-item label="标题" prop="cmtitle">
            <el-input v-model="formData.cmtitle" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="cmmessage">
<!--            <el-input v-model="formData.cmmessage" placeholder="请输入内容"></el-input>-->
            <div class="editor">
              <quill-editor ref="myTextEditor" :options="editorOption" v-model="formData.cmmessage" :config="editorOption"></quill-editor>
            </div>

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
    name: 'SettingIndex',
    data() {
      return {
        formData: {
          cmtitle: '',
          cmmessage: ''
        },
        rules: {
          cmtitle: [
            { required: true, message: '公告标题必填', trigger: 'blur' }
          ],
          cmmessage: [
            { required: true, message: '公告内容必填', trigger: 'blur' }
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
      if(this.$route.query.id){
        this.getFormData(this.$route.query.id);           //
      }

    },
    methods: {

      getFormData(id){
        this.$http.get(this.$api.get_club_message, {
          noLoading: true,
          params: {
            cmid: id,
          },
        }).then(
          res => {
            this.loading = false;

            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              this.formData = {
                cmid: data.cmid,
                cmtitle:data.cmtitle,
                cmmessage:data.cmmessage,
                cmindex:data.cmindex
              };
            }
          }
        )
      },
      // 保存按钮
      checkFormData() {
        this.$refs.formData.validate(valid => {
          if (valid) {
            if(this.$route.query.id){
              this.$http.post(this.$api.update_club, this.formData).then(res => {
                if (res.data.status == 200) {
                  this.$notify({
                    title: '保存成功',
                    message: '公告发布成功',
                    type: 'success'
                  });
                  this.$router.push('/service/notice')
                }
              });
            }else{
              this.$http.post(this.$api.create_club, this.formData).then(res => {
                if (res.data.status == 200) {
                  this.$notify({
                    title: '保存成功',
                    message: '公告发布成功',
                    type: 'success'
                  });
                  this.$router.push('/service/notice')
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
