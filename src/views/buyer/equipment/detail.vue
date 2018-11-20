<template>
    <div class="m-equipment-detail">
      <!--搜索-->
      <div class="m-selected-search">
        <span class="m-icon-back" @click="changeRoute('/equipment')"></span>
        <div class="m-search-input-box" @click="changeRoute('/search')">
          <span class="m-icon-search"></span>
          <span>搜索商品/分类</span>
        </div>
      </div>
      <h3 class="m-equipment-h3">装备分类</h3>
      <section>
        <div class="m-equipment-info">
          <img src="" class="m-equipment-img" alt="">
          <!--<span class="m-equipment-bg"></span>-->
          <!--<div class="m-equipment-detail-name">-->
          <!--<img :src="head_src" class="m-equipment-head-portrait" alt="">-->
          <!--<span>{{head_name}}</span>-->
          <!--</div>-->
        </div>
        <div class="m-side-scroll">
          <ul class="m-side-ul">
            <li v-for="(item,index) in icon_list" :class="item.active?'active':''" @click="sideClick(index)">
              <img src="https://planet.daaiti.cn/img/equipment/equipment-child.png"  alt="">
              <span>{{item.pcname}}</span>
            </li>
          </ul>
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
      </section>

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
            category_list:[],
            icon_list:null
        }
      },
      mounted(){
        common.changeTitle('装备单类');
        this.head_src = this.$route.query.head;
        this.head_name = this.$route.query.name;
        this.getCategory();
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
        getCategoryList(id){
          axios.get(api.category_list,{
            params:{
              up:id,
              deep:1
            }
          }).then(res => {
            if(res.data.status == 200){
              this.category_list = [].concat(res.data.data)
            }
          })
        },
        //获取装备信息
        getCategory(){
          axios.get(api.category_list).then(res => {
            if(res.data.status == 200){
              for(let i=0;i<res.data.data.length;i++){
                res.data.data[i].active = false;
                if(this.$route.query.pcid && this.$route.query.pcid == res.data.data[i].pcid){
                  res.data.data[i].active = true;
                }
              }
              if(!this.$route.query.pcid){
                res.data.data[i].active = true;
              }
              this.icon_list = [].concat(res.data.data);
              if(this.$route.query.pcid){
                this.getCategoryList(this.$route.query.pcid);
              }else{
                this.getCategoryList(this.icon_list[0].pcid);
              }
            }
          })
        },
        //装备点击
        sideClick(index){
          if(this.icon_list[index].active){
            return false;
          }
          let arr = [].concat(this.icon_list);
          for(let i=0;i<arr.length;i++){
            arr[i].active = false;
          }
          arr[index].active = true;
          this.icon_list = [].concat(arr);
          this.getCategoryList(this.icon_list[index].pcid);
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
  .m-equipment-detail{
    background-color: #fff;
    min-height: 100%;
    .m-selected-search{
      position: fixed;
      top:0;
      left: 0;
      border-bottom: 1px solid #f0f0f0;
      width: 100%;
      box-sizing: border-box;
    }
    .m-equipment-h3{
      text-align: left;
      padding: 14px 0 0 33px;
      color: #333;
      margin-top: 100px;
    }
    section{
      position: relative;
      min-height: 100%;
      .m-line{
        .m-line-name{
          text-align: right;
        }
      }
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
      .m-side-scroll{
        position: absolute;
        width: 280px;
        overflow-y: auto;
        background-color: #fff;
        box-shadow:5px 0 10px rgba(0,0,0,0.16);
        top: 0;
        min-height: 100%;
        li{
          line-height: 130px;
          padding: 5px 0;
          &.active{
            background-color: rgba(252,211,22,0.51);
          }
          img{
            display: inline-block;
            width: 120px;
            height: 120px;
            margin-left: 15px;
            vertical-align: middle;
            box-shadow:5px 0 10px rgba(0,0,0,0.16);
            border-radius: 50%;
          }
        }
      }
      .m-equipment-detail-content{
        padding: 50px 0 50px 300px;
        .m-equipment-detail-product{
          .flex-row(flex-start);
          flex-wrap: wrap;
          padding-left: 20px;
          li{
            width: 170px;
            height: 220px;
            background:rgba(255,255,255,1);
            box-shadow:0 5px 6px rgba(0,0,0,0.16);
            border-radius:10px;
            line-height: 63px;
            margin: 0 35px 20px 0;
            &:nth-child(3n){
              margin-right: 0;
            }
            img{
              display: block;
              width: 100%;
              height: 170px;
              background-color: #9fd0bf;
              border-top-left-radius:10px;
              border-top-right-radius:10px;
            }
          }
        }
      }
    }

  }
</style>
