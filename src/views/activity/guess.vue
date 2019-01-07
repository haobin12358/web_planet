<template>
  <div class="container">
    <block-title title="申请列表"></block-title>
    <el-button type="primary" class="add-guess-btn" icon="el-icon-plus" @click="addGuess">申请</el-button>
    <get-sku @chooseSkus="chooseSkus" ref="guess" where="guess"></get-sku>
    <el-table v-loading="guessLoading" :data="guessList" stripe size="mini">
      <el-table-column label="商品规格图片" align="center" prop="prdescription">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.skupic" :key="scope.row.skupic"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="品牌" align="center" prop="pbname"></el-table-column>
      <el-table-column label="商品名称" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>
      <el-table-column label="参与日期" align="center" prop="gnaastarttime"></el-table-column>
      <el-table-column label="参与价格" align="center" prop="skuprice"></el-table-column>
      <el-table-column label="参与数量" align="center" prop="skustock"></el-table-column>
      <el-table-column label="申请状态" align="center" prop="gnaastatus_zh"></el-table-column>
      <el-table-column label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editGuess(scope)" v-if="scope.row.gnaastatus == -20">编辑</el-button>
          <el-button type="text" class="danger-text" @click="deleteGuess(scope)"
                     v-if="scope.row.gnaastatus == 0">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background class="page-box tc" :page-sizes="[10, 20, 30, 40]" :current-page="page_num"
                   :page-size="page_size" :total="total" layout="total, sizes, prev, pager, next, jumper"
                   @size-change="sizeChange" @current-change="pageChange"></el-pagination>
  </div>
</template>

<script>
  import getSku from './components/getsku'
  import TableCellImg from "src/components/TableCellImg"

  export default {
    name: "Guess",
    data() {
      return {
        guessLoading: false,
        guessList: [],
        page_size: 10,
        page_num: 1,
        total: 0,
        scope: {}             // 暂存scope
      }
    },
    components: { getSku, TableCellImg },
    mounted() {
      this.getGuess();        // 获取自己的猜数字奖品申请列表
    },
    methods: {
      // 申请添加竞猜奖品-按钮
      addGuess() {
        this.$refs.guess.isEdit = false;
        this.$refs.guess.productDialog = true
      },
      // 申请添加竞猜奖品
      chooseSkus(sku, isEdit) {
        if(isEdit) {
          sku.gnaaid = this.scope.row.gnaaid;
          this.$http.post(this.$api.guess_num_update_apply, sku).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '编辑成功',
                message: res.data.message,
                type: 'success'
              });
              this.getGuess();
              this.$refs.guess.productDialog = false;
              this.$refs.guess.skusDialog = false;
            }
          });
        }else {
          this.$http.post(this.$api.guess_num_apply_award, sku).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '申请成功',
                message: res.data.message,
                type: 'success'
              });
              this.getGuess();
              this.$refs.guess.productDialog = false;
              this.$refs.guess.skusDialog = false
            }
          });
        }
      },
      sizeChange(val) {
        this.page_size = val;
        this.getGuess()
      },
      pageChange(val) {
        this.page_num = val;
        this.getGuess()
      },
      // 获取自己的猜数字奖品申请列表
      getGuess() {
        this.guessLoading = true;
        this.$http.get(this.$api.guess_num_list, {
          noLoading: true,
          params: {
            page_num: this.page_num,
            page_size: this.page_size,
          }}).then(res => {
          if (res.data.status == 200) {
            this.guessList = res.data.data;
            this.total = res.data.total_count;
            this.guessLoading = false;
          }
        })
      },
      // 编辑我的申请
      editGuess(scope) {
        this.scope = scope;
        this.$refs.guess.productDialog = true;
        scope.row.where = 'guess';
        this.$refs.guess.chooseProduct(scope);
      },
      // 撤销我的申请
      deleteGuess(scope) {
        this.$confirm('此操作将撤销该申请，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.$api.guess_num_shelf_award, { gnaaid: scope.row.gnaaid }).then(res => {
            if (res.data.status == 200) {
              this.getGuess();
              this.$notify({
                title: '撤销成功',
                message: '该申请已撤销成功',
                type: 'success'
              });
            }
          })
        }).catch(() => { });
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .add-guess-btn {
      float: right;
      margin: -50px 0 10px 0;
    }
    .page-box {
      padding: 20px;
    }
  }
</style>

