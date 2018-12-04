<template>
    <div class="m-addProduct">
      <h3 class="m-part-title">
         <span class="m-part-title-icon"></span>
         <span>发布商品</span>
      </h3>
      <div class="m-addProduct-step">
        <span class="active">1.选择商品分类</span>
        <span>2.编辑基本信息</span>
        <span>3.编辑商品详情</span>
      </div>

      <el-form ref="form" :model="form" :rules="rules" label-width="1.3rem" label-position="left" class="demo-ruleForm">
        <el-form-item label="快速选择：">
          <el-select v-model="value8" class="m-input-m" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品类目" >
          <div class="m-category-content">
            <p>当前选择类目：<span class="m-category-select">
              <template v-for="(items,index) in select_category">
                <span>{{items.pcname}}</span>
                <span v-if="index <2"> > </span>
              </template>
            </span></p>
            <div id="m-scroll">
              <div class="m-one-category" v-for="(items,index) in category_list">
                <div class="m-category-search-box">
                  <span class="icon icon-search"></span>
                  <input type="text"  placeholder=""  >
                </div>
                <div class="m-classify">
                  <ul>
                    <template v-for="(item,i) in items">
                      <li @click="getCategory(index,item.pcid,item)">
                        <span>{{item.pcname}}</span>
                        <i class="el-icon-arrow-right" v-if="index <2"></i>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="类目管理：" ></el-form-item>
        <div class="m-category-table">
          <div class="m-category-title-th">
            <p class="m-category-title">一级类目</p>
            <p class="m-category-title">二级类目</p>
            <p class="m-category-title">三级类目</p>
          </div>
          <div class="m-category-box">
             <div class="m-category-tr">
               <span class="m-add-category-text m-first">+新增一级类目</span>
               <div class="m-category-td">
                  <span>服装鞋包</span>
               </div>
               <div class="m-category-td m-colspan">
                 <div class="m-category-td-tr">
                   <div class="m-category-td-th-td">
                     <span>服装鞋包</span>
                     <span class="m-add-category-text">+新增一级类目</span>
                   </div>
                   <div class="m-category-td-th-td">
                     <span>服装鞋包</span>
                     <span class="m-add-category-text">+新增一级类目</span>
                   </div>
                 </div>
                 <div class="m-category-td-tr">
                   <div class="m-category-td-th-td">
                     <span>服装鞋包</span>
                   </div>
                   <div class="m-category-td-th-td">
                     <span>服装鞋包</span>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
        <el-form-item label="品牌选择：" >
          <el-select v-model="value8" class="m-input-m" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="m-modal-text">
            <span class="m-add-text">+新增品牌</span>
            <!--<div class="m-absolute-modal" >-->
              <!--<p>新增品牌</p>-->
              <!--<div class="m-admin-input-box">-->
                <!--<el-input v-model="input" placeholder="请输入品牌名称" ></el-input>-->
                <!--<el-upload-->
                  <!--class="m-upload-s"-->
                  <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                  <!--list-type="picture-card"-->
                  <!--:on-preview="handlePictureCardPreview"-->
                  <!--:on-remove="handleRemove">-->
                  <!--<span class="m-upload-img"></span>-->
                <!--</el-upload>-->
                <!--<p class="m-alert-text">添加品牌logo图片，建议尺寸：200*200像素</p>-->
                <!--<el-dialog :visible.sync="dialogVisible">-->
                  <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                <!--</el-dialog>-->
              <!--</div>-->
              <!--<div class="m-modal-btn-box">-->
                <!--<span class="m-btn active">保存</span>-->
                <!--<span class="m-btn ">取消</span>-->
              <!--</div>-->
            <!--</div>-->
          </div>
        </el-form-item>
        <el-form-item label="场景选择：" >
          <el-select v-model="value8" class="m-input-m" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="m-modal-text">
            <span class="m-add-text">+新增场景</span>
            <div class="m-absolute-modal" >
              <p>新增场景</p>
              <div class="m-admin-input-box">
                <el-input v-model="input" placeholder="请输入场景名称" ></el-input>
                <el-upload
                  class="m-upload-s"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <span class="m-upload-img"></span>
                </el-upload>
                <p class="m-alert-text">添加品牌logo图片，建议尺寸：200*200像素</p>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </div>
              <div class="m-modal-btn-box">
                <span class="m-btn active">保存</span>
                <span class="m-btn ">取消</span>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="标签选择：" >
          <el-select v-model="value8" class="m-input-m" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="m-modal-text">
            <span class="m-add-text">+新增标签</span>
            <!--<div class="m-absolute-modal" >-->
              <!--<p>新增标签</p>-->
              <!--<div class="m-admin-input-box">-->
                <!--<el-input v-model="input" placeholder="请输入标签名称" ></el-input>-->
              <!--</div>-->
              <!--<div class="m-modal-btn-box">-->
                <!--<span class="m-btn active">保存</span>-->
                <!--<span class="m-btn ">取消</span>-->
              <!--</div>-->
            <!--</div>-->
          </div>
        </el-form-item>
      </el-form>
      <div class="m-form-btn-box">
        <span class="m-form-btn active" @click="changeRoute('/product/addProductTwo')">下一步</span>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import api from '../../api/api'
    export default {
        data() {
            return {
              form:{
                resource:'',
                date1:'',
                name:''
              },
              rules:{
                PRname:[
                  { required: true, message: '请输入商品名称', trigger: 'blur' }
                ]
              },
              //类目
              category_list:[],
              select_category:[],
              //品牌
              brand_list:[],
              show_brand:false,
              //场景
              scene_list:[],
              show_scene:false,
              //标签
              items_list:[],
              show_items:false,
              options: [
                {
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
              value8: '',
              tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }]
            }
        },
        components: {},
      mounted(){
          this.getCategory(-1);
      },
        methods: {
          changeRoute(v){
            this.$router.push(v)
          },
        //  获取类目
          getCategory(i,id,item){
            let _select = [].concat(this.select_category);
            _select[i] = item;
            this.select_category = [].concat(_select);

            if(i == 2){
              this.$notify({
                title: '警告',
                message: '这已经是最后一层了',
                type: 'warning'
              });
              return false;
            }

            axios.get(api.category_list,{
              params:{
                up:id || ''
              }
            }).then(res => {
              let arr = [].concat(this.category_list);
                if(res.data.status == 200){
                    arr[i+1] = res.data.data;
                    this.category_list = [].concat(arr);
                }
            })
          },
        //  获取品牌
          getBrand(){
            // axios.get(api.brand_list,)
          }
        },
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/index";
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
    .m-category-content{
      width: 10.2rem;
      height: 100%;
      overflow: hidden;
      font-size: 0.18rem;
      #m-scroll{
        margin-left: 0;
        -webkit-transition: margin-left 0.28s;
        transition: margin-left 0.28s;
        .flex-row(flex-start);
      }
      .m-category-select{
        font-size: 0.15rem;
        color: #999;
      }
      .m-one-category{
        width: 2.9rem;
        height: 90%;
        border: 1px solid @sidebarChildColor;
        background-color: #fff;
        text-align: center;
        padding: 0.1rem 0 0;
        margin-right: 0.1rem;
        .m-category-search-box{
          width: 2.9rem;
          height: 0.35rem;
          line-height: 0.27rem;
          font-size: 0.12rem;
          border-bottom: 1px solid @mainColor;
          position: relative;
          .icon-search{
            width: 0.18rem;
            height: 0.18rem;
            position: absolute;
            top: 0.05rem;
            left: 0.1rem;
            background: url("../../common/images/icon-search.png");
            background-size: 100% 100%;
          }
          input{
            border: none;
            height: 0.35rem;
            width: 2.4rem;
            padding-left: 0.4rem;
            &:focus{
              border: none;
              outline-offset: 0;
              outline-color:transparent;
            }
          }
        }
        .m-classify{
          height: 2.2rem;
          margin-top: 0.1rem;
          overflow-y: scroll;
          ul{
            li{
              .flex-row(space-between);
              padding: 0 0.1rem 0.1rem;
              color: @greyColor;
              cursor: pointer;
              &.active{
                color: @sidebarChildColor;
              }
              span{
                display: block;
                line-height: 0.2rem;
              }
            }
          }
        }
      }
    }
    .m-category-table{
      text-align: center;
      margin-bottom: 0.2rem;
      .m-category-title-th{
        .flex-row(flex-start);
        .m-category-title{
          height: 0.47rem;
          line-height: 0.47rem;
          background-color: #eee;
          width: 33%;
          border-right: 1px solid #eee;
        }
      }
      .m-category-box{
        .m-category-tr{
          border: 1px solid @borderColor;
          border-top: none;
          border-right: none;
          position: relative;
          .flex-row(flex-start);
          .m-add-category-text{
            position: absolute;
            bottom: 0.1rem;
            right: 0.1rem;
            color: @mainColor;
            &.m-first{
              right: 0;
              left: 26%;
              width: 1rem;
            }
          }
          .m-category-td{
            width: 33%;
            position: relative;
            &.m-colspan{
              width: 66%;
              border-right: 1px solid @borderColor;
              border-left: 1px solid @borderColor;
              .m-category-td-tr{
                width: 100%;
                .flex-row(flex-start);
                border-bottom: 1px solid @borderColor;
                &:last-child{
                  border-bottom: none;
                }
                .m-category-td-th-td{
                  width: 50%;
                  height: 0.9rem;
                  .flex-row(center);
                  position: relative;
                  border-left: 1px solid @borderColor;
                  &:first-child{
                    border-left: none;
                  }
                }
              }
            }
          }
        }
      }
    }
    .m-add-text{
      margin-left: 0.6rem;
    }
    .m-form-btn-box{
      margin-top: 1.6rem;
    }
  }
  .m-modal-text{
    display: inline-block;
    /*position: relative;*/
    .m-absolute-modal{
      position: absolute;
      background-color: #fff;
      top: 0;
      right: 0.5rem;
      width: 5rem;
      /*height: 3rem;*/
      box-shadow:0 3px 6px rgba(0,0,0,0.16);
      border-radius: 10px;
      z-index: 100;
      padding: 0.37rem 0.26rem 0.5rem 0.44rem;
      text-align: left;
      .m-admin-input-box{
        margin:0;
        .m-input-xs{
          width: 2rem;
          margin-right: 0.1rem;
          display: inline-block;
          margin-bottom: 0.2rem;
        }

      }

    }
  }
  /*滚动条样式*/
  .m-classify::-webkit-scrollbar {/*滚动条整体样式*/
    width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 5px;
  }
  .m-classify::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px @sidebarChildColor;
    background: @sidebarChildColor;
  }
  .m-classify::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px @scrollBgColor;
    border-radius: 10px;
    background:@scrollBgColor;
  }
</style>
