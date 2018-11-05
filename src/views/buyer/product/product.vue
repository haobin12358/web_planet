<template>
    <div class="m-product">
      <!--<div class="m-product-title">-->
        <!--<span class="m-icon-back" @click="changeRoute"></span>-->
        <!--<h3>商品列表</h3>-->
      <!--</div>-->
      <nav-list :navlist="nav_list" @navClick="navClick"></nav-list>
      <product></product>
    </div>
</template>

<script>
  import product from '../components/product';
  import navList from '../../../components/common/navlist';
    export default {
      data(){
        return{
          nav_list:[
            {
              name:'销量',
              params:'',
              active:true
            },
            {
              name:'新品',
              params:'',
              active:false
            },
            {
              name:'价格',
              params:'',
              active:false,
              icon:true
            },
            {
              name:'筛选',
              params:'',
              active:false
            }
          ]
        }
      },
      components:{
        product,
        navList
      },
     methods:{
       changeRoute(){
         this.$router.push('/equipment/detail')
       },
       navClick(index){
         let arr = [].concat(this.nav_list);
         for(let i=0;i<arr.length;i++){
           arr[i].active = false;
         }
         arr[index].active = true;
         this.nav_list = [].concat(arr)
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
