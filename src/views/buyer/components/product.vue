<template>
  <ul class="m-recommend">
    <li>
      <img src="" class="m-one-product-img" alt="">
      <div class="m-one-product-text">
        <h3>【北面】THE NORTH d </h3>
        <p class="m-flex-between">
          <span >￥950.00</span>
          <s class="m-grey">￥950.00</s></p>
      </div>
    </li>
    <li>
      <img src="" class="m-one-product-img" alt="">
      <div class="m-one-product-text">
        <h3>【北面】THE NORTH d </h3>
        <p class="m-flex-between">
          <span >￥950.00</span>
          <s class="m-grey">￥950.00</s></p>
      </div>
    </li>
    <li>
      <img src="" class="m-one-product-img" alt="">
      <div class="m-one-product-text">
        <h3>【北面】THE NORTH d </h3>
        <p class="m-flex-between">
          <span >￥950.00</span>
          <s class="m-grey">￥950.00</s></p>
      </div>
    </li>
    <li>
      <img src="" class="m-one-product-img" alt="">
      <div class="m-one-product-text">
        <h3>【北面】THE NORTH d </h3>
        <p class="m-flex-between">
          <span >￥950.00</span>
          <s class="m-grey">￥950.00</s></p>
      </div>
    </li>
  </ul>

</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                name: ''
            }
        },
        components: {},
        methods: {},
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
  .m-recommend{
    display: flex;
    flex-flow: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 30px 33px ;
    li{
      list-style: none;
      width: 325px;
      height: auto;
      border-radius: 10px;
      box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.16);
      background-color: #ffffff;
      margin-bottom: 30px;
      &:nth-child(odd){
        margin-right: 30px;
      }
      .m-one-product-img{
        display: block;
        width: 325px;
        height: 325px;
        background-color: #edb3b1;
      }
      .m-one-product-text{
        padding: 15px;
      }
      h3{
        width: 325px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 38px;
        font-size: 21px;
        text-align: left;
      }
    }
  }
</style>
