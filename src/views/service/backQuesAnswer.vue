<template>
  <div class="container">
    <block-title title="问题类型"></block-title>
    <el-button class="add-btn" type="primary" icon="el-icon-plus">新增问题类型</el-button>
    <el-table ref="typeTable" :data="typeData" v-loading="loading" row-key="qoid" highlight-current-row
              :row-class-name="tableRowClassName" @current-change="handleCurrentChange">
      <el-table-column label="问题类型名称" prop="qoname" align="center"></el-table-column>
      <el-table-column label="操作" prop="qoname" align="center" width="280">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text" class="danger-text">删除</el-button>
        </template>
      </el-table-column>
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
    <block-title :title="currentSelectType.qoname"></block-title>
    <el-button class="add-btn" type="primary" icon="el-icon-plus">新增该类问答</el-button>
    <el-table :data="currentSelectType.question" v-loading="loading" empty-text="问答类型或选中问题类型下问答数量为0">
      <el-table-column label="问题" prop="ququest" align="center"></el-table-column>
      <el-table-column label="回答" prop="answer" align="center"></el-table-column>
      <el-table-column label="操作" prop="qoname" align="center">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text" class="danger-text">删除</el-button>
        </template>
      </el-table-column>
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
        loading: false,
        typeData: [],

        typeDlgVisible: false,

        currentSelectType: {},
        qaDlgVisible: false,
      }
    },

    computed: {},

    methods: {
      //  获取所有问题类型包含问题
      getAllTypeWithQa() {
        this.loading = true;
        this.$http.get(this.$api.get_all_qa, {
          params: {
            qotype: '222'
          }
        }).then(
          res => {
            this.loading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.typeData = data;
              if (data.length) {
                this.currentSelectType = data[0];
                this.$refs.typeTable.setCurrentRow(data[0]);
              }
            }
          }
        )
      },
      tableRowClassName({row, rowIndex}) {
        if (row.qoid == this.currentSelectType.qoid) {
          return 'warning-row'
        }

        return ''
      },
      handleCurrentChange(val) {
        this.currentSelectType = val;
      },
    },

    created() {
      this.getAllTypeWithQa();
    },
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    height: 100%;
    .add-btn {
      float: right;
      margin: -50px 0 10px 0;
    }
  }
</style>
