<template>
  <div>
    <h3 class="m-part-title m-flex-between">
      <span>
        <span class="m-part-title-icon"></span>
        <span>试用商品列表</span>
      </span>

      <span class="m-btn active" @click="dialogSettingVisible = true">
        公共配置
      </span>
    </h3>

    <div class="m-search-box">
      <div>
        <router-link tag="span" to="/activity/trialProductEdit" class="m-btn active">
          <span class="m-btn-icon m-add"></span>
          <span>添加试用商品</span>
        </router-link>
      </div>

      <div>
        <el-input v-model="state4" class="m-search-input" placeholder="商品名称"></el-input>
        <el-autocomplete class="m-search-input"
                         v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="商品编号"
                         @select="handleSelect"></el-autocomplete>
        <span class="m-btn m-search-btn">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
      </div>
    </div>

    <div class="m-content">
      <el-table :data="data" class="m-table" stripe style="width: 100%">
        <el-table-column align="center" prop="userId" label="名称"></el-table-column>
        <el-table-column align="center" prop="email" label="押金"></el-table-column>
        <el-table-column align="center" prop="email" label="抵押时长"></el-table-column>
        <el-table-column align="center" prop="email" label="剩余/总量"></el-table-column>
        <el-table-column align="center" prop="email" label="活动时间"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <span class="m-table-link">编辑</span>
            <span class="m-table-link">删除</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="m-bottom">
        <pagination :total="total_page" @pageChange="pageChange"></pagination>
      </div>
    </div>

    <el-dialog title="试用活动配置" :visible.sync="dialogSettingVisible">
      <el-form label-width="100px">
        <el-form-item label="商品顶部banner:" >
          <el-upload class="avatar-uploader" :show-file-list="false" accept="image/*" action="asd">
            <img v-if="imageUrl" v-lazy="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

            <div slot="tip" class="el-upload__tip">
              建议尺寸:700*500,大小不要超过10M,上传成功后会显示,上传大图请耐心等待
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="规则:" >
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="封面图:" >
          <el-upload class="avatar-uploader" :show-file-list="false" accept="image/*" action="asd">
            <img v-if="imageUrl" v-lazy="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

            <div slot="tip" class="el-upload__tip">
              建议尺寸:750*360,大小不要超过10M,上传成功后会显示,上传大图请耐心等待
            </div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSettingVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSettingVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import data from '../../common/json/userInfo';
  import Pagination from "../../components/common/page";

  export default {
    name: 'trialProduct',

    data() {
      return {
        state4: '',
        data: data,
        total_page: 6,

        imageUrl: '',
        dialogSettingVisible: false,
      }
    },
    components: {
      Pagination
    },
    methods: {
      querySearchAsync() {

      },
      handleSelect() {

      },
      pageChange() {

      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .container{
    .dialog-footer{
      .el-button{
        padding: .1rem .2rem ;
      }
    }
  }
</style>
