<template>
  <div class="m-scene">
    <product :list="productList"></product>
    <span class="m-icon-top"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import product from '../components/product';
  import axios from 'axios';
  import api from '../../../api/api'
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        productList: []
      }
    },
    components: { product },
    mounted() {
      common.changeTitle('竞猜商品');
      this.getProduct();
    },
    methods: {
      getProduct() {
        this.productList = JSON.parse(localStorage.getItem('guessProduct'));
        // console.log(this.productList);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/scroll";

  .m-scene{
    min-height: 100vh;
    background-color: #eeeeee;
    .m-icon-top{
      position: fixed;
      bottom: 40px;
      right: 15px;
      width: 78px;
      height: 78px;
      background: url("/static/images/icon-top.png") no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
