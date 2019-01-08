<template>
  <div class="container">
    <el-row>
      <el-col :span="18">
        <block-title title="签到基础设置"></block-title>
        <el-form ref="form" :model="formData" :rules="formRules" label-width="140px" label-position="left">
          <el-form-item label="单次签到赠送积分" prop="integral">
            <el-input v-model.number="formData.integral"></el-input>
          </el-form-item>
          <el-form-item label="规则说明" prop="rule">
            <el-input v-model="formData.rule" type="textarea" maxlength="1000"></el-input>
            <span class="form-item-end-tip">签到阶段奖励的规则说明无需在此编辑</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveBaseSetting">保存</el-button>
          </el-form-item>
        </el-form>

        <block-title title="签到阶段奖励"></block-title>
        <el-form label-position="left" label-width="100px">
          <el-form-item v-for="(rule, index) in rules" :label="'规则 ' + (index + 1)" :key="index">
            <span>连续签到</span>
            <el-input class="item-input" v-model.number="rule.siaday"></el-input>
            <span>天后，每日获得</span>
            <el-input class="item-input" v-model.number="rule.sianum"></el-input>
            <span>积分</span>
            <el-button style="margin-left: 50px" @click="removeRule(index)">删除</el-button>
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
  const positiveNumberReg = /^([1-9]\d*)$/;   //  正整数

  export default {
    name: 'Attendance',
    data() {
      return {
        formData: {
          "integral": 11,
          "rule": "常常的问谁\n 就是一个\n 还有一个\n",
        },
        formRules:{
          "integral": [
            {required: true, message: '单次签到赠送积分必填', trigger: 'blur'},
          ],
          "rule": [
            {required: true, message: '规则说明必填', trigger: 'blur'},
          ],
        },

        rules: [
          {siaday: 1, sianum: 5},
          {siaday: 10, sianum: 15},
          {siaday: 15, sianum: 25},
          {siaday: 35, sianum: 45},
        ]
      }
    },
    components: {},
    methods: {
      getBaseSetting(){
        this.$http.get(this.$api.get_signin_default,{}).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.formData = data;
            }
          }
        )
      },
      saveBaseSetting(){
        this.$refs.form.validate(
          valid => {
            if (valid) {
              this.$http.post(this.$api.set_signin_default,this.formData).then(
                res => {
                  if (res.data.status == 200) {
                    let resData = res.data,
                      data = res.data.data;

                    this.getBaseSetting();
                    this.$notify({
                      title: '签到基础设置保存成功',
                      type: 'success'
                    });
                  }
                }
              )
            }else {
              this.$message.warning('请根据校验信息完善表单!');
            }
          }
        )
      },

      // 获取设置
      getRule() {
        this.$http.get(this.$api.get_all_signsetting, {
          params: {}
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.rules = data;
            }
          }
        )
      },
      // 添加一行
      addRule() {
        let rule = {siaday: '0', sianum: '0'};

        this.rules.push(rule)
      },
      // 移除一行
      removeRule(index) {
        this.rules.splice(index, 1)
      },
      // 保存设置
      saveSetting() {
        let checkRst = '';

        for (let i = 0; i < this.rules.length; i++) {
          checkRst = '';

          if (!positiveNumberReg.test(this.rules[i].siaday)) {
            checkRst += '-天数不符';
          }
          if (!positiveNumberReg.test(this.rules[i].sianum)) {
            checkRst += '-积分不符';
          }

          if(checkRst){
            checkRst = `规则${i + 1}` + checkRst;
            break
          }
        }

        if (checkRst) {
          this.$message.warning(checkRst)
        } else {
          this.$http.post(this.$api.add_or_update_signsetting,this.rules).then(
            res => {
              if (res.data.status == 200) {
                let resData = res.data,
                    data = res.data.data;

                this.getRule();
                this.$notify({
                  title: '签到设置成功',
                  type: 'success'
                });
              }
            }
          )
        }
      }
    },

    created() {
      this.getRule();
      this.getBaseSetting();
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
      margin:100px 43px;
      .el-button {
        margin-left: 30px;
      }
    }
  }
</style>
