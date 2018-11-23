<template>
  <div class="m-product">
    <h3 class="m-part-title m-flex-between">
      <span>
         <span class="m-part-title-icon"></span>
         <span>商品列表</span>
      </span>
      <span class="m-btn active">
        <span class="m-btn-icon m-add"></span>
        <span>发布商品</span>
      </span>
    </h3>
    <div class="m-search-box">
      <div>

      </div>
      <div>
        <el-select v-model="value8" class="m-select" filterable placeholder="供应商">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value8" class="m-select" filterable placeholder="所有品牌">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value8" class="m-select" filterable placeholder="商品类目">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-autocomplete
          class="m-search-input"
          v-model="state4"
          :fetch-suggestions="querySearchAsync"
          placeholder="搜索管理员/代理商"
          @select="handleSelect"
        ></el-autocomplete>
        <span class="m-btn m-search-btn">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
      </div>
    </div>

    <div class="m-content">
      <el-table :data="data" class="m-table" stripe style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center" width="200" prop="userId" label="商品" >
          <template slot-scope="scope">
            <img src="" class="m-product-img" alt="">
            <span>商品1</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="userName" label="商品编号"></el-table-column>
        <el-table-column align="center" prop="userName"  label="价格" ></el-table-column>
        <el-table-column align="center" prop="userName" label="品牌"></el-table-column>
        <el-table-column align="center" prop="userName"  label="场景" ></el-table-column>
        <el-table-column align="center" prop="userName"  label="总销量" ></el-table-column>
        <el-table-column align="center" prop="email" sortable label="创建时间" ></el-table-column>
        <el-table-column align="center" prop="registerTime" label="状态概况"  :filters="[{ text: '成为卖家审批', value: '成为卖家审批' }, { text: '类目使用审批', value: '类目使用审批' },{ text: '类目增设审批', value: '类目增设审批' }, { text: '商品发布审批', value: '商品发布审批' }, { text: '活动发起审批', value: '活动发起审批' }]"></el-table-column>
        <el-table-column align="center" prop="registerTime" label="供应源"  :filters="[{ text: '成为卖家审批', value: '成为卖家审批' }, { text: '类目使用审批', value: '类目使用审批' },{ text: '类目增设审批', value: '类目增设审批' }, { text: '商品发布审批', value: '商品发布审批' }, { text: '活动发起审批', value: '活动发起审批' }]"></el-table-column>
        <el-table-column align="center" prop="email" sortable label="库存" ></el-table-column>
        <el-table-column align="center"  label="操作" >
          <template slot-scope="scope">
            <span class="m-table-link m-bd">编辑</span>
            <span class="m-table-link">删除</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="m-bottom m-flex-between">
        <div>
          <span class="m-btn cancel">下架</span>
          <span class="m-btn">删除</span>
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
        value8: ''
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
