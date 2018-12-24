<template>
  <div class="container">
    <el-table v-loading="bannerLoading" :data="bannerList" stripe>
      <el-table-column label="序号" align="center" prop="ibsort">
        <template slot-scope="scope">
          <el-input class="sort-input" v-model="scope.row.ibsort"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="轮播图" align="center" prop="ibpic">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.ibpic" :key="scope.row.ibpic"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="对应商品" align="center" prop="prid"></el-table-column>
      <el-table-column label="不展示/展示" align="center" prop="ibshow">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.ibshow" @change="editBanner(scope, 'ibshow')" active-color="#409EFF" inactive-color="#DBDCDC">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editBanner(scope, 'edit')">编辑</el-button>
          <el-button type="text" class="danger-text" @click="editBanner(scope, 'delete')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg";

  export default {
    name: 'IndexBanner',
    data() {
      return {
        bannerLoading: false,
        bannerList: [],
      }
    },
    components: { TableCellImg },
    mounted() {
      this.getBanner()          // 获取banner
    },
    methods: {
      // 获取banner
      getBanner() {
        this.bannerLoading = true;
        this.$http.get(this.$api.list_banner, {
          noLoading: true, params: { ibshow: 'all' }}).then(res => {
          if (res.data.status == 200) {
            this.bannerList = res.data.data;
            this.bannerLoading = false;
          }
        })
      },
      // 编辑banner
      editBanner(scope, where) {
        let msg = '';
        let params = {
          ibid: scope.row.ibid
        };
        if(where == 'ibshow') {             // 展示/不展示banner
          params.ibshow = scope.row.ibshow;
          if(!scope.row.ibshow) {
            msg = '此轮播图当前不会展示'
          }else {
            msg = '此轮播图当前会展示'
          }
        }else if(where == 'edit') {         // 编辑banner

        }else if(where == 'delete') {       // 删除banner
          params.isdelete = true
        }
        this.$http.post(this.$api.update_banner, params).then(res => {
          if (res.data.status == 200) {
            this.$notify({
              title: '修改成功',
              message: msg,
              type: 'success'
            });
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .sort-input {
      width: 4rem;
    }
  }
</style>
