<template>
  <el-dialog v-el-drag-dialog :visible.sync="productDialog" width="1000px" top="5vh" title="选择商品" :close-on-click-modal="false">
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
    <el-table v-loading="productLoading" :data="productList" stripe height="65vh" ref="productList">
      <el-table-column align="center" width="120" label="图片">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.prmainpic" :key="scope.row.prid"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>
      <el-table-column label="价格" align="center" prop="prprice"></el-table-column>
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


    <el-dialog v-el-drag-dialog :visible.sync="skusDialog" title="选择商品规格" width="1000px" top="10vh" :close-on-click-modal="false" append-to-body>
      <el-form :model="skusForm" ref="skusForm" label-position="right" label-width="120px">
        <el-form-item label="参与起止时间：">
          <el-date-picker
            v-model="fmfatime" type="daterange" value-format="yyyy-MM-dd"
            start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="列表显示价格：" prop="prprice">
          <el-input class="long-input" v-model="skusForm.prprice">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-table v-loading="skusLoading" :data="skusList" stripe height="500px" ref="skusList"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column align="center" width="120" label="图片">
          <template slot-scope="scope">
            <table-cell-img :src="scope.row.skupic" :key="scope.row.skuid"></table-cell-img>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" prop="skuname" show-overflow-tooltip></el-table-column>
        <el-table-column label="库存" align="center" prop="skustock"></el-table-column>
        <el-table-column label="参与数量" align="center" prop="skuprice">
          <template slot-scope="scope">
            <el-input class="short-input" v-model="scope.row.stock">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="价格" align="center" prop="skuprice"></el-table-column>
        <el-table-column label="参与价格" align="center" prop="skuprice">
          <template slot-scope="scope">
            <el-input class="short-input" v-model="scope.row.price">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="skusDialog = false">取 消</el-button>
        <el-button type="primary" @click="chooseSkus">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
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
        prid: ''
      }
    },
    props: {

    },
    directives: { elDragDialog },
    components: { TableCellImg },
    mounted() {
      this.getProduct()
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
        this.skus = val
      },
      chooseDone() {
        this.productDialog = false;
        this.skusDialog = false;
      },
      chooseSkus() {
        if(!this.skus.length) {
          this.$message.warning('请先勾选商品规格!');
          return false
        }
        if(!this.fmfatime.length) {
          this.$message.warning('请先选择参与起止时间!');
          return false
        }
        if(!this.skusForm.prprice) {
          this.$message.warning('请先填写列表显示价格!');
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
        this.$emit('chooseSkus', sku);
      },
      getProduct() {
        this.productLoading = true;
        this.$http.get(this.$api.product_list, {
          noLoading: true,
          params: {
            kw: this.kw,
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
            }
          }
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>

  .page-box {
    padding-top: 20px;
  }
  .long-input {
    width: 350px;
  }
  .short-input {
    width: 120px;
  }
</style>
