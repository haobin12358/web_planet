<template>
  <div class="m-personal " >
    <div class="m-personal-bg">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-personal-content m-serviceCenter ">
      <div class="m-personal-body">
        <div class="m-one-part">

          <div class="m-serviceCenter-ul">
            <div v-for="(item,index) in ul_list" @click="changeRoute(item)">
              <div class="m-serviceCenter-li">
                <div>
                  <span :class="item.icon"></span>
                  <span>{{item.name}}</span>
                </div>
                <span class="m-icon-more " :class="item.child.length >0?'m-icon-unfold':''"></span>
              </div>
              <div class="m-serviceCenter-li-ul" v-if="item.child.length > 0">
                <p v-for="i in item.child">{{i.name}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="m-serviceCenter-foot">
          <div class="m-serviceCenter-btn">
            <span class="m-icon-service"></span>
            <div>
              <p>在线客服</p>
              <p>（8:30-24:00)</p>
            </div>
          </div>
          <div class="m-serviceCenter-btn">
            <span class="m-icon-tell"></span>
            <div>
              <p>客服电话</p>
              <p>（8:30-24:00)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        ul_list:[
          {
            name:'订单问题',
            icon:'m-icon-order',
            url:'',
            params:'',
            child:[
              {
                name:'如何修改订单',
                icon:'',
                url:'',
                params:''
              },
              {
                name:'如何取消订单',
                icon:'',
                url:'',
                params:''
              }
            ]
          },
          {
            name:'售后问题',
            icon:'m-icon-after',
            url:'',
            params:'',
            child:[]
          },
          {
            name:'支付问题',
            icon:'m-icon-pay',
            url:'',
            params:'',
            child:[]
          },
          {
            name:'物流问题',
            icon:'m-icon-logs',
            url:'',
            params:'',
            child:[]
          },
          {
            name:'优惠券',
            icon:'m-icon-coupon',
            url:'',
            params:'',
            child:[]
          },
          {
            name:'大行星积分',
            icon:'m-icon-integral',
            url:'',
            params:'',
            child:[]
          }
        ]
      }
    },
    components: {},
    methods: {
      changeRoute(v){
        this.$router.push('/personal/serviceCenterDetail');
      }
    },
    created() {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/personal";
  .m-serviceCenter{
    margin-top: 30px;
    .m-one-part{
      height: 1000px;
      .m-icon-more{
        &.m-icon-unfold{
          background: url("/static/images/icon-unfold.png");
          background-size: 100% 100%;
        }
      }
    }
    .m-serviceCenter-ul{
      .m-serviceCenter-li{
        padding: 30px 0 19px;
        border-bottom: 1px solid #CCCCCC;
        .flex-row(space-between);
        font-size: 30px;
        .m-icon-order{
          display: inline-block;
          width: 46px;
          height: 43px;
          background: url("/static/images/m-serviceCenter-order.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
          margin-right: 22px;
        }
        .m-icon-after{
          display: inline-block;
          width: 46px;
          height: 39px;
          background: url("/static/images/m-serviceCenter-after.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
          margin-right: 22px;
        }
        .m-icon-pay{
          display: inline-block;
          width: 46px;
          height: 35px;
          background: url("/static/images/m-serviceCenter-pay.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
          margin-right: 22px;
        }
        .m-icon-logs{
          display: inline-block;
          width: 45px;
          height: 43px;
          background: url("/static/images/m-serviceCenter-logs.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
          margin-right: 22px;
        }
        .m-icon-coupon{
          display: inline-block;
          width: 43px;
          height: 36px;
          background: url("/static/images/m-serviceCenter-coupon.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
          margin-right: 25px;
        }
        .m-icon-integral{
          display: inline-block;
          width: 43px;
          height: 45px;
          background: url("/static/images/m-serviceCenter-integral.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
          margin-right: 25px;
        }
      }
      .m-serviceCenter-li-ul{
        p{
          margin-left: 70px;
          padding-top: 25px;
        }

      }
    }
    .m-serviceCenter-foot{
      padding: 10px 0;
      border-radius: 10px;
      box-shadow:0 5px 6px rgba(0,0,0,0.16);
      margin-top: 44px;
      .flex-row(space-around);
      background-color: @mainColor;
      .m-serviceCenter-btn{
        width: 50%;
        text-align: center;
        .flex-row(center);
        line-height: 36px;
        &:first-child{
          border-right: 1px solid #fff;
        }
        .m-icon-service{
          display: inline-block;
          width: 59px;
          height: 60px;
          background: url("/static/images/m-serviceCenter-kefu.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 20px;
        }
        .m-icon-tell{
          display: inline-block;
          width: 61px;
          height: 60px;
          background: url("/static/images/m-serviceCenter-tell.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 20px;
        }
      }
    }
  }
</style>
