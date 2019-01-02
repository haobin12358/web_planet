<template>
    <div class="container">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane v-for="(item,index) in list" :label="item.ptname" :key="item.ptid">
          <keep-alive>
            <two-setting-table v-if="activeName == index" :levelData="item.pemission" :ptid="item.ptid"></two-setting-table>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import TwoSettingTable from "./components/twoSettingTable";


  export default {
    name: 'approvalSetting',

    components: {TwoSettingTable},

    data() {
      return {
        list: [],

        activeName: '0',
      }
    },

    computed: {},

    methods: {
      getAllPermissionType(){
        this.$http.get(this.$api.get_all_permissiontype,{
          params: {

          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                  data = res.data.data;

              this.list = data;
            }
          }
        )
      },
    },

    created() {
      this.getAllPermissionType();

    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {

    }
</style>
