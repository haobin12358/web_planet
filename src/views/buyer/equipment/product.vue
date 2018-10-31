<template>
    <div class="m-product">
      <div class="m-product-title">
        <span class="m-icon-back" @click="changeRoute"></span>
        <h3>商品列表</h3>
      </div>
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
    text-align: center;
    padding: 0;
    margin: 0;
    li{
      display: inline-block;
      list-style: none;
      margin-right: 124px;
      padding: 10px 0;
      &:last-child{
        margin-right: 0;
      }
      &.active{
        border-bottom: 3px solid #FCD316;
      }
      .m-icon-box{
        display: inline-block;
        height: 22px;
        vertical-align: text-bottom;
        .m-icon-up{
          display: block;
          width: 11px;
          height: 11px;
          background: url("/static/images/icon-up.png") no-repeat;
          background-size: 100% 100%;
        }
        .m-icon-down{
          display: block;
          width: 11px;
          height: 11px;
          background: url("/static/images/icon-down.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
