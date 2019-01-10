<template>
  <div class="container">
    <span>结算时间:每月22号到次月1号</span>
    <el-table :data="balanceData">
      <el-table-column label="结算月份" prop="month" align="center"></el-table-column>
      <el-table-column label="下载报表" align="center">
        <template slot-scope="scope">
          <el-button type="text">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" class="success-text" @click="doPass">确认无误</el-button>
          <el-tooltip effect="dark" placement="top">
            <div slot="content">当您对结算信息有异议可以发起申请,点击该按钮后填写原因,平台会尽快处理</div>
            <el-button type="text" class="warning-text" @click="doNoPass">申请反馈</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Balance",

    components: {},

    data() {
      return {
        balanceData: [
          {
            month: '2019年01月',
          }
        ]
      }
    },

    computed: {},

    methods: {
      doPass(){
        this.$confirm(`确认2019年01月的结算结果无误?`,'提示').then(
          ()=>{

          }
        )
      },
      doNoPass(){
        this.$prompt(`请填写对2019年01月的结算结果有异议的原因`,'提示',{
          inputPlaceholder: '例如:对订单号xx,xx的结算有异议',
          inputType: 'textarea',
          inputValidator: value => {
            if (!value) {
              return '原因不能为空'
            }
            if (value.length > 100) {
              return '原因文本过长(1000)'
            }
          }
        }).then()
      },

    },

    created() {

    },
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .balance-hd{
      .fj();
    }

  }
</style>
