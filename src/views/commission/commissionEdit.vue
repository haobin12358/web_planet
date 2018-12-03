<template>
  <div class="container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item :to="{ path: '/commission'}" replace>佣金列表</el-breadcrumb-item>
      <el-breadcrumb-item>佣金设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form class="comm-form" label-width="300px" label-position="left">
      <section class="form-row">
        <el-form-item label="平台默认佣金比例（一级）：">
          <el-input>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item  label="平台默认一级代理商分成比例(转发人：编辑人)：">
          <el-input>
          </el-input>
        </el-form-item>
      </section>
      <section class="form-row">
        <el-form-item label="平台默认佣金比例（二级）：">
          <el-input>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item  label="平台默认二级代理商分成比例(转发人：编辑人)：">
          <el-input>
          </el-input>
        </el-form-item>
      </section>


    </el-form>
    <div class="m-content">
      <el-table :data="data" class="m-table" stripe style="width: 100%">
        <el-table-column align="center" prop="name" label="代理商用户名" ></el-table-column>
        <el-table-column align="center" label="佣金比例" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.value" style="width: 2rem;text-align: center;">
              <template slot="append">%</template>
            </el-input>
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
    name: "commissionEdit",

    components: {
      Pagination
    },

    data() {
      return {
        data:[
          {
            name: 'a',
            value: 12,
          },{
            name: 'b',
            value: 12,
          },{
            name: 'c',
            value: 12,
          },{
            name: 'd',
            value: 12,
          },{
            name: 'e',
            value: 12,
          },
        ],
        total_page:6
      }
    },

    computed: {},

    methods: {
      pageChange(){

      }
    },

    created() {


    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/index";

  .container {
    .comm-form{
      padding-right: 1rem;
      margin-top: .4rem;
      margin-bottom: .4rem;

      .form-row{
        .fj();

        .el-form-item{
          margin-bottom: 0;
        }
      }
    }

  }
</style>
