<template>
  <div class="container">
    <!--工具栏-->
    <section class="tool-bar space-between">
      <el-form :inline="true">
        <el-form-item label="分类名">
          <el-input></el-input>
        </el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form>

      <el-button type="primary" icon="el-icon-plus" @click="doAdd">新增</el-button>
    </section>
    <!--三级分类树表-->
    <tree-table :data="data" :columns="columns" v-loading="loading" :eval-func="func" :expand-all="expandAll"
                border>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.pcpic" :key="scope.row.pcpic"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="顶部图片" align="center">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.pctoppic" :key="scope.row.pctoppic"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="doEdit(scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text" @click="doRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>

    <!--编辑dialog-->
    <el-dialog v-el-drag-dialog  :visible.sync="dialogVisible" top="5vh" title="分类编辑">
      <el-form :model="categroyForm" :rules="rules" ref="categroyForm" size="medium" label-width="120px">
        <el-form-item label="所属分类">
          <el-cascader :options="options" :props="cascaderProps" :clearable="true" :change-on-select="true"
                       v-model="selectParentPcId" placeholder="添加一级分类时为空">
          </el-cascader>
        </el-form-item>
        <el-form-item label="分类名" prop="pcname">
          <el-input v-model="categroyForm.pcname"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="pcdesc">
          <el-input v-model="categroyForm.pcdesc"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="pcpic">
          <el-upload
            class="avatar-uploader"
            :action="$api.upload_file"
            :show-file-list="false"
            accept="image/*"
            :on-success="handlePcpicSuccess"
            :before-upload="beforePicUpload"
          >
            <img v-if="categroyForm.pcpic" v-lazy="categroyForm.pcpic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

            <div slot="tip" class="el-upload__tip">
              建议为方形,大小不要超过15M,上传成功后会显示,上传大图请耐心等待
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="一级分类顶部图片" prop="pctoppic">
          <el-upload
            class="avatar-uploader"
            :action="$api.upload_file"
            :show-file-list="false"
            accept="image/*"
            :on-success="handlePctoppicSuccess"
            :before-upload="beforePicUpload"
          >
            <img v-if="categroyForm.pctoppic" v-lazy="categroyForm.pctoppic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader-icon-top"></i>

            <div slot="tip" class="el-upload__tip">
              建议宽高为750/265(2.83),大小不要超过15M,上传成功后会显示,上传大图请耐心等待
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doSave">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import treeTable from 'src/components/TreeTable'
  import treeToArray from './customEval'
  import elDragDialog from 'src/directive/el-dragDialog'
  import TableCellImg from "src/components/TableCellImg";
  import {beforePicUpload} from "src/utils/validate";


  export default {
    name: 'ProductCategory',

    components: {
      treeTable,
      TableCellImg
    },

    directives: {elDragDialog},

    data() {
      return {
        func: treeToArray,
        loading: false,
        expandAll: false,
        data: {},
        columns: [
          {
            text: '分类名',
            value: 'pcname',
            width: 200
          },
        ],
        // args: [null, null, 'timeLine'],

        dialogVisible: false,
        selectParentPcId: [],
        categroyForm: {
          parentpcid: [],
          pcname: '',
          pcdesc: '',
          pcpic: '',
          pctoppic: ''
        },
        rules: {
          parentpcid: [
            // {required: true, message: '请输入分类名', trigger: 'blur'}
          ],
          pcname: [
            {required: true, message: '分类名必填', trigger: 'blur'}
          ],

          pcdesc: [],
          pcpic: [
            {required: true, message: '图片必传', trigger: 'blur'}
          ],
          pctoppic: [
            // {}
          ],
        },

        //  商品分类选项
        options: [],
        cascaderProps: {
          value: 'pcid',
          label: 'pcname',
          children: 'subs',
        },

      }
    },
    watch: {
      selectParentPcId(val) {
        if (val.length) {
          this.categroyForm.parentpcid = val[val.length - 1];
        }
      }
    },
    methods: {
      setCategory() {
        this.loading = true;
        this.$http.get(this.$api.category_list, {
          noLoading: true,
          params: {
            up: '',
            deep: 2
          }
        }).then(
          res => {
            this.loading = false;

            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              for (let i = 0; i < data.length; i++) {
                data[i].id = data[i].pcid;
                data[i].children = data[i].subs;

                if (data[i].subs) {
                  for (let j = 0; j < data[i].subs.length; j++) {
                    data[i].subs[j].id = data[i].subs[j].pcid;
                    data[i].subs[j].children = data[i].subs[j].subs;

                    if (data[i].subs[j].subs) {
                      for (let k = 0; k < data[i].subs[j].subs.length; k++) {
                        data[i].subs[j].subs[k].id = data[i].subs[j].subs[k].pcid;
                        data[i].subs[j].subs[k].children = data[i].subs[j].subs[k].subs;
                      }
                    }
                  }
                }
              }

              this.data = data;
            }
          }
        )
      },

      setDialogCategory() {
        this.$http.get(this.$api.category_list, {
          params: {
            up: '',
            deep: 1
          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.options = data;
            }
          });
      },
      doAdd() {
        this.dialogVisible = true;
        this.setDialogCategory();
      },
      doEdit() {
        console.log('doEdit');
      },

      doSave(){
          this.$refs.categroyForm.validate(
            valid => {
              if(valid){

              }
            }
          )
      },

      //  分类主图上传
      handlePcpicSuccess(res, file) {
        this.categroyForm.pcpic = res.data;
      },
      beforePicUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;

        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }

        return isLt15M;
      },

      handlePctoppicSuccess(res, file) {
        this.categroyForm.pctoppic = res.data;
      },

      doRemove() {
        console.log('doRemove');

      },
    },

    created() {
      this.setCategory();
    }
  }
</script>


<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .avatar-uploader-icon-top{
      width: 447.14px;
    }
  }
</style>
