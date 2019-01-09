<template>
  <div class="container">
    <block-title title="问题类型"></block-title>
    <el-button class="add-btn" type="primary" icon="el-icon-plus">新增问题类型</el-button>
    <el-table :data="typeData">
      <el-table-column label="问题类型名称"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <el-dialog visible.sync="typeDlgVisible">
      <el-form label-position="left" label-width="120px">
        <el-form-item label="问题类型名称"></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <block-title :title="currentSelectTypeName"></block-title>
    <el-button class="add-btn" type="primary" icon="el-icon-plus">新增该类问答</el-button>
    <el-table :data="qsData" empty-text="问答类型或选中问题类型下问答数量为0">
      <el-table-column label="问题类型名称"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <el-dialog visible.sync="qaDlgVisible">
      <el-form label-position="left" label-width="120px">
        <el-form-item label="问题名称"></el-form-item>
        <el-form-item label="回答内容"></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "BackQuesAnswer",

    components: {},

    data() {
      return {
        typeDlgVisible: false,
        typeData: [],

        qaDlgVisible: false,
        currentSelectTypeName: '',
        qsData: [],
      }
    },

    computed: {},

    methods: {},

    created() {

    },
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .add-btn {
      float: right;
      margin: -50px 0 10px 0;
    }
  }
</style>
