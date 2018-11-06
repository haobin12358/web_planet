<template>
    <div class="m-brandList">
      <div class="m-scroll">
        <nav-list :navlist="nav_list" @navClick="navClick"></nav-list>
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
    export default {
      data(){
          return{
            nav_list:[
              {
                name:'精选大牌',
                params:'',
                active:true
              },
              {
                name:'专业登山',
                params:'',
                active:false
              },
              {
                name:'运动休闲',
                params:'',
                active:false
              },
              {
                name:'露营体验',
                params:'',
                active:false
              },
              {
                name:'潜水滑雪',
                params:'',
                active:false
              }
            ]
          }
        },
      components: {
        navList
      },
      mounted(){
        common.changeTitle('订单列表');
      },
      methods:{
        changeRoute(v){
          this.$router.push(v)
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
  .m-brandList{
    .m-scroll{
      padding-left: 35px;
      width: 715px;
      box-shadow:0 3px 6px rgba(0,0,0,0.16);
      padding-bottom: 10px;
      /*margin-bottom: 0;*/
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
