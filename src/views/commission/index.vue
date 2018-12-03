<template>
  <div>
    <h3 class="m-part-title m-flex-between">
      <div class="m-flex-start">
        <span class="m-part-title-icon"></span>
        <span>佣金列表</span>
      </div>
      <router-link tag="span" to="/commission/commissionEdit" class="m-btn active">
        <span>佣金设置</span>
      </router-link>
    </h3>
    <div class="m-search-box">
      <div>
        <el-input v-model="state4" class="m-search-input" placeholder="店主ID"></el-input>
        <el-input v-model="state4" class="m-search-input" placeholder="联系方式"></el-input>
      </div>
      <div>

        <span class="m-btn m-search-btn">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
      </div>
    </div>
    <div class="m-content">
      <el-table :data="data" class="m-table" stripe style="width: 100%">
        <el-table-column align="center" prop="userId" label="店主ID" ></el-table-column>
        <el-table-column align="center" prop="userName" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="email"  label="账户余额" ></el-table-column>
        <el-table-column align="center" label="粉丝" >
          <template slot-scope="scope">
            <span class="m-table-link">10</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="email"  label="获得佣金" ></el-table-column>

      </el-table>

      <div class="m-bottom">
        <pagination :total="total_page" @pageChange="pageChange"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import data from '../../common/json/userInfo';
  import Pagination from "../../components/common/page";

  export default {
    data(){
      return{
        state4:'',
        data:data,
        total_page:6
      }
    },
    components:{
      Pagination
    },
    methods:{
      pageChange(){

      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
