<template>
  <div class="m-product">
    <h3 class="m-part-title m-flex-between">
      <span>
         <span class="m-part-title-icon"></span>
         <span>商品列表</span>
      </span>
      <span class="m-btn active" @click="changeRoute('/product/addProductOne')">
        <span class="m-btn-icon m-add"></span>
        <span>发布商品</span>
      </span>
    </h3>
    <div class="m-search-box">
      <div>

      </div>
      <div>
        <el-select v-model="suid" class="m-select"
                   filterable
                   remote
                   reserve-keyword
                   :remote-method="getSupplizer"
                   :loading="loading"
                   placeholder="供应商">
          <el-option
            v-for="item in supplizer_list"
            :key="item.suid"
            :label="item.suname"
            :value="item.suid">
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
        <el-input v-model="value8" class="m-input-xs" style="margin-right: 5px;" placeholder="搜索商品标题"></el-input>
        <span class="m-btn m-search-btn">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
      </div>
    </div>

    <div class="m-content">
      <el-table :data="product_data" class="m-table" v-loading="loading"
                @selection-change="handleSelectionChange" stripe style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center" width="180" prop="userId" label="商品" >
          <template slot-scope="scope">
            <img :src="scope.row.prmainpic" class="m-product-img" alt="">
            <span>{{scope.row.prtitle}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="userName" label="商品编号"></el-table-column>
        <el-table-column align="center" prop="prprice"  label="价格" ></el-table-column>
        <el-table-column align="center" prop="brand.pbname" label="品牌"></el-table-column>
        <el-table-column align="center" prop="userName"  label="场景" ></el-table-column>
        <el-table-column align="center" prop="prsalesvalue"  label="总销量" ></el-table-column>
        <el-table-column align="center" prop="createtime" sortable label="创建时间" ></el-table-column>
        <el-table-column align="center" prop="prstatus_zh" label="状态概况"  :filters="[ { text: '上架中', value: '上架中' },{ text: '审核中', value: '审核中' }, { text: '已下架', value: '已下架' }]"></el-table-column>
        <el-table-column align="center" prop="supplizer" label="供应源" ></el-table-column>
        <el-table-column align="center" prop="prstocks" sortable label="库存" ></el-table-column>
        <el-table-column align="center" width="180" label="操作" >
          <template slot-scope="scope">
            <span class="m-table-link m-bd">编辑</span>
            <span class="m-table-link" @click="deleteProduct(scope.row,'one')">删除</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="m-bottom m-flex-between">
        <div>
          <span class="m-btn cancel">下架</span>
          <span class="m-btn" @click="deleteProduct">删除</span>
        </div>
        <pagination :total="total_page" @pageChange="pageChange"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import data from '../../common/json/userInfo';
  import Pagination from "../../components/common/page";
  import axios from 'axios';
  import api from '../../api/api';
  export default {
    data(){
      return{
        loading:false,
        state4:'',
        product_data:data,
        total_page:0,
        select_product:null,
        supplizer_list:[],
        suid:'',
        page:1,
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
    mounted(){
      this.getProduct(1);
      this.getSupplizer();
    },
    methods:{
      //获取商品列表
      getProduct(num){
        this.loading = true;
        axios.get(api.product_list,{
          params:{
            token:localStorage.getItem('token'),
            page_size:10,
            page_num:num
          }
        }).then(res => {
          if(res.data.status == 200){
            this.loading = false;
            this.product_data = res.data.data;
            this.total_page = res.data.total_page;
          }
        })
      },
      //获取供应商列表
      getSupplizer(value){
        axios.get(api.supplizer_list,{
          params:{
            kw:value || '',
            token:localStorage.getItem('token')
          }
        }).then(res => {
            if(res.data.status == 200){
              this.supplizer_list = res.data.data;
            }
        })
      },
      //路由跳转
      changeRoute(v){
        this.$router.push(v)
      },
      handleSelectionChange(val){
        this.select_product = val;
      },
      //删除商品
      deleteProduct(item,type){
        let that = this;
        this.$confirm('删除商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = [];
          if(type){
            params.push(item.prid);
          }else{
            for(let i=0;i<that.select_product.length;i++){
              params.push(that.select_product[i].prid)
            }
          }
          axios.post(api.delete_product+'?token=' +localStorage.getItem('token'),{
            prids:params
          }).then(res => {
              if(res.data.status == 200){
                this.$notify({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getProduct(this.page);
              }
          })
        }).catch(() => {

        });

      },
      pageChange(num){
        this.page = num;
        this.getProduct(num);
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>


</style>
