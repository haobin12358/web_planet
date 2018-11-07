<template>
    <div class="m-product">
      <!--<div class="m-product-title">-->
        <!--<span class="m-icon-back" @click="changeRoute"></span>-->
        <!--<h3>商品列表</h3>-->
      <!--</div>-->
      <div class="m-product-brand">
        <img src="" class="m-brand-img" alt="">
        <span class="m-icon-bg"></span>
        <div class="m-flex-between m-brand-info">
          <div class="m-flex-start">
            <span class="m-brand-logo"></span>
            <div>
              <p class="m-brand-name">TAWA</p>
              <p><span class="m-brand-country"></span><span class="m-ft-22">德国</span></p>
            </div>
          </div>
          <span class="m-brand-btn">进店</span>
        </div>
        <div></div>
      </div>
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
  .m-product-brand{
    position: relative;
    width: 100%;
    height: 650px;
    background-color: #9fd0bf;
    margin-bottom: 30px;
    .m-icon-bg{
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 67px;
      background: url("/static/images/icon-bg.png") no-repeat;
      background-size: 100% 100%;
    }
    .m-brand-info{
      position: absolute;
      bottom: 0;
      left: 37px;
      width: 676px;
      height: 110px;
      border-radius: 10px;
      background-color: rgba(255,255,255,0.7);
      box-shadow:0 3px 6px rgba(0,0,0,0.16);
      .m-brand-logo{
        display: block;
        width: 76px;
        height: 76px;
        border-radius: 50%;
        box-shadow:0 5px 20px rgba(0,0,0,0.16);
        margin: 0 34px;
      }
      .m-brand-name{
        font-size: 30px;
        font-weight: bold;
      }
      .m-brand-country{
        display: inline-block;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: #9fd0bf;
        margin-right: 10px;
        vertical-align: middle;
      }
      .m-brand-btn{
        display: block;
        width: 129px;
        height: 41px;
        line-height: 41px;
        text-align: center;
        background-color: @mainColor;
        border-radius: 30px;
        margin-right: 25px;
      }
    }
  }
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
