<template>

    <mt-tabbar v-model="selected" :fixed="true">
      <template v-for="(item,index) in tabbar" >
        <mt-tab-item :id="item.name" >
          <img slot="icon" :src="item.active_icon" v-if="item.name == selected">
          <img slot="icon" :src="item.icon" v-else>
          {{item.name}}
        </mt-tab-item>
      </template>
    </mt-tabbar>


</template>

<script type="text/ecmascript-6">
  import common from '../../common/js/common';
    export default {
        data() {
            return {
                name: '',
              selected:this.$store.state.tabbar_select,
              tabbar:this.$store.state.tabbar_buyer
            }
        },
        components: {},
        methods: {

        },
      mounted(){

      },
      computed:{
        select(){
          return this.$store.state.tabbar_select
        },
        tabbars(){
          return this.$store.state.tabbar_store;
        }
      },
      watch: {
        selected: function (val, oldVal) {
          this.$store.state.tabbar_select = val;
          common.changeTitle(val);
          switch(val){
            case '素材':
              this.$router.push('/material');
              break;
            case '会员':
              this.$router.push('/member');
              break;
            case '店主':
              this.$router.push('/storekeeper');
              break;
            case '精选':
              this.$router.push('/selected');
              break;
            case '圈子':
              this.$router.push('/circle');
              break;
            case '装备':
              this.$router.push('/equipment');
              break;
            case '购物车':
              this.$router.push('/shop');
              break;
            case '我的':
              this.$router.push('/personal');
              break;
          }
        },
        select: function (val) {
          this.selected = this.$store.state.tabbar_select
        },
        $route: {
          handler: function(val, oldVal){
            switch (val.name){
              case 'material':
                this.selected = '精选';
                common.changeTitle('精选');
                break;
              case 'member':
                this.selected = '会员';
                common.changeTitle('会员');
                break;
              case 'storekeeper':
                this.selected = '店主';
                common.changeTitle('店主');
                break;
              case 'selected':
                this.selected = '精选';
                common.changeTitle('精选');
                break;
              case 'circle':
                this.selected = '圈子';
                common.changeTitle('圈子');
                break;
              case 'shop':
                this.selected = '购物车';
                common.changeTitle('购物车');
                break;
              case 'personal':
                this.selected = '我的';
                common.changeTitle('我的');
                break;

            }
          },
          // 深度观察监听
          deep: true
        },
        tabbars:function () {
          this.tabbar =this.$store.state.tabbar;
        }
      },

      created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/index";
</style>
