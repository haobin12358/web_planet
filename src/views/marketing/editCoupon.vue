<template>
  <div class="container">
    <el-row>
      <el-col :span="21">
        <block-title title="基本信息"></block-title>
        <el-form :model="couponForm" :rules="rules" ref="couponForm" label-position="right" label-width="130px">
          <el-form-item label="优惠券名称：" prop="coname">
            <el-input v-model="couponForm.coname" style="width: 600px"></el-input>
          </el-form-item>
          <el-form-item label="标签名称：" prop="itids">
            <el-select v-model="itemList" multiple filterable placeholder="请选择" style="width: 600px" @visible-change="getItem">
              <el-option v-for="item in itemsList" :key="item.itid" :label="item.itname" :value="item.itid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优惠券描述：" prop="codesc">
            <el-input v-model="couponForm.codesc" style="width: 600px"></el-input>
          </el-form-item>
          <el-form-item label="优惠内容：">
            <el-radio-group v-model="radioDiscount">
              <el-radio :label="10">减价</el-radio>
              <el-radio :label="20">打折</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="减额：" prop="cosubtration" v-if="radioDiscount == 10">
            <el-input class="short-input" v-model="couponForm.cosubtration">
              <template slot="prepend">减</template>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="折扣：" prop="codiscount" v-if="radioDiscount == 20">
            <el-input class="short-input" v-model="couponForm.codiscount">
              <template slot="append">折</template>
            </el-input>
          </el-form-item>

          <el-form-item label="生效条件：" v-if="radioDiscount == 10">
            <el-radio-group v-model="radioMoney">
              <el-radio :label="0">无条件</el-radio>
              <el-radio :label="1">满减条件</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="codownline" v-if="radioMoney !== 0 && radioDiscount == 10">
            <el-input class="short-input" v-model="couponForm.codownline">
              <template slot="prepend">满</template>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>

          <el-form-item label="活动范围：">
            <el-radio-group v-model="radioPrPb">
              <el-radio :label="1">全平台参与</el-radio>
              <el-radio :label="2">自选品牌</el-radio>
              <el-radio :label="3">自选商品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自选品牌：" v-if="radioPrPb == 2">
            <el-select v-model="pbList" multiple filterable placeholder="请选择" style="width: 600px" @visible-change="getPbList">
              <el-option v-for="item in brandList" :key="item.pbid" :label="item.pbname" :value="item.pbid">
                <div style="float: left; width: 500px">{{ item.pbname }}</div>
                <img style="float: left; width: 35px; height: 35px" :src="item.pblogo">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自选商品：" v-if="radioPrPb == 3">
            <product :list="productList"></product>
            <el-button @click="productDialog = true" v-if="productList.length">点击选择</el-button>
            <el-button @click="getProduct" v-else>点击选择</el-button>
            <span class="form-item-end-tip" v-if="!productList.length">不选择商品代表全平台参与</span>
          </el-form-item>

          <el-form-item label="个人可拥有：" prop="colimitnum">
            <el-input class="short-input" v-model="couponForm.colimitnum">
              <template slot="append">张</template>
            </el-input>
          </el-form-item>
          <el-form-item label="个人可领取：" prop="cocollectnum">
            <el-input class="short-input" v-model="couponForm.cocollectnum">
              <template slot="append">张</template>
            </el-input>
          </el-form-item>
          <el-form-item label="可叠加使用：" prop="cousenum">
            <el-input class="short-input" v-model="couponForm.cousenum">
              <template slot="append">张</template>
            </el-input>
            <span class="form-item-end-tip" v-if="couponForm.cousenum == 0">0 代表无限制</span>
          </el-form-item>
          <el-form-item label="发放起止时间：">
            <el-date-picker
              v-model="cosendtime" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="可用起止时间：">
            <el-date-picker
              v-model="covalidtime" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="是否可用：" prop="product">
            <el-switch v-if="couponForm.coisavailable" v-model="iscoisavailable"
                       active-color="#409EFF" inactive-color="#DBDCDC"></el-switch>
          </el-form-item>
          <el-form-item label="是否可领取：" prop="product">
            <el-switch v-if="couponForm.coiscancollect" v-model="iscoiscancollect"
                       active-color="#409EFF" inactive-color="#DBDCDC"></el-switch>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="checkFormData">保存优惠券</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!--商品dialog-->
    <el-dialog v-el-drag-dialog :visible.sync="productDialog" width="1000px" top="5vh" title="商品绑定" :close-on-click-modal="false">
      <el-table v-loading="productLoading" :data="productsList" stripe height="65vh"
                @selection-change="handleSelectionChange" ref="productList">
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
      <span slot="footer">
        <el-button @click="productDialog = false">取 消</el-button>
        <el-button type="primary" @click="chooseProduct">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import product from '../../components/Product/product'
  import TableCellImg from "src/components/TableCellImg"
  import elDragDialog from 'src/directive/el-dragDialog'

  export default {
    name: 'Coupon',
    data() {
      return {
        couponForm: {
          coid: '',
          coname: '',
          cosubtration: '',
          codiscount: '',
          codownline: '',
          colimitnum: '1',
          cocollectnum: '1',
          cousenum: '1',
          cosendstarttime: '',
          cosendendtime: '',
          covalidstarttime: '',
          covalidendtime: '',
          coisavailable: true,
          coiscancollect: true,
          itids: [],
          prids: [],
          pbids: [],
        },
        rules: {
          coname: [
            { required: true, message: '优惠券名称必填', trigger: 'blur' }
          ],
          itids: [
            { required: true, message: '标签必选', trigger: 'blur' }
          ],
          cosubtration: [
            { required: true, message: '减额必填', trigger: 'blur' }
          ],
          cousenum: [
            { required: true, message: '可叠加使用数量必填', trigger: 'blur' }
          ]
        },
        radioDiscount: 10,
        radioMoney: 0,
        radioPrPb: 1,
        productList: [],
        productsList: [],
        productTempList: [],
        productDialog: false,
        productLoading: false,
        pbList: [],
        brandList: [],
        cosendtime: [],
        covalidtime: [],
        itemList: [],
        itemsList: [],
        iscoisavailable: true,
        iscoiscancollect: true,
      }
    },
    mounted() {

    },
    directives: { elDragDialog },
    components: { product, TableCellImg },
    watch: {
      // 选中的品牌
      pbList(val) {
        this.couponForm.pbids = val;
      },
      // 选中的标签
      itemList(val) {
        this.couponForm.itids = val;
      },
      radioDiscount(val) {
        if(val == 10) {
          this.couponForm.radioDiscount = 10;
          this.rules.cosubtration = [{ required: true, message: '减额必填', trigger: 'blur' }];
          this.rules.codiscount = []
        }else if(val == 20) {
          this.rules.codiscount = [{ required: true, message: '折扣必填', trigger: 'blur' }];
          this.rules.cosubtration = []
        }
      }
    },
    methods: {
      // 获取品牌列表
      getPbList(visible) {
        if(visible) {
          this.$http.get(this.$api.brand_list, { noLoading: true, params: { page_num: 1, page_size: 300 }}).then(res => {
            this.brandLoading = false;
            if (res.data.status == 200) {
              this.brandList = res.data.data;
            }
          })
        }
      },
      // 获取标签列表
      getItem(visible) {
        if(visible) {
          this.$http.get(this.$api.items_list, {
            noLoading: true, params: { ittype: 20 }}).then(res => {
            if (res.data.status == 200) {
              this.itemsList = res.data.data;
            }
          })
        }
      },
      // 获取商品列表
      getProduct() {
        this.productDialog = true;
        this.productLoading = true;
        this.$http.get(this.$api.product_list, {
          noLoading: true,
          params: {
            page_num: 1,
            page_size: 300
          }}).then(res => {
          if (res.data.status == 200) {
            this.productsList = res.data.data;
            this.productLoading = false;

            this.productList.forEach(row => {
              this.$refs.productList.toggleRowSelection(row);
            });
          }
        })
      },
      // 确认选中的商品
      chooseProduct() {
        this.productList = this.productTempList;
        this.productDialog = false;
      },
      // 勾选全部
      selectAll(val) {

      },
      // 勾选单行
      select(val, row) {

      },
      // 选择的商品在变化
      handleSelectionChange(val) {
        this.productTempList = val
      },
      // 保存优惠券
      checkFormData() {
        this.$refs.couponForm.validate(valid => {
          if (valid) {
            // 处理商品
            if(this.productList.length) {
              this.couponForm.product = [];
              for(let product of this.productList) {
                this.couponForm.product.push(product.prid)
              }
            }
            // 发放时间起止
            if(this.cosendtime.length) {
              this.couponForm.cosendstarttime = this.cosendtime[0];
              this.couponForm.cosendendtime = this.cosendtime[1]
            }
            // 可用时间起止
            if(this.covalidtime.length) {
              this.couponForm.covalidstarttime = this.covalidtime[0];
              this.couponForm.covalidendtime = this.covalidtime[1]
            }
            // 是否可用
            if(this.iscoisavailable) {
              this.couponForm.coisavailable = true
            }else {
              this.couponForm.coisavailable = false
            }
            // 是否可以领取
            if(this.iscoiscancollect) {
              this.couponForm.coiscancollect = true
            }else {
              this.couponForm.coiscancollect = false
            }
            if(this.couponForm.coid) {
              let title = '编辑';
              /*this.$http.post(this.$api.update_news, this.circleForm).then(res => {
                if (res.data.status == 200) {
                  this.$notify({
                    title: `${title}成功`,
                    message: `资讯标题：${this.couponForm.coname}成功`,
                    type: 'success'
                  });
                }
              });*/
            }else {
              let title = '新增';
              this.$http.post(this.$api.coupon_create, this.couponForm).then(res => {
                if (res.data.status == 200) {
                  this.initCouponForm();
                  this.$router.push('/marketing/coupon');
                  this.$notify({
                    title: `${title}成功`,
                    message: `优惠券${this.couponForm.coname}成功`,
                    type: 'success'
                  });
                }
              });
            }
          }else {
            this.$message.warning('请根据校验信息完善表单!');
          }
        })
      },
      // 初始化form
      initCouponForm() {
        this.itemList = [];
        this.productList = [];
        this.$refs.couponForm.resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .short-input {
      width: 300px;
    }
    .pblogo-img {
      /*width: ;*/
    }
  }
</style>
