<template>
  <div>
    <span class="m-icon-home" @click="buyerStore" v-if="buyer_store"></span>

    <mt-tabbar v-model="selected" :fixed="true">
      <template v-for="(item,index) in tabbar" >
        <mt-tab-item :id="item.name" >
          <img slot="icon" :src="item.active_icon" v-if="item.name == selected">
          <img slot="icon" :src="item.icon" v-else>
          {{item.name}}
        </mt-tab-item>
      </template>
    </mt-tabbar>
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../../common/js/common';
  import axios from 'axios';
  import api from '../../api/api';
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        name: '',
        selected: this.$store.state.tabbar_select,
        tabbar: this.$store.state.tabbar_buyer,
        // tabbar: this.$store.state.tabbar_store,
        buyer_store: true
      }
    },
    components: {},
    methods: {
      // 左上角买家首页和卖家首页的切换
      buyerStore() {
        if(this.selected == this.$store.state.tabbar_buyer[0].name) {       // 目前在买家版首页
          axios.get(api.get_home + "?token=" + localStorage.getItem('token')).then(res => {
            if(res.data.status == 200){
              if(res.data.data.uslevel == "1") {            // 1 - 买家 - 去店主申请页面
                this.$router.push("storekeeper/applyOwner");
              }else if(res.data.data.uslevel == "2") {      // 2 - 卖家 - 去卖家版首页
                this.tabbar = this.$store.state.tabbar_store;
                this.selected = this.tabbar[0].name;
                this.$router.push("material");
              }else if(res.data.data.uslevel == "3") {      // 3 - 申请成为卖家中
                this.$router.push("storekeeper/applyOwner");
              }
            }else{
              Toast(res.data.message);
            }
          });
        }else if(this.selected == this.$store.state.tabbar_store[0].name) {     // 目前在卖家版首页
          this.tabbar = this.$store.state.tabbar_buyer;
          this.selected = this.tabbar[0].name;
          this.$router.push("selected");
        }
      }
    },
    mounted(){
      if(window.location.hash.indexOf("material") == 2 || window.location.hash.indexOf("selected") == 2) {
        this.buyer_store = true;
      }else {
        this.buyer_store = false;
      }
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
        if(val == "精选" || val == "素材") {
          this.buyer_store = true;
        }else {
          this.buyer_store = false;
        }
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
              this.selected = '素材';
              common.changeTitle('素材');
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
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/index";

  .m-icon-home {
    /*border: 1px red solid;*/
    display: block;
    width: 50px;
    height: 50px;
    background: url("/static/images/icon-home.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 22px;
    left: 33px;
  }
</style>
