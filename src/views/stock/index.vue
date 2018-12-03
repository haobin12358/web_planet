<template>
  <div class="container">
    <h3 class="m-part-title m-flex-between title-before-table">
      <section>
        <span class="m-part-title-icon"></span>
        <span>库存列表</span>
      </section>

      <router-link tag="section" to="/stock/stockEdit" class="m-btn active">
        <span class="m-btn-icon m-add"></span>
        <span>新增</span>
      </router-link>
    </h3>

    <div class="m-content">

      <el-table>
        <el-table-column align="center" prop="name" label="商品"></el-table-column>
        <el-table-column align="center" prop="name" label="数量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">详情</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="m-bottom">
        <pagination :total="total_page" @pageChange="pageChange"></pagination>

      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from "src/components/common/page";



  export default {
    name: "index",

    components:{
      Pagination
    },

    data() {
      return {
        total_page:6,
      }
    },

    methods:{
      pageChange(){

      }
    },

    created() {

    },
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .container {
    .title-before-table {
      margin: .4rem 0;
    }
  }
</style>
