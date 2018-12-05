<template>
  <div>
    <page-nav :list="nav_list" @navClick="navClick"></page-nav>
    <guess v-if="select.value == 'guess'"></guess>
    <magic-gift-box v-else-if="select.value == 'magicGiftBox'"></magic-gift-box>
    <trial-product v-else-if="select.value == 'trialProduct'"></trial-product>
    <first-order v-else-if="select.value == 'firstOrder'"></first-order>
  </div>
</template>

<script>
  import pageNav from 'src/components/common/pageNav';
  import Guess from "./guess";
  import MagicGiftBox from "./magicGiftBox";
  import TrialProduct from "./trialProduct";
  import FirstOrder from "./firstOrder";

  export default {
    name: "index",

    components:{
      pageNav,
      Guess,
      MagicGiftBox,
      TrialProduct,
      FirstOrder,
    },

    data(){
      return {
        nav_list:[
          {
            name:'每日竞猜',
            value:'guess',
            active:true
          }, {
            name:'好友魔盒',
            value:'magicGiftBox',
            active:false
          }, {
            name:'免费试用',
            value:'trialProduct',
            active:false
          }, {
            name:'新人首单',
            value:'firstOrder',
            active:false
          },
        ],
        select:{
          name:'每日竞猜',
          value:'guess',
          active:true
        }
      }
    },

    methods:{
      navClick(navIndex){
        this.select = this.nav_list[navIndex];
        this.nav_list.forEach((item,index) => {
          item.active = index == navIndex
        })
      }
    },

    created(){
      if(this.$route.query.index){
        this.navClick(this.$route.query.index);
      }
    },
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
