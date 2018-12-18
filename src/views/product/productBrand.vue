<template>
  <div class="container">
    <block-title title="品牌"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="品牌名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>

      <el-button type="primary" icon="el-icon-plus" @click="doAddItem">新增</el-button>
    </section>
    <el-table v-loading="brandLoading" :data="brandTableData">
      <el-table-column label="品牌logo" align="center" prop="pblogo" width="120">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.pblogo" :key="scope.row.pblogo"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="品牌名称" align="center" prop="pbname"></el-table-column>
      <el-table-column label="品牌店铺图" align="center" prop="pbbackgroud" width="120">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.pbbackgroud" :key="scope.row.pbbackgroud"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="品牌描述" align="center" prop="pbdesc" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.pbstatus == 0">上架中</el-tag>
          <el-tag v-if="scope.row.pbstatus == 1" type="danger">已下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text" class="danger-text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <section class="table-bottom">
      <el-pagination
        style="margin-top: .5rem"
        :current-page="currentBrandPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="brandPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalBrand"
        @size-change="sizeChange"
        @current-change="pageChange">
      </el-pagination>
    </section>

    <block-title title="品牌标签"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="标签名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>

      <el-button type="primary" icon="el-icon-plus" @click="doAddItem">新增</el-button>
    </section>
    <el-table v-loading="itemLoading" :data="itemTableData" height="300" size="mini">
      <el-table-column label="标签名" align="center" prop="itname" width="300"></el-table-column>
      <el-table-column label="描述" align="center" prop="itdesc" show-overflow-tooltip></el-table-column>
      <!--<el-table-column label="关联品牌" align="center"></el-table-column>-->
      <el-table-column label="操作" align="center" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text" class="danger-text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg";

  export default {
    name: 'ProductBrand',

    components: {
      TableCellImg
    },

    data() {
      return {
        itemLoading: false,
        itemTableData: [],

        brandLoading: false,
        brandTableData: [],
        currentBrandPage: 1,
        brandPageSize: 10,
        totalBrand: 0,
      }
    },

    computed: {},

    methods: {
      setItemList() {
        this.itemLoading = true;
        this.$http.get(this.$api.items_list, {
          noLoading: true,
          params: {
            ittype: 40
          }
        }).then(
          res => {
            this.itemLoading = false;

            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.itemTableData = data
            }
          }
        )
      },
      doAddItem() {
        console.log('doAddItem');
      },

      setBrandList() {
        this.brandLoading = true;
        this.$http.get(this.$api.brand_list, {
          noLoading: true,
          params: {
            page_num: this.currentBrandPage,
            page_size: this.brandPageSize,
          }
        }).then(
          res => {
            this.brandLoading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.brandTableData = data;
              this.totalBrand = resData.total_count;
            }
          }
        )
      },
      sizeChange(pageSize) {
        this.brandPageSize = pageSize;
        this.currentBrandPage = 1;

        this.setBrandList();
      },
      pageChange(page) {
        this.currentBrandPage = page;
        this.setBrandList();
      },
    },

    created() {
      this.setItemList();
      this.setBrandList();
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
  }
</style>
