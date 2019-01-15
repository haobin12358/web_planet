<template>
  <div class="container">
    <el-row>
      <el-col :span="21">
        <block-title title="基本信息"></block-title>
        <el-form :model="couponForm" :rules="rules" ref="couponForm" label-position="left" label-width="130px">
          <el-form-item label="优惠券名称：" prop="coname">
            <el-input v-model="couponForm.coname" maxlength="32" style="width: 600px"></el-input>
          </el-form-item>
          <el-form-item label="标签名称：" prop="itids">
            <el-select v-model="itemList" multiple filterable placeholder="请选择" style="width: 600px">
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
            <el-input class="short-input" v-model="couponForm.codiscount" maxlength="3">
              <template slot="append">折</template>
            </el-input>
            <span class="form-item-end-tip" v-if="couponForm.codiscount > 10">折扣数不大于10</span>
          </el-form-item>

          <el-form-item label="生效条件：">
          <!--<el-form-item label="生效条件：" v-if="radioDiscount == 10">-->
            <el-radio-group v-model="radioMoney">
              <el-radio :label="0">无条件</el-radio>
              <el-radio :label="1">满减条件</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="codownline" v-if="radioMoney !== 0">
            <el-input class="short-input" v-model="couponForm.codownline">
              <template slot="prepend">满</template>
              <template slot="append">元</template>
            </el-input>
            <span class="form-item-end-tip" v-if="!couponForm.codownline">不填代表无门槛</span>
          </el-form-item>

          <el-form-item label="活动范围：">
            <el-radio-group v-model="radioPrPb">
              <el-radio :label="1">全平台参与</el-radio>
              <el-radio :label="2">自选品牌</el-radio>
              <el-radio :label="3">自选商品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自选品牌：" v-if="radioPrPb == 2">
            <el-select v-model="pbList" multiple filterable placeholder="请选择，不选择代表全平台参与" style="width: 600px">
              <el-option v-for="item in brandList" :key="item.pbid" :label="item.pbname" :value="item.pbid">
                <div style="float: left; width: 500px">{{ item.pbname }}</div>
                <img style="float: left; width: 35px; height: 35px" :src="item.pblogo">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自选商品：" v-if="radioPrPb == 3">
            <product :list="productList"></product>
            <!--<el-button @click="productDialog = true" v-if="productList.length">点击选择</el-button>-->
            <el-button @click="getProduct">点击选择</el-button>
            <span class="form-item-end-tip" v-if="!productList.length">不选择代表全平台参与</span>
          </el-form-item>

          <el-form-item label="发放数量：" prop="colimitnum">
            <el-input class="short-input" v-model="couponForm.colimitnum">
              <template slot="append">张</template>
            </el-input>
            <span class="form-item-end-tip" v-if="couponForm.colimitnum == 0">发放数量为0代表数量无限制</span>
          </el-form-item>
          <el-form-item label="个人可领取：" prop="cocollectnum">
            <el-input class="short-input" v-model="couponForm.cocollectnum">
              <template slot="append">张</template>
            </el-input>
          </el-form-item>
          <!--<el-form-item label="可叠加使用：" prop="cousenum">-->
            <!--<el-input class="short-input" v-model="couponForm.cousenum">-->
              <!--<template slot="append">张</template>-->
            <!--</el-input>-->
            <!--<span class="form-item-end-tip" v-if="couponForm.cousenum == 0">0 代表无限制</span>-->
          <!--</el-form-item>-->
          <el-form-item label="发放起止时间：">
            <el-date-picker
              v-model="cosendtime" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['', '23:59:59']"
              start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
            </el-date-picker>
            <span class="form-item-end-tip" v-if="!cosendtime.length">不选择时间代表创建即开始发放</span>
          </el-form-item>
          <el-form-item label="可用起止时间：">
            <el-date-picker
              v-model="covalidtime" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['', '23:59:59']"
              start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
            </el-date-picker>
            <span class="form-item-end-tip" v-if="!covalidtime.length">不选择时间代表任意时间可用</span>
          </el-form-item>

          <!--<el-form-item label="是否可用：" prop="product">
            <el-switch v-model="iscoisavailable"
                       active-color="#409EFF" inactive-color="#DBDCDC"></el-switch>
          </el-form-item>-->
          <el-form-item label="是否可领取：" prop="product">
            <el-switch v-model="iscoiscancollect"
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
      <el-table v-loading="productLoading" :data="productsList" stripe height="65vh" row-key="prid"
                @selection-change="handleSelectionChange" ref="productList">
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
          codesc: '',
          cosubtration: '1',
          codiscount: '10',
          codownline: '0',
          colimitnum: '1',
          cocollectnum: '1',
          // cousenum: '1',
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
            { required: true, message: '优惠券名称必填', trigger: 'blur' },
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
          ],
          itids: [
            { required: true, message: '标签必选', trigger: 'blur' }
          ],
          cosubtration: [
            { required: true, message: '减额必填', trigger: 'blur' }
          ],
          // cousenum: [
          //   { required: true, message: '可叠加使用数量必填', trigger: 'blur' }
          // ]
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
      this.getItem();          // 获取标签列表
      this.getPbList();        // 获取品牌列表
      if(this.$route.query.coupon) {
        this.editCoupon()      // 编辑优惠券时处理数据
      }
    },
    directives: { elDragDialog },
    components: { product, TableCellImg },
    watch: {
      // 处理选中的品牌
      pbList(val) {
        this.couponForm.pbids = val;
      },
      // 处理选中的标签
      itemList(val) {
        this.couponForm.itids = val;
      },
      // 减价、折扣
      radioDiscount(val) {
        if(val == 10) {
          this.couponForm.radioDiscount = 10;
          this.couponForm.codiscount = '10';
          this.couponForm.cosubtration = '1';
          this.rules.codiscount = []
          this.rules.cosubtration = [{ required: true, message: '减额必填', trigger: 'blur' }];
        }else if(val == 20) {
          this.rules.cosubtration = []
          this.couponForm.cosubtration = '0';
          this.couponForm.codiscount = '9.9';
          this.rules.codiscount = [{ required: true, message: '折扣必填', trigger: 'blur' }];
        }
      }
    },
    methods: {
      // 编辑优惠券时处理数据
      editCoupon() {
        let coupon = JSON.parse(this.$route.query.coupon);
        this.couponForm.coid = coupon.coid
        // 优惠券名称、描述
        this.couponForm.coname = coupon.coname;
        this.couponForm.codesc = coupon.codesc;
        // 处理标签
        for(let i in coupon.items) {
          this.itemList.push(coupon.items[i].itid)
        }
        // 优惠内容的radio
        if(coupon.codiscount < 10) { // 折扣
          this.radioDiscount = 20
          this.couponForm.codiscount = coupon.codiscount
        }else {     // 减额
          this.couponForm.cosubtration = coupon.cosubtration;
        }
        if(coupon.codownline) {    // 满减
          this.radioMoney = 1;
          this.couponForm.codownline = coupon.codownline
        }
        // 自选品牌
        if(coupon.brands) {
          this.radioPrPb = 2;
          this.pbList = [];
          for(let i in coupon.brands) {
            this.pbList.push(coupon.brands[i].pbid)
          }
        }
        // 自选商品
        if(coupon.products) {
          this.radioPrPb = 3;
          this.productList = coupon.products;
        }
        // 发放数量、个人可领取、可叠加使用
        this.couponForm.colimitnum = coupon.colimitnum;
        this.couponForm.cocollectnum = coupon.cocollectnum;
        // this.couponForm.cousenum = coupon.cousenum;
        if(coupon.cosendstarttime && coupon.cosendendtime) {
          // 发放时间起止
          this.cosendtime = [coupon.cosendstarttime, coupon.cosendendtime]
        }
        if(coupon.covalidstarttime && coupon.covalidendtime) {
          // 可用时间起止
          this.covalidtime = [coupon.covalidstarttime, coupon.covalidendtime]
        }
        // 是否可用
        if(coupon.coisavailable) {
          this.iscoisavailable = true
        }else {
          this.iscoisavailable = false
        }
        // 是否可以领取
        if(coupon.coiscancollect) {
          this.iscoiscancollect = true
        }else {
          this.iscoiscancollect = false
        }
      },
      // 获取品牌列表
      getPbList() {
        this.$http.get(this.$api.brand_list, { noLoading: true, params: { page_num: 1, page_size: 300 }}).then(res => {
          if (res.data.status == 200) {
            this.brandList = res.data.data;
          }
        })
      },
      // 获取标签列表
      getItem() {
        this.$http.get(this.$api.items_list, {
          noLoading: true, params: { ittype: 20 }}).then(res => {
          if (res.data.status == 200) {
            this.itemsList = res.data.data;
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
            page_num: 1,
            page_size: 200
          }}).then(res => {
          if (res.data.status == 200) {
            this.productsList = res.data.data;
            this.productLoading = false;
            // 选中之前勾选的商品
            for(let i in this.productList) {
              this.$refs.productList.toggleRowSelection(this.productList[i])
            }
          }
        })
      },
      // 确认选中的商品
      chooseProduct() {
        this.productList = this.productTempList;
        this.productDialog = false;
      },
      // 选择的商品在变化
      handleSelectionChange(val) {
        this.productTempList = val
      },
      // 保存优惠券
      checkFormData() {
        this.$refs.couponForm.validate(valid => {
          if (valid) {
            if(this.radioDiscount == 20) {
              // 折扣数要小于10
              if(this.couponForm.codiscount < 10) {

              }else {
                this.$message.warning('折扣数要小于10');
                return false
              }
            }
            // 非无条件时 - 满10减100不允许
            if(this.radioMoney == 1) {
              if(this.couponForm.codownline <= this.couponForm.cosubtration) {
                this.$message.warning('减额要小于满减条件');
                return false
              }
            }
            // 处理商品
            if(this.productList.length) {
              this.couponForm.prids = [];
              for(let product of this.productList) {
                this.couponForm.prids.push(product.prid)
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
              this.$http.post(this.$api.coupon_update, this.couponForm).then(res => {
                if (res.data.status == 200) {
                  this.$router.push('/marketing/coupon');
                  this.$notify({
                    title: `${title}成功`,
                    message: `优惠券：${this.couponForm.coname}编辑成功`,
                    type: 'success'
                  });
                  this.initCouponForm();
                }
              });
            }else {
              let title = '新增';
              this.$http.post(this.$api.coupon_create, this.couponForm).then(res => {
                if (res.data.status == 200) {
                  this.$router.push('/marketing/coupon');
                  this.$notify({
                    title: `${title}成功`,
                    message: `优惠券：${this.couponForm.coname + title}成功`,
                    type: 'success'
                  });
                  this.initCouponForm();
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
        // this.$refs.couponForm.resetFields();
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
