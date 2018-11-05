<template>
  <ul class="m-nav-list">
    <template v-for="(item,index) in navlist">
      <li :class="item.active?'active':''" @click="navClick(index)">{{item.name}}
        <span class="m-icon-box" v-if="item.icon">
            <span class="m-icon-up"></span>
             <span class="m-icon-down"></span>
          </span>
      </li>
    </template>
  </ul>

</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                name: ''
            }
        },
        props: {
          navlist:{
            type:Array,
            default:null
          }
        },
        methods: {
          navClick(i){
            if(this.navlist[i].active)
              return false;
            this.$emit('navClick',i);
          }
        },
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/index";
</style>
