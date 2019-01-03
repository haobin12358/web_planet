<template>
  <div class="m-gift-box">
    <product :list="giftList" :gift="true"></product>
  </div>
</template>

<script>
  import common from '../../../common/js/common';
  import api from '../../../api/api';
  import axios from 'axios';
  import product from '../components/product';

  export default {
    data() {
      return {
        name: 'gift',
        giftList: []
      }
    },
    components: { product },
    methods: {
      // 获取商家礼包列表
      getProduct() {
        let params = {
          itid: 'upgrade_product',
          page_num: 1,
          page_size: 200
        };
        axios.get(api.product_list, { params: params }).then(res => {
          if(res.data.status == 200) {
            this.giftList = res.data.data;
          }
        });
      },
    },
    mounted() {
      common.changeTitle('购买礼包');
      this.getProduct();            // 获取商家礼包列表
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-gift-box {
    min-height: 100%;
  }
</style>
