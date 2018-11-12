<template>
    <div class="m-equipment-detail">
      <!--搜索-->
      <div class="m-selected-search">
        <span class="m-icon-back" @click="changeRoute('/equipment')"></span>
        <div class="m-search-input-box" @click="changeRoute('/search')">
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
        <div v-if="category_list" v-for="(item,index) in category_list">
          <div class="m-line">
            <p class="m-line-name">
              <span >{{item.pcname}}</span>
            </p>
          </div>
          <ul class="m-equipment-detail-product" v-if="item.subs">
            <li  v-for="(v,i) in item.subs" @click="changeRoute('/product',item)">
              <img :src="v.pcpic" alt="">
              <span>{{v.pcname}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api'
    export default {
        name: "detail",
      data(){
          return{
            head_src:null,
            head_name:'',
            category_list:[]
        }
      },
      mounted(){
        common.changeTitle('装备单类');
        this.head_src = this.$route.query.head;
        this.head_name = this.$route.query.name;
        this.getCategoryList();
      },
      methods:{
        changeRoute(v,item){
          if(item){
            this.$router.push({path: v,query:{
                pcid:item.pcid
              }})
          }else{
            this.$router.push({path: v})
          }

        },
        getCategoryList(){
          axios.get(api.category_list,{
            params:{
              up:this.$route.query.pcid,
              deep:1
            }
          }).then(res => {
            if(res.data.status == 200){
              this.category_list = [].concat(res.data.data)
            }
          })
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
        bottom: -3px;
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
