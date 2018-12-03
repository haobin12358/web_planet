<template>
  <div class="container">

    <h3 class="m-part-title m-flex-start title-before-table">
      <span class="m-part-title-icon"></span>
      <span>问题类型</span>
    </h3>

    <div class="m-search-box">
      <div>
        <span class="m-btn active" @click="dialogQaTypeVisible = true">
          <span class="m-btn-icon m-add"></span>
          <span>新增</span>
        </span>
      </div>
    </div>
    <el-table ref="tableQaType" :data="orderType" row-key="name" :highlight-current-row="true"
              current-row-key="name" @current-change="handleTypeCurrentChange">
      <el-table-column align="center" prop="name" label="问题类型名称">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <h3 class="m-part-title m-flex-start title-before-table">
      <span class="m-part-title-icon"></span>
      <span>{{currentRowName}}</span>
    </h3>
    <div class="m-search-box">
      <div>
        <span class="m-btn active" @click="dialogQaVisible = true">
          <span class="m-btn-icon m-add"></span>
          <span>新增</span>
        </span>
      </div>
    </div>
    <el-table :data="orderQa">
      <el-table-column align="center" label="问题"></el-table-column>
      <el-table-column align="center" label="答案"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="问题类型" :visible.sync="dialogQaTypeVisible">
      <el-form label-width="100px">
        <el-form-item label="问题类型:" >
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQaTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogQaTypeVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="currentRowName" :visible.sync="dialogQaVisible" label-width="100px">
      <el-form label-width="120px">
        <el-form-item label="问题:" >
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="回答:">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQaVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogQaVisible = false">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: "index",

    data() {
      return {
        currentRowName: '',
        orderType: [
          {
            name: '订单问题',
          }, {
            name: '积分问题',
          },
        ],
        dialogQaTypeVisible: false,

        orderQa: [
          {}, {}
        ],
        dialogQaVisible: false,
      }
    },

    methods: {
      handleTypeCurrentChange(currentRow, oldCurrentRow) {
        this.currentRowName = currentRow.name;
      }
    },

    mounted() {
      this.$refs.tableQaType.setCurrentRow(this.orderType[0])
    },

    created() {

    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/index";

  .container {
    .title-before-table {
      margin-top: .4rem;
      margin-bottom: .4rem;
    }

    .dialog-footer{
      .el-button{
        padding: .1rem .2rem ;
      }
    }
  }
</style>
