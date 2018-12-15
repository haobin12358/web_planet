<template>
  <div class="container">
    <!--工具栏-->
    <el-form :inline="true">
      <el-form-item label="分类名">
        <el-input></el-input>
      </el-form-item>

      <el-button type="primary">查询</el-button>
      <div class="separator">|</div>
      <el-button type="primary" icon="el-icon-plus" @click="doAdd">新增</el-button>
    </el-form>

    <!--三级分类树表-->
    <tree-table :data="data" :columns="columns" v-loading="loading" :eval-func="func" :expand-all="expandAll"
                border>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.pcpic" alt="" class="table-pic">
        </template>
      </el-table-column>
      <el-table-column label="顶部图片" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.pctoppic" :src="scope.row.pctoppic" alt="" class="table-pic">
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
    <el-dialog v-el-drag-dialog :visible.sync="dialogVisible" :modal="true" title="分类编辑">
      <el-form :model="categroyForm" :rules="rules" ref="pwdForm" label-width="120px">
        <el-form-item label="所属分类">
          <el-cascader :options="options" :props="cascaderProps" :clearable="true" :change-on-select="true"
                       v-model="categroyForm.parentpcid" placeholder="添加一级分类时为空" >
          </el-cascader>
        </el-form-item>
        <el-form-item label="分类名" prop="pcname">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="pcpic">
          <el-upload
            class="avatar-uploader"
            :action="$api.upload_file"
            :show-file-list="false"
            accept="image/*"
            :on-success="handlePcpicSuccess"
            :before-upload="beforePcpicUpload"
          >
            <img v-if="prPicUrl" v-lazy="prPicUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

            <div slot="tip" class="el-upload__tip">
              建议为方形,大小不要超过10M,上传成功后会显示,上传大图请耐心等待
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="顶部图片(一级)" prop="pctoppic" v-if="!categroyForm.parentpcid.length">
          <el-input type="password" class="m-input-pwd"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="pcdesc">
          <el-input v-model="categroyForm.pcdesc"></el-input>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
  import treeTable from 'src/components/TreeTable'
  import treeToArray from './customEval'
  import elDragDialog from 'src/directive/el-dragDialog'

  export default {
    name: 'ProductCategory',

    components: {treeTable},

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
        categroyForm: {
          parentpcid: [],
          pcname: '',
          pcdesc: '',
          pcpic: '',
          pctoppic: ''
        },
        rules: {
          pcname: [
            {required: true, message: '请输入分类名', trigger: 'blur'}
          ],
          pcpic: [
            {required: true, message: '请输入新密码', trigger: 'blur'}
          ],
          pctoppic: [
            {required: true, message: '请确认新密码', trigger: 'blur'}
          ],
          pcdesc: [],
        },

        //  商品分类选项
        options: [],
        cascaderProps: {
          value: 'pcid',
          label: 'pcname',
          children: 'subs',
        },

        //上传显示用
        prPicUrl: '',
        prTopPicUrl: '',
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

              console.log(data);
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

      //  分类主图上传
      handlePcpicSuccess(res, file) {
        this.categroyForm.Pcpic = res.data;
        this.prPicUrl = URL.createObjectURL(file.raw);
      },
      beforePcpicUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;

        if (!isLt15M) {
          this.$message.error('上传商品图片大小不能超过 15MB!');
        }

        if (isLt15M) {
          //  替换之前上传的
          this.prPicUrl = '';
          //  删除之前上传的
          // this.clearUploadedImg();
        }

        return isLt15M;
      },

      doRemove() {
        console.log('doRemove');

      },
    },

    created() {
      this.setCategory();
      // console.log(this.$api.upload_file);
    }
  }
</script>


<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {

  }
</style>
