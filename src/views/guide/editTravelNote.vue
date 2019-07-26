<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <el-form :model="formData" :rules="rules" ref="formData" label-position="left"
                 label-width="140px">

          <el-form-item label="游记标题" prop="trtitle">
            <el-input v-model="formData.trtitle"></el-input>

          </el-form-item>
          <el-form-item label="游记内容" prop="trcontent">
            <div class="editor">
              <quill-editor ref="myTextEditor" @change="quillEditorChange($event)" :options="editorOption" v-model="formData.trcontent" :config="editorOption"></quill-editor>
            </div>

          </el-form-item>

          <el-form-item label="景区">
            <el-select
              v-model="formData.trlocation"
              filterable
              allow-create
              default-first-option
              clearable
              @change="createToc"
              placeholder="自行创建或选择已有景区">
              <el-option
                v-for="item in scenic_list"
                :key="item.sspid"
                :label="item.sspname"
                :value="item.sspname">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button  @click="saveDraft">保存草稿</el-button>
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
    name: "editDraft",
    data(){
      return{
        formData:{
          trlocation:'',
          trtitle:'',
          trcontent:'',
          trstatus:0,
          trtype:1,
          delete:false
        },
        options:[{value:0,label:0}],
        rules: {
          trtitle: [
            { required: true, message: '游记名称必填', trigger: 'blur' }
          ],
          trcontent: [
            { required: true, message: '游记内容必填', trigger: 'blur' }
          ]
        },
        scenic_list:[],
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
        return this.$api.upload_file + getStore('token') + '&type=travels'
      },
    },

    components: {quillEditor},
    mounted() {
      if(this.$route.query.id){
        this.getFormData(this.$route.query.id);;
      }

    },
    methods: {
      getScenic(){
        this.$http.get(this.$api.scenicspot_list, {
          noLoading: true,
          params: {

          },
        }).then(
          res => {
            this.loading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              //
              this.scenic_list = data;

            }
          }
        )
      },
      getFormData(id){
        this.$http.get(this.$api.get_travelrecord, {
          noLoading: true,
          params: {
            trid: id,
          },
        }).then(
          res => {
            this.loading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              //
              this.formData = res.data.data;

            }
          }
        )
      },
      postData(status){
        this.formData.trstatus = status;
        this.$http.post(this.$api.add_travelrecord, this.formData).then(res => {
          if (res.data.status == 200) {
            if(status == 0){
              this.$notify({
                title: '保存成功',
                message: '游记保存成功',
                type: 'success'
              });
              this.$router.push('/guide/travelNotes')
            }else if(status == 1){
              this.$notify({
                title: '发布成功',
                message: '您可在小程序-我的-主页中查看',
                type: 'success'
              });
              this.$router.push('/guide/travelNotes')
            }

          }
        });
      },
      //创建话题
      createToc(){
        let bool = false;
        for(let i in this.scenic_list){

          if(this.scenic_list[i].sspname == this.formData.trlocation){
            bool = true;
          }
        }
        if(bool){
          this.scenic_list.push({
            sspname:this.formData.trlocation,
            sspid:''
          });
        }





      },
      //立即发布
      submitDraft(){

          this.postData(1);

      },
      //保存
      saveDraft(){
        this.postData(0);
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
