<template>
  <div class="container">
    <section class="fixed-right-top">
      <el-tabs tab-position="right" style="height: 200px;">
        <el-tab-pane label="基础数据"></el-tab-pane>
        <el-tab-pane label="基本信息"></el-tab-pane>
        <el-tab-pane label="详细信息"></el-tab-pane>
      </el-tabs>
    </section>

    <el-row>
      <el-col :span="16">
        <el-form ref="prodForm" :model="formData" :rules="rules" label-position="left" label-width="100px">
          <!--<block-title title="基础数据"></block-title>-->

          <el-form-item label="所属分类" prop="pcid">
            <el-cascader :options="categoryOptions" style="width: 500px;" :props="categoryProps"
                         @change="handlePcidChange"
                         v-model="selectedOption" placeholder="必须选中第三级分类,可搜索" :filterable="true">
            </el-cascader>
            <router-link v-permission="[ 'admin', 'super']" tag="span" to="/product/productCategory" class="form-item-end-tip">分类不全?去新增 ></router-link>
          </el-form-item>

          <el-form-item label="所属品牌" prop="pbid">
            <el-select v-model="formData.pbid" style="width: 500px;" filterable placeholder="可搜索">
              <el-option v-for="item in brandOptions" :key="item.pbid" :label="item.pbname" :value="item.pbid">
                <span style="float: left">{{ item.pbname }}</span>
                <img v-lazy="item.pblogo" style="float: right;width: 32px;height: 32px;padding: 2px;" alt="">
              </el-option>
            </el-select>
            <router-link v-permission="[ 'admin', 'super']" tag="span" to="/product/productBrand" class="form-item-end-tip">品牌不全?去新增 ></router-link>
          </el-form-item>

          <el-form-item label="关联标签" prop="items">
            <el-select v-model="items" style="width: 500px;" multiple filterable placeholder="可多选,可搜索">
              <el-option
                v-for="item in tagsOptions"
                :key="item.itid"
                :label="item.itname"
                :value="item.itid">
              </el-option>
            </el-select>
            <router-link v-permission="[ 'admin', 'super']" tag="span" to="/product/productTag" class="form-item-end-tip">标签不全?去新增 ></router-link>
          </el-form-item>

          <!--<block-title title="基本信息"></block-title>-->

          <el-form-item label="商品名称" prop="prtitle">
            <el-input v-model.trim="formData.prtitle"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="prdescription">
            <el-input v-model.trim="formData.prdescription"></el-input>
          </el-form-item>
          <el-form-item label="划线价格" prop="prlineprice">
            <el-input style="width: 200px;" v-model.number="formData.prlineprice"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="prprice">
            <el-input v-model.number="formData.prprice" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="运费" prop="prfreight">
            <el-input v-model.number="formData.prfreight" style="width: 200px;"></el-input>
          </el-form-item>

          <el-form-item label="商品规格" required>
            <!--工具栏-->
            <section class="form-item-sku">
              <!--商品规格tags管理, 颜色,规格...-->
              <section>
                <el-tag :key="tag" v-for="tag in formData.prattribute" closable :disable-transitions="false"
                        @close="handleClose(tag)" @dblclick.native="editPrAttribute(tag)">
                  {{tag}}
                </el-tag>

                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                          @keyup.enter.native="handleInputConfirm" @blur="inputVisible=false" placeholder="例如:颜色,尺码">
                </el-input>
                <el-tooltip v-else effect="dark" content="单击切换为输入框,回车保存"
                            placement="right">
                  <el-button class="button-new-tag" size="small" @click="showInput">+ 添加商品规格</el-button>
                </el-tooltip>
                <div class="tag-tip">双击修改,不能重名</div>
              </section>

              <!--添加属性table行-->
              <el-button type="primary" @click="addOneSku">添加一行商品属性</el-button>
            </section>

            <!--属性table-->
            <!--排序分组 todo-->
            <el-table :data="formData.skus" :fit="true" empty-text="请在左上方添加商品规格后,再在右上方添加一行,最后补全该表格" style="width: 100%">
              <el-table-column label="图片" align="center" width="120">
                <template slot-scope="scope">
                  <el-upload
                    class="avatar-uploader  small"
                    :action="uploadUrl"
                    :show-file-list="false"
                    accept="image/*"
                    :on-success="handleSkuPicSuccess"
                    :before-upload="beforeImgsUpload"
                    @click.native="setSkuPicIndex(scope.$index)"
                  >
                    <img v-if="scope.row.skupic" v-lazy="scope.row.skupic" :key="scope.row.skupic" class="avatar small">
                    <i v-else class="el-icon-plus avatar-uploader-icon small"></i>

                    <div slot="tip" class="el-upload__tip">

                    </div>
                  </el-upload>
                </template>
              </el-table-column>
              <!--自定商品规格-->
              <el-table-column :label="item" v-for="(item,index) in formData.prattribute" :key="index"
                               align="center">
                <template slot-scope="scope">
                  <el-input v-model.trim="scope.row.skuattritedetail[index]"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="价格" align="center">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.skuprice"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="库存" align="center">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.skustock"></el-input>
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center" width="120" fixed="right">
                <template slot-scope="scope">

                  <el-button icon="el-icon-minus" type="text" class="danger-text" @click="removeOneSku(scope.$index)">
                    移除该属性
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="form-item-end-tip">
              确认排序面板会在点击保存前弹出
            </div>
            <!--<section class="table-bottom">-->
            <!--<el-tooltip effect="dark" content="单击弹出输入面板" placement="right">-->
            <!--<el-button icon="el-icon-sort" @click="showSkuSortDlg">规格排序</el-button>-->
            <!--</el-tooltip>-->
            <!--</section>-->
          </el-form-item>


          <!--<block-title title="详细信息"></block-title>-->

          <el-form-item label="商品主图" prop="prmainpic">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              accept="image/*"
              :on-success="handleMainPicSuccess"
              :before-upload="beforeMainPicUpload"
            >
              <img v-if="formData.prmainpic" v-lazy="formData.prmainpic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>

              <div slot="tip" class="el-upload__tip">
                建议为方形,大小不要超过15M,上传成功后会显示,上传大图请耐心等待
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="顶部轮播图(最多9张)" prop="images">
            <el-upload
              class="swiper-uploader"
              :action="uploadUrl"
              accept="image/*"
              list-type="picture-card"
              :file-list="imagesUrl"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeImgsUpload"
              :on-remove="handleImagesRemove"
              :http-request="uploadImages"
              :limit="9"
              :multiple="true">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">可多选,建议为方形,大小不要超过15M,上传成功后会显示,上传大图请耐心等待.
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="底部长图(最多20张)" prop="prdesc">
            <el-upload
              class="swiper-uploader"
              :action="uploadUrl"
              accept="image/*"
              list-type="picture-card"
              :file-list="prDescUrl"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeImgsUpload"
              :on-remove="handlePrDescRemove"
              :http-request="uploadPrDesc"
              :limit="5"
              :multiple="true">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">可多选,大小不要超过15M,上传成功后会显示,上传大图请耐心等待.
              </div>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="checkFormData">保存商品</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <section class="tool-tip-wrap pin-right-bottom">
      <el-button type="primary" @click="checkFormData(true)">保存并跳转</el-button>
      <el-button type="primary" @click="checkFormData(false)">保存不跳转</el-button>
    </section>

    <!--规格排序dialog-->
    <el-dialog :visible.sync="dialogSkuSortVisible" width="80%" title="确认规格顺序(拖动排序)">
      <section style="display: flex;align-items:flex-start;flex-wrap: wrap;">
        <kan-ban v-for="(item,index) in formData.pskuvalue" :key="index" :list="item"
                 class="kanban" :header-text="formData.prattribute[index]"/>

        <!--<draggable v-for="(item,index) in formData.pskuvalue" :key="index" element="ul" v-model="item">-->
          <!--<li v-for="item in list">{{item.name}}</li>-->
        <!--</draggable>-->
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSkuSortVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSaveProd">确 定</el-button>
      </span>
    </el-dialog>

    <!--预览大图dialog-->
    <el-dialog :visible.sync="dialogVisible" top="8vh">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import KanBan from 'src/components/Kanban'
  import draggable from 'vuedraggable'
  import permission from 'src/directive/permission/index.js' // 权限判断指令
  import {getStore, setStore} from "src/utils/index";


  const canZeroMoneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
  const moneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/;
  const positiveNumberReg = /^([1-9]\d*)$/;   //  正整数
  const natureNumberReg = /^(\d*)$/;   //  自然数

  export default {
    name: "ProductEdit",

    components: {
      KanBan,
      draggable
    },

    directives: { permission },

    watch: {
      selectedOption(val){
        this.formData.pcid = val[2];
      },
      items(val){
        this.formData.items = this.items.map(item => {
          return {
            itid: item
          }
        });
      },
      imagesUrl(val) {
        this.formData.images = val.map((item, index) => {
          return {
            pipic: item.url,
            pisort: index,
            piid: item.piid,
          }
        });
      },
      prDescUrl(val) {
        this.formData.prdesc = val.map(item => item.url);
      },
      dialogSkuSortVisible(val){
        if(!val){
          this.goToIndexAfterSave = false;
        }
      },
    },

    data() {
      return {
        goToIndexAfterSave: false,

        formData: {
          prid: '',

          pcid: "",
          pbid: "",
          items: [],

          prtitle: "",
          prdescription: "",
          prprice: 0,
          prlineprice: 0,
          prfreight: 0,

          prattribute: [],
          skus: [],
          pskuvalue: [],

          prmainpic: "",
          images: [],
          prdesc: [],
        },
        rules: {
          pcid: [
            {required: true, message: '分类必选', trigger: 'change'}
          ],
          pbid: [
            {required: true, message: '所属品牌必选', trigger: 'change'}
          ],
          items: [
            {required: true, message: '关联标签必选', trigger: 'change'}
          ],
          prtitle: [
            {required: true, message: '商品名称必填', trigger: 'blur'}
          ],
          prdescription: [],
          prprice: [
            {required: true, message: '价格必填', trigger: 'blur'},
            {pattern: moneyReg, message: '请输入合理的价格(至多2位小数)', trigger: 'blur'},
          ],
          prlineprice: [
            {pattern: canZeroMoneyReg, message: '请输入合理的划线价格(至多2位小数)', trigger: 'blur'},
          ],

          prfreight: [
            {required: true, message: '运费必填', trigger: 'blur'},
            {pattern: canZeroMoneyReg, message: '请输入合理的运费(至多2位小数)', trigger: 'blur'}
          ],
          // prstocks: [
          //   {required: true, message: '库存必填', trigger: 'blur'},
          //   {pattern: positiveNumberReg, message: '请输入合理的库存', trigger: 'blur'}
          // ],

          prmainpic: [
            {required: true, message: '商品主图必传', trigger: 'change'},
          ],
          images: [
            {required: true, message: '商品轮播图必传', trigger: 'change'},
          ],
          prdesc: [
            {required: true, message: '商品长图必传', trigger: 'change'},
          ],

        },

        //分类
        categoryOptions: [],
        categoryProps: {
          value: 'pcid',
          label: 'pcname',
          children: 'subs',
        },

        // 品牌
        brandOptions: [],

        // 标签
        tagsOptions: [],

        //  sku
        inputVisible: false,
        inputValue: '',

        uploadSkuImgIndex: 0,

        dialogSkuSortVisible: false,

        //  大图预览
        dialogImageUrl: '',
        dialogVisible: false,

        //  配合element组件,编辑用,需在init和watch中转换下
        selectedOption: [], //  完整的三个分类id
        items: [], //  item
        imagesUrl: [],    //  详情页顶部轮播图
        prDescUrl: [],       //  详情长图
      }
    },

    computed: {
      uploadUrl() {
        return this.$api.upload_file + getStore('token')
      },
    },

    methods: {
      test(row) {
        console.log(row);
      },
      setCategory() {
        this.$http.get(this.$api.category_list, {
          params: {
            up: '',
            deep: 2
          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.categoryOptions = data;
            }
          });
      },
      handlePcidChange(val) {
        if (val.length < 3) {
          this.$message.warning('请选择第三级分类,分类不全请去商品分类页新增');
          this.selectedOption = [];
        } else {
          return
        }
      },

      setBrand() {
        this.$http.get(this.$api.brand_list, {
          params: {
            pbstatus: 'upper',
          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.brandOptions = data;
            }
          }
        )
      },

      setTags() {
        this.$http.get(this.$api.items_list, {
          params: {
            ittype: 0
          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.tagsOptions = data;
            }
          }
        )
      },

      //  规格
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;

        if (inputValue && !this.formData.prattribute.includes(inputValue)) {
          this.formData.prattribute.push(inputValue);
          this.inputVisible = false;
          this.inputValue = '';
        } else {
          this.$message.warning('不能为空或不能重名!');
        }
      },
      async editPrAttribute(tag) {
        let prompt = await this.$prompt('请输入新的商品属性名', '提示', {
          inputValue: tag,
          inputValidator: value => {
            if (!value) {
              return '不能为空'
            } else if (this.formData.prattribute.includes(value)) {
              if (tag == value) {
                return
              } else {
                return '不能重名'
              }
            }
          }
        });

        let index = this.formData.prattribute.indexOf(tag);

        // this.$set()
        this.formData.prattribute.splice(index, 1, prompt.value);
      },
      handleClose(tag) {
        let index = this.formData.prattribute.indexOf(tag);

        this.formData.prattribute.splice(index, 1);
        for (let i = 0; i < this.formData.skus.length; i++) {
          this.formData.skus[i].skuattritedetail.splice(index, 1);
        }
      },

      //  商品属性
      addOneSku() {
        this.formData.skus.push({
          skupic: "",
          skuprice: 0,
          skustock: 0,
          skuattritedetail: new Array(this.formData.prattribute.length)
        });
      },
      removeOneSku(index) {
        this.formData.skus.splice(index, 1);
      },

      handleSkuPicSuccess(res, file) {
        console.log('skuitem 已上传');
        this.formData.skus[this.uploadSkuImgIndex].skupic = res.data;
      },
      //  强行配合el-upload 下策
      setSkuPicIndex(index) {
        this.uploadSkuImgIndex = index;
      },

      //  sku排序
      showSkuSortDlg() {
        this.setPSkuValue();
        this.dialogSkuSortVisible = true;
      },
      setPSkuValue() {
        let num = this.formData.prattribute.length,
          rst = [];

        for (let i = 0; i < num; i++) {
          rst.push([])
        }

        for (let i = 0; i < this.formData.skus.length; i++) {
          for (let j = 0; j < num; j++) {
            let currentSkuAttrVal = this.formData.skus[i].skuattritedetail[j];

            if (currentSkuAttrVal && !rst[j].includes(currentSkuAttrVal)) {
              rst[j].push(currentSkuAttrVal);
            }
          }
        }

        this.$set(this.formData, 'pskuvalue', rst);
      },

      //  预览图
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //  主图上传
      handleMainPicSuccess(res, file) {
        this.formData.prmainpic = res.data;
      },
      beforeMainPicUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;

        if (!isLt15M) {
          this.$message.error('上传商品图片大小不能超过 15MB!');
        }


        return isLt15M;
      },

      //  轮播图和长图
      beforeImgsUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;

        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }

        return isLt15M;
      },
      handleImagesRemove(file, fileList) {
        this.imagesUrl =  this.imagesUrl.filter(
          item => item.uid != file.uid
        )
      },
      uploadImages(file) {
        let formData = new FormData();

        formData.append('file', file.file)

        this.$http({
          method: 'post',
          url: this.uploadUrl,
          data: formData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = resData.data;

              this.imagesUrl.push({
                name: file.file.name,
                url: data,
              })
            }
          }
        )
      },
      //  长图
      handlePrDescRemove(file, fileList) {
        this.prDescUrl = this.prDescUrl.filter(
          item => item.uid != file.uid
        );
      },
      uploadPrDesc(file) {
        let formData = new FormData();

        formData.append('file', file.file)

        this.$http({
          method: 'post',
          url: this.uploadUrl,
          data: formData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = resData.data;

              this.prDescUrl.push({
                name: file.file.name,
                url: data
              })
            }
          }
        )
      },

      //  配合的data转换成接口要求的 还是得放watch里配合校验信息
      convertToSave(){
        // this.formData.pcid = this.selectedOption[2];
        // this.formData.items = this.items.map(item => {
        //   return {
        //     itid: item
        //   }
        // });
      },

      //  保存
      doSaveProd() {
        if(this.formData.prid){ //  编辑
          this.$http.post(this.$api.update_product, this.formData, {
            params: {
            }
          }).then(
            res => {
              if (res.data.status == 200) {
                let resData = res.data,
                    data = res.data.data;

                if(this.goToIndexAfterSave){
                  this.$router.push('/product');
                }

                this.$notify({
                  title: '商品编辑成功',
                  message: `商品名:${this.formData.prtitle}`,
                  type: 'success'
                });
                this.reset();
                this.dialogSkuSortVisible = false;
              }
            }
          )
        }else{
          this.$http.post(this.$api.create_product, this.formData, {
            params: {
            }
          }).then(
            res => {
              if (res.data.status == 200) {
                let resData = res.data,
                    data = res.data.data;

                if(this.goToIndexAfterSave){
                  this.$router.push('/product');
                }


                this.$notify({
                  title: '商品新增成功',
                  message: `商品名:${this.formData.prtitle}`,
                  type: 'success'
                });
                this.reset();
                this.dialogSkuSortVisible = false;
              }
            }
          )
        }
      },
      //  formData.skuvalue(规格属性排序)干扰因素过多,所以需要用户最后确认
      //  该方法是确认前对其他参数的校验,最后在排序面板点确认触发doSaveProd
      checkFormData(goToIndexAfterSave) {
        this.$refs.prodForm.validate(
          valid => {
            if (valid) {
              let checkSkuRst = this.checkSkuData();

              if (checkSkuRst) {
                this.$message.warning(checkSkuRst)
                return
              }
              if(goToIndexAfterSave){
                this.goToIndexAfterSave = true;
              }

              this.showSkuSortDlg()
            } else {
              this.$message.warning('请根据校验信息完善表单!');
            }
          }
        )
      },
      //  校验sku
      checkSkuData() {
        if (this.formData.prattribute.length) {
          if (this.formData.skus.length) {
            for (let i = 0; i < this.formData.skus.length; i++) {
              let detailTip = '',
                currentSku = this.formData.skus[i];

              // 先判断外面的
              if (!currentSku.skupic) {
                detailTip += '-图片未传'
              }
              if (!currentSku.skuprice || !moneyReg.test(currentSku.skuprice)) {
                detailTip += '-价格不符'
              }
              if (!currentSku.skustock || !positiveNumberReg.test(currentSku.skustock)) {
                detailTip += '-库存不符'
              }

              //  再看额外的
              for (let j = 0; j < currentSku.skuattritedetail.length; j++) {
                if (!currentSku.skuattritedetail[j]) {
                  detailTip += `-${this.formData.prattribute[j]}未填`;
                }
              }

              if (detailTip) {
                return `第${i + 1}行信息不全!` + detailTip;
              } else {
                return
              }
            }
          } else {
            return '至少需要有一行商品属性'
          }
        } else {
          return '请先添加商品规格!'
        }
      },

      //  编辑时,已保存的商品数据转换成组件要的
      convertFromEdit(data){
        this.selectedOption = data.pcids;
        this.items = data.items.map(item => item.itid);

        this.imagesUrl = data.images.map(item => {
          return {
            url: item.pipic,
            piid: item.piid,
          }
        });
        this.prDescUrl = data.prdesc.map(item => {
          return {
            url: item
          }
        });

      },
      //  抽离出来的初始化
      init(){
        this.setCategory();
        this.setBrand();
        this.setTags();

        if(this.$route.query.prid){ //  编辑
          //  编辑更换的商品或之前是新增,数据替换
          if(this.$route.query.prid!=this.formData.prid){
            this.$http.get(this.$api.product_get,{
              params: {
                prid: this.$route.query.prid,
              }
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.convertFromEdit(data);
                  this.formData = data;
                  this.$refs.prodForm.clearValidate();
                }
              }
            )
          }else{

          }
        }else{  //  新增
          //  编辑到新增
          if(this.formData.prid){
            this.reset();
          }
        }

        this.$refs.prodForm.clearValidate();
        this.$message({
          type: 'info',
          message: `当前是商品${this.$route.query.prid? '编辑':'新增'}状态`,
          duration: '2000'
        });
      },
      //  重置(新增状态)
      reset(){
          this.formData = {
            prid: '',

            pcid: "",
            pbid: "",
            items: [],

            prtitle: "",
            prdescription: "",
            prprice: 0,
            prlineprice: 0,
            prfreight: 0,

            prattribute: [],
            skus: [],
            pskuvalue: [],

            prmainpic: "",
            images: [],
            prdesc: [],
          };
          this.selectedOption = [];
          this.items = [];
          this.imagesUrl = [];
          this.prDescUrl = [];
      },
    },

    //  新增编辑共用一个,光新增和prid不变时不会重置数据,
    activated() {
      //  todo  编辑时回显
      this.init();
    },

    //  当前keepAlive bug: 当还没打开过该页面时,打开会执行 created和activated
    //  除了多调一遍接口,问题不大
    mounted() {
      this.init();
    }
    ,
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    position: relative;
    .fixed-right-top {
      position: fixed;
      right: 0;
    }

    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 140px;
      margin-left: 10px;
      vertical-align: bottom;
    }

    .form-item-sku {
      .fj();
      align-items: flex-start;

      .tag-tip {
        color: #909399;
        font-size: 12px;
      }

    }

    .kanban {
      margin-right: 20px;
      margin-bottom: 20px;

    }

    .pin-right-bottom {
      position: fixed;
      right: 3rem;
      bottom: 2rem;
      font-size: .22rem;
      .fjc();
      align-items: center;

      .el-button{
        margin: 0;
        margin-bottom: 20px;

        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
</style>
