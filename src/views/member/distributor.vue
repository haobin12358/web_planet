<template>
    <div>
      <div class="m-search-box">
        <div>
          <el-input v-model="state4" class="m-search-input" placeholder="搜索分销商手机号"></el-input>
          <el-autocomplete
            class="m-search-input"
            v-model="state4"
            :fetch-suggestions="querySearchAsync"
            placeholder="搜索分销商账号"
            @select="handleSelect"
          ></el-autocomplete>
          <span class="m-btn m-search-btn">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
        </div>
        <div>
          <span class="m-btn">
            <span class="m-btn-icon m-add"></span>
            <span>添加会员</span>
          </span>
        </div>
      </div>
      <div class="m-content">
        <el-table :data="data" class="m-table" stripe style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column align="center"  prop="userId" label="头像" >
            <template slot-scope="scope">
              <img src="" class="m-product-img" alt="">
            </template>
          </el-table-column>
          <el-table-column align="center" prop="userName" label="昵称"></el-table-column>
          <el-table-column align="center" prop="userName"  label="会员账号" ></el-table-column>
          <el-table-column align="center" prop="userName" label="手机号"></el-table-column>
          <el-table-column align="center" prop="userName"  label="积分" ></el-table-column>
          <el-table-column align="center" prop="registerTime" label="会员分类"  :filters="[{ text: '成为卖家审批', value: '成为卖家审批' }, { text: '类目使用审批', value: '类目使用审批' },{ text: '类目增设审批', value: '类目增设审批' }, { text: '商品发布审批', value: '商品发布审批' }, { text: '活动发起审批', value: '活动发起审批' }]"></el-table-column>
          <el-table-column align="center" prop="email"  label="购买次数" ></el-table-column>
          <el-table-column align="center"  label="操作" >
            <template slot-scope="scope">
              <span class="m-table-link">查看详情</span>
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
