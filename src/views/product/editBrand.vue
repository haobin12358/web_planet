<template>
      <div class="container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">基本信息</el-menu-item>
          <el-menu-item index="2">轮播图</el-menu-item>
          <el-menu-item index="3">动态</el-menu-item>
        </el-menu>
        <section v-if="activeIndex == 1" >
          <el-form :model="brandForm" :rules="brandRules" ref="brandForm" size="medium" label-width="120px" label-position="left">
            <el-form-item label="品牌logo" prop="pblogo">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                accept="image/*"
                :on-success="handlePbLogoSuccess"
                :before-upload="beforePicUpload"
              >
                <img v-if="brandForm.pblogo" :key="brandForm.pblogo" v-lazy="brandForm.pblogo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>

                <div slot="tip" class="el-upload__tip">
                  建议为方形,大小不要超过15M,上传成功后会显示,上传大图请耐心等待
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="品牌店铺图" prop="pbbackgroud">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                accept="image/*"
                :on-success="handlePbBackSuccess"
                :before-upload="beforePicUpload"
              >
                <img v-if="brandForm.pbbackgroud" v-lazy="brandForm.pbbackgroud" :key="brandForm.pbbackgroud" class="avatar avatar-top">
                <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader-icon-top"></i>

                <div slot="tip" class="el-upload__tip">
                  建议宽高为750/350(2.27),大小不要超过15M,上传成功后会显示,上传大图请耐心等待
                </div>
              </el-upload>
            </el-form-item>

            <el-form-item label="品牌名" prop="pbname">
              <el-input v-model.trim="brandForm.pbname" maxlength="100" ></el-input>
            </el-form-item>
            <el-form-item label="品牌描述" prop="pbdesc">
              <el-input v-model.trim="brandForm.pbdesc" maxlength="1000"  type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="关联标签" prop="itids">
              <el-select
                v-model="brandForm.itids"
                multiple
                filterable
                default-first-option
                placeholder="可多选" style="width: 500px">
                <el-option
                  v-for="item in itemOptions"
                  :key="item.itid"
                  :label="item.itname"
                  :value="item.itid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="官网">
              <el-input v-model.trim="brandForm.pblinks" maxlength="1000" ></el-input>
            </el-form-item>
            <el-form-item label="星币抵扣百分比(0-100)">
              <el-input v-model.trim="brandForm.pbintegralpayrate"  >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="权重：" >
              <el-input v-model="brandForm.pbsort" style="width: 200px"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
<!--        <el-button @click="brandDlgVisible = false">取 消</el-button>-->
            <el-button type="primary" @click="doSaveBrand">确 定</el-button>
          </span>
        </section>
        <section v-if="activeIndex == 2" >
          <div class="add-button">
            <el-button type="primary" icon="el-icon-plus" @click="doAddBanner">新增</el-button>
          </div>

          <el-table v-loading="bannerLoading" :data="bannerTableData">
            <el-table-column label="图片/视频" align="center" prop="pblogo" >
              <template slot-scope="scope">
                <table-cell-img :src="[scope.row.pblogo]" :key="scope.row.pblogo"></table-cell-img>
              </template>
            </el-table-column>

            <el-table-column label="链接" align="center" prop="pbdesc"  show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="center"  >
              <template slot-scope="scope">
                <el-button type="text" @click="doEditBanner(scope.row)">编辑</el-button>
                <el-button type="text" class="danger-text" @click="doDeleteBanner(scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
        <!--品牌dialog-->
        <el-dialog :visible.sync="bannerDlgVisible" width="700px" top="10vh" v-el-drag-dialog
                   :title="bannerForm.pbid ? '品牌编辑': '品牌新增'"
                   :close-on-click-modal="false">
          <el-form :model="bannerForm" :rules="brandRules" ref="brandForm" size="medium" label-width="120px" label-position="left">


            <el-form-item label="品牌logo" prop="pblogo">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                accept="image/*"
                :on-success="handlePbLogoSuccess"
                :before-upload="beforePicUpload"
              >
                <img v-if="brandForm.pblogo" :key="brandForm.pblogo" v-lazy="brandForm.pblogo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>

                <div slot="tip" class="el-upload__tip">
                  建议为方形,大小不要超过15M,上传成功后会显示,上传大图请耐心等待
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="链接">
              <el-input v-model.trim="brandForm.bbcontent.content" maxlength="1000" ></el-input>
            </el-form-item>
            <el-form-item label="权重：" >
              <el-input v-model="brandForm.bbsort" style="width: 200px"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
        <el-button @click="bannerDlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSaveBanner">确 定</el-button>
      </span>
        </el-dialog>

      </div>
</template>

<script>
  import {getStore, setStore} from "src/utils/index";
    export default {
        name: "editBrand",
      data(){
          return{
            bannerTableData:[],
            bannerLoading:false,
            activeIndex:'1',
            itemOptions:[],
            bannerDlgVisible:false,
            bannerForm:{
              bbid:'',
              pbid:'',
              delete:false,
              bbcontent:{
                type:'',
                content:''
              },
              bbsort:''

            },
            brandForm: {
              pblogo: "",
              pbbackgroud: '',
              pbname: "",
              pbdesc: "",
              pblinks: "",
              itids: [],
              pbsort:0,
              pbintegralpayrate:0
            },
            brandRules: {
              pblogo: [
                {required: true, message: 'logo必传', trigger: 'change'}
              ],
              pbbackgroud: [
                {required: true, message: '店铺图必传', trigger: 'change'}
              ],
              pbname: [
                {required: true, message: '名字必填', trigger: 'blur'}
              ],
              pbdesc: [
                {required: true, message: '描述必填', trigger: 'blur'}
              ],
              pblinks: [
                {required: true, message: '官网链接必填', trigger: 'blur'}
              ],
              itids: [
                {required: true, message: '关联标签必选', trigger: 'change'}
              ],
            },
          }
      },
      computed: {
        uploadUrl() {
          return this.$api.upload_file + getStore('token') + '&type=brand'
        },
      },
      mounted(){
        this.getInfo();
      },
      methods:{
        //  brandForm
        handlePbLogoSuccess(res, file) {
          this.brandForm.pblogo = res.data;
        },
        handlePbBackSuccess(res, file) {
          this.brandForm.pbbackgroud = res.data;
        },
        beforePicUpload(file) {
          const isLt15M = file.size / 1024 / 1024 < 15;

          if (!isLt15M) {
            this.$message.error('上传图片大小不能超过 15MB!');
          }

          return isLt15M;
        },

        resetBrandForm() {
          this.brandForm = {
            pblogo: "",
            pbbackgroud: '',
            pbname: "",
            pbdesc: "",
            pblinks: "",
            itids: [],
            pbintegralpayrate:0,
            pbsort:0
          };
          this.$http.get(this.$api.items_list, {
            params: {
              ittype: 40
            }
          }).then(
            res => {
              if (res.data.status == 200) {
                let resData = res.data,
                  data = res.data.data;

                this.itemOptions = data
              }
            }
          )
        },
        // doAddBrand() {
        //   this.brandDlgVisible = true;
        //   this.resetBrandForm();
        //
        //
        // },
        doEditBrand() {
          this.$http.get(this.$api.brand_get, {
            params: {
              pbid: this.$route.query.pbid
            }
          }).then(
            res => {
              if (res.data.status == 200) {
                let resData = res.data,
                  row = res.data.data;

                this.brandForm = {
                  pbid: row.pbid,
                  pblogo: row.pblogo,
                  pbbackgroud: row.pbbackgroud,
                  pbname: row.pbname,
                  pbdesc: row.pbdesc,
                  pblinks: row.pblinks,
                  itids: [],
                  pbsort:row.pbsort,
                  pbintegralpayrate:row.pbintegralpayrate
                };
                this.brandForm.itids = row.items.map(item => item.itid);
              }
            }
          )

        },

        doSaveBrand() {
          this.$refs.brandForm.validate(
            valid => {
              if (valid) {
                let type = this.brandForm.pbid ? '品牌修改' : '品牌新增';
                if(!positiveNumberReg.test(this.brandForm.pbintegralpayrate ) ){
                  this.$message.warning('请输入正确的整数的星币折扣');
                  return
                }else if(this.brandForm.pbintegralpayrate > 100){
                  this.$message.warning('请输入1～100的星币折扣');
                  return
                }
                if (this.brandForm.pbid) {
                  this.$http.post(this.$api.update_brand, this.brandForm).then(
                    res => {
                      if (res.data.status == 200) {
                        let resData = res.data,
                          data = res.data.data;

                        this.$notify({
                          title: `${type}成功`,
                          message: `品牌名:${this.brandForm.pbname}`,
                          type: 'success'
                        });
                        this.brandDlgVisible = false;
                        this.init();
                      }
                    }
                  );
                } else {
                  this.$http.post(this.$api.create_brand, this.brandForm).then(
                    res => {
                      if (res.data.status == 200) {
                        let resData = res.data,
                          data = res.data.data;

                        this.$notify({
                          title: `${type}成功`,
                          message: `品牌名:${this.brandForm.pbname}`,
                          type: 'success'
                        });
                        this.brandDlgVisible = false;
                        this.init();
                      }
                    }
                  );
                }

              } else {
                this.$message.warning('请根据校验信息完善表单!');
              }
            }
          )
        },
        getInfo(){
          switch (this.activeIndex) {
            case '1':
              this.resetBrandForm();
              if(this.$route.query.pbid){
                this.doEditBrand();
              }
              break;
            case '2':
              if(this.$route.query.pbid && this.bannerTableData.length == 0){
                this.getBanner();
              }
              break;
            case '3':
              break;

          }
        },
        handleSelect(e){

          this.activeIndex = e;
          this.getInfo();
        },
      //  轮播图
        getBanner(){
          this.bannerLoading = true;
          this.$http.get(this.$api.brand_get_banner, {
            params: {
              pbid: this.$route.query.pbid
            }
          }).then(
            res => {
              this.bannerLoading = false;
              if (res.data.status == 200) {
                let resData = res.data,
                  row = res.data.data;

                this.bannerTableData = row;
              }
            }
          )
        },
        doAddBanner(){

        },
        doSaveBanner(){

        },
        doEditBanner(row){

        },
        doDeleteBanner(row){

        }

      }
    }
</script>

<style scoped lang="less">
.container{
  .el-menu-demo{
    margin-bottom: 30px;
  }
  .add-button{
    text-align: right;
    margin: 20px 0;
  }
}
</style>
