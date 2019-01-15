<template>
  <div class="container">
    <block-title title="申请列表"></block-title>
    <section class="tool-bar space-between">
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
          <el-select v-model="inlineForm.status" @change="doSearch">
            <el-option v-for="(value, key) in statusOption" :label="value" :value="key" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
          <el-button icon="el-icon-refresh" @click="doReset">重置</el-button>
        </el-form-item>
      </el-form>
      <section class="action-wrap">
        <el-button type="primary" icon="el-icon-plus" @click="addNew">申请</el-button>
      </section>
    </section>
    <get-sku @chooseNewSku="chooseNewSku" ref="new" where="new"></get-sku>
    <el-table v-loading="newLoading" :data="newList" stripe size="mini">
      <el-table-column label="商品图片" align="center" prop="prdescription">
        <template slot-scope="scope">
          <table-cell-img :src="[scope.row.fresh_product.prmainpic]" :key="scope.row.fmfaid"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center" prop="fresh_product.prtitle" show-overflow-tooltip></el-table-column>
      <el-table-column label="参与日期" align="center" prop="time" width="220"></el-table-column>
      <!--<el-table-column label="参与价格" align="center" prop="fresh_product.sku.skuprice"></el-table-column>-->
      <!--<el-table-column label="参与数量" align="center" prop="fresh_product.sku.fmfpstock"></el-table-column>-->
      <el-table-column label="申请状态" align="center" prop="fmfastatus_zh">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.fmfarejectreson"
            placement="top-start" title="拒绝理由" width="200" trigger="click">
            {{scope.row.fmarejectreason}}
            <el-tag slot="reference" :type="statusTagType(scope.row.fmfastatus)">{{scope.row.fmfastatus_zh}}</el-tag>
          </el-popover>
          <el-tag v-else :type="statusTagType(scope.row.fmfastatus)">{{scope.row.fmfastatus_zh}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editNew(scope)" v-if="scope.row.fmfastatus == -20">编辑</el-button>
          <el-button type="text" class="danger-text" @click="deleteNew(scope)" v-if="scope.row.fmfastatus == 0">撤销</el-button>
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
  name: "FirstOrder",
  data() {
    return {
      inlineForm: {
        starttime: '',
        endtime: '',
        status: '',
      },
      statusOption: {
        '': '全部',
        "10": "已同意",
        "-20": "已撤销",
        "-10": "已拒绝",
        "0": "审核中"
      },
      newList: [],
      newLoading: false,
      page_size: 10,
      page_num: 1,
      total: 0,
      scope: {},             // 暂存scope
    }
  },
  components: { getSku, TableCellImg },
  mounted() {
    this.getNew()         // 获取新人首单商品列表
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
      this.getNew();
    },
    // 重置
    doReset() {
      this.inlineForm = {
        starttime: '',
        endtime: '',
        status: '',
      };
      this.page_num = 1;
      this.doSearch();
    },
    // 添加新人商品-按钮
    addNew() {
      this.$refs.new.isEdit = false;
      this.$refs.new.productDialog = true
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
    // 获取新人首单商品列表
    getNew() {
      this.newLoading = true;
      this.$http.get(this.$api.fresh_man_list, { noLoading: true,
        params: {
          page_num: this.page_num,
          page_size: this.page_size,
          ...this.inlineForm
      }}).then(res => {
        if (res.data.status == 200) {
          this.newList = res.data.data;
          this.total = res.data.total_count;
          this.newLoading = false;
          for(let i in this.newList) {
            this.newList[i].time = this.newList[i].fmfastarttime + ' - ' + this.newList[i].fmfaendtime
          }
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

    // 参与新人首单
    chooseNewSku(sku, isEdit) {
      if(isEdit) {
        sku.fmfaid = this.scope.row.fmfaid;
        this.$http.post(this.$api.fresh_man_update_award, sku).then(res => {
          if (res.data.status == 200) {
            this.$notify({
              title: '编辑成功',
              message: res.data.message,
              type: 'success'
            });
            this.getNew();
            this.$refs.new.productDialog = false;
            this.$refs.new.skusDialog = false;
          }
        });
      }else {
        this.$http.post(this.$api.fresh_man_apply_award, sku).then(res => {
          if (res.data.status == 200) {
            this.$notify({
              title: '申请成功',
              message: res.data.message,
              type: 'success'
            });
            this.getNew();
            this.$refs.new.productDialog = false;
            this.$refs.new.skusDialog = false;
          }
        });
      }
    },
    // 编辑申请
    editNew(scope) {
      this.scope = scope;
      // this.$refs.new.productDialog = true;
      scope.row.prid = scope.row.fresh_product.prid;
      scope.row.where = 'new';
      this.$refs.new.chooseProduct(scope);
    },
    // 删除
    deleteNew(scope) {
      this.$confirm('此操作将撤销该申请，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(this.$api.fresh_man_shelf_award, { fmfaid: scope.row.fmfaid }).then(res => {
          if (res.data.status == 200) {
            this.getNew();
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
    .add-new-btn {
      float: right;
      margin: -50px 0 10px 0;
    }
    .page-box {
      padding: 20px;
    }
  }
</style>

