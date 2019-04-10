<template>
  <div class="container">
    <block-title title="申请列表"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="状态">
          <el-select v-model="inlineForm.tlastatus" @change="doSearch">
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
<!--    :limited_list="limited_list"-->
    <get-sku @chooseLimitedSku="chooseLimitedSku" ref="limited" where="limited" :tlaid="tlaid" ></get-sku>
    <el-table v-loading="guessLoading" :data="guessList" stripe >
      <!--<el-table-column prop="groupCount" label="批次" width="55" align="center"></el-table-column>-->
      <el-table-column label="商品规格图片" align="center" prop="prdescription">
        <template slot-scope="scope">
          <table-cell-img :src="[scope.row.prmainpic]" :key="scope.row.prmainpic"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="品牌" align="center" prop="pbname"></el-table-column>
      <el-table-column label="商品名称" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>
      <el-table-column label="参与日期" align="center" prop="tlpcreatetime"></el-table-column>
      <el-table-column label="显示价格" align="center" prop="prprice"></el-table-column>
<!--      <el-table-column label="减免金额" align="center" width="100">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="text" @click="skuSix(scope.row)">查看</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="申请状态" align="center" prop="tlastatus_zh">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.gnaarejectreason"
            placement="top-start" title="拒绝理由" width="200" trigger="click">
            {{scope.row.gnaarejectreason}}
            <el-tag slot="reference" :type="statusTagType(scope.row.tlastatus)">{{scope.row.tlastatus_zh}}</el-tag>
          </el-popover>
          <el-tag v-else :type="statusTagType(scope.row.tlastatus)">{{scope.row.tlastatus_zh}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editGuess(scope)" v-if="scope.row.tlastatus == -20 || scope.row.tlastatus == -10">编辑</el-button>
          <el-button type="text" class="warning-text" @click="delGuess(scope)" v-if="scope.row.tlastatus == 0">撤销</el-button>
          <el-button type="text" class="danger-text" @click="deleteGuess(scope)" v-if="scope.row.tlastatus == -20 || scope.row.tlastatus == -10 || scope.row.tlastatus == -30">删除</el-button>
<!--          <el-button type="text" class="danger-text" @click="shelvesGuess(scope)" v-if="scope.row.tlastatus == 10">下架</el-button>-->
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
          starttime: '',
          endtime: '',
          tlastatus: 'all',
        },
        statusOption: {
          'all': '全部',
          "agree": "已同意",
          "cancle": "已撤销",
          "reject": "已拒绝",
          "wait_check": "审核中"
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
        limited_list:[],
        tlaid: ''
      }
    },
    directives: { elDragDialog },
    components: { getSku, TableCellImg },
    mounted() {
      // this.getLimited();        // 获取
      this.getGuess();
      this.tlaid = this.$route.query.tlaid;
    },
    methods: {
      // 顶部查询
      doSearch(v) {
        if(v !== 1 && this.page_num !== 1) {
          this.page_num = 1;
        }
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
          tlastatus: 'all',
        };
        this.page_num = 1;
        this.doSearch();
      },
      // 申请添加竞猜奖品-按钮
      addGuess() {
        this.$refs.limited.isEdit = false;
        this.$refs.limited.productDialog = true
      },
      // 申请添加竞猜奖品
      chooseLimitedSku(sku, isEdit) {
        if(isEdit) {
          sku.tlpid = this.scope.row.tlpid;
          this.$http.post(this.$api.timelimited_update_award, sku).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '编辑成功',
                message: res.data.message,
                type: 'success'
              });
              this.getGuess();
              this.$refs.limited.productDialog = false;
              this.$refs.limited.skusDialog = false;
            }
          });
        }else {
          this.$http.post(this.$api.timelimited_apply_award, sku).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '申请成功',
                message: res.data.message,
                type: 'success'
              });
              this.getGuess();
              this.$refs.limited.productDialog = false;
              this.$refs.limited.skusDialog = false
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
        this.$http.get(this.$api.timelimited_product, {
          noLoading: true,
          params: {
            page_num: this.page_num,
            page_size: this.page_size,
            tlaid:this.$route.query.tlaid
          }}).then(res => {
          if (res.data.status == 200) {
            /*this.getSpanArr(res.data.data);
            for (let i = 0; i < this.spanArr.length; i++) {
              if(this.spanArr[i]>0){
                res.data.data[i].groupCount = this.groupCount;
                this.groupCount ++;
              }
            }*/
            this.guessList = res.data.data;
            this.total = res.data.total_count;
            this.guessLoading = false;
            for(let i in this.guessList) {
              this.guessList[i].pbname = this.guessList[i].brand.pbname;
              this.guessList[i].prtitle = this.guessList[i].prtitle;
              this.guessList[i].prprice = this.guessList[i].prprice;
            }
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
        this.skuList = row.sku;
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
        scope.row.where = 'limited';
        this.$refs.limited.chooseProduct(scope);
      },
      // 撤销我的申请
      delGuess(scope) {
        this.$confirm('此操作将撤销该申请，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.$api.timelimited_shelf_award, { tlpid: scope.row.tlpid }).then(res => {
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
          this.$http.post(this.$api.timelimited_del_award, { tlpid: scope.row.tlpid }).then(res => {
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
          this.$http.post(this.$api.timelimited_update_award, {gnaaid: scope.row.gnaaid}).then(res => {
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

