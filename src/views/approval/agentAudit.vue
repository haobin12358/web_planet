<template>
    <div class="container">
      <el-table :data="tableData" v-loading="loading" >
        <el-table-column label="审批内容" align="center">
          <!--<el-table-column label="银行名" prop="content.cnbankname" align="center"></el-table-column>-->
          <!--<el-table-column label="开户人" prop="content.cncardname" align="center"></el-table-column>-->
          <!--<el-table-column label="卡号" prop="content.cncardno" align="center"></el-table-column>-->
          <!--<el-table-column label="金额" prop="content.cncashnum" align="center"></el-table-column>-->
          <!--<el-table-column label="备注" prop="content.cnbankdetail" align="center"></el-table-column>-->
        </el-table-column>
        <el-table-column label="发起人" align="center">
          <el-table-column label="姓名" prop="start.usname" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="审批层级" prop="avlevel" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" class="success-text" @click="pass(scope.row)">审批通过</el-button>
            <el-button type="text" class="danger-text" @click="nopass(scope.row)">审批不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  //  toagent
  export default {
    name: 'AgentAudit',

    components: {},

    data() {
      return {
        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
      }
    },

    computed: {},

    methods: {
      getList(){
        this.loading = true;
        this.$http.get(this.$api.get_approval_list,{
          params: {
            ptid: 'toagent'
          }
        }).then(
          res => {
            this.loading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                  data = res.data.data;

              this.tableData = data;
            }
          }
        )
      },

      pass(row){
        this.$confirm(`确认批准?`,'提示').then(
          ()=>{

          }
        )
      },
      nopass(row){
        this.$prompt(`确认不批准?`,'提示',{
          inputPlaceholder: '拒绝理由'
        }).then(
          ()=>{

          }
        )
      },
    },

    created() {
        this.getList();
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {

    }
</style>
