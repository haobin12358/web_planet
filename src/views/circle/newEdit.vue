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
          <el-form-item label="话题" prop="tocid">
            <el-select
              v-model="circleForm.tocid"
              filterable
              allow-create
              default-first-option
              clearable
              @change="createToc"
              placeholder="自行创建或选择已有话题">
              <el-option
                v-for="item in toc_list"
                :key="item.toctitle"
                :label="item.toctitle"
                :value="item.tocid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资讯标题" prop="netitle">
            <el-input v-model="circleForm.netitle"></el-input>
          </el-form-item>
          <el-form-item label="资讯正文" >
            <div  class="m-add-cut" style="margin-bottom: 20px;">
              <div class="m-add">
                <img src="/static/images/icon-add.png" class="m-icon" alt="" @click="showIcon('show_add')">
                <div class="m-edit-icon" v-if="show_add">
                  <div class="m-icon-one" @click.stop="addRow(-1,'text')"><img src="/static/images/icon-up-text.png" alt=""></div>
                  <div class="m-icon-one" @click.stop="addRow(-1,'image')"><img src="/static/images/icon-up-img.png" alt=""></div>
                  <div class="m-icon-one" v-if="show_video" @click.stop="addRow(-1,'video')"><img src="/static/images/icon-up-video.png" alt=""></div>
                </div>
              </div>
            </div>
            <div  class="m-row" v-for="(item,index) in circleForm.netext">
              <el-input v-model.trim="item.content"  v-if="item.type == 'text'" type="textarea"
                        :autosize="{ minRows: 4, maxRows: 14}" maxlength="10000" style="margin: 20px 0;"></el-input>
              <el-upload
                v-if="item.type == 'image'"
                data-index="1"
                class="swiper-uploader"
                :action="uploadUrl"
                accept="image/*"
                list-type="picture-card"
                :file-list="item.content"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeImgUpload"
                :on-remove="handleImagesRemove"
                :http-request="uploadImages"
                :on-success="handleSkuPicSuccess"
                @click.native="setSkuPicIndex(index)"
                :limit="9"
                :multiple="true">
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">
                  <span>上传图片,可多选，大小不要超过15M，上传成功后会显示，文件较大时请耐心等待</span>
                  <imgs-drag-sort style="display: inline-block;margin-left: 30px;" :list="item.content"></imgs-drag-sort>
                </div>
              </el-upload>
              <el-upload
                v-if="item.type == 'video'"
                class="avatar-uploader"
                :action="uploadVideo"
                :show-file-list="false"
                accept="video/*"
                :http-request="uploadVideos"
                :on-success="handleVideoSuccess"
                :before-upload="beforeVideoUpload">
                <img v-if="item.content.thumbnail" v-lazy="item.content.thumbnail" class="avatar circle-main-img">
                <i v-else class="el-icon-plus avatar-uploader-icon circle-main-img"></i>
                <div slot="tip" class="el-upload__tip">
                  上传视频，建议为750 * 360，大小不要超过20M，上传成功后会显示，上传文件较大时请耐心等待
                </div>
              </el-upload>
              <div class="m-add-cut">
                <div class="m-add">
                  <img src="/static/images/icon-add.png" class="m-icon" alt="" @click="showIcon(index)">
                  <div class="m-edit-icon" v-if="item.click">
                    <div class="m-icon-one" @click.stop="addRow(index,'text')"><img src="/static/images/icon-up-text.png" alt=""></div>
                    <div class="m-icon-one" @click.stop="addRow(index,'image')"><img src="/static/images/icon-up-img.png" alt=""></div>
                    <div class="m-icon-one" v-if="show_video" @click.stop="addRow(index,'video')"><img src="/static/images/icon-up-video.png" alt=""></div>
                  </div>
                </div>
                <div class="m-cut" >
                  <img src="/static/images/icon-cut-sku.png" class="m-icon" alt="" @click="cutType(index)">
                </div>
              </div>
            </div>
          </el-form-item>


          <el-form-item label="展示到官网">
            <el-switch v-if="circleForm.nemainpic" v-model="isrecommend" :disabled="!circleForm.nemainpic"
                       active-color="#409EFF" inactive-color="#DBDCDC"></el-switch>
            <el-tooltip v-else content="展示到官网需要有封面图" placement="right">
              <el-switch v-model="isrecommend" :disabled="!circleForm.nemainpic" active-color="#409EFF" inactive-color="#DBDCDC">
              </el-switch>
            </el-tooltip>
          </el-form-item>

          <block-title title="商品绑定"></block-title>
          <el-form-item label="推荐商品" prop="product">
            <product :list="productList"></product>
            <!--<el-button @click="productDialog = true" v-if="productList.length">点击选择</el-button>-->
            <el-button @click="getProduct">点击选择</el-button>
          </el-form-item>

          <block-title title="优惠券绑定"></block-title>
          <el-form-item label="优惠券" prop="coupon">
            <el-select v-model="couponList" multiple filterable placeholder="请选择" style="width: 600px">
              <el-option v-for="item in couponsList" :key="item.coid" :label="item.coname" :value="item.coid"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="info" @click="initCircleForm">取 消</el-button>
            <el-button type="primary" @click="checkFormData">保存资讯</el-button>
            <el-button type="text" class="info-text">保存后将自动发起审批</el-button>
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
      <section class="tool-bar space-between" style="margin-top: -30px">
        <el-form :inline="true" size="medium">
          <el-form-item label="商品名称">
            <el-input v-model="kw"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search"  :loading="productLoading" @click="search">查询</el-button>
            <el-button icon="el-icon-refresh"  :loading="productLoading" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
      <el-table v-loading="productLoading" :data="productsList" stripe height="65vh"
                @selection-change="handleSelectionChange" row-key="prid" ref="productList">
        <el-table-column type="selection" :reserve-selection="true"></el-table-column>
        <el-table-column align="center" width="120" label="图片">
          <template slot-scope="scope">
            <table-cell-img :src="[scope.row.prmainpic]" :key="scope.row.prid"></table-cell-img>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>
        <el-table-column label="价格" align="center" prop="prprice"></el-table-column>
        <el-table-column label="品牌" align="center" prop="brand.pbname"></el-table-column>
        <el-table-column label="销量" align="center" prop="prsalesvalue"></el-table-column>
      </el-table>
      <!--<el-pagination background class="page-box" :page-sizes="[10, 20, 30, 40]" :current-page="page_num"
                     :page-size="page_size" :total="total" layout="total, sizes, prev, pager, next, jumper"
                     @size-change="sizeChange" @current-change="pageChange"></el-pagination>-->
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
          netext: [],
          nemainpic: '',
          video: {},
          images: [],
          coupon: [],
          product: [],
          neisrecommend: 0,
          source: 'web',
          tocid:''
        },
        rules: {
          items: [
            { required: true, message: '标签必选', trigger: 'blur' }
          ],
          netitle: [
            { required: true, message: '资讯标题必填', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
        dialogVisible: false,
        dialogImageUrl: '',
        isrecommend: false,
        page_num: 1,
        page_size: 10,
        total: 0,
        kw: '',
        uploadSkuImgIndex:0,
        show_video:true,
        show_add :false,
        toc_list:[],
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
      search() {
        this.page_num = 1;
        this.getProduct()
      },
      reset() {
        this.kw = '';
        this.page_num = 1;
        this.getProduct()
      },
      // 初始化
      initCircle() {
        // 编辑
        if(this.$route.query.neid) {
          this.$http.get(this.$api.get_news_content, { params: { neid: this.$route.query.neid }}).then(res => {
            if (res.data.status == 200) {
              // 将拿到的数据处理给组件
              this.circleForm = res.data.data;
              this.circleForm.source = 'web';
              this.circleForm.neid = this.$route.query.neid;
              // 处理标签
              if(res.data.data.items) {
                this.itemList = [];
                for(let i in res.data.data.items) {
                  this.itemList.push(res.data.data.items[i].itid)
                }
              }
              // 处理图片
              let arr = [].concat(res.data.data.netext);
              for(let i=0;i<res.data.data.netext.length;i++){
                arr[i].click = false;
                if(arr[i].type == 'image'){
                  let _arr = [];
                  for(let j of arr[i].content) {
                    _arr.push({ url: j })
                  }
                  arr[i].content = [].concat(_arr);
                }
              }
              this.circleForm.netext = [].concat(arr);
              // 处理视频
              if(res.data.data.video) {
                this.video.video_thum = res.data.data.video.nvthumbnail;
              }

              //处理正文

              // 处理是否推荐到轮播图
              if(res.data.data.neisrecommend) {
                this.isrecommend = true
              }
              // 处理优惠券
              if(res.data.data.coupon) {
                this.couponList = [];
                for(let i in res.data.data.coupon) {
                  this.couponList.push(res.data.data.coupon[i].coid)
                }
              }
              // 处理商品
              if(res.data.data.product) {
                this.productList = res.data.data.product;
              }
            }
          })
        }else {    // 新增
          this.initCircleForm()
        }
        this.getItem();                       // 获取标签列表
        this.getCoupon();                     // 获取优惠券列表
        this.getToc();
      },
      //创建话题
      createToc(){
        let bool = false;
        for(let i in this.toc_list){
          if(this.toc_list[i].tocid == this.tocid){
            bool = true;
          }
        }
        if(!bool && this.circleForm.tocid){
          this.$http.post(this.$api.news_topic,{
            toctitle:this.circleForm.tocid
          }).then(res => {
            if (res.data.status == 200) {
              this.circleForm.tocid = res.data.data.tocid;
              this.getToc();
            }
          })
        }

      },
      // 获取标签列表
      getItem() {
        this.$http.get(this.$api.items_list, {
          noLoading: true, params: { ittype: 10 }}).then(res => {
          if (res.data.status == 200) {
            this.itemsList = res.data.data;
            console.log(this.itemsList)
          }
        })
      },
      getToc(){
        this.$http.get(this.$api.news_topic, {
          noLoading: true}).then(res => {
          if (res.data.status == 200) {
            this.toc_list = res.data.data;
          }
        })
      },
      // 获取优惠券列表
      getCoupon() {
        this.$http.get(this.$api.coupon_list, {
          noLoading: true,
          params: {
            // itid: 'news_bind_coupon',
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
            kw: this.kw,
            // itid: 'news_bind_product',
            page_num: this.page_num,
            page_size: 200
            // page_size: this.page_size
          }}).then(res => {
          if (res.data.status == 200) {
            this.productsList = res.data.data;
            this.total = res.data.total_count;
            this.productLoading = false;
            // 将已选择的商品勾选上
            if(this.productList.length) {
              for(let j in this.productsList ){
                let i=0;
                for(let a in this.productList){
                  if(this.productsList[j].prid == this.productList[a].prid){
                    i++;
                  }
                }
                if(i ==1){
                  this.$refs.productList.toggleRowSelection(this.productsList[j])
                }
              }
              // for(let i in this.productsList) {
              //   for(let j in this.productList) {
              //     if(this.productList[j].prid == this.productsList[i].prid) {
              //       this.$refs.productList.toggleRowSelection(this.productsList[j])
              //     }
              //   }
              // }
            }
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
        let arr = [];
        for(let j in this.productTempList ){
          let i=0;
          for(let a in arr){
            if(arr[a].prid != this.productTempList[j].prid){
              i++;
            }
          }
          if(i == arr.length){
            arr.push(this.productTempList[j])
          }
        }
        this.productList = arr;
        this.productDialog = false;
      },
      // 选择的商品在变化
      handleSelectionChange(val) {
        this.productTempList = Array.from(new Set(val));
      },
      // 主图上传
      handleMainPicSuccess(res, file) {
        this.circleForm.nemainpic = res.data;
      },
      // 视频上传
      handleVideoSuccess(res, file) {
        this.video = res;
        for(let i=0;i<this.circleForm.netext.length;i++){
          if(this.circleForm.netext[i].type == 'video'){
            this.circleForm.netext[i].content = {
              video:res.data,
              duration: res.video_dur,
              thumbnail:res.video_thum
            };
          }
        }
      },
      //  强行配合el-upload 下策
      setSkuPicIndex(index) {
        this.uploadSkuImgIndex = index;
      },
      handleSkuPicSuccess(res, file) {
        //
        // this.circleForm.netext[this.uploadSkuImgIndex].content = res.data;
        // console.log(res,this.circleForm.netext,'sdfsdfds')
      },
      uploadVideos(file){
        let formData = new FormData();
        formData.append('file', file.file);
        this.$http({method: 'post', url: this.uploadVideo, data: formData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
          res => {
            if (res.data.status == 200) {
              for(let i=0;i<this.circleForm.netext.length;i++){
                if(this.circleForm.netext[i].type == 'video'){
                  this.circleForm.netext[i].content = {
                    video:window.location.origin + res.data.data,
                    duration: res.data.video_dur,
                    thumbnail:window.location.origin + res.data.video_thum
                  };
                }
              }
              console.log(this.circleForm.netext)
            }else{
              this.$message.error(res.data.message);
            }
          })
      },
      // 多图上传
      uploadImages(file) {
        let formData = new FormData();
        formData.append('file', file.file);
        this.$http({method: 'post', url: this.uploadUrl, data: formData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
          res => {
            if (res.data.status == 200) {
              // this.imagesUrl.push({
              //   name: file.file.name,
              //   url: res.data.data
              // })
              this.circleForm.netext[this.uploadSkuImgIndex].content .push({
                name: file.file.name,
                url: window.location.origin + res.data.data
              })
            }else{
              this.$message.error(res.data.message);
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
        this.circleForm.netext[this.uploadSkuImgIndex].content = this.circleForm.netext[this.uploadSkuImgIndex].content.filter(
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
            }else{
              this.circleForm.product = [];
            }
            // 处理是否推荐
            if(this.isrecommend) {
              this.circleForm.neisrecommend = 1
            }else {
              this.circleForm.neisrecommend = 0
            }
            if(this.circleForm.netext.length < 1 ) {
              this.$notify({
                title: `提示`,
                message: `请添加文章内容`,
                type: 'warning'
              });
              return false;
            }else if( this.circleForm.netext.length == 1 ){
              if(this.circleForm.netext[this.circleForm.netext.length-1].content.length ==0){
                this.$notify({
                  title: `提示`,
                  message: `请添加文章内容`,
                  type: 'warning'
                });
                return false;
              }else if(this.circleForm.netext[this.circleForm.netext.length-1].type == 'video' && !this.circleForm.netext[this.circleForm.netext.length-1].content.video){
                this.$notify({
                  title: `提示`,
                  message: `请添加文章内容`,
                  type: 'warning'
                });
                return false;
              }
            }
            //处理正文
            for(let i=0;i<this.circleForm.netext.length;i++){
              delete  this.circleForm.netext[i].click;
              if(this.circleForm.netext[i].type == 'image'){
                if(this.circleForm.netext[i].content.length >0){
                  let arr = [];
                  for(let j=0;j<this.circleForm.netext[i].content.length;j++){
                    arr.push(this.circleForm.netext[i].content[j].url)
                  }
                  this.circleForm.netext[i].content = [].concat(arr);
                }else{
                  this.circleForm.netext.splice(i,1)
                }
              }else if(this.circleForm.netext[i].type == 'text'){
                if(this.circleForm.netext[i].content == ''){
                  this.circleForm.netext.splice(i,1)
                }
                // this.circleForm.netext[i].content = this.circleForm.netext[i].content.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
              }else if(this.circleForm.netext[i].type == 'video'){
                if(!this.circleForm.netext[i].content.video){
                  this.circleForm.netext.splice(i,1)
                }
              }
            }

            if(this.circleForm.neid) {
              let title = '编辑';
              this.$http.post(this.$api.update_news, this.circleForm).then(res => {
                if (res.data.status == 200) {
                  this.$router.push('/circle/circle');
                  this.$notify({
                    title: `${title}成功`,
                    message: `资讯标题：${this.circleForm.netitle}编辑成功`,
                    type: 'success'
                  });
                  this.initCircleForm();
                }
              });
            }else {
              let title = '新增';
              this.$http.post(this.$api.create_news, this.circleForm).then(res => {
                if (res.data.status == 200) {
                  this.$router.push('/circle/circle');
                  this.$notify({
                    title: `${title}成功`,
                    message: `资讯标题：${this.circleForm.netitle}新增成功`,
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
        this.circleForm = {
          neid: "",
          items: [],
          netitle: '',
          netext: [],
          nemainpic: '',
          video: {},
          images: [],
          coupon: [],
          product: [],
          neisrecommend: 0,
          source: 'web'
        };
        this.$refs.circleFormRef.resetFields();
      },
      //点击添加
      showIcon(index){
        this.show_video = true;
        for(let i=0;i<this.circleForm.netext.length;i++){
          if(this.circleForm.netext[i].type == 'video' && this.circleForm.netext[i].content != {} ){
            this.show_video = false;
          }
        }
        if(index == 'show_add'){
          this.show_add = !this.show_add;
          return false;
        }
        this.circleForm.netext[index].click = !this.circleForm.netext[index].click;
        this.circleForm.netext = [].concat(this.circleForm.netext)
      },
      //点击icon
      addRow(index,item){
        if(index == -1){
          this.show_add = false;
        }else{
          this.circleForm.netext[index].click = false;
        }
        let _item = {
          type:item,
          content:null,
          click:false
        };
        switch (item){
          case 'text':
            _item.content = '';
            break;
          case 'image':
            _item.content = [];
            break;
          case 'video':
            _item.content = {};
            break;
        }
        this.circleForm.netext.splice(index+1,0,_item);
      },
      //删除row
      cutType(index){
        this.circleForm.netext.splice(index,1);
      },
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
    .m-add-cut{
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      margin-left: 30px;
      .m-icon{
        display: block;
        width: 32px;
        height: 32px;
      }
      .m-add{
        position: relative;
        margin-right: 30px;
        .m-edit-icon{
          background-color: #eee;
          position: absolute;
          bottom: -42px;
          left: -50%;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: flex-end;
          border-radius: 10px;
          .m-icon-one{
            position: relative;
            margin: 0 10px;
          }
          img{
            display: block;
            width: 32px;
            height: 32px;

          }
        }
      }
    }
    .m-row{
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      /*margin-bottom: 20px;*/
      /*padding-right: 40px;*/

    }
  }

</style>
