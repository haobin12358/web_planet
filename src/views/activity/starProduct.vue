<template>
  <div class="container">
    <block-title title="申请列表"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="商品名称">
          <el-input v-model="inlineForm.prtitle"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="inlineForm.status" @change="doSearch">
            <el-option v-for="(value, key) in statusOption" :label="value" :value="key" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search"  :loading="guessLoading" @click="doSearch">查询</el-button>
          <el-button icon="el-icon-refresh"  :loading="guessLoading" @click="doReset">重置</el-button>
        </el-form-item>
      </el-form>
      <section class="action-wrap">
        <el-button type="primary" icon="el-icon-plus" @click="addGuess">申请</el-button>
      </section>
    </section>
    <get-sku @chooseStarSku="chooseStarSku" ref="guess" where="star"></get-sku>
    <el-table v-loading="guessLoading" :data="guessList" stripe >
      <!--<el-table-column prop="groupCount" label="批次" width="55" align="center"></el-table-column>-->
      <el-table-column label="商品规格图片" align="center" prop="prdescription">
        <template slot-scope="scope">
          <table-cell-img :src="[scope.row.prmainpic]" :key="scope.row.prmainpic"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="品牌" align="center" prop="pbname"></el-table-column>
      <el-table-column label="商品名称" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>
<!--      <el-table-column label="参与日期" align="center" prop="gnaastarttime"></el-table-column>-->
      <el-table-column label="显示价格" align="center" prop="ipprice"></el-table-column>
      <el-table-column label="申请状态" align="center" prop="ipstatus_zh">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.iprejectreason"
            placement="top-start" title="拒绝理由" width="200" trigger="click">
            {{scope.row.iprejectreason}}
            <el-tag slot="reference" :type="statusTagType(scope.row.ipstatus)">{{scope.row.ipstatus_zh}}</el-tag>
          </el-popover>
          <el-tag v-else :type="statusTagType(scope.row.ipstatus)">{{scope.row.ipstatus_zh}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editGuess(scope)" v-if="scope.row.ipstatus != 0 && scope.row.ipstatus != -40 && scope.row.ipstatus != 20 ">编辑</el-button>
          <el-button type="text" class="warning-text" @click="delGuess(scope)" v-if="scope.row.ipstatus == 0">撤销</el-button>
          <el-button type="text" class="danger-text" @click="deleteGuess(scope)" v-if="scope.row.ipstatus == -20 || scope.row.ipstatus == -10 || scope.row.ipstatus == -30">删除</el-button>
          <el-button type="text" class="danger-text" @click="shelvesGuess(scope)" v-if="scope.row.ipstatus == 10">下架</el-button>
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
  import elDragDialog from 'src/directive/el-dragDialog'

  export default {
    name: "Guess",
    data() {
      return {
        inlineForm: {
          prtitle: '',
          status: 'all',
        },
        statusOption: {
          'all': '全部',
          "agree": "已同意",
          "cancle": "已撤销",
          "reject": "已拒绝",
          "wait_check": "审核中",
          "shelves":"已下架",
          "lose_effect": "已失效",
          "lose_agree": "重新审核中"
        },
        guessLoading: false,
        skuSixDialog: false,
        guessList: [],
        page_size: 10,
        page_num: 1,
        total: 1,
        scope: {},             // 暂存scope
        rowTemp: {},           // 暂存row

        spanArr: [],
        skuList: [],
        groupCount: 1,
      }
    },
    directives: { elDragDialog },
    components: { getSku, TableCellImg },
    mounted() {
      this.getGuess();        // 获取自己的猜数字奖品申请列表
    },
    methods: {
      // 顶部查询
      doSearch(v) {
        if(v !== 1 && this.page_num !== 1) {
          this.page_num = 1;
        }

        this.getGuess();
      },
      // 重置
      doReset() {
        this.inlineForm = {
          prtitle: '',
          status: 'all',
        };
        this.page_num = 1;
        this.doSearch();
      },
      // 申请添加竞猜奖品-按钮
      addGuess() {
        this.$refs.guess.isEdit = false;
        this.$refs.guess.productDialog = true
      },
      // 申请添加竞猜奖品
      chooseStarSku(sku, isEdit) {
        if(isEdit) {
          sku.ipid = this.scope.row.ipid;
          this.$http.post(this.$api.integral_update, sku).then(res => {
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
          this.$http.post(this.$api.integral_apply, sku).then(res => {
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
        this.page_num = 1;
        this.page_size = val;
        this.doSearch()
      },
      pageChange(val) {
        this.page_num = val;
        this.doSearch(1)
      },
      // 获取自己的猜数字奖品申请列表
      getGuess() {
        this.guessLoading = true;
        this.$http.get(this.$api.integral_list, {
          noLoading: true,
          params: {
            page_num: this.page_num,
            page_size: this.page_size,
            ...this.inlineForm
          }}).then(res => {
          if (res.data.status == 200) {
            /*this.getSpanArr(res.data.data);
            for (let i = 0; i < this.spanArr.length; i++) {
              if(this.spanArr[i]>0){
                res.data.data[i].groupCount = this.groupCount;
                this.groupCount ++;
              }
            }*/
            this.guessList = res.data.data.product;
            this.total = res.data.total_count;
            this.guessLoading = false;
            // console.log(this.guessList);
          }
        })
      },
      statusTagType(status) {
        switch (status) {
          case 0:
            return 'primary';
          case -10:
            return 'danger';
          case -20:
            return 'warning';
          case 10:
            return 'success'
        }
      },

      getSpanArr(data) {
        this.spanArr = [];
        this.pos = 0;

        for (let i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1);
            this.pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].osid === data[i - 1].osid) {
              this.spanArr[this.pos] += 1;
              this.spanArr.push(0);
            } else {
              this.spanArr.push(1);
              this.pos = i;
            }
          }
        }
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          const _row = this.spanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      stockHeaderRender(h, {column}) {
        return (
          <el-tooltip class="tooltip" placement="top">
          <ul class="table-header-tip" slot="content">
          <li>同一次申请多个日期的活动商品会被分成多个单日活动去审批,</li>
        <li>同一次申请的算同一批,每批的库存是共用的,合并的单元格表示为同一批</li>
        </ul>
        <div>{column.label}
        <i class="el-icon-question"></i>
          </div>
          </el-tooltip>
      )
      },
      // 查看当前行的减免金额
      skuSix(row) {
        // console.log(row.product.sku);
        this.rowTemp = row;
        this.skuList = row.product.sku;
        for(let i in this.skuList) {
          this.skuList[i].skuname = '';
          for(let j in this.skuList[i].skuattritedetail) {
            this.skuList[i].skuname += this.skuList[i].skuattritedetail[j] + ' '
          }
        }
        this.skuSixDialog = true;
      },
      // 编辑我的申请
      editGuess(scope) {
        this.scope = scope;
        // this.$refs.guess.productDialog = true;
        scope.row.where = 'star';
        // scope.row.ipid = scope.row.ipid;
        this.$refs.guess.chooseProduct(scope);
      },
      // 撤销我的申请
      delGuess(scope) {
        this.$confirm('此操作将撤销该申请，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.$api.integral_cancel, { ipid: scope.row.ipid }).then(res => {
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
          this.$http.post(this.$api.integral_delete, { ipid: scope.row.ipid }).then(res => {
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
      // 下架
      shelvesGuess(scope) {
        this.$confirm('此操作将下架该申请，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.$api.integral_shelf, {ipid: scope.row.ipid}).then(res => {
            if (res.data.status == 200) {
              this.getGuess();
              this.$notify({
                title: '下架成功',
                message: '该申请已下架成功',
                type: 'success'
              });
            }
          })
        }).catch(() => {});
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

