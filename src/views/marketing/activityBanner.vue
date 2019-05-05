<template>
  <div class="container">
<!--    <section class="add-banner tr">-->
<!--      <el-button type="primary" icon="el-icon-plus" @click="bannerDialog = true">新增</el-button>-->
<!--    </section>-->
    <el-table v-loading="bannerLoading" :data="bannerList" stripe>
      <el-table-column label="轮播图" align="center" prop="enpic" width="180">
        <template slot-scope="scope">
          <table-cell-img :src="[scope.row.enpic]" :key="scope.row.enpic" width="92px" out-width="92px"></table-cell-img>
        </template>
      </el-table-column>
      <!--<el-table-column label="对应商品" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>-->
      <el-table-column label="对应链接" align="center" prop="contentlink" show-overflow-tooltip></el-table-column>
      <el-table-column label="不展示/展示" align="center" prop="enshow">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enshow" @change="bannerShow(scope)" active-color="#409EFF" inactive-color="#DBDCDC">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="位置" align="center" prop="entype" :render-header="sortHeaderRender">
<!--        <template slot-scope="scope">-->
<!--          <el-input class="sort-input" @focus="indexDone(scope)" v-model.number="scope.row.entype"-->
<!--                    @change="sortChange" maxlength="11"></el-input>-->
<!--          <el-button type="text" v-if="scope.$index == index" @click="sortChange">保存</el-button>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="editBanner(scope)">编辑</el-button>
<!--          <el-button type="text" class="danger-text" @click="deleteBanner(scope)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-el-drag-dialog title="首页轮播图" :visible.sync="bannerDialog" top="5vh" :close-on-click-modal="false">
      <el-form :model="bannerForm" :rules="rules" ref="bannerFormRef" label-position="left"
               label-width="100px">
        <el-form-item label="轮播图" prop="enpic">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleBannerSuccess"
            :before-upload="beforeImgUpload">
            <img v-if="bannerForm.enpic" v-lazy="bannerForm.enpic" class="avatar banner-img">
            <i v-else class="el-icon-plus avatar-uploader-icon banner-img"></i>
            <div slot="tip" class="el-upload__tip" v-if="bannerForm.entype == 0">
              建议为684 * 150，大小不要超过15M，上传成功后会显示，文件较大时请耐心等待
            </div>
            <div slot="tip" class="el-upload__tip" v-if="bannerForm.entype == 1">
              建议为750*120，大小不要超过15M，上传成功后会显示，文件较大时请耐心等待
            </div>
            <div slot="tip" class="el-upload__tip" v-if="bannerForm.entype == 2 || bannerForm.entype == 3">
              建议为375*200 ，大小不要超过15M，上传成功后会显示，文件较大时请耐心等待
            </div>
          </el-upload>
        </el-form-item>
<!--        <el-form-item label="位置" prop="ensort">-->
<!--          <el-input class="sort-input" v-model="bannerForm.entype"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="不展示 / 展示" prop="enshow">
          <el-switch v-model="bannerForm.enshow" active-color="#409EFF" inactive-color="#DBDCDC">
          </el-switch>
        </el-form-item>
        <el-form-item label="链接" prop="contentlink">
          <el-input v-model="bannerForm.contentlink"></el-input>
        </el-form-item>
        <!--<el-form-item label="绑定商品" prop="prid">
          <product :list="productList"></product>
          &lt;!&ndash;<el-button class="bind-btn" @click="productDialog = true" v-if="productList.length">点击选择</el-button>&ndash;&gt;
          &lt;!&ndash;<el-button @click="getProduct" v-else>点击选择</el-button>&ndash;&gt;
          <el-button class="bind-btn" @click="getProduct">点击选择</el-button>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="initBannerForm">取 消</el-button>
        <el-button type="primary" @click="addBanner">确 定</el-button>
      </div>
    </el-dialog>

    <!--商品dialog-->
    <el-dialog v-el-drag-dialog :visible.sync="productDialog" width="1000px" top="5vh" title="商品绑定"
               :close-on-click-modal="false" append-to-body>
      <section class="tool-bar" style="margin-top: -20px">
        <el-form :inline="true" size="medium">
          <el-form-item label="商品名 / 品牌名">
            <el-input v-model="kw"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search"  :loading="productLoading" @click="getProduct()">查询</el-button>
            <el-button icon="el-icon-refresh"  :loading="productLoading" @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
      <el-table v-loading="productLoading" :data="productsList" stripe size="mini" height="600">
        <el-table-column align="center" width="120" label="图片">
          <template slot-scope="scope">
            <table-cell-img :src="[scope.row.prmainpic]" :key="scope.row.prid"></table-cell-img>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>
        <el-table-column label="价格" align="center" prop="prprice"></el-table-column>
        <el-table-column label="品牌" align="center" prop="brand.pbname"></el-table-column>
        <el-table-column label="销量" align="center" prop="prsalesvalue"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="chooseProduct(scope)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <section class="table-bottom">
        <el-pagination background :page-sizes="[10, 20, 30, 40]" :current-page="page_num"
                       :page-size="page_size" :total="total" layout="total, sizes, prev, pager, next, jumper"
                       @size-change="sizeChange" @current-change="pageChange"></el-pagination>
      </section>
    </el-dialog>
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg";
  import elDragDialog from 'src/directive/el-dragDialog'
  import { getStore } from "src/utils/index";
  import product from '../../components/Product/product'

  const positiveNumberReg = /^([1-9]\d*)$/;   //  正整数
  export default {
    name: 'IndexBanner',
    data() {
      return {
        bannerDialog: false,
        bannerForm: {
          enid: '',
          prid: '',
          enpic: '',
          ensort: '',
          contentlink: '',
          enshow: false,
        },
        rules: {
          enpic: [
            { required: true, message: '轮播图必需', trigger: 'blur' }
          ],
          ensort: [
            { required: true, message: '序号必填', trigger: 'blur' }
          ],
          /*contentlink: [
            { required: true, message: '链接必填', trigger: 'blur' }
          ],*/
          /*prid: [
            { required: true, message: '商品必选', trigger: 'blur' }
          ]*/
        },
        bannerLoading: false,
        bannerList: [],
        productList: [],
        productsList: [],
        productDialog: false,
        productLoading: false,
        page_num: 1,
        page_size: 10,
        total: 0,
        kw: '',
        index: -1
      }
    },
    computed: {
      // 上传图片
      uploadUrl() {
        return this.$api.upload_file + getStore('token') + '&type=index'
      }
    },
    directives: { elDragDialog },
    components: { TableCellImg, product },
    mounted() {
      this.getBanner()          // 获取banner
    },
    methods: {
      // 主图上传
      handleBannerSuccess(res, file) {
        this.bannerForm.enpic = res.data;
      },
      // 上传前限制小于15M
      beforeImgUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;
        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }
        return isLt15M;
      },
      // 获取banner
      getBanner() {
        this.bannerLoading = true;
        this.$http.get(this.$api.get_entry, {
          noLoading: true, params: { entype: '' }}).then(res => {
          if (res.data.status == 200) {
            this.bannerList = res.data.data;
            this.bannerLoading = false;
          }
        })
      },
      // 新增banner的取消按钮
      initBannerForm() {
        this.productList = [];
        this.$refs.bannerFormRef.resetFields();
        this.bannerForm = {
          prid: '',
          enpic: '',
          ensort: '',
          enshow: false,
        };
        this.bannerDialog = false;
      },
      // 添加banner
      addBanner() {
        this.$refs.bannerFormRef.validate(valid => {
          if (valid) {
            if(this.bannerForm.enid) {      // 编辑
              this.$http.post(this.$api.set_entry, this.bannerForm).then(res => {
                if (res.data.status == 200) {
                  this.$notify({
                    title: '修改成功',
                    message: '此活动图修改成功',
                    type: 'success'
                  });
                  this.bannerDialog = false;
                  this.getBanner()
                }
              });
            }
          }else {
            this.$message.warning('请根据校验信息完善表单!');
          }
        })
      },
      // 删除banner
      deleteBanner(scope) {
        let params = {
          enid: scope.row.enid
        };
        // 最少保留一张轮播图
        let num = 0;
        for(let i in this.bannerList) {
          if(!this.bannerList[i].enshow) {
            num += 1
          }
        }
        if(num == this.bannerList.length - 1) {
          this.$message.error('请最少保留一张轮播图');
          return false
        }
        // 删除轮播图
        this.$confirm('此操作将删除该轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          params.isdelete = true;
          this.$http.post(this.$api.update_banner, params).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '删除成功',
                message: '此轮播图已被删除',
                type: 'success'
              });
              this.getBanner();
            }
          });
        }).catch(() => { });
      },
      // banner的展示与否
      bannerShow(scope) {
        let msg = '';
        let params = {
          enid: scope.row.enid
        };
        // 最少保留一张轮播图
        let num = 0;
        for(let i in this.bannerList) {
          if(!this.bannerList[i].enshow) {
            num += 1
          }
        }
        if(num == this.bannerList.length) {
          this.bannerList[scope.$index].enshow = true;
          this.$message.error('请最少保留一张轮播图');
          return false
        }

        params.enshow = scope.row.enshow;
        if(!scope.row.enshow) {
          msg = '此轮播图不再展示'
        }else {
          msg = '此轮播图将会展示'
        }
        this.$http.post(this.$api.set_entry, scope.row).then(res => {
          if (res.data.status == 200) {
            this.$notify({
              title: '修改成功',
              message: msg,
              type: 'success'
            });
            // this.getBanner();
          }
        });
      },
      // 编辑banner
      editBanner(scope) {
        this.bannerForm = JSON.parse(JSON.stringify(scope.row));
        this.bannerDialog = true
      },
      // 记录点击的是哪一行
      indexDone(scope) {
        this.index = scope.$index;
      },
      // 改变轮播图序号
      sortChange(v) {
        if(positiveNumberReg.test(this.bannerList[this.index].ensort)) {
          let params = {
            enid: this.bannerList[this.index].enid,
            ensort: this.bannerList[this.index].ensort,
            enshow: this.bannerList[this.index].enshow,
          };

          this.$http.post(this.$api.set_entry, params).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '保存成功',
                message: '此活动图序号已保存',
                type: 'success'
              });
              this.getBanner();         // 刷新banner
              this.index = -1;
            }
          });
        }
      },
      sortHeaderRender(h,{column}){
        return(
          <el-tooltip class="tooltip" placement="top">
          <span slot="content">
          权重是一个顺序展示的概念,数字小的放在前面,同权重按创建时间从早到晚排序
        </span>
        <div>{column.label}
        <i class="el-icon-question"></i>
          </div>
          </el-tooltip>
      )
      },

      sizeChange(val) {
        this.page_size = val;
        this.getProduct();
      },
      pageChange(val) {
        this.page_num = val;
        this.getProduct();
      },
      // 获取商品列表
      getProduct() {
        this.productDialog = true;
        this.productLoading = true;
        this.$http.get(this.$api.product_list, {
          noLoading: true,
          params: {
            // itid: 'news_bind_product',
            kw: this.kw || '',
            page_num: this.page_num,
            page_size: this.page_size
          }}).then(res => {
          if (res.data.status == 200) {
            this.productsList = res.data.data;
            this.total = res.data.total_count;
            for(let i in this.productsList) {
              this.productsList[i].radio = false
            }
            this.productLoading = false;
          }
        })
      },
      // 确认选中的商品
      chooseProduct(scope) {
        this.bannerForm.prid = this.productsList[scope.$index].prid;
        this.productList = [];
        this.productList.push(this.productsList[scope.$index]);
        this.productDialog = false
      },
      // 重置按钮
      resetSearch() {
        this.kw = '';
        this.getProduct()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .add-banner {
      margin-bottom: 20px;
    }
    .banner-img {
      width: 272px;
      height: 148px;
      line-height: 148px;
    }
    .sort-input {
      width: 5rem;
    }
    .bind-btn {
      margin: 0 0 0 50px;
    }
  }
</style>
