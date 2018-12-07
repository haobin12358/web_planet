<template>
    <div  class="m-addProduct">
      <h3 class="m-part-title">
        <span class="m-part-title-icon"></span>
        <span>发布商品</span>
      </h3>
      <div class="m-addProduct-step">
        <span >1.选择商品分类</span>
        <span class="active">2.编辑基本信息</span>
        <span>3.编辑商品详情</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="1.3rem" label-position="right" class="demo-ruleForm">
        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>基本信息</span>
        </h3>
        <el-form-item label="商品名称：" prop="prtitle" required>
          <el-input v-model="form.prtitle" class="m-input-m" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="添加描述：" prop="prdesc" required>
          <el-input v-model="form.prdesc" class="m-input-m" placeholder="请输入内容"></el-input>
          <p class="m-alert-text">建议描述文字在36字以内</p>
        </el-form-item>
        <el-form-item label="商品图片：" prop="prmainpic"  required>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="1"
            :http-request="imgUploadAbo"
            :on-success="handleAvatarSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <span class="m-upload-img"></span>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" v-if="imageUrl" :src="imageUrl" >
            <img width="100%" v-else-if="form.prmainpic" :src="form.prmainpic" >
          </el-dialog>
          <p class="m-alert-text">建议尺寸：700*700像素,最多上传1张商品图片</p>

        </el-form-item>
        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>商品价格/库存</span>
        </h3>
        <el-form-item label="商品规格：" required>
          <div class="m-different-price-box" >
            <div class="m-search-box">
              <div>
                  <el-tag
                    :key="tag"
                    v-for="tag in form.prattribute"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)" style="margin-right: 0.1rem;">
                    {{tag}}
                  </el-tag>
                  <el-input
                    class="m-input-xs"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+添加商品规格名称</el-button>
              </div>
              <div>
            <span class="m-btn active" @click="addOne">
              <span class="m-btn-icon m-add"></span>
              <span>添加商品属性</span>
            </span>
              </div>
            </div>
            <el-table
              :data="form.skus"
              :fit="true"
              style="width: 100%">
              <el-table-column
                label="图片" width="300">
                <template slot-scope="scope">
                  <!--<el-upload-->
                  <!--class="avatar-uploader"-->
                  <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                  <!--:show-file-list="false"-->
                  <!--:http-request="imgUploadAbo"-->
                  <!--:on-success="handleAvatarSuccess"-->
                  <!--&gt;-->
                  <!--<span class="m-upload-img"></span>-->
                  <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                  <!--<img v-else-if="scope.row.skupic" :src="scope.row.skupic" class="avatar">-->
                  <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                  <!--</el-upload>-->
                  <div class="m-up-img-box">
                    <div class="inputbg m-img-xl el-upload-list--picture-card" v-if="scope.row.skupic">
                      <img :src="scope.row.skupic" style="width: 1.5rem;height:1.5rem;"/>
                      <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="CardPreview(scope.$index)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span class="el-upload-list__item-delete" @click="imgRemove(scope.$index)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                    </div>
                    <div class="inputbg m-img-xl"><span>+添加图片</span><input type="file" :id="scope.$index" accept="image/*" @change="imgUploadDetail($event,scope.$index)"></div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="价格">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.skuprice" class="m-input-xxs"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="库存">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.skustock" class="m-input-xxs"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                :label="item" v-for="(item,index) in form.prattribute" :key="index">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.skuattritedetail[index]" class="m-input-xxs"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <span class="m-table-link" @click="deleteOne(scope.$index)">删除</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="m-table-btn" v-if="form.skus.length>1">
              <el-popover
                placement="right"
                width="400"
                trigger="click">
                <div class="m-drag-box">
                  <p>
                    <span class="m-label">规  格：</span>
                    <span v-for="(item,index) in form.prattribute" :key="index" class="el-tag" style="margin-right: 0.1rem;" @click="skuSelect(index)">{{item}}</span>
                  </p>
                  <p>
                    <span class="m-label">规格属性：</span>
                    <span class="m-alert">拖动可改变规格顺序</span>
                  </p>
                  <div class="m-drag">
                    <div
                      class="drag-item"
                      v-for="(item,index) in sku_list[sku_index]" v-dragging="{ item: item, list: sku_list[sku_index], group: 'color' }"
                      :key="item"
                    >{{item}}</div>
                  </div>

                </div>

                <!--<el-button slot="reference">click 激活</el-button>-->
                <span class="m-btn" slot="reference" @click="sortChange">规格排序</span>
              </el-popover>

            </div>

          </div>
        </el-form-item>

        <el-form-item label="价格：" required prop="prprice">
          <el-input v-model="form.prprice" class="m-input-s" placeholder="￥"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="商品库存：" >
          <el-input v-model="form.prstocks" class="m-input-s" placeholder=""></el-input>
          <span>件</span>
        </el-form-item>

        <!--<h3 class="m-form-part-title">-->
          <!--<span class="m-part-title-icon"></span>-->
          <!--<span>其它</span>-->
        <!--</h3>-->
        <!--<el-form-item label="上架时间：" required>-->
          <!--<p>-->
            <!--<el-radio v-model="radio" label="1">立即上架售卖</el-radio>-->
          <!--</p>-->
          <!--<p>-->
            <!--<el-radio v-model="radio" label="2">自定义上架时间</el-radio>-->
            <!--<el-date-picker-->
              <!--v-model="value8"-->
              <!--type="date"-->
              <!--placeholder="选择日期">-->
            <!--</el-date-picker>-->
          <!--</p>-->
          <!--<p  class="m-alert-text">需等待管理员审批完成，上架时间请选择24小时以后</p>-->
        <!--</el-form-item>-->
      </el-form>

      <div class="m-form-btn-box">
        <span class="m-form-btn active" @click="changeRoute('-1')">上一步</span>
        <span class="m-form-btn active" @click="changeRoute('/product/addProductThree')">下一步</span>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import api from '../../api/api'
    export default {
        data() {
            return {
              inputVisible: false,
              inputValue: '',
              form:{
                prtitle:'',
                prdesc:'',
                prprice:'',
                prstocks:'',
                prmainpic:'',
                prattribute:[],
                pskuvalue:[],
                skus: [
                  {
                    skupic: "",
                    skuprice: 0,
                    skustock: 0,
                    skuattritedetail: ['']
                  }
                ]
              },
              rules:{
                prtitle:[
                  { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                prdesc:[
                  { required: true, message: '请输入商品描述', trigger: 'blur' }
                ],
                prmainpic:[
                  { required: true, message: '请输入商品图片', trigger: 'blur' }
                ],
                prprice:[
                  { required: true, message: '请输入商品价格', trigger: 'blur' }
                ],
              },
              allPrice:'1',
              imageUrl:'',
              dialogVisible:false,
              sku_list:[],
              sku_index:0
            }
        },
        components: {},
        mounted(){
          this.$dragging.$on('dragged', ({ value }) => {
            console.log(value.item)
            console.log(value.list)
            console.log(value.otherData)
          })
          this.$dragging.$on('dragend', () => {

          })
        },
        methods: {
          //
          sortChange(){
            let arr = [];
            for(let i=0;i<this.form.skus.length;i++){
              for(let j=0;j<this.form.skus[i].skuattritedetail.length;j++){
                if(arr[j]){
                  arr[j].push(this.form.skus[i].skuattritedetail[j]);
                }else{
                  arr[j] = [];
                  arr[j].push(this.form.skus[i].skuattritedetail[j]);
                }
              }
            }
            //去重
            for(let a=0;a<arr.length;a++){
             let x = new Set(arr[a]);
              arr[a] = [...x];
            }
            this.sku_list = [].concat(arr);
            // this.sku_select = [].concat(this.sku_list[0]);
            this.sku_index = 0;
          },
          //
          skuSelect(index){
            this.sku_index = index
            // this.sku_select = [].concat(this.sku_list[index]);
          },
          //删除规格名称
          handleClose(tag) {
            this.form.prattribute.splice(this.form.prattribute.indexOf(tag), 1);
          },
          //显示规格输入框
          showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
          },
          //规格名称确定
          handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
              this.form.prattribute.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
          },

          handleAvatarSuccess(res, file) {
            this.form.prmainpic = URL.createObjectURL(file.raw);
          },
          /*商品详情大图上传重定向*/
          imgUploadAbo(params){
            if(this.form.prmainpic){
              this.$message({
                type:'warning',
                message:'只能上传一张照片'
              });
              return false;
            }
            let form = new FormData();
            form.append("file", params.file);
            let reader = new FileReader();
            let that = this;
            axios.post(api.upload_file + '?token=' +localStorage.getItem('token'),form).then(res => {
              if(res.data.status == 200){
                that.form.prmainpic= res.data.data;
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
          handleRemove(file, fileList) {
            this.form.prmainpic = '';
          },
          handlePictureCardPreview(file) {
            this.imageUrl = file.url;
            this.dialogVisible = true;
          },

          changeRoute(v){
            if(v == '-1'){
              this.$router.go(-1)
            }else{
              let that = this;

              this.$refs['form'].validate((valid) => {
                if (valid) {
                  for(let i = 0;i<that.form.prattribute.length;i++){
                    if(that.form.prattribute[i] == ''){
                      this.$message({
                        type:'warning',
                        duration:800,
                        message:'请先设置商品规格'
                      });
                      return false;
                    }
                  }
                  for(let i = 0;i<that.form.skus.length;i++){
                    for(let key in that.form.skus[i]){
                      if(!that.form.skus[i][key]){
                        this.$message({
                          type:'warning',
                          duration:800,
                          message:'请先设置商品具体属性'
                        });
                        return false;
                      }
                    }
                  }
                  that.form.pskuvalue = [].concat(that.sku_list);
                  console.log(that.form,'adadasda')
                  // this.$router.push({path:v,query:{form:Object.assign(that.form,that.$route.query.form)}})
                }
              })

            }
          },
          //添加一个商品属性
          addOne(){
            this.form.skus.push({
              skupic: "",
              skuprice: 0,
              skustock: 0,
              skuattritedetail: new Array(this.form.prattribute.length)
            });
          },
          //删除一个商品属性
          deleteOne(index){
            this.form.skus.splice(index,1)
          },
          /*商品样式图片删除*/
          imgRemove(index){
            this.form.skus[index].skupic = '';
            var file = document.getElementById(index);
            file.value ='';
          },
          /*商品样式图片大图显示*/
          CardPreview(index){
            this.imageUrl =  this.form.skus[index].skupic;
            this.dialogVisible = true;
          },
          /*商品样式图片上传重定向*/
          imgUploadDetail(event,index){
            if(this.form.skus[index].skupic.length > 0){
              this.$message({
                type:'warning',
                message:'一个类型只能上传一张照片'
              });
              return false;
            }
            let form = new FormData();
            form.append("file", event.target.files[0]);
            axios.post(api.upload_file + '?token=' +localStorage.getItem('token'),form).then(res => {
              if(res.data.status == 200){
                this.form.skus[index].skupic = res.data.data;
                var file = document.getElementById(index);
                file.value ='';
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
        },
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .m-addProduct{
    .m-addProduct-step{
      width: 100%;
      padding: 0.1rem 0;
      display: flex;
      flex-flow: row;
      justify-content: space-around;
      align-items: center;
      border: 1px solid #97ADCB;
      margin: 0.25rem 0;
      font-size: 0.18rem;
      font-weight: bold;
      span.active{
        color: #CB7E88;
      }
    }
    .m-form-part-title{
      font-weight: bold;
      font-size: 0.18rem;
      margin-bottom: 0.2rem;
      .m-part-title-icon{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../common/images/icon-title-child.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: text-bottom;
        margin-right: 10px;
      }
    }
    .m-form-btn-box{
      margin-top: 1.6rem;
    }
    .m-inline-block{
      display: inline-block;
    }
    .m-search-box{
     padding-top: 0;
    }
    .m-different-price-box{
      padding: 0 0 0.2rem 0;
    }
    .el-upload-list--picture-card .el-upload-list__item-actions:hover {
      opacity: 1;
    }
    .m-up-img-box{
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: flex-start;
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
      margin-left: 10px;
      color: #97ADCB;
      border: 1px solid #eeeeee;
      background-color: #fbfdff;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      position: relative;
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      &.m-img-l{
        width: 1.1rem;
        height: 1.1rem;
        line-height: 1.1rem;
        input{
          width: 1.1rem;
          height: 1.1rem;
          line-height: 1.1rem;
        }
      }
    }
    .inputbg input{
      position: absolute;
      top: 0;
      left: 0;
      opacity:0;
      filter:alpha(opacity=0);
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      cursor: pointer;
    }

  }
</style>
