<template>
  <div class="container">

    <h3 class="m-part-title m-flex-start title-before-table">
      <span class="m-part-title-icon"></span>
      <span>问题类型</span>
    </h3>

    <div class="m-search-box">
      <div>
        <span class="m-btn active" @click="addClick('dialogQaTypeVisible')">
          <span class="m-btn-icon m-add"></span>
          <span>新增</span>
        </span>
      </div>
    </div>
    <el-table ref="tableQaType" :data="orderType" row-key="qoname" :highlight-current-row="true"
              current-row-key="name" @current-change="handleTypeCurrentChange">
      <el-table-column align="center" prop="qoname" label="问题类型名称">
      </el-table-column>
      <el-table-column align="center"  label="问题类型图标">
        <template  slot-scope="scope">
          <img :src="scope.row.qoicon" class="m-qaicon-img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editType(scope.row)">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <h3 class="m-part-title m-flex-start title-before-table">
      <span class="m-part-title-icon"></span>
      <span>{{currentRowName}}</span>
    </h3>
    <div class="m-search-box">
      <div>
        <span class="m-btn active" @click="dialogQaVisible = true;question_form.quid =''">
          <span class="m-btn-icon m-add"></span>
          <span>新增</span>
        </span>
      </div>
    </div>
    <el-table :data="orderQa">
      <el-table-column align="center" prop="ququest" label="问题"></el-table-column>
      <el-table-column align="center" prop="answer" label="答案"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editQuestion(scope.row)">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="问题类型" :visible.sync="dialogQaTypeVisible">
      <el-form label-width="100px">
        <el-form-item label="问题类型:" >
          <el-input  v-model="type_form.qoname"></el-input>
        </el-form-item>
        <el-form-item label="问题图标:" >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="imgUploadAbo"
            :on-success="handleAvatarSuccess"
           >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <img v-else-if="type_form.qoicon" :src="type_form.qoicon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQaTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="typeSure">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="currentRowName" :visible.sync="dialogQaVisible" label-width="100px">
      <el-form label-width="120px">
        <el-form-item label="问题:" >
          <el-input v-model="question_form.quest"></el-input>
        </el-form-item>
        <el-form-item label="回答:">
          <el-input type="textarea" v-model="question_form.answer"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQaVisible = false">取 消</el-button>
        <el-button type="primary" @click="questionSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import api from '../../api/api'
  export default {
    name: "index",

    data() {
      return {
        currentRowName: '',
        type_form:{
          qoname:'',
          qoicon:''
        },
        question_form:{
          quest:'',
          answer:'',
          qoid:''
        },
        orderType: [
          {
            name: '订单问题',
          }, {
            name: '积分问题',
          },
        ],
        dialogQaTypeVisible: false,
        select_type:null,
        orderQa: [
          {}, {}
        ],
        dialogQaVisible: false,
        imageUrl:''
      }
    },

    methods: {
      //点击新增
      addClick(v){
        this[v] = true;
        switch (v){
          case 'dialogQaTypeVisible':
            this.type_form={
              qoname:'',
              qoicon:''
            };
            break;
          case 'dialogQaVisible':
            this.question_form.quest = '';
            this.question_form.answer = '';
        }

      },
      handleTypeCurrentChange(currentRow, oldCurrentRow) {
        this.currentRowName = currentRow.qoname;
        this.orderQa = currentRow.question;
        this.question_form.qoid = currentRow.qoid;
        this.select_type = currentRow;
      },
      editType(item){
        this.dialogQaTypeVisible = true;
        this.type_form = item;
        this.handleTypeCurrentChange(item);
      },
      editQuestion(item){
        this.dialogQaVisible = true;
        this.question_form.answer = item.answer;
        this.question_form.quest = item.ququest;
        this.question_form.quid = item.quid;
      },
    //  获取问题
      getQuestion(){
        axios.get(api.get_all_qa,{
          params:{
            token:localStorage.getItem('token')
          }
        }).then(res =>{
            if(res.data.status == 200){
              this.orderType = [].concat(res.data.data);
              let a = 0;
              if(this.select_type){
                for(let i=0;i<this.orderType.length;i++){
                  if(this.orderType[i].qoid == this.select_type.qoid){
                    a = i;
                  }
                }
              }

              this.$refs.tableQaType.setCurrentRow(this.orderType[a]);
              this.currentRowName = this.orderType[a].qoname;
              this.orderQa = this.orderType[a].question;
              this.select_type = this.orderType[a];
              this.question_form.qoid = this.orderType[a].qoid;
            }
        })
      },
      handleAvatarSuccess(res, file) {
        this.type_form.qoicon = URL.createObjectURL(file.raw);
      },
      /*商品详情大图上传重定向*/
      imgUploadAbo(params){
        let form = new FormData();
        form.append("file", params.file);
        let reader = new FileReader();
        let that = this;
        axios.post(api.upload_file,form).then(res => {
          if(res.data.status == 200){
            that.type_form.qoicon = res.data.data;
            reader.readAsDataURL(params.file);
            reader.onload = function(e) {
              that.imageUrl = this.result;
            }
          }else{
            this.$message({
              type: 'error',
              message: '服务器请求失败，请稍后再试 '
            });
          }
        },error =>{
          this.$message({
            type: 'error',
            message: '服务器请求失败，请稍后再试 '
          });
        })
      },
      // /上传问题类型
      typeSure(){
        this.dialogQaTypeVisible = false;
        axios.post(api.add_questoutline+'?token='+localStorage.getItem('token'),this.type_form).then(res => {
            if(res.data.status == 200){
              this.$notify.success(res.data.message);
              this.getQuestion();
            }else{
              this.$message({
                type: 'error',
                message: '服务器请求失败，请稍后再试 '
              });
            }
        })
      },
    //  上传问题
      questionSure(){
        this.dialogQaVisible = false;
        axios.post(api.add_questanswer+'?token='+localStorage.getItem('token'),this.question_form).then(res => {
          if(res.data.status == 200){
            this.$notify.success(res.data.message);
            this.getQuestion();
          }else{
            this.$message({
              type: 'error',
              message: '服务器请求失败，请稍后再试 '
            });
          }
        })
      }
    },

    mounted() {
      this.getQuestion();
    },

    created() {

    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/index";

  .container {
    .title-before-table {
      margin-top: .4rem;
      margin-bottom: .4rem;
    }
    .m-qaicon-img{
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
    }
    .dialog-footer{
      .el-button{
        padding: .1rem .2rem ;
      }
    }
  }
</style>
