<template>
  <div class="m-personal" >
    <div class="m-personal-bg">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-personal-content">
      <p class="m-set-box">
        <span class="m-icon-set"></span>
      </p>
      <div class="m-personal-info">
        <img src="" class="m-personal-head-portrait" alt="">
        <div class="m-personal-info-box">
          <div class="m-personal-info-text">
            <div>
              <p>居居女孩</p>
              <p>
                <span class="m-personal-identity">行装会员</span>
              </p>
            </div>
            <img src="" class="m-code-img" alt="">
          </div>
          <ul class="m-personal-ul">
            <li>
              <span class="m-icon-gift"></span>
              <span class="m-name">优惠券</span>
              <span>0</span>
            </li>
            <li>
              <span class="m-icon-integral"></span>
              <span class="m-name">可用积分</span>
              <span>520</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="m-personal-body">
        <div class="m-one-part">
          <p class="m-one-part-title">
            <span class="m-name">我的订单</span>
            <span>
              <span>全部订单</span>
              <span class="m-icon-more"></span>
            </span>
          </p>
          <ul class="m-part-icon-ul">
            <li>
              <img src="/static/images/icon-order-pay.png" alt="">
              <span>待付款</span>
            </li>
            <li>
              <img src="/static/images/icon-order-send.png" class="m-square" alt="">
              <span>待发货</span>
            </li>
            <li>
              <img src="/static/images/icon-receive.png" class="m-square" alt="">
              <span>待收货</span>
            </li>
            <li>
              <img src="/static/images/icon-order-after-sale.png" alt="">
              <span>售后</span>
            </li>
          </ul>
        </div>
        <div class="m-one-part">
          <p class="m-one-part-title">
            <span class="m-name">常用工具</span>
          </p>
          <ul class="m-part-icon-ul m-use">
            <li>
              <img src="/static/images/icon-personal-service.png" alt="">
              <span>客服中心</span>
            </li>
            <li>
              <img src="/static/images/icon-personal-security-center.png"  alt="">
              <span>安全中心</span>
            </li>
            <li>
              <img src="/static/images/icon-personal-discount.png"  alt="">
              <span>优惠中心</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        name: ''
      }
    },
    components: {},
    methods: {
      payOrder(e){
        console.log(e)
        this.$router.push('/submitOrder');
      }
    },
    created() {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
  .m-personal{
    width: 100%;
    min-height: 1334px;
    background-color: #EEEEEE;
    position: relative;
    z-index: -2;
    .m-personal-bg{
      width: 100%;
      height: 450px;
      background:linear-gradient(180deg,rgba(252,211,22,1) 0%,rgba(239,232,197,1) 100%);
      position: absolute;
      top:0;
      left: 0;
      z-index: -1;
      .m-icon-bg{
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100%;
        height: 67px;
        background: url("/static/images/icon-shop-bg.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .m-personal-content{
      padding: 0 25px;
      text-align: left;
      .m-set-box{
        padding: 30px 25px  30px 0;
        &:after{
          content: '';
          display: block;
          clear: both;
        }
        .m-icon-set{
          float: right;
          width: 40px;
          height: 40px;
          background: url("/static/images/icon-set.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .m-personal-info{
        .flex-row(flex-start);
        .m-personal-head-portrait{
          display: block;
          width: 180px;
          height: 180px;
          background-color: #edb3b1;
          margin-right: 30px;
          margin-left: 42px;
          border-radius: 50%;
        }
        .m-personal-info-text{
          height: 180px;
          font-size: 30px;
          width: 424px;
          .m-personal-identity{
            display: inline-block;
            padding: 5px 20px;
            background: #D5D5D5;
            font-size: 20px;
            border-radius: 30px;
            margin-top: 10px;
          }
          .flex-row(space-between);
          .m-code-img{
            display: block;
            width: 75px;
            height: 75px;
            background-color: #edb3b1;
          }
        }
        .m-personal-ul{
          .flex-row(space-between);
          li{
            line-height: 29px;
            .m-icon-gift{
              display: inline-block;
              width: 26px;
              height: 29px;
              background: url("/static/images/icon-persoanl-gift.png") no-repeat;
              background-size: 100% 100%;
              vertical-align: top;
            }
            .m-name{
              display: inline-block;
              margin: 0 15px;
            }
            .m-icon-integral{
              display: inline-block;
              width: 29px;
              height: 29px;
              background: url("/static/images/icon-integral.png") no-repeat;
              background-size: 100% 100%;
              vertical-align: top;
            }
          }

        }
      }
      .m-personal-body{
        .m-one-part {
          width: 630px;
          padding: 16px 26px 22px 44px;
          background-color: #fff;
          box-shadow: 0 5px 6px rgba(0, 0, 0, 0.16);
          border-radius: 10px;
          margin-top: 35px;
          text-align: left;
          .m-one-part-title{
            .flex-row(space-between);
            .m-name{
              font-size: 28px;
              font-weight: bold;
            }
            .m-icon-more{
              display: inline-block;
              width: 22px;
              height: 22px;
              background: url("/static/images/icon-more.png") no-repeat;
              background-size: 100% 100%;
              vertical-align: text-top;
            }
          }
          .m-part-icon-ul{
            .flex-row(space-around);
            margin: 30px 0;
            li{
              /*width: 70px;*/
              text-align: center;
              img{
                display: block;
                width: 77px;
                height: 58px;
                margin: 5px;
                &.m-square{
                  width: 64px;
                }
              }
            }
            &.m-use{
              li{
                img{
                  display: block;
                  width: 80px;
                  height: 80px;
                  margin: 5px;
                }
              }
            }
          }
        }
      }
    }

  }
</style>
