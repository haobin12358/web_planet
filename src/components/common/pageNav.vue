<template>
  <ul class="m-page-nav-ul" >
    <li v-for="(item,index) in list" :class="item.active?'active':''" @click="navClick(index)">
      <span>{{item.name}}</span>
      <span v-if="item.num >=0">{{item.num}}</span>
    </li>
  </ul>
</template>

<script>
    export default {
        data(){
          return {

          }
        },
       props:{
          list:{
            type:Array,
            default:null
          }
       },
      methods:{
        navClick(index){
          if(this.list[index].active){
            return false;
          }
          this.$emit('navClick',index)
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/index";
  .m-page-nav-ul{
    .flex-row(flex-start);
    margin-bottom: 0.4rem;
    li{
      padding: 0.1rem 0;
      font-size: 0.18rem;
      font-weight: bold;
      margin-right: 0.4rem;
      border-bottom: 5px solid transparent;
      &.active{
        color: @sidebarHoverColor;
        border-bottom: 5px solid @sidebarHoverColor;
      }
    }
  }
</style>
