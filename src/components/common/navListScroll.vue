<template>
  <ul class="m-nav-list-scroll">
    <li v-for="(item, index) in navList" :class="item.active ? 'active' : ''" @click="navClick(index)">
      {{item.name}}
    </li>
  </ul>
</template>

<script>
  export default {
    name: "navListScroll",
    data() {
      return {}
    },
    props: {
      navList: { type: Array, default: [] }
    },
    methods: {
      navClick(i){
        if(this.navList[i].active)
          return false;
        this.$emit('navClick',i);
      }
    },
    mounted() {
      console.log(this.navList);
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/index";

  //滚动的navList样式
  .m-nav-list-scroll {
    margin-top: 40px;
    /*width: 100%;*/
    display: inline-block;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    li{
      justify-content: space-between;
      display: inline-block;
      font-size: 24px;
      margin-right: 65px;
      padding-bottom: 5px;
      &.active{
        border-bottom: 3px solid @mainColor;
      }
    }
  }
</style>
