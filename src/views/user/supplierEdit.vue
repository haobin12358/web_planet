<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <el-form :model="supplierForm" :rules="rules" ref="supplierForm" label-width="120px">
          <el-form-item label="供应商名称" prop="suname">
            <el-input v-model="supplierForm.suname"></el-input>
          </el-form-item>
          <el-form-item label="品牌" prop="pbids">
            <el-select
              v-model="pbSelect"
              clearable
              filterable
              default-first-option
              placeholder="可查询" style="width: 500px">
              <el-option
                v-for="item in brandOptions"
                :key="item.pbid"
                :label="item.pbname"
                :value="item.pbid">
                <span style="float: left">{{ item.pbname }}</span>
                <img v-lazy="item.pblogo" style="float: right;width: 32px;height: 32px;padding: 2px;" alt="">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="sulinkman">
            <el-input v-model="supplierForm.sulinkman"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="sulinkphone">
            <el-input v-model="supplierForm.sulinkphone"></el-input>
          </el-form-item>
          <el-form-item label="联系地址" prop="suaddress">
            <el-input v-model="supplierForm.suaddress"></el-input>
          </el-form-item>

          <template v-if="!this.supplierForm.suid">
            <el-form-item label="登录账号" prop="suloginphone">
              <el-input v-model="supplierForm.suloginphone"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="supassword">
              <el-input v-model="supplierForm.supassword"></el-input>
            </el-form-item>
          </template>


          <el-form-item label="头像" prop="suheader">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              accept="image/*"
              :on-success="handleHeaderSuccess"
              :before-upload="beforePicUpload"
            >
              <img v-if="supplierForm.suheader" v-lazy="supplierForm.suheader" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>

              <div slot="tip" class="el-upload__tip">
                建议为方形,大小不要超过15M,上传成功后会显示,上传大图请耐心等待
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="合同图" prop="sucontract">
            <el-upload
              class="swiper-uploader"
              :action="uploadVoucherUrl"
              accept="image/*"
              list-type="picture-card"
              :file-list="suContractUrl"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforePicUpload"
              :on-remove="handleContractRemove"
              :http-request="uploadContract"
              :limit="20"
              :multiple="true">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">
                <span>可多选,大小不要超过15M,上传成功后会显示,上传大图请耐心等待.</span>
              </div>
            </el-upload>
          </el-form-item>


          <el-form-item label="银行" prop="subankname">
            <el-input v-model="supplierForm.subankname"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号" prop="subanksn">
            <el-input v-model="supplierForm.subanksn"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="doSave">保存供应商</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

    <!--预览大图dialog-->
    <el-dialog :visible.sync="dialogVisible" top="8vh">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {getStore} from "src/utils/index";

  export default {
    name: "SupplierEdit",

    components: {},

    data() {
      return {
        brandOptions: [],
        supplierForm: {
          "suloginphone": "",
          "supassword": "",

          "suname": "",
          "sulinkman": "",
          "sulinkphone": "",
          "suaddress": "",
          pbids: '',

          "suheader": "",
          "sucontract": [],

          "subankname": " ",
          "subanksn": "",

        },
        rules: {
          suloginphone: [
            {required: true, message: '供应商账号必填', trigger: 'blur'},
          ],
          supassword: [
            {required: true, message: '供应商密码必填', trigger: 'blur'},
          ],
          suname: [
            {required: true, message: '供应商名称必填', trigger: 'blur'},
          ],
          pbids: [
            {required: true, message: '品牌必选', trigger: 'blur'},
          ],
          sulinkman: [
            {required: true, message: '联系人必填', trigger: 'blur'},
          ],
          sulinkphone: [
            {required: true, message: '联系电话必填', trigger: 'blur'},
          ],
          suaddress: [
            {required: true, message: '联系地址必填', trigger: 'blur'},
          ],

          suheader: [
            {required: true, message: '供应商头像必传', trigger: 'change'},

          ],
          sucontract: [
            {required: true, message: '合同必传', trigger: 'change'},

          ],

          subankname: [],
          subanksn: [],
        },

        pbSelect: '', //  先限制单选品牌
        suContractUrl: [],

        //  大图预览
        dialogImageUrl: '',
        dialogVisible: false,
      }
    },
    watch: {
      pbSelect(val) {
        this.supplierForm.pbids = [val];
      },
      suContractUrl(val) {
        this.supplierForm.sucontract = val.map(item => item.url);
      }
    },
    computed: {
      uploadUrl() {
        return this.$api.upload_file + getStore('token')+ '&type=avatar'
      },

      uploadVoucherUrl() {
        return this.$api.upload_file + getStore('token')+ '&type=voucher'
      },
    },

    methods: {


      //  分类主图上传
      handleHeaderSuccess(res, file) {
        this.supplierForm.suheader = res.data;
      },
      beforePicUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;

        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }

        return isLt15M;
      },

      //  预览图
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadContract(file) {
        let formData = new FormData();

        formData.append('file', file.file)

        this.$http({
          method: 'post',
          url: this.uploadVoucherUrl,
          data: formData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = resData.data;

              this.suContractUrl.push({
                name: file.file.name,
                url: data,
              })
            }
          }
        );
      },
      handleContractRemove(file) {
        this.suContractUrl = this.suContractUrl.filter(
          item => item.uid != file.uid
        )
      },

      doSave() {
        this.$refs.supplierForm.validate(
          valid => {
            if (valid) {
              if (this.supplierForm.suid) {
                // this.supplierForm.pbids = [this.supplierForm.pbids];
                this.$http.post(this.$api.update_supplizer, this.supplierForm).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                        data = res.data.data;

                      this.$router.push('/user/suppliers');
                      this.$notify({
                        title: '供应商编辑成功',
                        message: `供应商名称:${this.supplierForm.suname}`,
                        type: 'success'
                      });
                    }
                  }
                )
              } else {

                this.$http.post(this.$api.create_supplizer, this.supplierForm).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                        data = res.data.data;

                      this.$router.push('/user/suppliers');
                      this.$notify({
                        title: '供应商新增成功',
                        message: `供应商名称:${this.supplierForm.suname}`,
                        type: 'success'
                      });
                    }
                  }
                )
              }
            } else {
              this.$message.warning('请根据校验信息完善表单!');
            }
          }
        )
      },

      //  获取没有绑定的品牌
      async getBrandList() {
        let res = await this.$http.get(this.$api.brand_list, {
          params: {
            free: true,
            pbstatus: 'upper',
          }
        });

        if (res.data.status == 200) {
          let resData = res.data,
            data = res.data.data;

          return data;
        }
      },
    },

    async created() {
      let brandList = await this.getBrandList();

      if (this.$route.params.item) {
        this.$message.info('当前是编辑状态');

        let data = JSON.parse(this.$route.params.item);
        brandList.push(data.brand);

        this.brandOptions = brandList;

        this.supplierForm = {
          suid: data.suid,

          "suname": data.suname,
          "sulinkman": data.sulinkman,
          "sulinkphone": data.sulinkphone,
          "suaddress": data.suaddress,
          pbids: [data.brand.pbid],

          "suheader": data.suheader,
          "sucontract": data.sucontract,

          "subankname": data.subankname,
          "subanksn": data.subanksn,
        };

        this.pbSelect = data.brand.pbid;
        this.suContractUrl = data.sucontract.map(item => {
          return {
            url: item
          }
        });
      } else {
        this.$message.info('当前是新增状态');
        this.brandOptions = brandList;
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {

  }
</style>
