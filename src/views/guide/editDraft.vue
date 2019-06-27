<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <el-form :model="formData" :rules="rules" ref="formData" label-position="left"
                 label-width="140px">
          <block-title title="基本信息"></block-title>
          <el-form-item label="起止时间" prop="sspname">
            <el-date-picker
              v-model="time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动地点" >
            <div class="m-label-box">
              <span class=" m-label" :class="item.active ? 'active':''" v-for="(item,index) in location_list" @click="labelClick(index,'location_list')">{{item.name}}</span>
              <el-popover
                placement="right"
                width="400"
                trigger="manual"
                v-model="locationVisible">
                <h3 class="el-upload__tip">新增地点</h3>
                <el-input v-model="locationLabel" class="m-input-label"></el-input>
                <el-button type="primary" @click="locationSave">保 存</el-button>
                <el-button @click="locationVisible = false">取消</el-button>
                <span class="m-label" slot="reference" @click="locationVisible =!locationVisible">+</span>
              </el-popover>
            </div>
          </el-form-item>
          <el-form-item label="活动封面" >
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              accept="image/*"
              :on-success="handleMainPicSuccess"
              :before-upload="beforeImgUpload">
              <img v-if="formData.plimg" v-lazy="formData.plimg" class="avatar circle-main-img" />
              <i v-else class="el-icon-plus avatar-uploader-icon circle-main-img"></i>
              <div slot="tip" class="el-upload__tip">
                建议尺寸：288*161像素，大小最好在10M以内
              </div>
            </el-upload>
          </el-form-item>
          <block-title title="报名信息"></block-title>
          <el-form-item label="最大承载人数" prop="plnum">
           <el-input v-model="formData.plnum"></el-input>
          </el-form-item>
          <el-form-item label="活动费用" prop="sspcontent">
            <p  class="el-upload__tip">费用明细</p>
            <div class="m-cost-box " v-for="(item,index) in cost_list" v-if="!item.delete">
                <img src="/static/images/icon-cut.png" class="m-icon" alt="" @click="costCut(index)">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="费用名称" >
                      <el-input v-model="item.cosname"></el-input>
                    </el-form-item>
                    <el-form-item label="金额" >
                      <el-input v-model="item.cossubtotal"></el-input>
                    </el-form-item>
                    <el-form-item label="费用详情" >
                      <el-input type="textarea" :rows="4" :cols="200" v-model="item.cossubtotal"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </div>
            <div  class="m-cost-box ">
              <img src="/static/images/icon-add-new.png" class="m-icon" @click="costAdd" alt="">
              <span>添加费用</span>
            </div>
          </el-form-item>
          <el-form-item label="报名填写项" prop="sspcontent">
            <div class="m-label-box">
              <span class=" m-label" :class="item.active ? 'active':''" v-for="(item,index) in enter_list" @click="labelClick(index,'enter_list')">{{item.name}}</span>
              <el-popover
                placement="right"
                width="400"
                trigger="manual"
                v-model="enterVisible">
                <h3 class="el-upload__tip">新增报名填写项</h3>
                  <el-input v-model="label" class="m-input-label"></el-input>
                <el-button type="primary" @click="enterSave">保 存</el-button>
                <el-button @click="enterVisible = false">取消</el-button>
                <span class="m-label" slot="reference" @click="enterVisible =!enterVisible">+</span>
              </el-popover>
            </div>

          </el-form-item>
          <block-title title="旅行推荐信息"></block-title>
          <el-form-item label="保险费用" prop="sspcontent">
            <p  class="el-upload__tip">保险明细</p>
            <div class="m-cost-box " v-for="(item,index) in insurance_list" v-if="!item.delete">
              <img src="/static/images/icon-cut.png" class="m-icon" alt="" @click="insuranceCut(index)">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="保险名称" >
                    <el-input v-model="item.inname"></el-input>
                  </el-form-item>
                  <el-form-item label="金额" >
                    <el-input v-model="item.incost"></el-input>
                  </el-form-item>
                  <el-form-item label="保险详情" >
                    <el-input type="textarea" :rows="4" :cols="200" v-model="item.incontent"></el-input>
                  </el-form-item>
                  <el-form-item label="是否必选" >
                    <el-switch
                      v-model="item.intype"
                      active-color="#3498DB"
                      inactive-color="#EEEEEF">
                    </el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div  class="m-cost-box ">
              <img src="/static/images/icon-add-new.png" class="m-icon" @click="insuranceAdd" alt="">
              <span>添加费用</span>
            </div>
          </el-form-item>
          <el-form-item label="推荐携带物品" >
            <div class="m-label-box">
              <span class=" m-label" :class="item.active ? 'active':''" v-for="(item,index) in recommend_list" @click="labelClick(index,'recommend_list')">{{item.name}}</span>
              <el-popover
                placement="right"
                width="400"
                trigger="manual"
                v-model="recommendVisible">
                <h3 class="el-upload__tip">新增携带物品</h3>
                <el-input v-model="recommendLabel" class="m-input-label"></el-input>
                <el-button type="primary" @click="enterSave">保 存</el-button>
                <el-button @click="recommendVisible = false">取消</el-button>
                <span class="m-label" slot="reference" @click="recommendVisible =!recommendVisible">+</span>
              </el-popover>
            </div>

          </el-form-item>
          <el-form-item label="活动名称">
            <el-input v-model="formData.pltitle"></el-input>

          </el-form-item>
          <el-form-item label="推文" >
            <div class="editor">
              <quill-editor ref="myTextEditor" :options="editorOption" v-model="formData.plcontent" :config="editorOption"></quill-editor>
            </div>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="checkFormData">保 存</el-button>
            <el-button type="primary" @click="checkFormData">立即发布</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { quillEditor } from "vue-quill-editor";
  import 'quill/dist/quill.js';
  import { getStore } from "src/utils/index";
  export default {
    name: "editScenic",
    data(){
      return{
        formData:{
          plimg:'',
          plnum:0,
          plstarttime:'',
          plendtime:'',
          pllocation:[],
          pltitle:'',
          plcontent:'',
          plstatus:0,
          plproducts:[],
          costs:[],
          insurances:[],
          playrequires:[],
          delete:false
        },
        cost_list:[],
        insurance_list:[],
        rules: {
          plnum: [
            { required: true, message: '最大承载人数必填', trigger: 'blur' }
          ],
          pltitle: [
            { required: true, message: '活动名称必填', trigger: 'blur' }
          ],
          plcontent: [
            { required: true, message: '活动内容必填', trigger: 'blur' }
          ],
          plimg: [
            { required: true, message: '活动封面必填', trigger: 'change' }
          ]
        },
        time:'',
        label:'',
        enterVisible:false,
        enter_list:[],
        locationVisible:false,
        locationLabel:'',
        location_list:[],
        recommend_list:[],
        recommendVisible:false,
        recommendLabel:'',
        editorOption: {
          // placeholder: "placeholder",
          // 编辑器的配置
          // something config
          // theme: "bubble"
        },
      }
    },
    computed: {
      // 上传图片
      uploadUrl() {
        return this.$api.upload_file + getStore('token') + '&type=news'
      },
    },
    components: {quillEditor},
    mounted() {
      this.getScenic();

      if(this.$route.query.id){
        this.getFormData(this.$route.query.id);           //
      }

    },
    methods: {
      // 主图上传
      handleMainPicSuccess(res, file) {
        this.formData.plimg = res.data;
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
      //新增费用
      costAdd(){
        this.cost_list.push({
          cosid:'',
          cosname:'',
          cosdetail:'',
          cossubtotal:'',
          delete:false
        })
      },
      //删除费用
      costCut(index){
        let that = this;
        console.log(index)
        this.$confirm('此操作将永久删除该景区, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(index)
          that.cost_list[index].delete = true;
          that.cost_list = [].concat(that.cost_list);
          that.$notify({
            title: '删除成功',
            message: '景区删除成功',
            type: 'success'
          });

        }).catch(() => {

        });

      },
      //新增保险
      insuranceAdd(){
        this.insurance_list.push({
          inid:'',
          inname:'',
          incontent:'',
          intype:false,
          incost:''
        })
      },
      //删除保险
      insuranceCut(index){
        let that = this;
        this.$confirm('此操作将永久删除该保险, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.insurance_list[index].delete = true;
          that.insurance_list = [].concat(that.insurance_list);
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {

        });
      },
    //  保存报名项
      enterSave(){
        this.enter_list.push({
          name:this.label,
          active:true
        });
        this.label = '';
        this.enterVisible = false;
      },
      //  保存报名项
      locationSave(){
        this.location_list.push({
          name:this.locationLabel,
          active:true
        });
        this.locationLabel = '';
        this.locationVisible = false;
      },
    //
      labelClick(index,name){
        this[name][index].active = !this[name][index].active;
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
.m-icon{
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 40px;
}

    .m-cost-box{
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: flex-start;
    }

    .el-form-item .el-form-item{
      margin-bottom: 20px;
      .el-input{
        width: 200px;
      }
      .el-textarea{
        width: 200px;
      }
    }

    .m-label-box{
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      .m-label{
        display: block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        border:1px solid #3498DB;
        color: #3498DB;
        margin-right: 30px;
        text-align: center;
        &.active{
          background-color: #3498DB;
          color: #fff;
        }
      }
    }
    .contract-img {
      .wl(300px, auto);
      max-height: 100%;
      margin-right: 30px;
      border: 1px solid black;
    }

  }
</style>
