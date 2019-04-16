<template>
    <div class="m-collect">
      <div class="m-nav">
        <nav-list :navlist="nav_list"  @navClick="navClick"></nav-list>
      </div>
      <div class="m-collect-content">
        <m-circle v-if="nav_list[0].active"></m-circle>

      </div>
    </div>
</template>

<script>
  import navList from '../../../components/common/navlist';
  import mCircle from '../../../components/common/circle';
    export default {
        name: "collect",
      data(){
          return{
            nav_list:[
              {
                name:'内容',
                value:'',
                active:true
              },
              {
                name:'商品',
                value:'',
                active:false
              }
            ]
          }
      },
      components:{navList,mCircle},
      methods:{
        navClick(v){

        }
      }
    }
</script>

<style scoped lang="less">
.m-collect{
  background-color: #fff;
  min-height: 100vh;
  .m-collect-content{
    padding: 0 33px;
  }
}
</style>
