<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <el-form :model="formData" :rules="rules" ref="formData" label-position="left"
                 label-width="140px">
<!--          <block-title title="基本信息"></block-title>-->
          <el-form-item label="票务名称" prop="tiname">
            <el-input v-model="formData.tiname"></el-input>

          </el-form-item>
        <el-form-item label="封面图" prop="tiimg">
          <el-upload
            class="avatar-uploader m-draft"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleMainPicSuccess"
            :before-upload="beforeImgUpload">
            <img v-if="formData.tiimg" v-lazy="formData.tiimg" :key="formData.tiimg" class="avatar circle-main-img" />
            <i v-else class="el-icon-plus avatar-uploader-icon circle-main-img"></i>
            <div slot="tip" class="el-upload__tip">
              建议尺寸：750*350像素，大小最好在10M以内
            </div>
          </el-upload>
        </el-form-item>
          <el-form-item label="顶部轮播图" prop="tibanner">
            <div class="m-up-img-box">
              <div class="inputbg m-img-xl el-upload-list--picture-card" v-for="(item,index) in formData.tibanner">
                <img :src="item"  style="width: 288px;height:161px;"/>
                <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="previewImage(item)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span class="el-upload-list__item-delete" @click="deleteImage(index)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
              </div>
              <div class="inputbg m-img-xl"><span>+</span><input type="file" multiple="multiple" id="prDesc"  accept="image/*" @change="newUploadImages"></div>
            </div>
              <div slot="tip" class="el-upload__tip">
                <span>可多选,建议尺寸为750x375(px),大小不要超过15M,上传成功后会显示,上传大图请耐心等待.</span>
              </div>



          </el-form-item>
          <el-form-item label="发放时间" required>
            <el-date-picker
              v-model="time"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="游玩时间" required>
            <el-date-picker
              v-model="time1"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="原票价" prop="tiprice">
            <el-input v-model="formData.tiprice">
              <template slot="prepend">¥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="试用押金" prop="tideposit">
            <el-input v-model="formData.tideposit">
              <template slot="prepend">¥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="票数" prop="tinum">
            <el-input v-model="formData.tinum" >
              <template slot="append">张</template>
            </el-input>
          </el-form-item>
<!--          <el-form-item label="规则" prop="tirules">-->
<!--            <el-input v-model="formData.tirules" type="textarea">-->
<!--            </el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="授权资质" >
            <el-upload
              class="avatar-uploader m-draft"
              :action="uploadUrl"
              :show-file-list="false"
              accept="image/*"
              :on-success="handleCertPicSuccess"
              :before-upload="beforeImgUpload">
              <img v-if="formData.ticertificate" :key="formData.ticertificate" v-lazy="formData.ticertificate"  class="avatar circle-main-img" />
              <i v-else class="el-icon-plus avatar-uploader-icon circle-main-img"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情" prop="tidetails">
            <div class="editor">
              <quill-editor ref="myTextEditor" @change="quillEditorChange($event)" :options="editorOption" v-model="formData.tidetails" :config="editorOption"></quill-editor>
            </div>

          </el-form-item>
          <el-form-item label="与其他平台联动" >
            <el-select v-model="formData.liids" multiple  placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.liid"
                :label="item.liname"
                :value="item.liid"
                :disabled="item.listatus">
              </el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item label="短语简介" prop="tiabbreviation">-->
<!--            <el-input v-model="formData.tiabbreviation" placeholder="最好在10字以内"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="标签" prop="sspcontent">-->
<!--            <div class="m-label-box">-->
<!--              <span class=" m-label" :class="item.active ? 'active':''" v-for="(item,index) in enter_list" @click="labelClick(index,'enter_list')">{{item.name}}</span>-->
<!--              <el-popover-->
<!--                placement="right"-->
<!--                width="400"-->
<!--                trigger="manual"-->
<!--                v-model="enterVisible">-->
<!--                <h3 class="el-upload__tip">新增报名填写项</h3>-->
<!--                <el-input v-model="label" maxlength="4" placeholder="5字以内" class="m-input-label"></el-input>-->
<!--                <el-button type="primary" @click="enterSave">保 存</el-button>-->
<!--                <el-button @click="enterVisible = false">取消</el-button>-->
<!--                <span class="m-label" slot="reference" @click="enterVisible =!enterVisible">+</span>-->
<!--              </el-popover>-->
<!--            </div>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="开启/中止" >-->
<!--            <el-switch-->
<!--              v-model="formData.interrupt"-->
<!--              active-color="#409EFF" inactive-color="#DBDCDC">-->
<!--            </el-switch>-->
<!--          </el-form-item>-->

          <el-form-item>
            <el-button type="primary" @click="submitDraft">立即发布</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <input type="file" multiple="true" id="quill-img" class="quill-img" accept="image/*" @change="fileChange">
    <!--预览大图dialog-->
    <el-dialog :visible.sync="dialogVisible" top="8vh">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import { quillEditor } from "vue-quill-editor";
  import ImgsDragSort from 'src/components/ImgsDragSort/index'
  import 'quill/dist/quill.js';
  import { getStore } from "src/utils/index";
  const toolbarOptions = [
    ['bold','italic','underline','strike'],
    [{size:['small',false,'large','huge']}],
    [{font:[]}],
    [{color:[]}],
    [{align:[]}],
    ['link','image','video']
  ];
  const moneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/;
  const positiveNumberReg = /^([1-9]\d*)$/;   //  正整数
  export default {
    name: "editTicket",
    data(){
      return{
        formData:{
          tiimg:'',
          tirules:'',
          tinum:0,
          tistarttime:'',
          tiendtime:'',
          tiprice:0,
          tiname:'',
          interrupt:false,
          tidetails:'',
          ticertificate:'',
          tideposit:0,
          tiabbreviation:'',
          ticategory:[],
          liids:[],
          delete:false,
          titripstarttime:'',
          titripendtime:'',
          tibanner:[]
        },
        options: [],
        rules: {
          tirules: [
            { required: true, message: '规则必填', trigger: 'blur' }
          ],
          tiname: [
            { required: true, message: '票务名称必填', trigger: 'blur' }
          ],
          tiprice: [
            { required: true, message: '原票价必填', trigger: 'blur' },
            {pattern: moneyReg, message: '请输入合理的价格(至多2位小数)', trigger: 'blur'},
          ],
          tiimg: [
            { required: true, message: '票务封面必填', trigger: 'blur' }
          ],
          tideposit: [
            { required: true, message: '最低押金必填', trigger: 'blur' },
            {pattern: moneyReg, message: '请输入合理的价格(至多2位小数)', trigger: 'blur'},
          ],
          tidetails: [
            { required: true, message: '详情必填', trigger: 'blur' }
          ],
          tinum: [
            { required: true, message: '票数必填', trigger: 'blur' },
              {pattern: positiveNumberReg, message: '请输入合理的张数', trigger: 'blur'}
          ],
          tiabbreviation: [
            { required: true, message: '短语简介必填', trigger: 'blur' }
          ],
          tibanner:[
            { required: true, message: '票务轮播图必填', trigger: 'change' }
          ]
        },
        time:[],
        time1:[],
        label:'',
        enterVisible:false,
        enter_list:[],
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
        agree:false,
        dialogImageUrl:'',
        dialogVisible:false
      }
    },
    computed: {
      // 上传图片
      uploadUrl() {
        return this.$api.upload_file + getStore('token') + '&type=ticket'
      },
    },
    watch :{
      time(oldvalue,newvalue){
        console.log(oldvalue);
        // this.initArray();
      },
      time1(oldvalue,newvalue){

      },
    },
    components: {quillEditor,ImgsDragSort},
    mounted() {
      this.getLink();
      if(this.$route.query.id){
        this.getFormData(this.$route.query.id);

      }

    },
    methods: {
      // 主图上传
      handleMainPicSuccess(res, file) {

        this.formData.tiimg = res.data;
        console.log(this.formData.tiimg)
      },

      handleCertPicSuccess(res,file){
        this.formData.ticertificate = res.data;
      },
      newUploadImages(e){

        for(let i =0;i<e.target.files.length;i++){
          let formData = new FormData();
          formData.append('file', e.target.files[i]);
          this.$http({method: 'post', url: this.uploadUrl, data: formData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
            res => {
              if (res.data.status == 200) {
                // this.imagesUrl.push({
                //   name: file.file.name,
                //   url: res.data.data
                // })
                let file = document.getElementById('prDesc');
                file.value ='';

                this.formData.tibanner.push(res.data.data);
              }else{
                this.$message.error(res.data.message);
              }
            }
          )
        }
      },
      previewImage(item){
        this.dialogImageUrl = item;
        this.dialogVisible = true;
      },
      deleteImage(index){
        this.formData.tibanner.splice(index,1)
      },
      // 上传前限制小于15M
      beforeImgUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;
        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }
        return isLt15M;
      },

      getLink(){
        this.$http.get(this.$api.list_linkage, {
          noLoading: true,
          params: {
          },
        }).then(
          res => {
            this.loading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              this.options = data;
              this.options.forEach(function (item,index,arr) {
                item.lisharetype = Boolean(item.lisharetype)
              })
              this.$forceUpdate()
            }
          }
        )
      },
      getFormData(id){
        this.$http.get(this.$api.ticket_get, {
          noLoading: true,
          params: {
            tiid: id,
          },
        }).then(
          res => {
            this.loading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              //
              this.formData = {
                  tiimg:data.tiimg,
                  tirules:data.tirules,
                  tinum:data.tinum,
                  tistarttime:data.tistarttime,
                  tiendtime:data.tiendtime,
                  tiprice:data.tiprice,
                  tiname:data.tiname,
                  interrupt:false,
                  tidetails:data.tidetails,
                  ticertificate:data.ticertificate,
                  tideposit:data.tideposit,
                  tiabbreviation:data.tiabbreviation,
                  // ticategory:data.ticategory,
                  liids:[],
                  delete:false,
                  tiid:data.tiid,
                titripendtime:data.titripendtime,
                titripstarttime:data.titripstarttime,
                tibanner:data.tibanner
              }
              // this.time[0] = new Date(this.formData.plstarttime);
              // this.time[1] = new Date(this.formData.plendtime);
              let arr = [];
              let _arr = [].concat(data.linkage);
              if(_arr.length > 0){
                for(let i=0;i<_arr.length;i++){
                  arr.push(_arr[i].liid);
                }
                delete this.formData.linkage;
                this.formData.liids = [].concat(arr);
              }
              this.time = [this.formData.tistarttime, this.formData.tiendtime];
              this.time1 = [this.formData.titripstarttime,this.formData.titripendtime];
              //标签

              // let enter =[];
              // for(let i in this.formData.ticategory){
              //   enter.push({name:this.formData.ticategory[i],active:true});
              //
              // }
              //
              // this.enter_list = enter;

            }
          }
        )
      },
      //  保存报名项
      enterSave(){
        if(this.label.replace(/^\s*|\s*$/g,"")){
          this.enter_list.push({
            name:this.label,
            active:true
          });
          this.label = '';
        }
        this.enterVisible = false;
      },
      //标签保存
      labelClick(index,name){
        this[name][index].active = !this[name][index].active;
      },
      postData(status){

        this.$refs.formData.validate(valid => {
          if (valid) {
            // let enter =[];
            //
            // for(let i in this.enter_list){
            //   if(this.enter_list[i].active){
            //     enter.push(this.enter_list[i].name);
            //   }
            // }
            console.log(this.formData.tibanner)
            // this.formData.ticategory = [].concat(enter);
            this.formData.tistarttime = this.time[0];
            this.formData.tiendtime = this.time[1];
            this.formData.titripstarttime = this.time1[0];
            this.formData.titripendtime = this.time1[1];
            this.formData.tiprice = Number(this.formData.tiprice);
            this.formData.tideposit = Number(this.formData.tideposit);
            this.formData.tinum = Number(this.formData.tinum);
            if(this.formData.tiid) {      // 编辑
              this.$http.post(this.$api.ticket_update, this.formData).then(res => {
                if (res.data.status == 200) {
                  this.$notify({
                    title: '编辑成功',
                    message: '票务编辑成功',
                    type: 'success'
                  });
                  this.$router.push('/ticket/index')
                }
              });
            }else {                         // 新增
              this.$http.post(this.$api.ticket_create, this.formData).then(res => {
                if (res.data.status == 200) {
                  this.$notify({
                    title: '新增成功',
                    message: '票务新增成功',
                    type: 'success'
                  });
                  this.$router.push('/ticket/index')
                }
              });
            }
          }else {
            this.$message.warning('请根据校验信息完善表单!');
          }
        })

      },
      //立即发布
      submitDraft(){

        this.postData();
      },
      quillEditorChange(e){
        console.log(e)
      },
      fileChange(file){
        for(let i =0;i<file.target.files.length;i++){
          let formData = new FormData();
          formData.append('file', file.target.files[i]);
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
        }

      },
      quillImgSuccess(res){
        let quill = this.$refs.myTextEditor.quill;
        let length = quill.getSelection().index;
        quill.insertEmbed(length,'image',res.data.data);
        quill.setSelection(length+1);

      },


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
        min-width: 120px;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        padding: 0 20px;
        border:1px solid #3498DB;
        color: #3498DB;
        margin-right: 30px;
        margin-bottom: 20px;
        text-align: center;
        &.active{
          background-color: #3498DB;
          color: #fff;
        }
      }
    }
    .m-blue{
      color:#3498DB;
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
    .el-upload-list--picture-card .el-upload-list__item-actions:hover {
      opacity: 1;
    }
    .m-up-img-box{
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap!important;
      margin-bottom: 20px;
      .el-upload-list__item-actions {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0,0,0,.5);
        -webkit-transition: opacity .3s;
        transition: opacity .3s;
        border-radius: 6px;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        span {
          cursor: pointer;
        }
      }
    }
    .inputbg{
      margin: 0  10px  10px 0;
      /*color: #97ADCB;*/
      color: #999;
      border: 1px solid #eeeeee;
      background-color: #fbfdff;
      border-radius: 6px;
      font-size: 40px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      position: relative;
      width: 288px;
      height: 161px;
      line-height: 161px;
      text-align: center;
    }
    .inputbg input{
      position: absolute;
      top: 0;
      left: 0;
      opacity:0;
      filter:alpha(opacity=0);
      width: 288px;
      height: 161px;
      line-height: 161px;
      cursor: pointer;
    }
  }
</style>
