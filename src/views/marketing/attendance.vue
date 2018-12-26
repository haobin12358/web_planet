<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <block-title title="基本信息"></block-title>
        <el-form :model="signInForm" ref="signInForm" label-position="left" label-width="100px">
          <el-form-item v-for="(rule, index) in signInForm.rules" :label="'规则' + (index + 1)" :key="rule.key"
          :prop="'rules.' + index + '.value'" :rules="{
          required: true, message: ''}" inline>
            <span>连续签到</span>
            <el-input class="item-input" v-model="rule.value"></el-input>
            <span>天后，每日获得</span>
            <el-input class="item-input"></el-input>
            <span>积分</span>
            <el-button style="margin-left: 50px" @click.prevent="removeRule(rule)">删除</el-button>
          </el-form-item>
          <el-form-item style="margin-left: 73px">
            <el-button @click="addRule">添加规则</el-button>
            <el-button type="primary" @click="checkFormData">保存资讯</el-button>
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
        signInForm: {
          rules: [{ day: '', num: '' }]
        },
      }
    },
    components: {},
    methods: {
      addRule() {
        this.signInForm.rules.push({
          day: '',
          num: '',
          key: Date.now()
        })
      },
      // 移除一行
      removeRule(rule) {
        let index = this.signInForm.rules.indexOf(rule);
        if(index !== -1) {
          this.signInForm.rules.splice(index, 1)
        }
      },
      checkFormData() {
        this.$refs.circleFormRef.validate(valid => {
          if (valid) {
            let title = '新增';
            this.$http.post(this.$api.create_news, this.circleForm).then(res => {
              if (res.data.status == 200) {
                this.initCircleForm();
                this.$router.push('/circle/circle');
                this.$notify({
                  title: `${title}成功`,
                  message: `资讯标题：${this.circleForm.netitle}成功`,
                  type: 'success'
                });
              }
            });
          }else {
            this.$message.warning('请根据校验信息完善表单!');
          }
        })
      },
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
  }
</style>
