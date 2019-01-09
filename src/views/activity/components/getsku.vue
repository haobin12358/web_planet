<template>
  <div>
    <el-dialog v-el-drag-dialog :visible.sync="productDialog" width="1200px" top="5vh" title="选择商品" :close-on-click-modal="false">
      <section class="tool-bar space-between" style="margin-top: -30px">
        <el-form :inline="true" size="medium">
          <el-form-item label="商品名称">
            <el-input v-model="kw"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
      <el-table v-loading="productLoading" :data="productList" stripe height="65vh">
        <el-table-column align="center" width="120" label="图片">
          <template slot-scope="scope">
            <table-cell-img :src="scope.row.prmainpic" :key="scope.row.prid"></table-cell-img>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>
        <el-table-column label="价格" align="center" prop="prprice"></el-table-column>
        <el-table-column label="库存" align="center" prop="prstocks"></el-table-column>
        <el-table-column label="品牌" align="center" prop="brand.pbname"></el-table-column>
        <el-table-column label="销量" align="center" prop="prsalesvalue"></el-table-column>
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="chooseProduct(scope)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background class="page-box tc" :page-sizes="[10, 20, 30, 40]" :current-page="page_num"
                     :page-size="page_size" :total="total" layout="total, sizes, prev, pager, next, jumper"
                     @size-change="sizeChange" @current-change="pageChange"></el-pagination>
    </el-dialog>


    <el-dialog v-el-drag-dialog :visible.sync="skusDialog" title="选择商品规格" width="1000px" top="10vh" :close-on-click-modal="false">
      <!--新人首单-->
      <el-form :model="skusForm" label-position="right" label-width="120px" v-if="where == 'new'">
        <el-form-item label="参与起止时间：">
          <el-date-picker
            v-model="fmfatime" type="daterange" value-format="yyyy-MM-dd" :picker-options="pickerOptions"
            start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="列表显示价格：" prop="prprice">
          <el-input class="long-input" v-model="skusForm.prprice">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <!--竞猜奖品-->
      <el-form label-position="right" label-width="120px" v-if="where == 'guess'">
        <el-form-item label="参与时间：">
          <el-date-picker class="dates-box" type="dates" value-format="yyyy-MM-dd" :picker-options="pickerOptions"
                          v-model="gnaastarttime" placeholder="选择一个或多个日期" :disabled="isEdit">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!--魔盒奖品-->
      <el-form label-position="right" label-width="120px" inline v-if="where == 'magic'" style="margin-top: -30px">
        <el-form-item label="参与时间：">
          <el-date-picker class="dates-box" type="dates" value-format="yyyy-MM-dd" :picker-options="pickerOptions"
                          v-model="mbastarttime" placeholder="选择一个或多个日期" :disabled="isEdit">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="第一档:">
          <span>随机减少</span>
          <el-input class="item-input" v-model="numList[0]"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[1]"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="第二档:">
          <span>随机减少</span>
          <el-input class="item-input" v-model="numList[2]"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[3]"></el-input>
          <span>元</span>
          <span class="span-or">或</span>
          <span>随机增加</span>
          <el-input class="item-input" v-model="numList[4]"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[5]"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="第三档:">
          <span>随机减少</span>
          <el-input class="item-input" v-model="numList[6]"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[7]"></el-input>
          <span>元</span>
          <span class="span-or">或</span>
          <span>随机增加</span>
          <el-input class="item-input" v-model="numList[8]"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[9]"></el-input>
          <span>元</span>
        </el-form-item>
      </el-form>
      <!--表格部分-->
      <el-table v-loading="skusLoading" :data="skusList" stripe :height="height"
                @selection-change="handleSelectionChange" row-key="skuid" ref="skuList">
        <el-table-column type="selection" :reserve-selection="false"></el-table-column>
        <el-table-column align="center" width="120" label="图片">
          <template slot-scope="scope">
            <table-cell-img :src="scope.row.skupic" :key="scope.row.skuid"></table-cell-img>
          </template>
        </el-table-column>
        <el-table-column label="规格名称" align="center" prop="skuname" show-overflow-tooltip></el-table-column>
        <el-table-column label="库存" align="center" prop="skustock"></el-table-column>
        <el-table-column label="参与数量" align="center" prop="skuprice">
          <template slot-scope="scope">
            <el-input class="short-input" v-model="scope.row.stock" :disabled="isEdit">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="原价" align="center" prop="skuprice" v-if="where !== 'magic'"></el-table-column>
        <el-table-column label="最高价格" align="center" prop="skuprice" v-else>
          <template slot-scope="scope">
            <el-input class="short-input" v-model="scope.row.maxprice">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="参与价格" align="center" prop="skuprice" v-if="where !== 'magic'">
          <template slot-scope="scope">
            <el-input class="short-input" v-model="scope.row.price">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="最低价格" align="center" prop="skuprice" v-else>
          <template slot-scope="scope">
            <el-input class="short-input" v-model="scope.row.price">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="skusDialog = false">取 消</el-button>
        <el-button type="primary" @click="chooseSkus" v-if="isEdit">重新申请</el-button>
        <el-button type="primary" @click="chooseSkus" v-else>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import TableCellImg from "src/components/TableCellImg"
  import elDragDialog from 'src/directive/el-dragDialog'

  export default {
    data() {
      return {
        kw: '',
        productDialog: false,
        productLoading: false,
        productList: [],
        page_size: 10,
        page_num: 1,
        total: 0,
        skusDialog: false,
        skusLoading: false,
        skusList: [],
        skus: [],
        fmfatime: [],
        skusForm: {
          prprice: ''
        },
        prid: '',
        gnaastarttime: [],
        mbastarttime: [],
        height: '500px',
        numList: [1, 2, 3, 5, 5, 10, 5, 10, 20, 30],
        isEdit: false,
        pickerOptions: {         // 日期选择器的时间限制
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      }
    },
    props: {
      where: { type: String, default: '' }
    },
    directives: { elDragDialog },
    components: { TableCellImg },
    mounted() {
      this.getProduct();
      if(this.where == 'magic') {
        this.height = '400px'
      }
    },
    methods: {
      sizeChange(val) {
        this.page_size = val;
        this.getProduct()
      },
      pageChange(val) {
        this.page_num = val;
        this.getProduct()
      },
      search() {
        this.page_num = 1;
        this.getProduct()
      },
      reset() {
        this.kw = '';
        this.page_num = 1;
        this.getProduct()
      },
      // 选择的skus在变化
      handleSelectionChange(val) {
        if(this.where == 'new') {
          this.skus = val
        }else if(this.where == 'guess' || this.where == 'magic') {
          if(val.length > 1) {
            this.$message.warning('请单选商品规格');
            this.skus = []
          }else {
            this.skus = val
          }
        }
      },
      chooseDone() {
        this.productDialog = false;
        this.skusDialog = false;
      },
      chooseSkus() {
        if(this.where == 'new') {               // 新人首单
          if(!this.skus.length) {
            this.$message.warning('请先勾选商品规格');
            return false
          }
          if(!this.fmfatime.length) {
            this.$message.warning('请先选择参与起止时间');
            return false
          }
          if(!this.skusForm.prprice) {
            this.$message.warning('请先填写列表显示价格');
            return false
          }
          let sku = {
            prid: this.prid,
            fmfastarttime: this.fmfatime[0],
            fmfaendtime: this.fmfatime[1],
            prprice: this.skusForm.prprice,
            skus: []
          };
          for(let i in this.skus) {
            let skus = {
              skuid: this.skus[i].skuid,
              skustock: this.skus[i].stock,
              skuprice: this.skus[i].price
            };
            sku.skus.push(skus)
          }
          this.$emit('chooseSkus', sku, this.isEdit);
        }else if(this.where == 'guess') {       // 竞猜奖品
          if(!this.skus.length) {
            this.$message.warning('请先单选商品规格');
            return false
          }
          if(this.skus.length > 1) {
            this.$message.warning('请单选商品规格');
            return false
          }
          if(!this.gnaastarttime.length) {
            this.$message.warning('请至少选择一个日期');
            return false
          }
          let sku = {
            skuid: this.skus[0].skuid,
            prid: this.prid,
            gnaastarttime: this.gnaastarttime,
            skuprice: this.skus[0].price,
            skustock: this.skus[0].stock
          };
          this.$emit('chooseSkus', sku, this.isEdit);
        }else if(this.where == 'magic') {       // 魔盒奖品
          if(!this.skus.length) {
            this.$message.warning('请先单选商品规格');
            return false
          }
          if(this.skus.length > 1) {
            this.$message.warning('请单选商品规格');
            return false
          }
          if(!this.mbastarttime.length) {
            this.$message.warning('请至少选择一个日期');
            return false
          }
          let sku = {
            skuid: this.skus[0].skuid,
            prid: this.prid,
            mbastarttime: this.mbastarttime,
            skuminprice: this.skus[0].price,
            skuprice: this.skus[0].maxprice,
            skustock: this.skus[0].stock,
            gearsone: [this.numList[0] + '-' + this.numList[1]],
            gearstwo: [this.numList[2] + '-' + this.numList[3], this.numList[4] + '-' + this.numList[5]],
            gearsthree: [this.numList[6] + '-' + this.numList[7], this.numList[8] + '-' + this.numList[9]],
          };
          this.$emit('chooseSkus', sku, this.isEdit);
        }
      },
      getProduct() {
        this.productLoading = true;
        this.$http.get(this.$api.product_list, {
          noLoading: true,
          params: {
            kw: this.kw,
            prstatus: 'usual',
            page_num: this.page_num,
            page_size: this.page_size
          }}).then(res => {
          if (res.data.status == 200) {
            this.productList = res.data.data;
            this.total = res.data.total_count;
            this.productLoading = false;
          }
        })
      },
      chooseProduct(scope) {
        this.initDialog();
        // 获取选择的商品信息
        this.prid = scope.row.prid;
        this.$http.get(this.$api.product_get, {
          noLoading: true,
          params: {
            prid: this.prid
          }}).then(res => {
          if (res.data.status == 200) {
            this.skusList = res.data.data.skus;
            this.skusDialog = true;
            for(let i in this.skusList) {
              this.skusList[i].skuname = '';
              for(let j in this.skusList[i].skuattritedetail) {
                this.skusList[i].skuname += this.skusList[i].skuattritedetail[j] + ' '
              }
              this.skusList[i].stock = 1;
              this.skusList[i].price = 0.01;
              this.skusList[i].maxprice = this.skusList[i].skuprice;
            }
            // 编辑时处理数据
            if(scope.row.where) {
              this.isEdit = true;
              this.editActivity(scope);
            }
          }
        });
      },
      // 初始化dialog
      initDialog() {
        this.skus = [];
        this.fmfatime = [];
        this.gnaastarttime = [];
        this.mbastarttime = [];
        this.skusForm.prprice = ''
      },
      // 编辑时处理数据
      editActivity(scope) {
        if(scope.row.where == 'new') {
          this.fmfatime = [scope.row.fmfastarttime, scope.row.fmfaendtime];
          this.skusForm.prprice = scope.row.fresh_product.prprice;
          // 倒计时
          const TIME_COUNT = 1;
          let count = TIME_COUNT;
          let time = setInterval(() => {
            if(count > 0 && count <= TIME_COUNT) {
              count --;
            }else {
              // 选中之前勾选的商品
              for(let i in scope.row.fresh_product.sku) {
                for(let j in this.skusList) {
                  if(scope.row.fresh_product.sku[i].skuid == this.skusList[j].skuid) {
                    this.skusList[j].stock = scope.row.fresh_product.sku[i].fmfpstock;
                    this.skusList[j].price = scope.row.fresh_product.sku[i].skuprice;
                    this.$refs.skuList.toggleRowSelection(this.skusList[j])
                  }
                }
              }
              clearInterval(time);
            }
          }, 10);
        }else if(scope.row.where == 'guess') {
          this.gnaastarttime = [scope.row.gnaastarttime];
          // 倒计时
          const TIME_COUNT = 1;
          let count = TIME_COUNT;
          let time = setInterval(() => {
            if(count > 0 && count <= TIME_COUNT) {
              count --;
            }else {
              // 选中之前勾选的商品
              for(let i in this.skusList) {
                if(scope.row.skuid == this.skusList[i].skuid) {
                  this.skusList[i].stock = scope.row.skustock;
                  this.skusList[i].price = scope.row.skuprice;
                  this.$refs.skuList.toggleRowSelection(this.skusList[i])
                }
              }
              clearInterval(time);
            }
          }, 10);
        }else if(scope.row.where == 'magic') {
          this.mbastarttime = [scope.row.mbastarttime];
          this.numList = [];
          for(let i in scope.row.gearsone[0].split('-')) {
            this.numList.push(scope.row.gearsone[0].split('-')[i])
          }
          for(let i in scope.row.gearstwo) {
            for(let j in scope.row.gearstwo[i].split('-')) {
              this.numList.push(scope.row.gearstwo[i].split('-')[j])
            }
          }
          for(let i in scope.row.gearsthree) {
            for(let j in scope.row.gearsthree[i].split('-')) {
              this.numList.push(scope.row.gearsthree[i].split('-')[j])
            }
          }
          // 倒计时
          const TIME_COUNT = 1;
          let count = TIME_COUNT;
          let time = setInterval(() => {
            if(count > 0 && count <= TIME_COUNT) {
              count --;
            }else {
              // 选中之前勾选的商品
              for(let i in this.skusList) {
                if(scope.row.skuid == this.skusList[i].skuid) {
                  this.skusList[i].stock = scope.row.skustock;
                  this.skusList[i].price = scope.row.skuminprice;
                  this.skusList[i].maxprice = scope.row.skuprice;
                  this.$refs.skuList.toggleRowSelection(this.skusList[i])
                }
              }
              clearInterval(time);
            }
          }, 10);
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../styles/myIndex";

  .page-box {
    padding-top: 20px;
  }
  .long-input {
    width: 350px;
  }
  .middle-input {
    width: 183px;
  }
  .short-input {
    width: 130px;
  }
  .dates-box {
    width: 500px;
  }
  .item-input {
    .wl(4.5rem, 0.4rem);
  }
  .span-or {
    margin: 0 0.4rem;
  }
  .action-button {
    padding: .1rem .2rem;
  }
</style>
