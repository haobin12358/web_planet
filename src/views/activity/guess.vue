<template>
  <div class="container">
    <block-title title="申请列表"></block-title><section class="tool-bar">
    <el-form :inline="true" size="medium">
      <el-form-item label="活动开始时间">
        <el-col :span="11">
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="inlineForm.starttime"
                          placeholder="起始日期"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="middle-line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="inlineForm.endtime" placeholder="结束日期"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="inlineForm.gnaastatus" @select="doSearch">
          <el-option v-for="(value, key) in statusOption" :label="value" :value="key" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
        <el-button icon="el-icon-refresh" @click="doReset">重置</el-button>
      </el-form-item>
    </el-form>
  </section>
    <el-button type="primary" class="add-guess-btn" icon="el-icon-plus" @click="addGuess">申请</el-button>
    <get-sku @chooseSkus="chooseSkus" ref="guess" where="guess"></get-sku>
    <el-table v-loading="guessLoading" :data="guessList" stripe size="mini">
      <el-table-column type="index" width="55"></el-table-column>
      <el-table-column label="商品规格图片" align="center" prop="prdescription">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.skupic" :key="scope.row.gnaaid"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="品牌" align="center" prop="pbname"></el-table-column>
      <el-table-column label="商品名称" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>
      <el-table-column label="参与日期" align="center" prop="gnaastarttime"></el-table-column>
      <el-table-column label="参与价格" align="center" prop="skuprice"></el-table-column>
      <el-table-column label="参与数量" align="center" prop="skustock"></el-table-column>
      <el-table-column label="申请状态" align="center" prop="gnaastatus_zh">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.gnarejectreason"
            placement="top-start" title="拒绝理由" width="200" trigger="click">
            {{scope.row.gnarejectreason}}
            <el-tag slot="reference" :type="statusTagType(scope.row.gnaastatus)">{{scope.row.gnaastatus_zh}}</el-tag>
          </el-popover>
          <el-tag v-else :type="statusTagType(scope.row.gnaastatus)">{{scope.row.gnaastatus_zh}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editGuess(scope)" v-if="scope.row.gnaastatus == -20 || scope.row.gnaastatus == -10">编辑</el-button>
          <el-button type="text" class="warning-text" @click="delGuess(scope)" v-if="scope.row.gnaastatus == 0">撤销</el-button>
          <el-button type="text" class="danger-text" @click="deleteGuess(scope)" v-if="scope.row.gnaastatus == -20 || scope.row.gnaastatus == -10">删除</el-button>
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
        inlineForm: {
          starttime: '',
          endtime: '',
          gnaastatus: 'all',
        },
        statusOption: {
          'all': '全部',
          "agree": "已同意",
          "cancle": "已撤销",
          "reject": "已拒绝",
          "wait_check": "审核中"
        },
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
      // 顶部查询
      doSearch() {
        if(this.inlineForm.starttime && this.inlineForm.endtime){
          if(new Date(this.inlineForm.starttime) > new Date(this.inlineForm.endtime)){
            let term = this.inlineForm.endtime;

            this.inlineForm.endtime = this.inlineForm.starttime;
            this.inlineForm.starttime = term;
          }
        }
        this.getGuess();
      },
      // 重置
      doReset() {
        this.inlineForm = {
          starttime: '',
          endtime: '',
          gnaastatus: 'all',
        };
        this.doSearch();
      },
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
      statusTagType(status) {
        switch (status) {
          case 0:
            return 'primary';
          case -10:
            return 'danger'
          case -20:
            return 'warning'
          case 10:
            return 'success'
        }
      },

      // 编辑我的申请
      editGuess(scope) {
        this.scope = scope;
        this.$refs.guess.productDialog = true;
        scope.row.where = 'guess';
        this.$refs.guess.chooseProduct(scope);
      },
      // 撤销我的申请
      delGuess(scope) {
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
      // 删除我的申请
      deleteGuess(scope) {
        this.$confirm('此操作将删除该申请，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.$api.guess_num_delete, { gnaaid: scope.row.gnaaid }).then(res => {
            if (res.data.status == 200) {
              this.getGuess();
              this.$notify({
                title: '删除成功',
                message: '该申请已删除成功',
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

