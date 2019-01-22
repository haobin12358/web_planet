<template>
  <div class="container">
    <el-row>
      <el-col :span="14">
        <el-form :model="formData" :rules="rules" ref="formData" label-position="left"
                 label-width="100px">
          <el-form-item label="卡 号" prop="acrbanksn">
            <el-input v-model="formData.acrbanksn" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="开户行" prop="acrbankaddress">
            <el-input v-model="formData.acrbankaddress" placeholder="请填写开户行"></el-input>
          </el-form-item>
          <el-form-item label="开户人" prop="acrname">
            <el-input v-model="formData.acrname" placeholder="请填写开户人姓名"></el-input>
          </el-form-item>
          <el-form-item label="地 址" prop="acraddress">
            <el-input v-model="formData.acraddress" placeholder="请填写地址"></el-input>
          </el-form-item>
          <el-form-item label="电 话" prop="acrphone">
            <el-input v-model="formData.acrphone" placeholder="请填写联系电话"></el-input>
          </el-form-item>
          <el-form-item label="规 则" prop="acrrule">
            <el-input v-model.trim="formData.acrrule" type="textarea" placeholder="请填写激活码购买使用规则"
                      :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="checkFormData">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'SettingIndex',
    data() {
      return {
        formData: {
          acrbanksn: '',
          acrbankaddress: '',
          acrname: '',
          acraddress: '',
          acrphone: '',
          acrrule: ''
        },
        rules: {
          acrbanksn: [
            { required: true, message: '银行卡号必填', trigger: 'blur' }
          ],
          acrbankaddress: [
            { required: true, message: '开户行必填', trigger: 'blur' }
          ],
          acrname: [
            { required: true, message: '开户人必填', trigger: 'blur' }
          ],
          acraddress: [
            { required: true, message: '地址必填', trigger: 'blur' }
          ],
          acrphone: [
            { required: true, message: '电话必填', trigger: 'blur' }
          ],
          acrrule: [
            { required: true, message: '规则必填', trigger: 'blur' }
          ],
        }
      }
    },
    components: {},
    mounted() {
      this.getFormData();           // 获取打款设置的数据
    },
    methods: {
      // 获取打款设置的数据
      getFormData() {
        this.$http.get(this.$api.act_code_get_rule).then(res => {
          if (res.data.status == 200) {
            if(res.data.data) {
              this.formData = res.data.data;
            }
          }
        })
      },
      // 保存按钮
      checkFormData() {
        this.$refs.formData.validate(valid => {
          if (valid) {
            this.$http.post(this.$api.act_code_set_rule, this.formData).then(res => {
              if (res.data.status == 200) {
                this.$notify({
                  title: '保存成功',
                  message: '激活码打款信息设置成功',
                  type: 'success'
                });
              }
            });
          }else {
            this.$message.warning('请根据校验信息完善表单!');
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {

  }
</style>
