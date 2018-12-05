<template>
  <div class="m-gift-box">
    商家礼包集合
  </div>
</template>

<script>
  import common from '../../../common/js/common';
  import api from '../../../api/api';
  import axios from 'axios';

  export default {
    data() {
      return {
        name: 'gift',
        giftList: []
      }
    },
    methods: {
      // 跳转页面
      changeRoute(item) {
        this.$router.push({ path: '/gift', query: { pbid: item.pbid }});
      },
      // 获取商家礼包详情
      getGift() {
        axios.get(api.product_get + '?prid=pridgift').then(res => {
          if(res.data.status == 200){
            this.giftList = res.data.data;
          }
        });
      }
    },
    mounted() {
      common.changeTitle('购买礼包');
      // this.getGift();            // 获取商家礼包详情
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-gift-box {
    min-height: 100%;
  }
</style>
