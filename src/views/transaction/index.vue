<template>
  <div class="container">
    <h3 class="m-part-title">
      <span class="m-flex-start">
         <span class="m-part-title-icon"></span>
         <span>交易数据</span>
      </span>
    </h3>

    <ul class="trade-data-list">
      <li class="trade-data-item">
        <section class="trade-data-left"></section>

        <section class="trade-data-right">
          <span class="label">全部交易额</span>
          <span class="value">￥100469.50</span>
        </section>
      </li>

      <li class="trade-data-item">
        <section class="trade-data-left order-num"></section>

        <section class="trade-data-right">
          <span class="label">全部订单数</span>
          <span class="value">469</span>
        </section>
      </li>

    </ul>

  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/index";

  .container {
    .trade-data-list {
      .m-flex-start();
      margin-top: .33rem;

      .trade-data-item {
        .wl(4rem, 1.9rem);
        border: 1px solid #dbdcdc;
        padding-left: .5rem;
        .m-flex-start();

        .trade-data-left {
          .wl(.66rem, .66rem);
          background-size: 100% 100%;
          background-image: url("../../common/images/order-money.png");
          margin-right: .3rem;

          &.order-num{
            background-image: url("../../common/images/order-num.png");
          }
        }

        .trade-data-right {
          .fjc();

          .label{
            .sc(.2rem, #595757);
          }
          .value{
            .sc(.19rem, #D80000);
          }
        }
      }
    }
  }
</style>
