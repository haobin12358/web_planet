<template>
    <div class="m-equipment-detail">
      <!--搜索-->
      <div class="m-selected-search">
        <span class="m-icon-back" @click="changeRoute"></span>
        <div class="m-search-input-box">
          <span class="m-icon-search"></span>
          <span>搜索品牌/分类</span>
        </div>
      </div>

      <div class="m-equipment-info">
        <img src="" class="m-equipment-img" alt="">
        <span class="m-equipment-bg"></span>
        <div class="m-equipment-detail-name">
          <img :src="head_src" class="m-equipment-head-portrait" alt="">
          <span>{{head_name}}</span>
        </div>
      </div>
      <div class="m-equipment-detail-content">
        <div>
          <div class="m-line">
            <p class="m-line-name">
              <span >户外上装</span>
            </p>
          </div>
          <ul class="m-equipment-detail-product">
            <li>
              <img src="" alt="">
              <span>name</span>
            </li>
            <li>
              <img src="" alt="">
              <span>name</span>
            </li>
            <li>
              <img src="" alt="">
              <span>name</span>
            </li>
            <li>
              <img src="" alt="">
              <span>name</span>
            </li>
          </ul>
        </div>
        <div>
          <div class="m-line">
            <p class="m-line-name">
              <span >户外上装</span>
            </p>
          </div>
          <ul class="m-equipment-detail-product">
            <li>
              <img src="" alt="">
              <span>name</span>
            </li>
            <li>
              <img src="" alt="">
              <span>name</span>
            </li>
            <li>
              <img src="" alt="">
              <span>name</span>
            </li>
            <li>
              <img src="" alt="">
              <span>name</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "detail",
      data(){
          return{
            head_src:null,
            head_name:''
        }
      },
      mounted(){
          this.head_src = this.$route.query.head;
        this.head_name = this.$route.query.name;
      },
      methods:{
        changeRoute(){
          this.$router.push('/equipment')
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
  .m-equipment-detail{
    .m-equipment-info{
      position: relative;
      width: 100%;
      height: 330px;
      margin: 20px 0 40px;
      .m-equipment-img{
        display: block;
        width: 100%;
        height: 330px;
        background-color: #9fd0bf;
      }
      .m-equipment-bg{
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 30px;
        background: url("/static/images/icon-bg.png") no-repeat center;
        background-size: 100% 100%;
      }
      .m-equipment-detail-name{
        position: absolute;
        left: 21px;
        bottom: -94px;
        font-size: 38px;
        font-weight: bold;
        line-height: 180px;
        .m-equipment-head-portrait{
          display: inline-block;
          width: 180px;
          height: 180px;
          vertical-align: middle;
        }
      }

    }
    .m-equipment-detail-content{
      padding: 50px 27px;
      .m-equipment-detail-product{
        .flex-row(flex-start);
        flex-wrap: wrap;
        li{
          width: 217px;
          height: 280px;
          background:rgba(255,255,255,1);
          box-shadow:0 5px 6px rgba(0,0,0,0.16);
          border-radius:10px;
          line-height: 63px;
          margin: 0 20px 20px 0;
          &:nth-child(3n){
            margin-right: 0;
          }
          img{
            display: block;
            width: 100%;
            height: 217px;
            background-color: #9fd0bf;
            border-top-left-radius:10px;
            border-top-right-radius:10px;
          }
        }
      }
    }
  }
</style>
