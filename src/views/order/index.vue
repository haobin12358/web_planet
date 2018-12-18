<template>
  <div class="container">
    <section class="tool-bar">
      <el-form :inline="true" size="medium">
        <el-form-item label="订单号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="收件人">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="起始日期" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="middle-line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束日期" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button icon="el-icon-refresh">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" icon="el-icon-document">生成报表</el-button>
        </el-form-item>
      </el-form>


      <el-switch
        v-model="expandAll"
        active-text="展开"
        inactive-text="不展开"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="changeSwitch">
      </el-switch>
    </section>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="-1"></el-tab-pane>
      <el-tab-pane label="待支付" name="0"></el-tab-pane>
      <el-tab-pane label="待发货" name="10"></el-tab-pane>
      <el-tab-pane label="已发货" name="20"></el-tab-pane>
      <el-tab-pane label="待评价" name="35"></el-tab-pane>
      <el-tab-pane label="已完成" name="30"></el-tab-pane>
      <el-tab-pane label="退货中" name="inrefund"></el-tab-pane>
      <el-tab-pane label="已取消" name="-40"></el-tab-pane>
    </el-tabs>

    <el-table ref="orderTable" :data="orderData" v-loading="loading" size="small"
              style="width: 100%" @row-click="expandRow" :cell-class-name="cellFunction">
      <!--<el-table-column type="expand">-->
      <!--<template slot-scope="props">-->
      <!--<el-table :data="props.row.product_list" size="small" stripe :cell-class-name="subCellFunction"-->
      <!--style="width: 100%">-->
      <!--<el-table-column prop="img" align="center" label="图片" width="180">-->
      <!--<template slot-scope="scope">-->
      <!--<img v-lazy="scope.row.PRimage" :key="scope.row.PRimage" class="table-pic" alt="">-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="PRname" align="center" label=" 商品名" width="240"></el-table-column>-->
      <!--<el-table-column prop="PRprice" align="center" label="单价" width="120"></el-table-column>-->
      <!--<el-table-column prop="colorname" align="center" label="颜色" width="120"></el-table-column>-->
      <!--<el-table-column prop="sizename" align="center" label="尺码" width="120"></el-table-column>-->
      <!--<el-table-column prop="number" align="center" label="数量" width="120"></el-table-column>-->
      <!--</el-table>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="omno" align="center" label="订单号" width="280"></el-table-column>
      <el-table-column prop="pbname" align="center" label="品牌" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.pbname}}</span>
          <!--<img src="" alt="">-->
        </template>
      </el-table-column>

      <!--<el-table-column prop="omrecvname" align="center" label="收件人" width="180"></el-table-column>-->
      <!--<el-table-column prop="omrecvphone" align="center" label="手机号" width="160"></el-table-column>-->
      <el-table-column prop="ommount" label="总价" align="center" width="120"></el-table-column>
      <el-table-column prop="omfreight" label="运费" align="center" width="120"></el-table-column>
      <el-table-column prop="omtruemount" label="实付" align="center"></el-table-column>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.omstatus_zh)">{{scope.row.omstatus_zh}}</el-tag>
        </template>
      </el-table-column>

      <!--<el-table-column label="快递信息" width="180" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{`${scope.row.expressname || ''} ${scope.row.expressnum || ''}`}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="ommessage" label="备注" width="180" align="center" show-tooltip-overflow></el-table-column>
      <el-table-column prop="createtime" label="下单时间" align="center" width="180"></el-table-column>

      <el-table-column label="操作" width="120" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="text">查看
          </el-button>
          <!--<el-button v-if="scope.row.OIstatus == 3" type="text" size="small"-->
          <!--@click.stop="gotoOrderDetail(scope.row)">查看-->
          <!--</el-button>-->
          <!--<el-button v-if="scope.row.OIstatus == 4" type="text" size="small"-->
          <!--@click.stop="gotoOrderDetail(scope.row)">去发货-->
          <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <section class="table-bottom">
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="sizeChange"
        @current-change="pageChange">
      </el-pagination>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'OrderIndex',

    components: {},

    data() {
      return {
        activeName: '-1', //  -1 => 空 全部

        expandAll: true,
        loading: false,
        orderData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }
    },

    computed: {},

    methods: {
      changeSwitch() {
        for (let i = 0; i < this.tableData.length; i++) {
          this.$refs.orderTable.toggleRowExpansion(this.tableData[i], this.expandAll);
        }
      },
      handleClick(tab, event) {
        this.setOrderList();
      },

      expandRow(row) {
        this.$refs.orderTable.toggleRowExpansion(row);
      },
      cellFunction({row, column}) {
        if (['ommount', 'omfreight', 'omtruemount'].includes(column.property)) {
          return 'money-cell'
        }
      },
      tagType(statusZh) {
        switch (statusZh) {
          //  待支付 待发货
          case '待支付':
            return 'primary'
          case '待发货':
            return 'danger'
          case '已发货':
            return 'success'
          case '退款中':
            return 'warning'
          default:
            return 'info'
        }

      },
      setOrderList() {
        this.loading = true;
        this.$http.get(this.$api.get_all_order, {
          noLoading: true,
          params: {
            page_size: this.pageSize,
            page_num: this.currentPage,
            omstatus: this.activeName == '-1' ? '' : this.activeName
          }
        }).then(
          res => {
            this.loading = false;

            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.orderData = data;
              this.total = resData.total_count;
            }
          }
        )
      },
      sizeChange(pageSize) {
        this.pageSize = pageSize;
        this.currentPage = 1;

        this.setOrderList();
      },
      pageChange(page) {
        this.currentPage = page;
        this.setOrderList();
      },
    },

    created() {
      this.setOrderList();
    }
  }
</script>

<style lang="less" scoped>
  .container {

  }
</style>
