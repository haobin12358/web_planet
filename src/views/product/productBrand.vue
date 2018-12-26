<template>
  <div class="container">
    <block-title title="品牌"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="品牌名">
          <el-input v-model.trim="searchForm.kw" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.pbstatus" @change="doSearch">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
          <el-button icon="el-icon-refresh" @click="doReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-button type="primary" icon="el-icon-plus" @click="doAddBrand">新增</el-button>
    </section>
    <el-table v-loading="brandLoading" :data="brandTableData" height="600">
      <el-table-column label="品牌logo" align="center" prop="pblogo" width="160">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.pblogo" :key="scope.row.pblogo"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="品牌店铺图" align="center" prop="pbbackgroud" width="220">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.pbbackgroud" width="113px" :key="scope.row.pbbackgroud"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="品牌名称" align="center" prop="pbname" width="160"></el-table-column>
      <el-table-column label="品牌所属供应商" prop="supplizer.suname" align="center" width="160"></el-table-column>
      <el-table-column label="关联标签" align="center" width="300">
        <template slot-scope="scope">
          <el-tag style="margin: 0 5px 5px 0;" v-for="item in scope.row.items" :key="item.itid">{{item.itname}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag  v-if="scope.row.pbstatus == 0">上架中</el-tag>
          <el-tag v-if="scope.row.pbstatus == 1" type="danger">已下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="品牌描述" align="center" prop="pbdesc" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createtime" width="180"></el-table-column>
      <el-table-column label="操作" align="center" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="doEditBrand(scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <section class="table-bottom">
      <el-pagination
        style="margin-top: .5rem"
        :current-page="currentBrandPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="brandPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalBrand"
        @size-change="sizeChange"
        @current-change="pageChange">
      </el-pagination>
    </section>

    <!--品牌dialog-->
    <el-dialog :visible.sync="brandDlgVisible" width="700px" top="10vh" :title="brandForm.pbid ? '品牌编辑': '品牌新增'"
               :close-on-click-modal="false">
      <el-form :model="brandForm" :rules="brandRules" ref="brandForm" size="medium" label-width="120px">
        <el-form-item label="品牌logo" prop="pblogo">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handlePbLogoSuccess"
            :before-upload="beforePicUpload"
          >
            <img v-if="brandForm.pblogo" :key="brandForm.pblogo" v-lazy="brandForm.pblogo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

            <div slot="tip" class="el-upload__tip">
              建议为方形,大小不要超过15M,上传成功后会显示,上传大图请耐心等待
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="品牌店铺图" prop="pbbackgroud">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handlePbBackSuccess"
            :before-upload="beforePicUpload"
          >
            <img v-if="brandForm.pbbackgroud" v-lazy="brandForm.pbbackgroud" class="avatar avatar-top">
            <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader-icon-top"></i>

            <div slot="tip" class="el-upload__tip">
              建议宽高为750/350(2.27),大小不要超过15M,上传成功后会显示,上传大图请耐心等待
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="品牌名" prop="pbname">
          <el-input v-model.trim="brandForm.pbname"></el-input>
        </el-form-item>
        <el-form-item label="品牌描述" prop="pbdesc">
          <el-input v-model.trim="brandForm.pbdesc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="关联标签" prop="itids">
          <el-select
            v-model="brandForm.itids"
            multiple
            filterable
            default-first-option
            placeholder="可多选" style="width: 500px">
            <el-option
              v-for="item in itemOptions"
              :key="item.itid"
              :label="item.itname"
              :value="item.itid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="官网">
          <el-input v-model.trim="brandForm.pblinks"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="brandDlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSaveBrand">确 定</el-button>
      </span>
    </el-dialog>

    <block-title title="品牌标签"></block-title>
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
    <el-table v-loading="itemLoading" :data="itemTableData"  size="mini">
      <el-table-column label="标签名" align="center" prop="itname" width="300"></el-table-column>
      <el-table-column label="描述" align="center" prop="itdesc" show-overflow-tooltip></el-table-column>
      <!--<el-table-column label="关联品牌" align="center"></el-table-column>-->
      <el-table-column label="操作" align="center" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="doEditItem(scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text" @click="doRemoveItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="itemDlgVisible" width="700px"  :title="itemForm.itid ? '标签编辑': '标签新增'"
               :close-on-click-modal="false">
      <el-form :model="itemForm" :rules="itemRules" ref="itemForm" size="medium" label-width="120px">
        <el-form-item label="标签名" prop="itname">
          <el-input v-model.trim="itemForm.itname"></el-input>
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

  export default {
    name: 'ProductBrand',

    components: {
      TableCellImg
    },

    data() {
      return {
        itemSearchForm: {
          kw: '',
        },

        itemLoading: false,
        itemTableData: [],

        itemDlgVisible: false,
        itemForm: {
          itname: "",
          itdesc: "",
        },
        itemRules: {
          itname: [
            {required: true, message: '标签名字必填', trigger: 'blur'}
          ],
          itdesc: [
          ],
        },

        statusOption: [
          {
            value: 'all',
            label: '全部',
          }, {
            value: 'upper',
            label: '上架中',
          }, {
            value: 'off_shelves',
            label: '已下架',
          },
        ],
        searchForm: {
          kw: '',
          time_order: '',
          pbstatus: 'all',
        },

        brandLoading: false,
        brandTableData: [],
        currentBrandPage: 1,
        brandPageSize: 10,
        totalBrand: 0,

        brandDlgVisible: false,
        itemOptions: [],
        brandForm: {
          pblogo: "",
          pbbackgroud: '',
          pbname: "",
          pbdesc: "",
          pblinks: "",
          itids: [],
        },
        brandRules: {
          pblogo: [
            {required: true, message: 'logo必传', trigger: 'change'}
          ],
          pbbackgroud: [
            {required: true, message: '店铺图必传', trigger: 'change'}
          ],
          pbname: [
            {required: true, message: '名字必填', trigger: 'blur'}
          ],
          pbdesc: [
            {required: true, message: '描述必填', trigger: 'blur'}
          ],
          pblinks: [
            {required: true, message: '官网链接必填', trigger: 'blur'}
          ],
          itids: [
            {required: true, message: '关联标签必选', trigger: 'change'}
          ],
        },
      }
    },

    computed: {
      uploadUrl() {
        return this.$api.upload_file + getStore('token')+ '&type=brand'
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
            ittype: 40,
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
      doAddItem() {
        console.log('doAddItem');
        this.itemDlgVisible = true;
      },
      doEditItem(row) {
        this.itemDlgVisible = true;
        this.itemForm = {
          itname: row.itname,
          itdesc: row.itdesc,
        };
      },
      doSaveItem(){
        this.$refs.itemForm.validate(
          valid => {
            if (valid) {
              let type = this.itemForm.itid ? '标签修改' : '标签新增';
              this.itemForm.ittype = 40;

              if (this.itemForm.itid) {
                this.$http.post(this.$api.update_items, this.itemForm).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                          data = res.data.data;

                      this.$notify({
                        title: `${type}成功`,
                        message: `品牌名:${this.itemForm.pbname}`,
                        type: 'success'
                      });
                      this.brandDlgVisible = false;
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
              ittype: 40,
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

      doSearch() {
        this.setBrandList();
      },
      doReset() {
        this.searchForm = {
          kw: '',
          time_order: '',
          pbstatus: 'all',
        };
        this.doSearch();
      },

      setBrandList() {
        this.brandLoading = true;
        this.$http.get(this.$api.brand_list, {
          noLoading: true,
          params: {
            page_num: this.currentBrandPage,
            page_size: this.brandPageSize,

            kw: this.searchForm.kw,
            time_order: this.searchForm.time_order,
            pbstatus: this.searchForm.pbstatus,
          }
        }).then(
          res => {
            this.brandLoading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                  data = res.data.data;

              this.brandTableData = data;
              this.totalBrand = resData.total_count;
            }
          }
        )
      },
      sizeChange(pageSize) {
        this.brandPageSize = pageSize;
        this.currentBrandPage = 1;

        this.setBrandList();
      },
      pageChange(page) {
        this.currentBrandPage = page;
        this.setBrandList();
      },

      //  brandForm
      handlePbLogoSuccess(res, file) {
        this.brandForm.pblogo = res.data;
      },
      handlePbBackSuccess(res, file) {
        this.brandForm.pbbackgroud = res.data;
      },
      beforePicUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;

        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }

        return isLt15M;
      },

      resetBrandForm(){
        this.brandForm = {
          pblogo: "",
          pbbackgroud: '',
          pbname: "",
          pbdesc: "",
          pblinks: "",
          itids: [],
        };
        this.$http.get(this.$api.items_list, {
          params: {
            ittype: 40
          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.itemOptions = data
            }
          }
        )
      },
      doAddBrand() {
        this.brandDlgVisible = true;
        this.resetBrandForm();


      },
      doEditBrand(row) {
        this.resetBrandForm();

        this.brandDlgVisible = true;
        this.brandForm = {
          pbid: row.pbid,
          pblogo:row.pblogo,
          pbbackgroud: row.pbbackgroud,
          pbname: row.pbname,
          pbdesc: row.pbdesc,
          pblinks: row.pblinks,
          itids: [],
        };
        this.brandForm.itids = row.items.map(item => item.itid);
      },

      doSaveBrand() {
        this.$refs.brandForm.validate(
          valid => {
            if (valid) {
              let type = this.brandForm.pbid ? '品牌修改' : '品牌新增';

              if (this.brandForm.pbid) {
                this.$http.post(this.$api.update_brand, this.brandForm).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                          data = res.data.data;

                      this.$notify({
                        title: `${type}成功`,
                        message: `品牌名:${this.brandForm.pbname}`,
                        type: 'success'
                      });
                      this.brandDlgVisible = false;
                      this.init();
                    }
                  }
                );
              } else {
                this.$http.post(this.$api.create_brand, this.brandForm).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                        data = res.data.data;

                      this.$notify({
                        title: `${type}成功`,
                        message: `品牌名:${this.brandForm.pbname}`,
                        type: 'success'
                      });
                      this.brandDlgVisible = false;
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

      init() {
        this.setItemList();
        this.setBrandList();
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
    .avatar-top {
      width: 316px;
    }
    .avatar-uploader-icon-top {
      width: 316px;
    }
  }
</style>
