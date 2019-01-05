<template>
  <div class="container">
    <block-title title="问题类型"></block-title>
    <el-button type="primary" class="add-item-btn" icon="el-icon-plus" @click="addClick('dialogQaTypeVisible')">新增问题类型</el-button>
    <el-table ref="tableQaType" :data="orderType" row-key="qoname" :highlight-current-row="true"
              current-row-key="name" @current-change="handleTypeCurrentChange">
      <el-table-column align="center"  label="问题类型图标" width="200">
        <template  slot-scope="scope">
          <img :src="scope.row.qoicon" class="m-qaicon-img">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="qoname" label="问题类型名称" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleTypeCurrentChange(scope.row)">查看</el-button>
          <el-button type="text" class="warning-text" @click="editType(scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text" @click="deleteType(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <block-title :title="currentRowName"></block-title>
    <el-button type="primary" class="add-item-btn" icon="el-icon-plus" @click="addClick('dialogQaVisible')">新增问题</el-button>
    <el-table :data="orderQa">
      <el-table-column align="center" prop="ququest" label="问题"></el-table-column>
      <el-table-column align="center" prop="answer" label="答案" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editQuestion(scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text" @click="deleteQuestion(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="问题类型" :visible.sync="dialogQaTypeVisible" :close-on-click-modal="false">
      <el-form label-width="100px">
        <el-form-item label="问题图标：" >
          <!--<el-upload
            class="avatar-uploader-icon question-icon"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="imgUploadAbo"
            :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <img v-else-if="type_form.qoicon" :src="type_form.qoicon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon question-icon"></i>
          </el-upload>-->

          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeImgUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <img v-else-if="type_form.qoicon" :src="type_form.qoicon" class="avatar question-img">
            <i v-else class="el-icon-plus avatar-uploader-icon question-img"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="问题类型：" >
          <el-input  v-model="type_form.qoname"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQaTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="typeSure">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="currentRowName" :visible.sync="dialogQaVisible" label-width="100px" :close-on-click-modal="false">
      <el-form label-width="120px">
        <el-form-item label="问题:" >
          <el-input v-model="question_form.quest"></el-input>
        </el-form-item>
        <el-form-item label="回答:">
          <el-input type="textarea" v-model="question_form.answer"
                    :autosize="{ minRows: 4, maxRows: 6}"></el-input>
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
  import TableCellImg from "src/components/TableCellImg";
  import { getStore } from "src/utils/index";

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
    computed: {
      // 上传图片
      uploadUrl() {
        return this.$api.upload_file + getStore('token') + '&type=index'
      }
    },
    mounted() {
      this.getQuestion();
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
            this.imageUrl = '';
            break;
          case 'dialogQaVisible':
            this.question_form.quest = '';
            this.question_form.answer = '';
            this.question_form.quid = '';
        }

      },
      handleTypeCurrentChange(currentRow, oldCurrentRow) {
        this.currentRowName = currentRow.qoname;
        this.orderQa = currentRow.question;
        this.question_form.qoid = currentRow.qoid;
        this.select_type = currentRow;
      },
      //编辑问题类型
      editType(item){
        this.dialogQaTypeVisible = true;
        this.type_form = item;
        this.handleTypeCurrentChange(item);
      },
      //编辑问题
      editQuestion(item){
        this.dialogQaVisible = true;
        this.question_form.answer = item.answer;
        this.question_form.quest = item.ququest;
        this.question_form.quid = item.quid;
      },
      //  获取问题
      getQuestion(){
        axios.get(api.get_all_qa, {
          noLoading: true,
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
      // 主图上传
      handleAvatarSuccess(res, file) {
        this.type_form.qoicon = res.data;
        // this.type_form.qoicon = URL.createObjectURL(file.raw);
      },
      // 上传前限制小于15M
      beforeImgUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;
        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }
        return isLt15M;
      },
      /*/!*商品详情大图上传重定向*!/
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
      },*/
      // /上传问题类型
      typeSure(){
        if(this.type_form.qoname == ''){
          this.$message({
            type: 'error',
            message: '请填写问题类型名称 '
          });
          return false;
        }
        if(this.type_form.qoicon == ''){
          this.$message({
            type: 'error',
            message: '请上传问题类型图标 '
          });
          return false;
        }
        axios.post(api.add_questoutline+'?token='+localStorage.getItem('token'),this.type_form).then(res => {
          if(res.data.status == 200){
            this.dialogQaTypeVisible = false;
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
      },
      //删除问题类型
      deleteType(item){
        let params = [];
        params.push(item.qoid);
        let that = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(api.delete_questoutline +'?token='+localStorage.getItem('token'),{
            qolist:params
          }).then(res => {
            if(res.data.status == 200){
              that.getQuestion();
              that.$notify.success(res.data.message)
            }else{
              that.$message({
                type: 'error',
                message: '服务器请求失败，请稍后再试 '
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //删除问题类型
      deleteQuestion(item){
        let params = [];
        params.push(item.quid);
        let that = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(api.delete_question +'?token='+localStorage.getItem('token'),{
            qulist:params
          }).then(res => {
            if(res.data.status == 200){
              that.getQuestion();
              that.$notify.success(res.data.message)
            }else{
              that.$message({
                type: 'error',
                message: '服务器请求失败，请稍后再试 '
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../styles/myIndex";

  .container {
    .question-icon {
      width: 80px;
      height: 80px;
      line-height: 80px;
    }
    .add-item-btn {
      float: right;
      margin: -50px 0 10px 0;
    }
    .m-qaicon-img{
      display: inline-block;
      width: 50px;
      height: 50px;
    }
    .question-img {
      width: 80px;
      height: 80px;
      line-height: 80px;
    }
  }
</style>
