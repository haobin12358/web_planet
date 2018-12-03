<template>
  <div>
    <!--<h3 class="m-part-title">-->
      <!--<span>-->
         <!--<span class="m-part-title-icon"></span>-->
         <!--<span>供应商管理</span>-->
      <!--</span>-->
    <!--</h3>-->
    <div class="m-search-box">
      <div>
        <el-input v-model="state4" class="m-search-input" placeholder="搜索供应商名称"></el-input>
        <el-autocomplete
          class="m-search-input"
          v-model="state4"
          :fetch-suggestions="querySearchAsync"
          placeholder="搜索手机号"
          @select="handleSelect"
        ></el-autocomplete>
        <span class="m-btn m-search-btn">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
      </div>
      <div>
          <span class="m-btn" @click="changeRoute('/member/addSupplier')">
            <span class="m-btn-icon m-add"></span>
            <span>添加供应商</span>
          </span>
      </div>
    </div>
    <div class="m-content">
      <el-table :data="data" class="m-table" stripe style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center"  prop="userId" label="供应商名称" >
        </el-table-column>
        <el-table-column align="center" prop="userName" label="联系人"></el-table-column>
        <el-table-column align="center" prop="userName"  label="手机号" ></el-table-column>
        <el-table-column align="center" prop="userName" width="200" label="地址"></el-table-column>
        <el-table-column align="center" prop="userName"  label="合同" >
          <template slot-scope="scope">
            <div class="m-compact-box">
              <span class="m-icon-compact"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" >
          <template slot-scope="scope">
              <span class="m-table-link m-bd">管理
              </span>
            <span class="m-table-link">删除</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="m-bottom m-flex-between">
        <div>
          <el-checkbox v-model="checked">全选</el-checkbox>
          <span class="m-check-alert">送积分</span>
        </div>
        <pagination :total="total_page" @pageChange="pageChange"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import data from '../../common/json/userInfo';
  import Pagination from "../../components/common/page";
  export default {
    data(){
      return{
        state4:'',
        data:data,
        total_page:6,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value8: '',
        checked:false
      }
    },
    components:{
      Pagination
    },
    methods:{
      changeRoute(v){
        this.$router.push({path:v})
      },
      querySearchAsync(){

      },
      handleSelect(){

      },
      pageChange(){

      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
