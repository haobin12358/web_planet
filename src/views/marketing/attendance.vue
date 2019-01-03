<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <block-title title="签到设置"></block-title>
        <el-form label-position="left" label-width="100px">
          <el-form-item v-for="(rule, index) in rules" :label="'规则 ' + (index + 1)" :key="index">
            <span>连续签到</span>
            <el-input class="item-input" v-model="rule.day"></el-input>
            <span>天后，每日获得</span>
            <el-input class="item-input" v-model="rule.num"></el-input>
            <span>积分</span>
            <el-button style="margin-left: 50px" v-if="index > 0" @click="removeRule(index)">删除</el-button>
          </el-form-item>
          <el-form-item class="btn-box">
            <el-button @click="addRule">添加规则</el-button>
            <el-button @click="getRule">取 消</el-button>
            <el-button type="primary" @click="saveSetting">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Attendance',
    data() {
      return {
        rules: [
          { day: 1, num: 5 }, { day: 5, num: 10 }, { day: 10, num: 15 }, { day: 20, num: 20 }
        ]
      }
    },
    components: {},
    methods: {
      // 获取设置
      getRule() {

      },
      // 添加一行
      addRule() {
        let rule = { day: '', num: '' };
        this.rules.push(rule)
      },
      // 移除一行
      removeRule(index) {
        this.rules.splice(index, 1)
      },
      // 保存设置
      saveSetting() {
        console.log(this.rules);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .item-input {
      .wl(10rem, 0.4rem);
    }
    span {
      margin: 0 0.4rem;
    }
    .btn-box {
      margin: 43px;
      .el-button {
        margin-left: 30px;
      }
    }
  }
</style>
