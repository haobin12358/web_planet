<template>
  <div class="container">
    <!--工具栏-->
    <section class="tool-bar space-between">
      <el-form :inline="true">
        <el-form-item label="商品名">
          <el-input></el-input>
        </el-form-item>

        <el-button type="primary" icon="el-icon-search">查询</el-button>
        <el-button icon="el-icon-refresh">重置</el-button>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="doAddProduct">新增</el-button>
    </section>


    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        type="index"></el-table-column>
      <el-table-column align="center" width="120" label="图片">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.prmainpic" :key="scope.row.prid"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="prtitle" label="商品名" width="280"></el-table-column>
      <el-table-column align="center" prop="prprice" label="价格" width="120"></el-table-column>
      <el-table-column align="center" prop="brand.pbname" label="品牌" width="180"></el-table-column>
      <el-table-column align="center" prop="prsalesvalue" label="总销量" width="120"></el-table-column>
      <el-table-column align="center" prop="prstatus_zh" label="状态" width="120" :filters="prstatusFilter"
                       :filter-method="filterPrStatus">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.prstatus_zh=='上架中'">{{scope.row.prstatus_zh}}</el-tag>
          <el-tag v-else-if="scope.row.prstatus_zh=='审核中'" type="warning">{{scope.row.prstatus_zh}}</el-tag>
          <el-tag v-else-if="scope.row.prstatus_zh=='已下架'" type="danger">{{scope.row.prstatus_zh}}</el-tag>
          <el-tag v-else type="info">{{scope.row.prstatus_zh}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="supplizer" label="供应源" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.supplizer === '平台' ? 'primary' : 'success'">{{scope.row.supplizer}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="prstocks" sortable label="库存"></el-table-column>
      <el-table-column align="center" prop="createtime" sortable label="创建时间" width="180"></el-table-column>
      <el-table-column align="center" width="180" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="doEdit(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.prstatus == 0" type="text" class="warning-text"
                     @click="doUnShelveOne(scope.row)">下架
          </el-button>
          <el-button v-if="scope.row.prstatus == 60" type="text" class="success-text"
                     @click="doOnShelveOne(scope.row)">上架
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <section class="table-bottom">
      <section class="actions-block">
        <el-button type="warning" :disabled="selectedRows.length == 0" @click="doUnShelveSelect">批量下架</el-button>
        <el-button type="danger" :disabled="selectedRows.length == 0" @click="doDeleteSelect">批量删除</el-button>
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
  import permission from 'src/directive/permission/index.js' // 权限判断指令

  export default {
    name: 'ProductIndex',

    directives: {permission},

    components: {
      TableCellImg
    },

    data() {
      return {
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
      getProduct() {
        this.loading = true;
        this.$http.get(this.$api.product_list, {
          noLoading: true,
          params: {
            page_size: this.pageSize,
            page_num: this.currentPage,
          }
        }).then(res => {
          this.loading = false;

          if (res.data.status == 200) {
            this.tableData = res.data.data;
            this.total = res.data.total_count;
          }
        })
      },
      filterPrStatus(value, row, column) {
        const property = column['property'];
        return row[property] === value;
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

      doAddProduct() {
        this.$router.push('/product/productEdit')
      },
      doEdit(product) {
        this.$router.push({
          path: '/product/productEdit',
          query: {
            prid: product.prid
          }
        })
      },

      //  下架1个
      doUnShelveOne(row) {
        this.doOneShelveAction([row], false);
      },

      //  上架1个
      doOnShelveOne(row) {
        this.doOneShelveAction([row], true);
      },

      /**
       * 批量上下架商品
       * @param prid
       * @param shelve  是否上架
       */
      doOneShelveAction(rows, shelve) {
        let type = shelve ? '上架' : '下架',
            status = shelve ? 0 : 60;
        let tip = rows[0].prtitle + (rows.length > 1 ? `等${rows.length}件商品` : ''),
          prids = rows.map(item => item.prid);

        this.$confirm(`确认${type}商品(${tip})?`, '提示').then(
          () => {
            this.$http.post(this.$api.off_shelves_product, {
              prids,
              "status": status
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.getProduct();
                  this.$notify({
                    title: `商品已${type}`,
                    message: `商品名:${tip}`,
                    type: 'success'
                  });
                }
              }
            )
          }
        )
      },
      doUnShelveSelect() {
        let prids = this.selectedRows.map(item => item.prid);

        console.log(prids);
      },
      doDeleteSelect() {
        let prids = this.selectedRows.map(item => item.prid),
          prtitles = this.selectedRows.map(item => item.prtitle).join(' , ');

        this.$confirm(`确认删除商品(${prtitles})?`, '提示').then(
          () => {
            this.$http.post(this.$api.delete_product, {
              prids
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.getProduct();
                  this.$notify({
                    title: '商品下架成功',
                    type: 'success'
                  });
                }
              }
            )
          }
        )
      },

      handleSelectionChange(val) {
        this.selectedRows = val;
      },
    },

    activated() {
      this.getProduct()
    },
    created() {
      this.getProduct()
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
