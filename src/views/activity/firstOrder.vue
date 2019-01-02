<template>
  <div class="container">
    <block-title title="新人首单商品列表"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="商品名称">
          <el-input v-model="kw"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="">查询</el-button>
          <el-button icon="el-icon-refresh" @click="">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="addNew">申请</el-button>
    </section>
    <get-sku @chooseSkus="chooseSkus" ref="new"></get-sku>
    <el-table v-loading="newLoading" :data="newList" stripe size="mini">
      <el-table-column label="商品图片" align="center" prop="prdescription">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.prmainpic" :key="scope.row.prmainpic"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="品牌" align="center" prop="pbname"></el-table-column>
      <el-table-column label="商品名称" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>
      <el-table-column label="列表显示价格" align="center" prop="prprice"></el-table-column>
     <!-- <el-table-column label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" class="danger-text" @click="deleteNew(scope)">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
  import getSku from './components/getsku'
  import TableCellImg from "src/components/TableCellImg"

  export default {
  name: "FirstOrder",
  data() {
    return {
      newList: [],
      newLoading: false,
      kw: ''
    }
  },
  components: { getSku, TableCellImg },
  mounted() {
    this.getNew()         // 获取新人首单商品列表
  },
  methods: {
    // 获取新人首单商品列表
    getNew() {
      this.newLoading = true;
      this.$http.get(this.$api.fresh_man_list, { noLoading: true,
        params: { page_num: this.page_num, page_size: this.page_size }}).then(res => {
        if (res.data.status == 200) {
          this.newList = res.data.data.fresh_man;
          this.total = res.data.total_count;
          this.newLoading = false;
        }
      })
    },
    // 添加新人商品
    addNew() {
      this.$refs.new.productDialog = true
    },
    chooseSkus(sku) {
      this.$http.post(this.$api.fresh_man_apply_award, sku).then(res => {
        if (res.data.status == 200) {
          this.$notify({
            title: '申请成功',
            message: res.data.message,
            type: 'success'
          });
          this.$refs.new.productDialog = false;
          this.$refs.new.skusDialog = false;
        }
      });
    },
    // 删除
    deleteNew(scope) {
      this.$confirm('此操作将删除该新人首单商品?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
        /*this.$http.post(this.$api.coupon_delete, { coid: scope.row.coid }).then(res => {
          if (res.data.status == 200) {
            this.couponList.splice(scope.$index, 1);
            this.$notify({
              title: '删除成功',
              message: `新人首单商品${scope.row.coname}删除成功`,
              type: 'success'
            });
          }
        })*/
      }).catch(() => { });
    },
  }
}
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .page-box {
      padding: 20px;
    }
  }
</style>

