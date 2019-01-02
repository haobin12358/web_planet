<template>
  <div class="edit-circle">
    <el-row>
      <el-col :span="18">
        <block-title title="图文编辑"></block-title>
        <el-form :model="circleForm" :rules="rules" ref="circleFormRef" label-position="left"
                 label-width="100px">
          <el-form-item label="封面图" prop="nemainpic">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              accept="image/*"
              :on-success="handleMainPicSuccess"
              :before-upload="beforeImgUpload">
              <img v-if="circleForm.nemainpic" v-lazy="circleForm.nemainpic" class="avatar circle-main-img">
              <i v-else class="el-icon-plus avatar-uploader-icon circle-main-img"></i>
              <div slot="tip" class="el-upload__tip">
                建议为750 * 360，大小不要超过15M，上传成功后会显示，文件较大时请耐心等待
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签名称" prop="items">
            <el-select v-model="itemList" multiple filterable placeholder="请选择" style="width: 600px">
              <el-option v-for="item in itemsList" :key="item.itid" :label="item.itname" :value="item.itid"></el-option>
            </el-select>
            <router-link v-permission="[ 'admin', 'super']" tag="span" to="/circle/circle"
                         class="form-item-end-tip">标签不全?去新增 >
            </router-link>
          </el-form-item>
          <el-form-item label="资讯标题" prop="netitle">
            <el-input v-model="circleForm.netitle"></el-input>
          </el-form-item>
          <el-form-item label="资讯正文" prop="netext">
            <el-input v-model.trim="circleForm.netext" type="textarea"
                      :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item label="图片(最多4张)" prop="images">
            <el-upload
              class="swiper-uploader"
              :action="uploadUrl"
              accept="image/*"
              list-type="picture-card"
              :file-list="imagesUrl"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeImgUpload"
              :on-remove="handleImagesRemove"
              :http-request="uploadImages"
              :limit="4"
              :multiple="true">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">
                <span>可多选，最多4张，大小不要超过15M，上传成功后会显示，文件较大时请耐心等待</span>
                <imgs-drag-sort style="display: inline-block;margin-left: 30px;" :list="imagesUrl"></imgs-drag-sort>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="视频" prop="video">
            <el-upload
              class="avatar-uploader"
              :action="uploadVideo"
              :show-file-list="false"
              accept="video/*"
              :on-success="handleVideoSuccess"
              :before-upload="beforeVideoUpload">
              <img v-if="video.video_thum" v-lazy="video.video_thum" class="avatar circle-main-img">
              <i v-else class="el-icon-plus avatar-uploader-icon circle-main-img"></i>
              <div slot="tip" class="el-upload__tip">
                建议为750 * 360，大小不要超过20M，上传成功后会显示，上传文件较大时请耐心等待
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="推荐到轮播图">
            <el-switch v-if="circleForm.nemainpic" v-model="isrecommend" :disabled="!circleForm.nemainpic"
                       active-color="#409EFF" inactive-color="#DBDCDC"></el-switch>
            <el-tooltip v-else content="推荐到轮播图需要有封面图" placement="right">
              <el-switch v-model="isrecommend" :disabled="!circleForm.nemainpic" active-color="#409EFF" inactive-color="#DBDCDC">
              </el-switch>
            </el-tooltip>
          </el-form-item>

          <block-title title="商品绑定"></block-title>
          <el-form-item label="推荐商品" prop="product">
            <product :list="productList"></product>
            <el-button @click="productDialog = true" v-if="productList.length">点击选择</el-button>
            <el-button @click="getProduct" v-else>点击选择</el-button>
          </el-form-item>

          <block-title title="优惠券绑定"></block-title>
          <el-form-item label="优惠券" prop="coupon">
            <el-select v-model="couponList" multiple filterable placeholder="请选择" style="width: 600px">
              <el-option v-for="item in couponsList" :key="item.coid" :label="item.coname" :value="item.coid"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="checkFormData">保存资讯</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--<div class="preview-btn">
      <preview-circle :circle="circleForm" :from="'detail'"></preview-circle>
    </div>-->

    <!--预览大图dialog-->
    <el-dialog :visible.sync="dialogVisible" top="8vh">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!--商品dialog-->
    <el-dialog v-el-drag-dialog :visible.sync="productDialog" width="1000px" top="5vh" title="商品绑定" :close-on-click-modal="false">
      <el-table v-loading="productLoading" :data="productsList" stripe height="65vh"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column align="center" width="120" label="图片">
          <template slot-scope="scope">
            <table-cell-img :src="scope.row.prmainpic" :key="scope.row.prid"></table-cell-img>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>
        <el-table-column label="价格" align="center" prop="prprice"></el-table-column>
        <el-table-column label="品牌" align="center" prop="brand.pbname"></el-table-column>
        <el-table-column label="销量" align="center" prop="prsalesvalue"></el-table-column>
      </el-table>
      <el-pagination background class="page-box" :page-sizes="[10, 20, 30, 40]" :current-page="page_num"
                     :page-size="page_size" :total="total" layout="total, sizes, prev, pager, next, jumper"
                     @size-change="sizeChange" @current-change="pageChange">
      </el-pagination>
      <span slot="footer">
        <el-button @click="productDialog = false">取 消</el-button>
        <el-button type="primary" @click="chooseProduct">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import permission from 'src/directive/permission/index.js' // 权限判断指令
  import ImgsDragSort from 'src/components/ImgsDragSort/index'
  import elDragDialog from 'src/directive/el-dragDialog'
  import { getStore } from "src/utils/index"
  import product from '../../components/Product/product'
  import TableCellImg from "src/components/TableCellImg"
  import previewCircle from './components/previewCircle'

  export default {
    name: 'EditCircle',
    data() {
      return {
        itemList: [],
        itemsList: [],
        couponList: [],
        couponsList: [],
        productList: [],
        productTempList: [],
        productsList: [],
        productDialog: false,
        productLoading: false,
        imagesUrl: [],
        video: {},
        circleForm: {
          neid: "",
          items: [],
          netitle: '',
          netext: '',
          nemainpic: '',
          video: {},
          images: [],
          coupon: [],
          product: [],
          neisrecommend: 0,
          source: 'web'
        },
        rules: {
          items: [
            { required: true, message: '标签必选', trigger: 'blur' }
          ],
          netitle: [
            { required: true, message: '资讯标题必填', trigger: 'blur' }
          ],
          netext: [
            { required: true, message: '资讯正文必填', trigger: 'blur' }
          ]
        },
        dialogVisible: false,
        dialogImageUrl: '',
        isrecommend: false,
        page_num: 1,
        page_size: 10,
        total: 0
      }
    },
    computed: {
      // 上传图片
      uploadUrl() {
        return this.$api.upload_file + getStore('token') + '&type=news'
      },
      // 上传视频
      uploadVideo() {
        return this.$api.upload_file + getStore('token') + '&type=video'
      }
    },
    directives: { permission, elDragDialog },
    components: { ImgsDragSort, product, TableCellImg, previewCircle },
    mounted() {
      this.initCircle()
    },
    activated() {
      this.initCircle()
    },
    watch: {
      // 选中的标签
      itemList(val) {
        this.circleForm.items = val;
      },
      // 选中的优惠券
      couponList(val) {
        this.circleForm.coupon = val;
      }
    },
    methods: {
      // 初始化
      initCircle() {
        // 编辑
        if(this.$route.query.neid) {
          this.$http.get(this.$api.get_news_content, { params: { neid: this.$route.query.neid }}).then(res => {
            if (res.data.status == 200) {
              console.log(res.data.data);
              // 将拿到的数据处理给组件
              // this.convertFromEdit(res.data.data);
              this.circleForm = res.data.data;
              // this.$refs.circleFormRef.clearValidate();
            }
          })
        }else {    // 新增

        }

        this.getItem();                       // 获取标签列表
        this.getCoupon();                     // 获取优惠券列表
      },
      // 获取标签列表
      getItem() {
        this.$http.get(this.$api.items_list, {
          noLoading: true, params: { ittype: 10 }}).then(res => {
          if (res.data.status == 200) {
            this.itemsList = res.data.data;
          }
        })
      },
      // 获取优惠券列表
      getCoupon() {
        this.$http.get(this.$api.coupon_list, {
          noLoading: true,
          params: {
            itid: 'news_bind_coupon',
            page_num: 1,
            page_size: 200
          }}).then(res => {
          if (res.data.status == 200) {
            this.couponsList = res.data.data;
          }
        })
      },
      // 获取商品列表
      getProduct() {
        this.productDialog = true;
        this.productLoading = true;
        this.$http.get(this.$api.product_list, {
          noLoading: true,
          params: {
            itid: 'news_bind_product',
            page_num: this.page_num,
            page_size: this.page_size
          }}).then(res => {
          if (res.data.status == 200) {
            this.productsList = res.data.data;
            this.total = res.data.total_count;
            this.productLoading = false;
          }
        })
      },
      sizeChange(val) {
        this.page_size = val;
        this.getProduct();
      },
      pageChange(val) {
        this.page_num = val;
        this.getProduct();
      },
      // 确认选中的商品
      chooseProduct() {
        this.productList = this.productTempList;
        this.productDialog = false;
      },
      // 选择的商品在变化
      handleSelectionChange(val) {
        this.productTempList = val;
      },
      // 主图上传
      handleMainPicSuccess(res, file) {
        this.circleForm.nemainpic = res.data;
      },
      // 视频上传
      handleVideoSuccess(res, file) {
        this.video = res;
      },
      // 多图上传
      uploadImages(file) {
        let formData = new FormData();
        formData.append('file', file.file);
        this.$http({method: 'post', url: this.uploadUrl, data: formData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
          res => {
            if (res.data.status == 200) {
              this.imagesUrl.push({
                name: file.file.name,
                url: res.data.data
              })
            }
          }
        )
      },
      // 上传前限制小于15M
      beforeImgUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;
        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }
        return isLt15M;
      },
      // 上传前限制小于20M
      beforeVideoUpload(file) {
        const isLt20M = file.size / 1024 / 1024 < 20;
        if (!isLt20M) {
          this.$message.error('上传视频大小不能超过 20MB!');
        }
        return isLt20M;
      },
      //  预览图
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 移除多图中的一张
      handleImagesRemove(file, fileList) {
        this.imagesUrl = this.imagesUrl.filter(
          item => item.uid != file.uid
        )
      },
      // 检查form
      checkFormData() {
        this.$refs.circleFormRef.validate(valid => {
          if (valid) {
            // 处理图片list
            if(this.imagesUrl.length) {
              this.circleForm.images = [];
              for(let i = 0; i < this.imagesUrl.length; i ++) {
                this.circleForm.images.push({ niimg: this.imagesUrl[i].url, nisort: i })
              }
            }
            // 处理视频
            if(this.video.data) {
              this.circleForm.video = {
                nvurl: this.video.data,
                nvthum: this.video.video_thum,
                nvdur: this.video.video_dur
              }
            }
            // 处理商品
            if(this.productList.length) {
              this.circleForm.product = [];
              for(let product of this.productList) {
                this.circleForm.product.push(product.prid)
              }
            }
            // 处理是否推荐
            if(this.isrecommend) {
              this.circleForm.neisrecommend = 1
            }else {
              this.circleForm.neisrecommend = 0
            }
            if(this.circleForm.neid) {
              let title = '编辑';
              /*this.$http.post(this.$api.update_news, this.circleForm).then(res => {
                if (res.data.status == 200) {
                  this.$notify({
                    title: `${title}成功`,
                    message: `资讯标题：${this.circleForm.netitle}成功`,
                    type: 'success'
                  });
                }
              });*/
            }else {
              let title = '新增';
              this.$http.post(this.$api.create_news, this.circleForm).then(res => {
                if (res.data.status == 200) {
                  this.$router.push('/circle/circle');
                  this.$notify({
                    title: `${title}成功`,
                    message: `资讯标题：${this.circleForm.netitle}成功`,
                    type: 'success'
                  });
                  this.initCircleForm();
                }
              });
            }
          }else {
            this.$message.warning('请根据校验信息完善表单!');
          }
        })
      },
      // 初始化form
      initCircleForm() {
        this.itemList = [];
        this.imagesUrl = [];
        this.video = {};
        this.productList = [];
        this.couponList = [];
        this.isrecommend = false;
        this.$refs.circleFormRef.resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .edit-circle {
    .circle-main-img {
      width: 300px;
      height: 144px;
      line-height: 144px;
    }
    .page-box {
      margin: 20px 0 -20px 0;
    }
    .preview-btn {
      position: fixed;
      right: 6rem;
      bottom: 10rem;
    }
  }
</style>
