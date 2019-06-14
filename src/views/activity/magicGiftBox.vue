<template>
  <div class="container">
    <block-title title="申请列表"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="活动开始时间">
          <el-col :span="11">
            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="inlineForm.starttime"
                            placeholder="起始日期" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="middle-line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="inlineForm.endtime" placeholder="结束日期"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="inlineForm.mbastatus" @change="doSearch">
            <el-option v-for="(value, key) in statusOption" :label="value" :value="key" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search"  :loading="magicLoading" @click="doSearch">查询</el-button>
          <el-button icon="el-icon-refresh"  :loading="magicLoading" @click="doReset">重置</el-button>
        </el-form-item>
      </el-form>
      <section class="action-wrap">
        <el-button type="primary" icon="el-icon-plus" @click="addGuess">申请</el-button>
      </section>
    </section>
    <get-sku @chooseMagicSku="chooseMagicSku" ref="magic" where="magic"></get-sku>
    <el-table v-loading="magicLoading" :data="magicList" stripe size="mini" >
      <!--      <el-table-column prop="groupCount" label="批次" width="55" align="center"></el-table-column>-->
      <el-table-column label="商品规格图片" align="center" >
        <template slot-scope="scope">
          <table-cell-img :src="[scope.row.prmainpic]" ></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="品牌" align="center" prop="pbname" show-overflow-tooltip></el-table-column>
      <el-table-column label="商品名称" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>
      <el-table-column label="参与日期" align="center" prop="mbaday"></el-table-column>
      <el-table-column label="减免金额" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="skuSix(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="申请状态" align="center" prop="mbastatus_zh">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.mbastatus == -10 && scope.row.mbarejectreason"
            placement="top-start" title="拒绝理由" width="200" trigger="click">
            {{scope.row.mbarejectreason}}
            <el-tag slot="reference" :type="statusTagType(scope.row.mbastatus)">{{scope.row.mbastatus_zh}}</el-tag>
          </el-popover>
          <el-tag v-else :type="statusTagType(scope.row.mbastatus)">{{scope.row.mbastatus_zh}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editGuess(scope)" v-if="scope.row.mbastatus != 20 && scope.row.mbastatus != -40 && scope.row.mbastatus != 0">编辑</el-button>
          <el-button type="text" class="warning-text" @click="delGuess(scope)" v-if="scope.row.mbastatus == 0">撤销</el-button>
          <el-button type="text" class="danger-text" @click="deleteGuess(scope)" v-if="scope.row.mbastatus == -20 || scope.row.mbastatus == -10">删除</el-button>
          <el-button type="text" class="danger-text" @click="shelvesGuess(scope)" v-if="scope.row.mbastatus == 10">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background class="page-box tc" :page-sizes="[10, 20, 30, 40]" :current-page="page_num"
                   :page-size="page_size" :total="total" layout="total, sizes, prev, pager, next, jumper"
                   @size-change="sizeChange" @current-change="pageChange"></el-pagination>

    <!--每日竞猜——sku的六个减免金额-->
    <el-dialog v-el-drag-dialog :visible.sync="skuSixDialog" title="减免金额(单位：元)" width="1200px" top="7vh" :close-on-click-modal="false">
      <el-form label-position="right" label-width="120px" disabled="true" inline  >
        <el-form-item label="第一档:">
          <span>随机减少</span>
          <el-input class="item-input" v-model="numList[0]" maxlength="11"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[1]" maxlength="11"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="第二档:">
          <span>随机减少</span>
          <el-input class="item-input" v-model="numList[2]" maxlength="11"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[3]" maxlength="11"></el-input>
          <span>元</span>
          <span class="span-or">或</span>
          <span>随机增加</span>
          <el-input class="item-input" v-model="numList[4]" maxlength="11"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[5]" maxlength="11"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="第三档:">
          <span>随机减少</span>
          <el-input class="item-input" v-model="numList[6]" maxlength="11"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[7]" maxlength="11"></el-input>
          <span>元</span>
          <span class="span-or">或</span>
          <span>随机增加</span>
          <el-input class="item-input" v-model="numList[8]" maxlength="11"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[9]" maxlength="11"></el-input>
          <span>元</span>
        </el-form-item>
      </el-form>
      <el-table :data="skuList" stripe>
        <el-table-column label="规格名称" align="center" prop="skuname" show-overflow-tooltip></el-table-column>
        <el-table-column label="库存" align="center" prop="mbsstock" show-overflow-tooltip></el-table-column>
        <el-table-column label="参与金额" align="center" prop="skuprice"></el-table-column>
        <el-table-column label="可购价格" align="center" prop="highestprice"></el-table-column>
        <el-table-column label="最低价格" align="center" prop="lowestprice"></el-table-column>
      </el-table>
      <span slot="footer">
        <el-button type="primary" @click="skuSixDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import getSku from './components/getsku'
  import TableCellImg from "src/components/TableCellImg"
  import elDragDialog from 'src/directive/el-dragDialog'
  export default {
    name: "MagicGiftBox",
    data() {
      return {
        inlineForm: {
          starttime: '',
          endtime: '',
          mbastatus: 'all',
        },
        statusOption: {
          'all': '全部',
          "agree": "已同意",
          "cancle": "已撤销",
          "reject": "已拒绝",
          "wait_check": "审核中",
          "lose_effect": "已失效",
          "lose_agree": "重新审核中"
        },
        magicLoading: false,
        magicList: [],
        page_size: 10,
        page_num: 1,
        total: 1,
        scope: {},             // 暂存scope
        skuSixDialog: false,
        spanArr: [],
        groupCount: 1,
        skuList:[],
        numList:[]
      }
    },
    components: {getSku, TableCellImg},
    directives: { elDragDialog },
    mounted() {
      this.getMagic()
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
        this.getMagic();
      },
      // 查看当前行的减免金额
      skuSix(row) {
        // console.log(row.product.sku);
        this.numList = [];
        for(let i in row.gearsone[0].split('-')) {
          this.numList.push(row.gearsone[0].split('-')[i])
        }
        for(let i in row.gearstwo) {
          for(let j in row.gearstwo[i].split('-')) {
            this.numList.push(row.gearstwo[i].split('-')[j])
          }
        }
        for(let i in row.gearsthree) {
          for(let j in row.gearsthree[i].split('-')) {
            this.numList.push(row.gearsthree[i].split('-')[j])
          }
        }
        this.skuList = row.skus;
        for(let i in this.skuList) {
          this.skuList[i].skuname = '';
          for(let j in this.skuList[i].skuattritedetail) {
            this.skuList[i].skuname += this.skuList[i].skuattritedetail[j] + ' '
          }
        }
        this.skuSixDialog = true;
      },
      // 重置
      doReset() {
        this.inlineForm = {
          starttime: '',
          endtime: '',
          mbastatus: 'all',
        };
        this.page_num = 1;
        this.doSearch();
      },
      // 申请添加魔盒奖品-按钮
      addGuess() {
        this.$refs.magic.isEdit = false;
        this.$refs.magic.productDialog = true;
        this.$refs.magic.numList = [1, 2, 3, 5, 5, 10, 5, 10, 20, 30]
      },
      // 申请添加魔盒奖品
      chooseMagicSku(sku, isEdit) {
        if (isEdit) {
          sku.mbaid = this.scope.row.mbaid;
          this.$http.post(this.$api.magic_box_update_apply, sku).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '编辑成功',
                message: res.data.message,
                type: 'success'
              });
              this.getMagic();
              this.$refs.magic.productDialog = false;
              this.$refs.magic.skusDialog = false;
            }
          });
        } else {
          this.$http.post(this.$api.magic_box_apply_award, sku).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '申请成功',
                message: res.data.message,
                type: 'success'
              });
              this.getMagic();
              this.$refs.magic.productDialog = false;
              this.$refs.magic.skusDialog = false
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
      getMagic() {
        this.magicLoading = true;
        this.$http.get(this.$api.magic_box_list, {
          noLoading: true,
          params: {
            page_num: this.page_num,
            page_size: this.page_size,
            ...this.inlineForm
          }
        }).then(res => {
          if (res.data.status == 200) {
            this.getSpanArr(res.data.data);
            for (let i = 0; i < this.spanArr.length; i++) {
              if(this.spanArr[i]>0){
                res.data.data[i].groupCount = this.groupCount;
                this.groupCount ++;
              }
            }
            this.groupCount = 1;
            this.magicList = res.data.data;
            this.total = res.data.total_count;
            this.magicLoading = false
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

      // 编辑我的申请
      editGuess(scope) {
        this.scope = scope;
        // this.$refs.magic.productDialog = true;
        scope.row.where = 'magic';
        this.$refs.magic.chooseProduct(scope);
      },
      // 撤销
      delGuess(scope) {
        this.$confirm('此操作将撤销该申请，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.$api.magic_box_shelf_award, {mbaid: scope.row.mbaid}).then(res => {
            if (res.data.status == 200) {
              this.getMagic();
              this.$notify({
                title: '撤销成功',
                message: '该申请已撤销成功',
                type: 'success'
              });
            }
          })
        }).catch(() => {});
      },
      // 删除
      deleteGuess(scope) {
        this.$confirm('此操作将删除该申请，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.$api.magic_box_delete, {mbaid: scope.row.mbaid}).then(res => {
            if (res.data.status == 200) {
              this.getMagic();
              this.$notify({
                title: '删除成功',
                message: '该申请已删除成功',
                type: 'success'
              });
            }
          })
        }).catch(() => {});
      },
      // 下架
      shelvesGuess(scope) {
        this.$confirm('此操作将下架该申请，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.$api.magic_box_shelves, {mbaid: scope.row.mbaid}).then(res => {
            if (res.data.status == 200) {
              this.getMagic();
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
    .item-input {
      .wl(4.5rem, 0.4rem);
    }
  }
</style>
