<template>
    <div class="m-brandDetail">
      <div class="m-brand-info">
        <img src="" class="m-brand-img" alt="">
        <span class="m-icon-bg"></span>
        <img class="m-brand-logo" src="">
        <div class="m-brand-name">
          <p class="m-ft-30 m-ft-b">TAWA</p>
          <p>
            <span class="m-icon-country"></span>
            <span class="m-ft-22">德国</span>
          </p>
        </div>
      </div>
      <div class="m-brand-text">
        <p>TAWA是一个源于德国的家庭车生活服务商品牌，致力于为家庭用
          户提供与自驾游相关所需装备的一站式解决方案。</p>
        <p class="m-up-fold">
          <span>点击展开 <span class="m-icon-unfold"></span></span>
          <span>点击收起 <span class="m-icon-packup"></span></span>
        </p>
      </div>
      <nav-list :navlist="nav_list" @navClick="navClick"></nav-list>

      <product></product>
    </div>
</template>

<script>
  import navList from '../../../components/common/navlist';
  import product from '../components/product';
    export default {
        data(){
          return{
            nav_list:[
              {
                name:'综合',
                params:'',
                active:true
              },
              {
                name:'销量',
                params:'',
                active:false
              },
              {
                name:'价格',
                params:'',
                icon:true,
                active:false
              }
            ]
          }
        },
      components:{
          navList,
        product
      },
      methods: {
        navClick(index){
          let arr = [].concat(this.nav_list);
          for(let i=0;i<arr.length;i++){
            arr[i].active = false;
          }
          arr[index].active = true;
          this.nav_list = [].concat(arr)
        }
      },
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
.m-brandDetail{
  .m-brand-info{
    height:440px;
    width: 100%;
    position: relative;
    margin-bottom: 68px;
    .m-brand-img{
      display: block;
      width: 100%;
      height: 440px;
      background-color: #9fd0bf;
    }
    .m-icon-bg{
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 67px;
      background: url("/static/images/icon-bg.png") no-repeat;
      background-size: 100% 100%;
    }
    .m-brand-logo{
      position: absolute;
      bottom: -40px;
      left: 50px;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      box-shadow:0 5px 20px rgba(0,0,0,0.16);
    }
    .m-brand-name{
      position: absolute;
      bottom: -30px;
      left: 200px;
      .m-icon-country{
        display: inline-block;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        /*margin-right: 10px;*/
        background-color: #9fd0bf;
        vertical-align: middle;
      }
    }
  }
  .m-brand-text{
    padding: 0 36px;
    text-align: left;
    .m-up-fold{
      text-align: right;
      padding: 19px 160px 34px;
      font-size: 22px;
      color: #999;
      .m-icon-unfold{
        display: inline-block;
        width: 22px;
        height: 10px;
        background: url("/static/images/icon-brand-unfold.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 10px;
        vertical-align: middle;
      }
      .m-icon-packup{
        display: inline-block;
        width: 22px;
        height: 10px;
        background: url("/static/images/icon-packup.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 10px;
        vertical-align: middle;
      }
    }
  }
  .m-nav-list{
    .flex-row(space-around);
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    padding: 6px 0;
  }
}
</style>
