<template>
  <div class="container">
    <!--<section class="fixed-right-top">-->
      <!--<el-tabs tab-position="right" @tab-click="goLabel2" style="height: 200px;">-->
        <!--<el-tab-pane label="基础数据" name="1">1</el-tab-pane>-->
        <!--<el-tab-pane label="基本信息" name="2">2</el-tab-pane>-->
        <!--<el-tab-pane label="详细信息" name="3">3</el-tab-pane>-->
      <!--</el-tabs>-->
    <!--</section>-->
    <!--<nav style="display: none">-->
      <!--<a href="#1" ref="1">基础数据</a>-->
      <!--<a href="#2" ref="2">基本信息</a>-->
      <!--<a href="#3" ref="3">详细信息</a>-->
    <!--</nav>-->


    <el-row>
      <el-col :span="16">
        <el-form ref="prodForm" :model="formData" :rules="rules" label-position="left" label-width="100px">
          <el-form-item id="1" label="所属品牌" prop="pbid">
            <el-select v-model="formData.pbid" style="width: 500px;" filterable placeholder="可搜索">
              <el-option v-for="item in brandOptions" :key="item.pbid" :label="item.pbname" :value="item.pbid">
                <span style="float: left">{{ item.pbname }}</span>
                <img v-lazy="item.pblogo" style="float: right;width: 32px;height: 32px;padding: 2px;" alt="">
              </el-option>
            </el-select>
            <!--<router-link v-permission="[ 'admin', 'super']" tag="span" to="/product/productBrand"-->
                         <!--class="form-item-end-tip">品牌不全?去新增 >-->
            <!--</router-link>-->
          </el-form-item>

          <!--<block-title title="基本信息"></block-title>-->

          <el-form-item  label="商品名称" prop="tctitle">
            <el-input v-model.trim="formData.tctitle" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="tcdescription">
            <el-input v-model.trim="formData.tcdescription" maxlength="1000"></el-input>
          </el-form-item>
          <el-form-item label="运费" prop="tcfreight">
            <el-input v-model.number="formData.tcfreight" maxlength="11" style="width: 200px;"></el-input>
          </el-form-item>

          <el-form-item id="2" label="押金" prop="tcdeposit">
            <el-input v-model.number="formData.tcdeposit" maxlength="11" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="押金期限(天)" prop="tcdeadline">
            <el-input v-model.number="formData.tcdeadline" maxlength="11" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="申请的活动期间" required>
            <el-col :span="11">
              <el-form-item prop="applystarttime">
                <el-date-picker type="date" v-model="formData.applystarttime" placeholder="活动起始日期(该天0点起)" :picker-options="pickerOptions"
                                value-format="yyyy-MM-dd HH:mm:ss"  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="middle-line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="applyendtime">
                <el-date-picker type="date" v-model="formData.applyendtime" placeholder="活动结束日期(该天24点止)" :picker-options="pickerOptions"
                                value-format="yyyy-MM-dd HH:mm:ss"  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="备注(商品列表说明)" prop="tcremarks">
            <el-input v-model="formData.tcremarks" maxlength="1000"></el-input>
          </el-form-item>

          <el-form-item label="商品规格" required>
            <!--工具栏-->
            <section class="form-item-sku">
              <!--商品规格tags管理, 颜色,规格...-->
              <section>
                <el-tag :key="tag" v-for="tag in formData.tcattribute" closable :disable-transitions="false"
                        @close="handleClose(tag)" @dblclick.native="edittcattribute(tag)">
                  {{tag}}
                </el-tag>

                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                          maxlength="100" @keyup.enter.native="handleInputConfirm" @blur="inputVisible=false" placeholder="例如:颜色,尺码">
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
            <el-table :data="formData.skus" :fit="true" :header-cell-class-name="headerCellFunction"
                      empty-text="请在左上方添加商品规格后,再点右上方按钮添加一行,最后补全该表格" style="width: 100%">
              <el-table-column label="图片" prop="img" align="center" width="120">
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
              <el-table-column :label="item" v-for="(item,index) in formData.tcattribute" :key="index"
                               align="center">
                <template slot-scope="scope">
                  <el-input maxlength="100" v-model.trim="scope.row.skuattritedetail[index]"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="库存" prop="stock" align="center">
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.skustock"  maxlength="11" ></el-input>
                </template>
              </el-table-column>

              <el-table-column label="操作" prop="action" align="center" width="120" fixed="right">
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
          </el-form-item>


          <!--<block-title title="详细信息"></block-title>-->

          <el-form-item id="3" label="商品主图" prop="tcmainpic">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              accept="image/*"
              :on-success="handleMainPicSuccess"
              :before-upload="beforeMainPicUpload"
            >
              <img v-if="formData.tcmainpic" :key="formData.tcmainpic" v-lazy="formData.tcmainpic" class="avatar">
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
              <div slot="tip" class="el-upload__tip">
                <span>可多选,建议为方形,大小不要超过15M,上传成功后会显示,上传大图请耐心等待.</span>
                <imgs-drag-sort style="display: inline-block;margin-left: 30px;" :list="imagesUrl"></imgs-drag-sort>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="底部长图(最多20张)" prop="tcdesc">
            <el-upload
              class="swiper-uploader"
              :action="uploadUrl"
              accept="image/*"
              list-type="picture-card"
              :file-list="tcdescUrl"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeImgsUpload"
              :on-remove="handletcdescRemove"
              :http-request="uploadtcdesc"
              :limit="20"
              :multiple="true">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">
                <span>可多选,大小不要超过15M,上传成功后会显示,上传大图请耐心等待.</span>
                <imgs-drag-sort style="display: inline-block;margin-left: 30px;" :list="tcdescUrl"></imgs-drag-sort>
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
      <el-button type="primary" @click="checkFormData(true)">保存商品</el-button>
      <!--<el-button type="primary" @click="checkFormData(false)">保存并停留</el-button>-->
    </section>

    <!--规格排序dialog-->
    <el-dialog :visible.sync="dialogSkuSortVisible" width="80%" title="确认规格顺序(拖动排序)">
      <section style="display: flex;align-items:flex-start;flex-wrap: wrap;">
        <kan-ban v-for="(item,index) in formData.tskuvalue" :key="index" :list="item"
                 class="kanban" :header-text="formData.tcattribute[index]"/>
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
  import KanBan from 'src/components/Kanban/index'
  import ImgsDragSort from 'src/components/ImgsDragSort/index'
  import draggable from 'vuedraggable'
  import permission from 'src/directive/permission/index.js' // 权限判断指令
  import {getStore, setStore} from "src/utils/index";


  const canZeroMoneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
  const moneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/;
  const positiveNumberReg = /^([1-9]\d*)$/;   //  正整数
  const natureNumberReg = /^(\d*)$/;   //  自然数

  export default {
    name: "TrialProductEdit",

    components: {
      KanBan,
      draggable,
      ImgsDragSort,
    },

    directives: {permission},

    watch: {
      imagesUrl(val) {
        this.formData.images = val.map((item, index) => {
          return {
            tcipic: item.url,
            tcisort: index,
            tciid: item.tciid,
          }
        });
      },
      tcdescUrl(val) {
        this.formData.tcdesc = val.map(item => item.url);
      },
      dialogSkuSortVisible(val) {
        if (!val) {
          this.goToIndexAfterSave = false;
        }
      },
    },

    data() {
      const startTimeValidator = (rule, value, callback) => {
        if(value && value < new Date){

        } else if (this.formData.applyendtime && value > this.formData.applyendtime) {
          callback(new Error('请确认时间大小关系!'))
        } else {
          callback();
        }
      };
      const endTimeValidator = (rule, value, callback) => {
        if (this.formData.applystarttime && value < this.formData.applystarttime) {
          callback(new Error('请确认时间大小关系!'))
        } else {
          callback();
        }
      };

      return {
        goToIndexAfterSave: false,

        formData: {
          tcid: '',

          pbid: "",
          tctitle: "",
          tcdescription: "",
          tcfreight: 0,

          tcdeposit: 0,
          tcdeadline: 0,
          applystarttime: '',
          applyendtime: '',
          tcremarks: '',

          tcattribute: [],
          skus: [],
          tskuvalue: [],

          tcmainpic: "",
          images: [],
          tcdesc: [],
        },
        rules: {
          pbid: [
            {required: true, message: '所属品牌必选', trigger: 'change'}
          ],
          tctitle: [
            {required: true, message: '商品名称必填', trigger: 'blur'}
          ],
          tcdescription: [
            {required: true, message: '商品描述必填', trigger: 'blur'}

          ],
          tcfreight: [
            {required: true, message: '运费必填', trigger: 'blur'},
            {pattern: canZeroMoneyReg, message: '请输入合理的运费(至多2位小数)', trigger: 'blur'}
          ],
          // prstocks: [
          //   {required: true, message: '库存必填', trigger: 'blur'},
          //   {pattern: positiveNumberReg, message: '请输入合理的库存', trigger: 'blur'}
          // ],

          tcdeposit: [
            {required: true, message: '押金数额必填', trigger: 'blur'},
            {pattern: moneyReg, message: '请输入合理的押金数额(至多2位小数)', trigger: 'blur'},
          ],
          tcdeadline: [
            {required: true, message: '押金期限必填', trigger: 'blur'},
            {pattern: positiveNumberReg, message: '请输入合理的押金天数', trigger: 'blur'},
          ],
          applystarttime: [
            {required: true, message: '活动开始时间必填', trigger: 'change'},
            {validator: startTimeValidator, trigger: 'change'},
          ],
          applyendtime: [
            {required: true, message: '活动结束时间必填', trigger: 'change'},
            {validator: endTimeValidator, trigger: 'change'},
          ],

          tcmainpic: [
            {required: true, message: '商品主图必传', trigger: 'change'},
          ],
          images: [
            {required: true, message: '商品轮播图必传', trigger: 'change'},
          ],
          tcdesc: [
            {required: true, message: '商品长图必传', trigger: 'change'},
          ],

        },

        // 品牌
        brandOptions: [],

        //  活动特有
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        },

        //  sku
        inputVisible: false,
        inputValue: '',

        uploadSkuImgIndex: 0,

        dialogSkuSortVisible: false,

        //  大图预览
        dialogImageUrl: '',
        dialogVisible: false,

        //  配合element组件,编辑用,需在init和watch中转换下
        imagesUrl: [],    //  详情页顶部轮播图
        tcdescUrl: [],       //  详情长图
      }
    },

    computed: {
      uploadUrl() {
        return this.$api.upload_file + getStore('token')+ '&type=product'
      }
    },

    methods: {
      goLabel(tag){
        // console.log(tag);
        // return
        // this.$refs[tag.name].click();
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

      //  规格
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;

        if (inputValue && !this.formData.tcattribute.includes(inputValue)) {
          this.formData.tcattribute.push(inputValue);
          this.inputVisible = false;
          this.inputValue = '';
        } else {
          this.$message.warning('不能为空或不能重名!');
        }
      },
      async edittcattribute(tag) {
        let prompt = await this.$prompt('请输入新的商品属性名', '提示', {
          inputValue: tag,
          inputValidator: value => {
            if (!value) {
              return '不能为空'
            } else if (this.formData.tcattribute.includes(value)) {
              if (tag == value) {
                return
              } else {
                return '不能重名'
              }
            }
          }
        });

        let index = this.formData.tcattribute.indexOf(tag);

        // this.$set()
        this.formData.tcattribute.splice(index, 1, prompt.value);
      },
      handleClose(tag) {
        let index = this.formData.tcattribute.indexOf(tag);

        this.formData.tcattribute.splice(index, 1);
        for (let i = 0; i < this.formData.skus.length; i++) {
          this.formData.skus[i].skuattritedetail.splice(index, 1);
        }
      },

      //  商品属性
      addOneSku() {
        if(this.formData.tcattribute.length){
          this.formData.skus.push({
            skupic: "",
            skustock: 0,
            skuattritedetail: new Array(this.formData.tcattribute.length)
          });
        }else{
          this.$message.warning('请先在左边新增商品规格')
        }
      },
      removeOneSku(index) {
        this.formData.skus.splice(index, 1);
      },

      headerCellFunction({row, column}){
        if(!column.property){
          return 'warning-header-cell'
        }
      },

      handleSkuPicSuccess(res, file) {
        this.formData.skus[this.uploadSkuImgIndex].skupic = res.data;
      },
      //  强行配合el-upload 下策
      setSkuPicIndex(index) {
        this.uploadSkuImgIndex = index;
      },

      //  sku排序
      showSkuSortDlg() {
        this.settskuvalue();
        this.dialogSkuSortVisible = true;
      },
      settskuvalue() {
        let num = this.formData.tcattribute.length,
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

        this.$set(this.formData, 'tskuvalue', rst);
      },

      //  预览图
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //  主图上传
      handleMainPicSuccess(res, file) {
        this.formData.tcmainpic = res.data;
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
        console.log(file);
        return false
        const isLt15M = file.size / 1024 / 1024 < 15;

        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }

        const legalImgArr = ['.jpg','.jpeg','.png','.gif'],
              isInLeagaArr = legalImgArr.includes(file)

        return isLt15M;
      },
      handleImagesRemove(file, fileList) {
        this.imagesUrl = this.imagesUrl.filter(
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
      handletcdescRemove(file, fileList) {
        this.tcdescUrl = this.tcdescUrl.filter(
          item => item.uid != file.uid
        );
      },
      uploadtcdesc(file) {
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

              this.tcdescUrl.push({
                name: file.file.name,
                url: data
              })
            }
          }
        )
      },

      //  配合的data转换成接口要求的 还是得放watch里配合校验信息
      convertToSave() {
        // this.formData.pcid = this.selectedOption[2];
        // this.formData.items = this.items.map(item => {
        //   return {
        //     itid: item
        //   }
        // });
      },

      //  保存
      doSaveProd() {
        if (this.formData.tcid) { //  编辑
          this.$http.post(this.$api.update_commodity, this.formData, {
          }).then(
            res => {
              if (res.data.status == 200) {
                let resData = res.data,
                    data = res.data.data;

                // if (this.goToIndexAfterSave) {
                //   this.$router.push('/activity/trialProduct');
                // }

                this.$router.push('/activity/trialProduct');
                this.$notify({
                  title: '商品编辑成功',
                  message: `商品名:${this.formData.tctitle}`,
                  type: 'success'
                });
                this.reset();
                this.dialogSkuSortVisible = false;
              }
            }
          )
        } else {
          this.$http.post(this.$api.commodity_add, this.formData, {
            params: {}
          }).then(
            res => {
              if (res.data.status == 200) {
                let resData = res.data,
                    data = res.data.data;

                // if (this.goToIndexAfterSave) {
                //   this.$router.push('/activity/trialProduct');
                // }
                this.$router.push('/activity/trialProduct');

                this.$notify({
                  title: '商品新增成功',
                  message: `商品名:${this.formData.tctitle}`,
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
              if (goToIndexAfterSave) {
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
        if (this.formData.tcattribute.length) {
          if (this.formData.skus.length) {
            for (let i = 0; i < this.formData.skus.length; i++) {
              let detailTip = '',
                currentSku = this.formData.skus[i];

              // 先判断外面的
              if (!currentSku.skupic) {
                detailTip += '-图片未传'
              }
              if (!currentSku.skustock || !positiveNumberReg.test(currentSku.skustock)) {
                detailTip += '-库存不符'
              }

              //  再看额外的
              for (let j = 0; j < currentSku.skuattritedetail.length; j++) {
                if (!currentSku.skuattritedetail[j]) {
                  detailTip += `-${this.formData.tcattribute[j]}未填`;
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
      convertFromEdit(data) {
        this.imagesUrl = data.image.map(item => {
          return {
            url: item.tcipic,
            tciid: item.tciid,
          }
        });
        this.tcdescUrl = data.tcdesc.map(item => {
          return {
            url: item
          }
        });

      },
      //  抽离出来的初始化
      init() {
        this.setBrand();

        if (this.$route.query.tcid) { //  编辑
          //  编辑更换的商品或之前是新增,数据替换
          if (this.$route.query.tcid != this.formData.tcid) {
            this.$http.get(this.$api.get_commodity_detail, {
              params: {
                tcid: this.$route.query.tcid,
              }
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                      data = res.data.data;

                  data.applystarttime = data.applystarttime + ' 00:00:00'
                  data.applyendtime = data.applyendtime + ' 00:00:00'

                  this.convertFromEdit(data);
                  this.formData = data;
                  this.$refs.prodForm.clearValidate();
                }
              }
            )
          } else {

          }
        } else {  //  新增
          //  编辑到新增
          if (this.formData.tcid) {
            this.reset();
          }
        }

        this.$refs.prodForm.clearValidate();
        this.$message({
          type: 'info',
          message: `当前是商品${this.$route.query.tcid ? '编辑' : '新增'}状态`,
          duration: '2000'
        });
      },
      //  重置(新增状态)
      reset() {
        this.formData = {
          tcid: '',

          pbid: "",
          tctitle: "",
          tcdescription: "",
          tcfreight: 0,

          tcdeposit: 0,
          tcdeadline: 0,
          applystarttime: '',
          applyendtime: '',
          tcremarks: '',

          tcattribute: [],
          skus: [],
          tskuvalue: [],

          tcmainpic: "",
          images: [],
          tcdesc: [],
        };
        this.imagesUrl = [];
        this.tcdescUrl = [];
      },
    },

    //  新增编辑共用一个,光新增和tcid不变时不会重置数据,
    activated() {
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

      .el-button {
        margin: 0;
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
