<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <el-form :model="formData" :rules="rules" ref="formData" label-position="left"
                 label-width="140px">
<!--          <block-title title="基本信息"></block-title>-->
          <el-form-item label="票务名称">
            <el-input v-model="formData.pltitle"></el-input>

          </el-form-item>
        <el-form-item label="封面图" >
          <el-upload
            class="avatar-uploader m-draft"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleMainPicSuccess"
            :before-upload="beforeImgUpload">
            <img v-if="formData.plimg" v-lazy="formData.plimg"  class="avatar circle-main-img" />
            <i v-else class="el-icon-plus avatar-uploader-icon circle-main-img"></i>
            <div slot="tip" class="el-upload__tip">
              建议尺寸：750*350像素，大小最好在10M以内
            </div>
          </el-upload>
        </el-form-item>
          <el-form-item label="发放时间" prop="sspname">
            <el-date-picker
              v-model="time"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>


          <el-form-item label="原票价" prop="plnum">
            <el-input v-model="formData.plnum">
              <template slot="prepend">¥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="最低押金" prop="plnum">
            <el-input v-model="formData.plnum">
              <template slot="prepend">¥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="规则" prop="plnum">
            <el-input v-model="formData.plnum" type="textarea">
            </el-input>
          </el-form-item>
          <el-form-item label="授权资质" >
            <el-upload
              class="avatar-uploader m-draft"
              :action="uploadUrl"
              :show-file-list="false"
              accept="image/*"
              :on-success="handleMainPicSuccess"
              :before-upload="beforeImgUpload">
              <img v-if="formData.plimg" v-lazy="formData.plimg"  class="avatar circle-main-img" />
              <i v-else class="el-icon-plus avatar-uploader-icon circle-main-img"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情" >
            <div class="editor">
              <quill-editor ref="myTextEditor" @change="quillEditorChange($event)" :options="editorOption" v-model="formData.plcontent" :config="editorOption"></quill-editor>
            </div>

          </el-form-item>
          <el-form-item label="与其他平台联动" prop="plnum">
            <el-select v-model="value" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="中止/开启" >
            <el-switch
              v-model="value1"
              active-color="#409EFF" inactive-color="#DBDCDC">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button  @click="saveDraft">保 存</el-button>
            <el-button type="primary" @click="submitDraft">立即发布</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <input type="file" multiple="true" id="quill-img" class="quill-img" accept="image/*" @change="fileChange">
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
    ['link','image','video']
  ];
  export default {
    name: "editTicket",
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
        value1:true,
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
        time:[],
        enterVisible:false,
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
        agree:false
      }
    },
    computed: {
      // 上传图片
      uploadUrl() {
        return this.$api.upload_file + getStore('token') + '&type=news'
      },
    },
    watch :{
      time(oldvalue,newvalue){
        console.log(oldvalue);
        this.initArray();
      }
    },
    components: {quillEditor},
    mounted() {
      if(this.$route.query.id){
        this.getFormData(this.$route.query.id);
        this.getCost(this.$route.query.id);
        this.getInsurance(this.$route.query.id);
        this.getWithdraw(this.$route.query.id);
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
      getCost(id){
        this.$http.get(this.$api.get_cost, {
          noLoading: true,
          params: {
            plid: id,
          },
        }).then(
          res => {
            this.loading = false;
            console.log(res,'获取数据')
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              this.cost_list = data;
            }
          }
        )
      },
      getInsurance(id){
        this.$http.get(this.$api.get_insurance, {
          noLoading: true,
          params: {
            plid: id,
          },
        }).then(
          res => {
            this.loading = false;
            console.log(res,'获取数据')
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              this.insurance_list = data;
            }
          }
        )
      },
      getWithdraw(id){
        this.$http.get(this.$api.get_discount, {
          noLoading: true,
          params: {
            plid: id,
          },
        }).then(
          res => {
            this.loading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              this.withdraw_list = data.discounts;
              for(let i=0;i<this.withdraw_list.length;i++){
                this.withdraw_list[i].time = [this.withdraw_list[i].pddeltaday,this.withdraw_list[i].pddeltahour]
              }
              console.log(this.withdraw_list,'afafa')
              this.initArray();
            }
          }
        )
      },
      getFormData(id){
        this.$http.get(this.$api.get_play, {
          noLoading: true,
          params: {
            plid: id,
          },
        }).then(
          res => {
            this.loading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              //
              this.formData = res.data.data;
              // this.time[0] = new Date(this.formData.plstarttime);
              // this.time[1] = new Date(this.formData.plendtime);
              this.time = [this.formData.plstarttime, this.formData.plendtime];


              let enter =[],location=[],recommend=[];
              for(let i in this.formData.pllocation){
                location.push({name:this.formData.pllocation[i],active:true});
              }
              for(let i in this.formData.playrequires){
                enter.push({name:this.formData.playrequires[i],active:true});

              }
              for(let i in this.formData.plproducts){
                recommend.push({name:this.formData.plproducts[i],active:true});
              }

              this.enter_list = enter;
              this.recommend_list = recommend;
              this.location_list = location;
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
      //新增保险
      withdrawAdd(){
        this.withdraw_list.push({
          pdid:'',
          pddeltaday:'',
          pddeltahour:'',
          delete:false,
          pdprice:''
        })
      },
      //删除保险
      withdrawCut(index){
        let that = this;
        this.$confirm('此操作将永久删除该扣款信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.withdraw_list[index].delete = true;
          that.withdraw_list = [].concat(that.withdraw_list);
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {

        });
      },
      //生成时间选择
      initArray(){
        console.log('初始化时间')
        // multiArray
        let start = new Date(this.time[0]);
        let end = new Date();
        let arr1 =[];
        let arr = [];
        for(let i=1;i<24;i++){
          arr.push({
            label:i+'小时',
            value:i
          })
        }
        if((start.getMonth() > end.getMonth()) || (end.getFullYear() > start.getFullYear()) ){
          for(let i=0;i<31;i++){
            arr1.push({
              label:i+'天',
              value:i
            })
          }
          arr1[0].children = arr;
        }else if(start.getDate() > end.getDate()){
          for(let i=0;i<= (start.getDate() - end.getDate());i++){
            arr1.push({
              label:i+'天',
              value:i
            })
          }
          arr1[0].children = arr;
        }else if(start.getHours() > end.getHours()){
          arr = [];
          arr1.push({
            label:'0天',
            value:0
          });
          for(let i=0;i< (start.getHours() - end.getHours());i++){
            arr.push({
              label:i+'小时',
              value:i
            })
          }
          arr1[0].children = arr;
        }else{
          arr1.push({
            label:'0天',
            value:0
          });
        }
        this.options = arr1;
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
      //  保存报名项
      locationSave(){
        if(this.locationLabel.replace(/^\s*|\s*$/g,"")){
          this.location_list.push({
            name:this.locationLabel,
            active:true
          });
          this.locationLabel = '';
        }
        this.locationVisible = false;
      },
      recommendSave(){
        if(this.recommendLabel.replace(/^\s*|\s*$/g,"")){
          this.recommend_list.push({
            name:this.recommendLabel,
            active:true
          });
          this.recommendLabel = '';
        }
        this.recommendVisible = false;
      },
      //标签保存
      labelClick(index,name){
        this[name][index].active = !this[name][index].active;
      },
      //创建费用
      postCost(status){
        if(this.cost_list.length == 0){
          this.postInsurance(status);
          return false;
        }
        this.$http.post(this.$api.set_cost, {
          costs:this.cost_list
        }).then(res => {
          if (res.data.status == 200) {
            this.formData.costs = res.data.data;
            this.postInsurance(status);
          }
        });
      },
      //创建保险
      postInsurance(status){
        if(this.insurance_list.length == 0){
          this.postWithdraw(status);
          return false;
        }
        this.$http.post(this.$api.set_insurance, {
          insurance:this.insurance_list
        }).then(res => {
          if (res.data.status == 200) {
            this.formData.insurances = res.data.data;
            this.postWithdraw(status);
          }
        });
      },
      //创建保险
      postWithdraw(status){
        if(this.insurance_list.length == 0){
          this.postDraft(status);
          return false;
        }
        for(let i=0;i<this.withdraw_list.length;i++){
          this.withdraw_list[i].pddeltaday = this.withdraw_list[i].time[0];
          if(this.withdraw_list[i].time.length == 2){
            this.withdraw_list[i].pddeltahour = this.withdraw_list[i].time[1];
          }
        }
        this.$http.post(this.$api.set_discount, {
          discounts:this.withdraw_list
        }).then(res => {
          if (res.data.status == 200) {
            this.formData.discounts = res.data.data;
            this.postDraft(status);
          }
        });
      },
      postDraft(status){
        let enter =[],location=[],recommend=[];
        for(let i in this.location_list){
          if(this.location_list[i].active){
            location.push(this.location_list[i].name);
          }
        }
        for(let i in this.enter_list){
          if(this.enter_list[i].active){
            enter.push(this.enter_list[i].name);
          }
        }
        for(let i in this.recommend_list){
          if(this.recommend_list[i].active){
            recommend.push(this.recommend_list[i].name);
          }
        }

        this.formData.plproducts = [].concat(recommend);
        this.formData.playrequires = [].concat(enter);
        this.formData.pllocation = [].concat(location);
        this.formData.plstatus = status;
        this.formData.plstarttime = this.time[0];
        this.formData.plendtime = this.time[1];

        this.$http.post(this.$api.set_play, this.formData).then(res => {
          if (res.data.status == 200) {
            if(status == 0){
              this.$notify({
                title: '保存成功',
                message: '活动保存成功成功',
                type: 'success'
              });
              this.$router.push('/guide/personalDraft')
            }else if(status == 1){
              this.$notify({
                title: '发布成功',
                message: '您可在小程序-管理活动-我创建的-查看推广页查看',
                type: 'success'
              });
              this.$router.push('/guide/personalDraft')
            }

          }
        });
      },
      //立即发布
      submitDraft(){
        if(this.agree){
          this.postCost(1);
        }else{
          this.$message.warning('请先阅读大行星平台服务协议!');
        }
      },
      //保存
      saveDraft(){
        this.postCost(0);
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
  }
</style>
