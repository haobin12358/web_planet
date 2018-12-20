<template>
  <div class="container">
    <block-title title="场景"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="场景名">
          <el-input v-model.trim="searchForm.kw" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
          <el-button icon="el-icon-refresh" @click="doReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="doAddScene">新增</el-button>
    </section>
    <!--场景table-->
    <el-table v-loading="sceneLoading" :data="sceneTableData">
      <el-table-column label="场景图片" align="center" prop="pspic" width="120">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.pspic" :key="scope.row.pspic"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="场景名称" align="center" prop="psname"></el-table-column>
      <el-table-column label="排序" align="center" sortable prop="pssort" >
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.pssort" @keyup.native.enter="changeSceneSort(scope.row)" style="width: 180px"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text"  @click="doEditScene">编辑</el-button>
          <el-button type="text" class="danger-text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--场景编辑dialog-->
    <el-dialog :visible.sync="sceneDlgVisible" width="700px" top="10vh" :title="sceneForm.pbid ? '场景编辑': '场景新增'">
      <el-form :model="sceneForm" :rules="sceneRules" ref="sceneForm" size="medium" label-width="120px">
        <el-form-item label="场景名称" prop="psname">
          <el-input v-model.trim="sceneForm.psname"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="pspic">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handlePsPicSuccess"
            :before-upload="beforePicUpload"
          >
            <img v-if="sceneForm.pspic" v-lazy="sceneForm.pspic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

            <div slot="tip" class="el-upload__tip">
              建议为方形,大小不要超过15M,上传成功后会显示,上传大图请耐心等待
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" prop="pssort">
          <el-input v-model.number="sceneForm.pssort"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sceneDlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSaveScene">确 定</el-button>
      </span>
    </el-dialog>

    <block-title title="商品标签"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="标签名">
          <el-input v-model.trim="itemSearchForm.kw" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="doItemSearch">查询</el-button>
          <el-button icon="el-icon-refresh" @click="doItemReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-button type="primary" icon="el-icon-plus" @click="doAddItem">新增</el-button>
    </section>
    <!--商品标签dialog-->
    <el-table v-loading="itemLoading" :data="itemTableData" height="300" size="mini">
      <el-table-column label="标签名" align="center" prop="itname" width="300"></el-table-column>
      <el-table-column label="描述" align="center" prop="itdesc" show-overflow-tooltip></el-table-column>
      <el-table-column label="所属场景" align="center" width="300">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.prscene" :key="item.psid" style="margin: 0 10px 2px 0;">{{item.psname}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="doEditItem(scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text" @click="doRemoveItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--商品标签编辑dialog-->
    <el-dialog :visible.sync="itemDlgVisible" width="700px"  :title="itemForm.itid ? '标签编辑': '标签新增'">
      <el-form :model="itemForm" :rules="itemRules" ref="itemForm" size="medium" label-width="120px">
        <el-form-item label="标签名" prop="itname">
          <el-input v-model.trim="itemForm.itname"></el-input>
        </el-form-item>
        <el-form-item label="关联场景" prop="psid">
          <el-select
            v-model="itemForm.psid"
            multiple
            filterable
            default-first-option
            placeholder="可多选" style="width: 500px">
            <el-option
              v-for="item in psOptions"
              :key="item.psid"
              :label="item.psname"
              :value="item.psid">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标签描述" prop="itdesc">
          <el-input v-model.trim="itemForm.itdesc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="itemDlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSaveItem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg";
  import {getStore, setStore} from "src/utils/index";

  const natureNumberReg = /^(\d*)$/;   //  自然数
  export default {
    name: 'ProductTag',

    components: {
      TableCellImg
    },

    data() {
      return {
        searchForm:{
          kw: '',
        },
        sceneLoading: false,
        sceneTableData: [],

        sceneDlgVisible: false,
        sceneForm: {
          psid: '',
          psname: '',
          pspic: '',
          pssort: 1,
        },
        sceneRules: {
          psname: [
            {required: true, message: '场景名称必填', trigger: 'blur'}
          ],
          pspic: [
            {required: true, message: '图片必传', trigger: 'change'}
          ],
          pssort: [
            {required: true, message: '排序必填', trigger: 'blur'},
            {pattern: natureNumberReg, message: '请输入合理的数字(>=0)', trigger: 'blur'},
          ],
        },

        itemSearchForm: {
          kw: '',
        },

        itemLoading: false,
        itemTableData: [],

        itemDlgVisible: false,
        itemForm: {
          itid: '',
          itname: "",
          psid: [],
          itdesc: "",
        },
        itemRules: {
          itname: [
            {required: true, message: '标签名字必填', trigger: 'blur'}
          ],
          psid: [
            {required: true, message: '所属场景必选', trigger: 'change'}
          ],
          itdesc: [
          ],
        },
        psOptions: [],
      }
    },

    computed: {
      uploadUrl() {
        return this.$api.upload_file + getStore('token')
      },
    },

    methods: {
      doItemSearch(){
        this.setItemList();
      },
      doItemReset(){
        this.itemSearchForm = { kw: ''};
        this.doItemSearch();
      },

      setItemList() {
        this.itemLoading = true;
        this.$http.get(this.$api.items_list, {
          noLoading: true,
          params: {
            ittype: 0,
            kw: this.itemSearchForm.kw,
          }
        }).then(
          res => {
            this.itemLoading = false;

            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.itemTableData = data
            }
          }
        )
      },

      resetItemForm(){
        this.itemForm = {
          itid:'',
          psid: [],
          itname: "",
          itdesc: "",
        };
        this.$http.get(this.$api.scene_list, {
          params: {

          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.psOptions = data;
            }
          }
        )

      },
      doAddItem() {
        this.resetItemForm();
        this.itemDlgVisible = true;
      },
      doEditItem(row) {
        this.resetItemForm();
        this.itemDlgVisible = true;
        this.itemForm = {
          itid: row.itid,
          itname: row.itname,
          itdesc: row.itdesc,
          psid: [],
        };
        this.itemForm.psid  = row.prscene.map(item => item.psid);
      },
      doSaveItem(){
        this.$refs.itemForm.validate(
          valid => {
            if (valid) {
              let type = this.itemForm.itid ? '标签修改' : '标签新增';

              this.itemForm.ittype = 0;
              if (this.itemForm.itid) {
                this.$http.post(this.$api.update_items, this.itemForm).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                        data = res.data.data;

                      this.$notify({
                        title: `${type}成功`,
                        message: `品牌名:${this.itemForm.itname}`,
                        type: 'success'
                      });
                      this.itemDlgVisible = false;
                      this.init();
                    }
                  }
                );
              } else {
                this.$http.post(this.$api.create_items, this.itemForm).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                          data = res.data.data;

                      this.$notify({
                        title: `${type}成功`,
                        message: `标签名:${this.itemForm.itname}`,
                        type: 'success'
                      });
                      this.itemDlgVisible = false;
                      this.init();
                    }
                  }
                );
              }

            } else {
              this.$message.warning('请根据校验信息完善表单!');
            }
          }
        )
      },

      doRemoveItem(row) {
        this.$confirm(`确认删除标签(${row.itname})?`,'提示').then(
          ()=>{
            this.$http.post(this.$api.update_items,{
              itid: row.itid,
              ittype: 0,
              isdelete: true
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.$notify({
                    title: '标签删除成功',
                    message: `标签名:${row.itname}`,
                    type: 'success'
                  });
                  this.setItemList();
                }
              }
            )
          }
        )
      },

      doSearch(){
        this.setSceneList();
      },
      doReset(){
        this.searchForm = {
          kw: ''
        };
        this.doSearch();
      },
      setSceneList() {
        this.sceneLoading = true;
        this.$http.get(this.$api.scene_list, {
          noLoading: true,
          params: {
            kw: this.searchForm.kw
          }
        }).then(
          res => {
            this.sceneLoading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                  data = res.data.data;

              this.sceneTableData = data;
            }
          }
        )
      },

      changeSceneSort(row){
        this.$http.post(this.$api.update_scene, row).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.$notify({
                title: `排序改动成功`,
                message: `场景名称:${row.psname}`,
                type: 'success'
              });
              this.init();
            }
          }
        );
      },

      resetSceneForm(){
          this.sceneForm = {
            psid: '',
            psname: '',
            pspic: '',
            pssort: 1,
          };
      },
      doAddScene(){
        this.resetSceneForm();

        this.sceneDlgVisible = true;
      },
      doEditScene(){
        this.resetSceneForm();

        this.sceneDlgVisible = true;
      },
      doSaveScene(){
        this.$refs.sceneForm.validate(
          valid => {
            if (valid) {
              let type = this.sceneForm.psid ? '场景修改' : '场景新增';

              if (this.sceneForm.psid) {
                this.$http.post(this.$api.update_scene, this.sceneForm).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                        data = res.data.data;

                      this.$notify({
                        title: `${type}成功`,
                        message: `品牌名:${this.sceneForm.psname}`,
                        type: 'success'
                      });
                      this.sceneDlgVisible = false;
                      this.init();
                    }
                  }
                );
              } else {
                this.$http.post(this.$api.create_scene, this.sceneForm).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                        data = res.data.data;

                      this.$notify({
                        title: `${type}成功`,
                        message: `场景名称:${this.sceneForm.psname}`,
                        type: 'success'
                      });
                      this.sceneDlgVisible = false;
                      this.init();
                    }
                  }
                );
              }

            }else{
              this.$message.warning('请根据校验信息完善表单!');
            }
          }
        )
      },

      handlePsPicSuccess(res, file) {
        this.sceneForm.pspic = res.data;
      },
      beforePicUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;

        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }

        return isLt15M;
      },

      init(){
        this.setItemList();
        this.setSceneList();
      }
    },

    created() {

      this.init();
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .table-bottom {
      .fj(center);
    }
  }
</style>
