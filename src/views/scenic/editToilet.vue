<template>
  <div class="container">
    <el-row>
      <block-title title="景区介绍"></block-title>
      <el-col :span="14">
        <el-form :model="formData" :rules="rules" ref="formData" label-position="left"
                 label-width="140px">
          <el-form-item label="经度" prop="longitude">
            <el-input v-model="formData.longitude" placeholder="请输入经度"></el-input>
          </el-form-item>
          <el-form-item label="纬度" prop="latitude">
            <el-input v-model="formData.latitude" placeholder="请输入纬度"></el-input>
          </el-form-item>
          <el-form-item label="厕所图片" prop="toimage">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              accept="image/*"
              :on-success="handleMainPicSuccess"
              :before-upload="beforeImgUpload">
              <img v-if="formData.toimage" v-lazy="formData.toimage" class="avatar circle-main-img" />
              <i v-else class="el-icon-plus avatar-uploader-icon circle-main-img"></i>
              <div slot="tip" class="el-upload__tip">
                建议尺寸：288*161像素，大小最好在10M以内
              </div>
            </el-upload>
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
  import { getStore } from "src/utils/index";
    export default {
        name: "editToilet",
      data(){
        return{
          formData:{
            longitude:'',
            latitude:'',
            toimage:'',
            toid:''
          },

          rules: {
            longitude: [
              { required: true, message: '经度必填', trigger: 'blur' }
            ],
            latitude: [
              { required: true, message: '纬度必填', trigger: 'blur' }
            ],
            toimage: [
              { required: true, message: '厕所图片必填', trigger: 'change' }
            ]
          },

        }
      },
      computed: {
        // 上传图片
        uploadUrl() {
          return this.$api.upload_file + getStore('token') + '&type=scenicspot'
        },
      },
      mounted() {



        if(this.$route.query.id){
          this.getFormData(this.$route.query.id);           //
        }

      },
      methods: {

        // 主图上传
        handleMainPicSuccess(res, file) {
          this.formData.toimage = res.data;
        },
        // 上传前限制小于15M
        beforeImgUpload(file) {
          const isLt15M = file.size / 1024 / 1024 < 15;
          if (!isLt15M) {
            this.$message.error('上传图片大小不能超过 15MB!');
          }
          return isLt15M;
        },
        getFormData(id){
          this.$http.get(this.$api.get_toilet, {
            noLoading: true,
            params: {
              toid: id,
            },
          }).then(
            res => {
              this.loading = false;
              if (res.data.status == 200) {
                let resData = res.data,
                  data = res.data.data;

                this.formData =  {
                  toid:data.toid,
                  latitude:data.latitude,
                  longitude:data.longitude,
                  toimage:data.toimage,
                }

              }
            }
          )
        },
        // 保存按钮
        checkFormData() {
          this.$refs.formData.validate(valid => {
            if (valid) {
              if(this.$route.query.id){
                this.$http.post(this.$api.update_toilet, this.formData).then(res => {
                  if (res.data.status == 200) {
                    this.$notify({
                      title: '保存成功',
                      message: '厕所发布成功',
                      type: 'success'
                    });
                    this.$router.push('/scenic/toilet')
                  }
                });
              }else{
                this.$http.post(this.$api.add_toilet, this.formData).then(res => {
                  if (res.data.status == 200) {
                    this.$notify({
                      title: '保存成功',
                      message: '厕所发布成功',
                      type: 'success'
                    });
                    this.$router.push('/scenic/toilet')
                  }
                });
              }

            }else {
              this.$message.warning('请根据校验信息完善表单!');
            }
          })
        },
      }
    }
</script>

<style scoped>

</style>
