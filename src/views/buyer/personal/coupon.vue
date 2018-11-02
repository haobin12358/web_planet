<template>
    <div class="m-coupon">
      <ul class="m-nav-list">
        <li class="active">
          <span>未使用</span>
        </li>
        <li>
          <span>已使用</span>
        </li>
        <li>
          <span>已过期</span>
        </li>
      </ul>
      <div class="m-coupon-content">
        <ul class="m-coupon-content-ul">
          <li>
            <span class="m-left-circle"></span>
             <span class="m-price-icon">￥</span>
            <div class="m-coupon-detail">
              <span class="m-ft-160">60</span>
              <div>
                <p class="m-ft-48">服饰类专用</p>
                <p class="m-ft-36">无限制可叠加</p>
              </div>
            </div>
            <span class="m-right-circle"></span>
          </li>
          <li class="unable">
            <span class="m-left-circle"></span>
            <div class="m-coupon-detail">
              <span class="m-ft-160">6</span>
              <span class="m-icon-word">折</span>
              <div>
                <p class="m-ft-48">服饰类专用</p>
                <p class="m-ft-36">无限制可叠加</p>
              </div>
            </div>

            <span class="m-right-circle"></span>
          </li>
        </ul>
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
        methods: {},
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../../common/css/index";
.m-coupon{
  .m-nav-list{
    padding: 0 80px;
  }
  .m-coupon-content{
    padding: 65px;
    .m-coupon-content-ul{
      li{
        position: relative;
        width: 619px;
        height: 213px;
        background:linear-gradient(108deg,rgba(252,211,22,1) 0%,rgba(245,147,145,1) 100%);
        border-radius: 10px;
        margin-bottom: 30px;
        color: #fff;
        &.unable{
          background:linear-gradient(108deg,rgba(233,233,233,1) 0%,rgba(153,153,153,1) 100%);
        }
        .m-price-icon{
          position: absolute;
          top: 14px;
          left: 60px;
          font-size: 46px;
        }
        .m-icon-word{
          font-size: 46px;
          display: inline-block;
          margin-top: 60px;
          /*vertical-align: text-bottom;*/
        }
        .m-left-circle{
          position: absolute;
          top: 84px;
          left: -21px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: #fff;
        }
        .m-right-circle{
          position: absolute;
          top: 84px;
          right: -21px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: #fff;
        }
        .m-coupon-detail{
          .flex-row(space-between);
          width: 482px;
          padding-right: 30px;
          position: absolute;
          top: 23px;
          left: 106px;
          text-align: left;
          .m-ft-160{
            font-size: 160px;
            font-weight: bold;
          }
          .m-ft-48{
            font-size: 48px;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}


</style>
