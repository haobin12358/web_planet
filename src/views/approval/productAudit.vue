<template>
  <div class="container">
    <!--工具栏-->
    <section class="tool-bar space-between">
      <el-form :inline="true">
        <el-form-item label="商品名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="formInline.prstatus" @change="selectStatus">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" icon="el-icon-search">查询</el-button>
        <el-button icon="el-icon-refresh">重置</el-button>
      </el-form>
    </section>


    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column align="center" width="120" label="图片">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.prmainpic" :key="scope.row.prid"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="prtitle" label="商品名" width="280"></el-table-column>
      <el-table-column align="center" prop="prprice" label="价格" width="120"></el-table-column>
      <el-table-column align="center" prop="brand.pbname" label="品牌" width="180"></el-table-column>
      <el-table-column align="center" prop="prstocks" sortable label="库存"></el-table-column>
      <el-table-column align="center" prop="createtime" sortable label="创建时间" width="180"></el-table-column>
      <el-table-column align="center" width="180" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="doPassOne(scope.row)">审核通过</el-button>
          <el-button type="text" class="danger-text" @click="doNoPassOne(scope.row)">审核拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <section class="table-bottom">
      <section class="actions-block">
        <el-button type="primary" :disabled="selectedRows.length == 0">批量通过</el-button>
        <el-button type="warning" :disabled="selectedRows.length == 0">批量拒绝</el-button>
      </section>

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
  import TableCellImg from "src/components/TableCellImg";

  export default {
    name: 'ProductAudit',

    components: {
      TableCellImg
    },

    data() {
      return {
        options: [
          {
            label: '待审核',
            value: 'auditing'
          }, {
            label: '审核不通过',
            value: 'reject'
          },
        ],
        formInline: {
          prstatus: 'auditing',
        },

        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        prstatusFilter: [
          {text: '上架中', value: '上架中'},
          {text: '审核中', value: '审核中'},
          {text: '已下架', value: '已下架'},
        ],
        tableData: [],

        selectedRows: [],
      }
    },

    computed: {},

    methods: {
      selectStatus() {
        this.getProduct();
      },

      getProduct() {
        this.loading = true;
        this.$http.get(this.$api.product_list, {
          noLoading: true,
          params: {
            page_size: this.pageSize,
            page_num: this.currentPage,
            prstatus: this.formInline.prstatus,
          }
        }).then(res => {
          this.loading = false;

          if (res.data.status == 200) {
            this.tableData = res.data.data;
            this.total = res.data.total_count;
          }
        })
      },
      sizeChange(pageSize) {
        this.pageSize = pageSize;
        this.currentPage = 1;

        this.getProduct();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getProduct();
      },
      handleSelectionChange(val) {
        this.selectedRows = val;
      },

      doPassOne(row) {
        this.doPassAction([row]);

      },
      doPassMany() {
        if (this.selectedRows.some(item => {
          item.prstatus != 10
        })) {
          this.$message.warning('请确认是否勾选非待审核的商品!');
        }
        this.doPassAction(this.selectedRows);
      },
      doPassAction(rows) {
        let tip = rows[0].prtitle + (rows.length > 1 ? `等${rows.length}件商品` : ''),
          prids = rows.map(item => item.prid);

        this.$confirm(`确认同意上架商品(${tip})?`, '提示').then(
          () => {
            this.$http.post(this.$api.agree_product, {
              prids,
              agree: true,
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                      data = res.data.data;

                  this.getProduct();
                  this.$notify({
                    title: '商品上架成功',
                    message: `商品名:${tip}`,
                    type: 'success'
                  });
                }
              }
            )
          }
        );
      },

      doNoPassOne(row) {
        this.doNoPassAction([row]);
      },
      doNoPassMany() {
        if (this.selectedRows.some(item => {
          item.prstatus != 10
        })) {
          this.$message.warning('请确认是否勾选非待审核的商品!');
        }
        this.doNoPassAction(this.selectedRows);
      },
      doNoPassAction(rows) {
        let tip = rows[0].prtitle + (rows.length > 1 ? `等${rows.length}件商品` : ''),
          prids = rows.map(item => item.prid);

        this.$prompt(`确认不同意上架商品(${tip})?`, '提示', {
          inputPlaceholder: '拒绝原因',
        }).then(
          (prompt) => {
            this.$http.post(this.$api.agree_product, {
              prids,
              anabo: prompt.value
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.getProduct();
                  this.$notify({
                    title: '商品上架已拒绝',
                    message: `商品名:${tip}`,
                    type: 'success'
                  });
                }
              }
            )
          }
        );
      },
    },

    created() {
      this.getProduct();
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .table-bottom {
      margin-top: 20px;
      .fj();
    }
  }
</style>
