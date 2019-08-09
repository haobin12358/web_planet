<template>
    <div class="container">
      <el-row>
        <block-title title="景区介绍"></block-title>
        <el-col :span="14">
          <el-form :model="formData" :rules="rules" ref="formData" :disabled="$store.state.user.userInfo.level == 'personal'" label-position="left"
                   label-width="140px">
            <el-form-item label="景区名称" prop="sspname">
              <el-input v-model="formData.sspname" placeholder="请输入景区名称"></el-input>
            </el-form-item>
            <el-form-item label="所在地区" required>
              <el-select v-model="apid"  clearable  placeholder="请选择省">
                <el-option
                  v-for="item in ap_list"
                  :key="item.apid"
                  :label="item.apname"
                  :value="item.apid">
                </el-option>
              </el-select>
              <el-select v-model="acid"  @focus="apBlur"  clearable placeholder="请选择市">
                <el-option
                  v-for="item in ac_list"
                  :key="item.acid"
                  :label="item.acname"
                  :value="item.acid">
                </el-option>
              </el-select>
              <el-select v-model="formData.aaid" @focus="acBlur" clearable placeholder="请选择区">
                <el-option
                  v-for="item in aa_list"
                  :key="item.aaid"
                  :label="item.aaname"
                  :value="item.aaid">
                </el-option>
              </el-select>
            </el-form-item>
<!--            <el-form-item label="具体定位" prop="cmtitle">-->
<!--              <el-input v-model="formData.name" placeholder="请输入景区名称"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="景区主图" prop="sspmainimg">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                accept="image/*"
                :on-success="handleMainPicSuccess"
                :before-upload="beforeImgUpload">
                <img v-if="formData.sspmainimg" v-lazy="formData.sspmainimg" class="avatar circle-main-img" />
                <i v-else class="el-icon-plus avatar-uploader-icon circle-main-img"></i>
                <div slot="tip" class="el-upload__tip">
                  建议尺寸：288*161像素，大小最好在10M以内
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="景区等级" prop="ssplevel">
              <el-select v-model="formData.ssplevel"  clearable placeholder="请选择">
                <el-option
                  v-for="item in level"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="内容" prop="sspcontent">
              <div class="editor">
                <quill-editor ref="myTextEditor" :options="editorOption" v-model="formData.sspcontent" :config="editorOption" @change="quillEditorChange($event)"></quill-editor>
              </div>

            </el-form-item>
            <el-form-item label="是否有关联性：" prop="sspcontent">
              <el-switch v-model="formData.associated" @change="switchChange" active-color="#409EFF"
                         inactive-color="#DBDCDC">
              </el-switch>
            </el-form-item>
            <el-form-item label="关联景区" prop="parentid" v-if="formData.associated">
              <el-select v-model="formData.parentid"  filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in all_scenic"
                  :key="item.sspid"
                  :label="item.sspname"
                  :value="item.sspid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="$store.state.user.userInfo.level != 'personal'">
              <el-button type="primary" @click="checkFormData">保 存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <input type="file" id="quill-img" class="quill-img" accept="image/*" @change="fileChange">
    </div>
</template>

<script>
  import { quillEditor } from "vue-quill-editor";
  import 'quill/dist/quill.js';
  import { getStore } from "src/utils/index";
  const toolbarOptions = [
    ['bold','italic','underline','strike'],
    [{size:['small',false,'large','huge']}],
    [{font:[]}],
    [{color:[]}],
    [{align:[]}],
    ['link','image']
  ];
    export default {
        name: "editScenic",

      data(){
          return{
            formData:{
              sspname:'',
              ssplevel:'',
              aaid:'',
              sspmainimg:'',
              parentid:'',
              sspcontent:'',
              associated:false,
              sspid:''
            },

            rules: {
              sspname: [
                { required: true, message: '景区名称必填', trigger: 'blur' }
              ],
              ssplevel: [
                { required: true, message: '景区等级必填', trigger: 'blur' }
              ],
              aaid: [
                { required: true, message: '所在地区必选', trigger: 'change' }
              ],
              sspmainimg: [
                { required: true, message: '景区主图必填', trigger: 'change' }
              ],
              sspcontent:[
                { required: true, message: '景区详情必填', trigger: 'blur' }
              ],
              parentid:[

              ]
            },
            apid:'',
            acid:'',
            ap_list:[],
            ac_list:[],
            aa_list:[],
            all_scenic:[],
            editorOption: {
              modules:{
                toolbar:{
                  container:toolbarOptions,
                  handlers:{
                    image:function (value) {
                      if(value){
                        document.getElementById('quill-img').click();
                      }else{
                        this.quill.format('image',false)
                      }
                    }
                  }
                }
              }
            },
            level:[
              {
                value: '1',
                label: '1A'
              }, {
                value: '2',
                label: '2A'
              }, {
                value: '3',
                label: '3A'
              }, {
                value: '4',
                label: '4A'
              }, {
                value: '5',
                label: '5A'
              }
            ],
          }
      },
      computed: {
        // 上传图片
        uploadUrl() {
          return this.$api.upload_file + getStore('token') + '&type=scenicspot'
        },
      },
      components: {quillEditor},
      mounted() {
        this.getScenic();
        this.dealProps();

        if(this.$route.query.id){
          this.getFormData(this.$route.query.id);           //
        }

      },
      methods: {
        //  获取省
        dealProps(){
          this.$http.get(this.$api.get_provinces, {
            noLoading: true,
            params: {
            },
          }).then(
            res => {
              this.loading = false;

              if (res.data.status == 200) {
                let resData = res.data,
                  data = res.data.data;
                 this.ap_list = data;
              }
            }
          )
        },
        //获取市
        apBlur(){
          if(!this.apid){
            this.$message.error('请先选择省份!');
            return;
          }
          this.$http.get(this.$api.get_citys, {
            noLoading: true,
            params: {
              apid:this.apid
            },
          }).then(
            res => {
              this.loading = false;

              if (res.data.status == 200) {
                let resData = res.data,
                  data = res.data.data;
                this.ac_list = data;
              }
            }
          )
        },
        //获取地区
        acBlur(){
          if(!this.acid){
            this.$message.error('请先选择市!');
            return;
          }
          this.$http.get(this.$api.get_areas, {
            noLoading: true,
            params: {
              acid:this.acid
            },
          }).then(
            res => {
              this.loading = false;
              if (res.data.status == 200) {
                let resData = res.data,
                  data = res.data.data;
                this.aa_list = data;
              }
            }
          )
        },
        // 主图上传
        handleMainPicSuccess(res, file) {
          this.formData.sspmainimg = res.data;
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
          this.$http.get(this.$api.scenicspot_get, {
            noLoading: true,
            params: {
              sspid: id,
            },
          }).then(
            res => {
              this.loading = false;
                console.log(res,'获取数据')
              if (res.data.status == 200) {
                let resData = res.data,
                  data = res.data.data;
                for(let i in data.address_info){
                  if(data.address_info[i].apid){
                    this.apid = data.address_info[i].apid;
                    this.apBlur();
                  }else if(data.address_info[i].acid){
                    this.acid = data.address_info[i].acid;
                    this.acBlur();
                  }
                }

                  this.formData =  {
                    sspname:data.sspname,
                    ssplevel:data.ssplevel,
                    aaid:data.aaid,
                    sspmainimg:data.sspmainimg,
                    parentid:data.parent_scenicspot && data.parent_scenicspot.sspid,
                    sspcontent:data.sspcontent,
                    associated:data.associated,
                    sspid:data.sspid
                }

              }
            }
          )
        },
        // 保存按钮
        checkFormData() {
          this.$refs.formData.validate(valid => {
            if (valid) {
              if(!this.formData.aaid){
                this.$message.error('请先选择省市区!');
                return;
              }
              if(this.$route.query.id){
                this.$http.post(this.$api.scenicspot_update, this.formData).then(res => {
                  if (res.data.status == 200) {
                    this.$notify({
                      title: '保存成功',
                      message: '景区发布成功',
                      type: 'success'
                    });
                    this.$router.push('/scenic/index')
                  }
                });
              }else{
                this.$http.post(this.$api.scenicspot_add, this.formData).then(res => {
                  if (res.data.status == 200) {
                    this.$notify({
                      title: '保存成功',
                      message: '景区发布成功',
                      type: 'success'
                    });
                    this.$router.push('/scenic/index')
                  }
                });
              }

            }else {
              this.$message.warning('请根据校验信息完善表单!');
            }
          })
        },
        switchChange(){
          if(!this.formData.associated){
            this.formData.parentid = '';
          }
        },
        getScenic(){
          this.$http.get(this.$api.scenicspot_list, {
            noLoading: true,
            params: {
              option:'root',
              page_size:1000,
              page_num:1
            },
          }).then(
            res => {
              this.loading = false;

              if (res.data.status == 200) {
                let resData = res.data,
                  data = res.data.data;
                  this.all_scenic = data;
              }
            }
          )
        },
        quillEditorChange(e){
          console.log(e)
        },
        fileChange(file){
          let formData = new FormData();
          formData.append('file', file.target.files[0]);
          this.$http({method: 'post', url: this.uploadUrl, data: formData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
            res => {
              if (res.data.status == 200) {
                // this.imagesUrl.push({
                //   name: file.file.name,
                //   url: res.data.data
                // })
                document.getElementById('quill-img').value = '';
                this.quillImgSuccess(res)
              }else{
                this.$message.error(res.data.message);
              }
            }
          )
        },
        quillImgSuccess(res){
          let quill = this.$refs.myTextEditor.quill;
          let length = quill.getSelection().index;
          quill.insertEmbed(length,'image',res.data.data);
          quill.setSelection(length+1);

        }
      }
    }
</script>

<style scoped lang="less">
  @import "../../styles/myIndex";

  .container {
    .m-scenic-img{
      display: inline-block;
      width: 220px;
      height: 100px;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }

    .contract-img {
      .wl(300px, auto);
      max-height: 100%;
      margin-right: 30px;
      border: 1px solid black;
    }
    .quill-img{
      opacity: 0;
      position: fixed;
      bottom: -100px;
    }

  }
</style>
