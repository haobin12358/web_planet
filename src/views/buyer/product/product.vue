<template>
    <div class="m-product">
      <!--<div class="m-product-title">-->
        <!--<span class="m-icon-back" @click="changeRoute"></span>-->
        <!--<h3>商品列表</h3>-->
      <!--</div>-->
      <ul class="m-nav-list">
        <li class="active">
          <span>销量</span>
        </li>
        <li>
          <span>新品</span>
        </li>
        <li>
          <span>价格</span>
          <span class="m-icon-box">
            <span class="m-icon-up"></span>
             <span class="m-icon-down"></span>
          </span>
        </li>
        <li>
          <span>筛选</span>
        </li>
      </ul>
      <product></product>
    </div>
</template>

<script>
  import product from '../components/product';
    export default {
      data(){
        return{

        }
      },
      components:{
        product
      },
     methods:{
       changeRoute(){
         this.$router.push('/equipment/detail')
       }
     }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
.m-product{
  .m-product-title{
    position: relative;
    font-size: 32px;
    font-weight: bold;
    .m-icon-back{
      position: absolute;
      top: 0;
      left: 68px;
      width: 24px;
      height: 41px;
      background: url("/static/images/icon-back.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .m-nav-list{
    padding: 0 64px;
  }
}
</style>
