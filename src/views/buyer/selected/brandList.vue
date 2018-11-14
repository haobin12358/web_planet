<template>
    <div class="m-brandList">
      <div class="m-nav">
        <nav-list :navlist="nav_list" :isScroll="true" :is-get="true" @navClick="navClick"></nav-list>
      </div>
      <div class="m-bandList-content">
        <div class="m-one-brand-part">
          <h3>精选大牌 /</h3>
          <ul class="m-brand-ul">
            <li @click="changeRoute('/brandDetail')">
              <img src="" alt="">
            </li>
            <li>
              <img src="" alt="">
            </li>
            <li>
              <img src="" alt="">
            </li>
            <li>
              <img src="" alt="">
            </li>
          </ul>
        </div>
        <div class="m-one-brand-part">
          <h3>精选大牌 /</h3>
          <ul class="m-brand-ul">
            <li>
              <img src="" alt="">
            </li>
            <li>
              <img src="" alt="">
            </li>
            <li>
              <img src="" alt="">
            </li>
            <li>
              <img src="" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import common from '../../../common/js/common';
  import navList from '../../../components/common/navlist';
  import axios from 'axios';
  import api from '../../../api/api'
  import {Toast} from 'mint-ui';
  import bottomLine from '../../../components/common/bottomLine'
    export default {
      data(){
          return{
            nav_list:[]
          }
        },
      components: {
        navList
      },
      mounted(){
        common.changeTitle('品牌列表');
        this.getBrand();
        this.getNav();
      },
      methods:{
        //改变路由
        changeRoute(v){
          this.$router.push(v)
        },
        //导航切换
        navClick(index){
          let arr = [].concat(this.nav_list);
          for(let i=0;i<arr.length;i++){
            arr[i].active = false;
          }
          arr[index].active = true;
          this.nav_list = [].concat(arr)
        },
      //  获取标签
        getNav(){
          axios.get(api.items_list,{
            params:{
              ittype:40
            }
          }).then(res => {
            if(res.data.status == 200){
              for(let i=0;i<res.data.data.length;i++){
                res.data.data[i].active = false;
              }
              res.data.data[0].active = true;
              this.nav_list = [].concat(res.data.data);
            }
          })
        },
      //  获取品牌列表
        getBrand(){
          axios.get(api.brand_list).then(res => {

          })
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "../../../common/css/index";
  .m-brandList{
    .m-nav{
      padding-left: 35px;
      width: 715px;
      box-shadow:0 3px 6px rgba(0,0,0,0.16);
      padding-bottom: 10px;
      margin: 28px 0 48px;
    }
    .m-bandList-content{
      text-align: left;
      .m-one-brand-part{
        h3{
          padding: 0 0 48px 34px;
          font-size: 36px;
          font-weight: bold;
        }
        .m-brand-ul{
          .flex-row(flex-start);
          flex-wrap: wrap;
          padding: 0 70px ;
          li{
            margin-bottom: 40px;
            img{
              display: block;
              width: 150px;
              height: 150px;
              background-color: #9fd0bf;
            }
            margin-right: 80px;
            &:nth-child(3n){
              margin-right: 0;
            }
          }

        }
      }
    }
  }
</style>
