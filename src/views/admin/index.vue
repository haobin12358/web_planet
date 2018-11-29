<template>
    <div class="m-admin">
      <h3 class="m-part-title">
        <span class="m-part-title-icon"></span>
        <span>管理员管理</span>
      </h3>
      <div class="m-search-box">
        <div>
          <span class="m-btn active">
            <span class="m-btn-icon m-add"></span>
            <span>添加管理员</span>
          </span>
        </div>
        <div>
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
          <el-table-column align="center" prop="userId" label="用户编号" ></el-table-column>
          <el-table-column align="center" prop="userName" label="用户名"></el-table-column>
          <el-table-column align="center" prop="email"  label="手机号" ></el-table-column>
          <el-table-column align="center" prop="registerTime" label="类别"  :filters="[{ text: '成为卖家审批', value: '成为卖家审批' }, { text: '类目使用审批', value: '类目使用审批' },{ text: '类目增设审批', value: '类目增设审批' }, { text: '商品发布审批', value: '商品发布审批' }, { text: '活动发起审批', value: '活动发起审批' }]"></el-table-column>
          <el-table-column align="center" prop="email" sortable label="最近登录时间" ></el-table-column>
          <el-table-column align="center" label="操作" >
            <template slot-scope="scope">
              <div class="m-modal-text" >
                <span class="m-table-link m-bd">管理</span>
                <div class="m-absolute-modal" v-if="scope.row.group == '买家'">
                  <p>李老六管理员数据管理</p>
                  <div class="m-admin-input-box">
                    <el-input v-model="input" placeholder="请输入内容" class="m-input-xs"></el-input>
                    <el-input v-model="input" placeholder="请输入内容" class="m-input-xs"></el-input>
                    <el-input v-model="input" placeholder="请输入内容" class="m-input-xs"></el-input>
                    <el-input v-model="input" placeholder="请输入内容" class="m-input-xs"></el-input>
                  </div>
                  <div class="m-modal-btn-box">
                    <span class="m-btn active">保存</span>
                    <span class="m-btn ">取消</span>
                  </div>
                </div>
              </div>
              <span class="m-table-link">删除</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="m-bottom">
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
            total_page:6
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

.m-modal-text{
  display: inline-block;
  /*position: relative;*/
  .m-absolute-modal{
    position: absolute;
    background-color: #fff;
    top: 0;
    left: -4.3rem;
    width: 5rem;
    height: 3rem;
    box-shadow:0 3px 6px rgba(0,0,0,0.16);
    border-radius: 10px;
    z-index: 100;
    padding: 0.37rem 0.26rem 0.5rem 0.44rem;
    text-align: left;
    .m-admin-input-box{
      margin: 0.3rem 0 0.1rem;
      .m-input-xs{
        width: 2rem;
        margin-right: 0.1rem;
        display: inline-block;
        margin-bottom: 0.2rem;
      }
    }


  }
}
</style>
