<template>
  <div class="container">
    <el-row>
      <el-col :span="14">
        <el-form :model="formData" :rules="rules" ref="formData" label-position="left"
                 label-width="100px">
          <el-form-item label="卡 号" prop="netitle">
            <el-input v-model="formData.netitle"></el-input>
          </el-form-item>
          <el-form-item label="开户行" prop="netitle">
            <el-input v-model="formData.netitle"></el-input>
          </el-form-item>
          <el-form-item label="开户人" prop="netitle">
            <el-input v-model="formData.netitle"></el-input>
          </el-form-item>
          <el-form-item label="地 址" prop="netitle">
            <el-input v-model="formData.netitle"></el-input>
          </el-form-item>
          <el-form-item label="电 话" prop="netitle">
            <el-input v-model="formData.netitle"></el-input>
          </el-form-item>
          <el-form-item label="规 则" prop="netext">
            <el-input v-model.trim="formData.netitle" type="textarea"
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
          netitle: ''
        },
        rules: {

        }
      }
    },
    components: {},
    methods: {
      checkFormData() {
        this.$refs.formData.validate(valid => {
          if (valid) {

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
