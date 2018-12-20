<template>
  <div class="circle-index">
    <el-table v-loading="activityLoading" :data="activityList" stripe>
      <el-table-column label="活动首图" align="center" prop="acbackground">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.acbackground" :key="scope.row.acbackground"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" align="center" prop="acname"></el-table-column>
      <el-table-column label="类别" align="center" prop="actype_zh"></el-table-column>
      <el-table-column label="商品数" align="center" prop="pblogo"></el-table-column>
      <el-table-column label="开启/关闭" align="center" prop="pblogo">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.acshow" @change="showActivity(scope.row)" active-color="#409EFF" inactive-color="#DBDCDC">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {}
    },
    components: {},
    mounted() {

    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .circle-index {

  }
</style>
