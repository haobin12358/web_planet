<template>
  <div class="container">
    <block-title title="场景"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="场景名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>

      <el-button type="primary" icon="el-icon-plus" @click="doAddItem">新增</el-button>
    </section>
    <el-table v-loading="sceneLoading" :data="sceneTableData">
      <el-table-column label="图片" align="center" prop="pspic" width="120">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.pspic" :key="scope.row.pspic"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" prop="psname"></el-table-column>
      <el-table-column label="排序" align="center" prop="pssort" width="180">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.pssort" style="text-align: center"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text" class="danger-text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <block-title title="商品标签"></block-title>
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
    name: 'ProductTag',

    components: {
      TableCellImg
    },

    data() {
      return {
        itemLoading: false,
        itemTableData: [],

        sceneLoading: false,
        sceneTableData: [],
      }
    },

    computed: {},

    methods: {
      setItemList() {
        this.itemLoading = true;
        this.$http.get(this.$api.items_list, {
          noLoading: true,
          params: {
            ittype: 0
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

      setSceneList() {
        this.sceneLoading = true;
        this.$http.get(this.$api.scene_list, {
          noLoading: true,
          params: {
            page_num: this.currentScenePage,
            page_size: this.scenePageSize,
          }
        }).then(
          res => {
            this.sceneLoading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.sceneTableData = data;
              this.totalScene = resData.total_count;
            }
          }
        )
      },
    },

    created() {
      this.setItemList();
      this.setSceneList();
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .table-bottom {
      .fj(center);
    }
  }
</style>
