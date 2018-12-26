<template>
  <div class="activity-index">
    <el-table v-loading="activityLoading" :data="activityList" stripe>
      <el-table-column label="活动封面图" align="center" prop="acbackground">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.acbackground" :key="scope.row.acbackground"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" align="center" prop="acname"></el-table-column>
      <el-table-column label="封面按钮" align="center" prop="acbutton"></el-table-column>
      <el-table-column label="类别" align="center" prop="actype_zh"></el-table-column>
      <el-table-column label="商品数" align="center" prop="pblogo"></el-table-column>
      <el-table-column label="关闭/开启" align="center" prop="pblogo">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.acshow" @change="showActivity(scope.row)" active-color="#409EFF" inactive-color="#DBDCDC">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editActivity(scope)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg";

  export default {
    name: 'ActivityIndex',
    data() {
      return {
        activityLoading: false,
        activityList: [],
      }
    },
    components: { TableCellImg },
    mounted() {
      this.getActivity();         // 获取所有活动
    },
    methods: {
      // 获取所有活动
      getActivity() {
        this.activityLoading = true;
        this.$http.get(this.$api.activity_list, { noLoading: true }).then(res => {
          if (res.data.status == 200) {
            this.activityList = res.data.data;
            this.activityLoading = false;
          }
        })
      },
      // 关闭或开启活动
      showActivity(row) {
        let params = {
          actype: row.actype,
          acshow: row.acshow
        };
        let title = '';
        if(row.acshow) {
          title = '开启';
        }else {
          title = '关闭';
        }
        this.$http.post(this.$api.activity_update, params).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: `${title}成功`,
                message: `${row.acname}${title}成功`,
                type: 'success'
              });
            }
          }
        );
      },
      // 编辑活动
      editActivity(scope) {

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .activity-index {

  }
</style>
