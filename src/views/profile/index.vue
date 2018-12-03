
<template>
    <div class="m-profile">
      <!--<h3 class="m-page-title">概况</h3>-->
      <h3 class="m-part-title">
        <span class="m-part-title-icon"></span>
        <span>待办事项</span>
      </h3>
      <ul class="m-page-label-ul">
        <li>
          <span>提现审批 </span>
          <span>21</span>
        </li>
        <li class="orange">
          <span>提现审批 </span>
          <span>21</span>
        </li>
        <li class="green">
          <span>提现审批 </span>
          <span>21</span>
        </li>
        <li class="blue">
          <span>提现审批 </span>
          <span>21</span>
        </li>
        <li class="purple">
          <span>提现审批 </span>
          <span>21</span>
        </li>
        <li >
          <span>提现审批 </span>
          <span>21</span>
        </li>
      </ul>

      <h3 class="m-part-title">
        <span class="m-part-title-icon"></span>
        <span>交易数据</span>
      </h3>
      <ul class="m-order-label-ul">
        <li>
          <div class="m-icon-price-box">
            <span class="m-icon"></span>
            <div>
              <p>今日交易额</p>
              <p class="m-order-price m-red">￥469.50</p>
            </div>
          </div>
          <p class="m-order-bottom">
            <span>昨日</span>
            <span>336.00
            <span class="m-order-up"></span></span>
          </p>
          <p class="m-order-all">
            <span>全部交易额</span>
            <span class="m-order-price">￥336.00</span>
          </p>
        </li>
        <li>
          <div class="m-icon-price-box">
            <span class="m-icon m-order-num"></span>
            <div>
              <p>今日订单数</p>
              <p class="m-order-price">￥469.50</p>
            </div>
          </div>
          <p class="m-order-bottom">
            <span>昨日</span>
            <span>336.00
            <span class="m-order-up m-down"></span></span>
          </p>
          <p class="m-order-all">
            <span>全部订单数</span>
            <span >336</span>
          </p>
        </li>
        <li>
          <div class="m-icon-price-box">
            <span class="m-icon m-order-pay"></span>
            <div>
              <p>待付款订单</p>
              <p class="m-order-price">￥469.50</p>
            </div>
          </div>
          <p class="m-order-bottom">
            <span>昨日</span>
            <span>336.00
            <span></span></span>
          </p>
        </li>
        <li>
          <div class="m-icon-price-box">
            <span class="m-icon m-order-back"></span>
            <div>
              <p>退款订单数</p>
              <p class="m-order-price">￥469.50</p>
            </div>
          </div>
          <p class="m-order-bottom">
            <span>昨日</span>
            <span>336.00
            <span ></span></span>
          </p>
        </li>
      </ul>
      <h3 class="m-part-title">
        <span class="m-part-title-icon"></span>
        <span>订单趋势</span>
      </h3>
      <echarts :id="id" :option="option" :width="1300"></echarts>
    </div>
</template>

<script>
  import echarts from '../../components/common/vue-echarts';
    export default {
        data(){
          return{
            option : {
              color:['#CB7E88','#F2DA7A','#97ADCB'],
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data:['邮件营销','联盟广告','视频广告']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  name:'邮件营销',
                  type:'line',
                  stack: '总量',
                  data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                  name:'联盟广告',
                  type:'line',
                  stack: '总量',
                  data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                  name:'视频广告',
                  type:'line',
                  stack: '总量',
                  data:[150, 232, 201, 154, 190, 330, 410]
                }
              ]
            },
            id:'profile_echart'
          }
        },
       components:{
         echarts
       },
      methods:{

      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/index";
.m-profile{
  .m-page-title{
    font-size: 0.15rem;
    font-weight: bold;
    margin-bottom: 0.2rem;
  }
  .m-page-label-ul{
    .flex-row(space-start);
    padding: 0.29rem 0;
    border-top: 1px solid @borderColor;
    margin-top: 0.2rem;
    li{
      width: 2.16rem;
      height: 0.83rem;
      line-height: 0.83rem;
      border-radius: 5px;
      box-shadow:0 5px 10px rgba(0,0,0,0.16);
      margin-right: 0.17rem;
      background-color: #CB7E88;
      color: #FFFFFF;
      text-align: center;
      font-size: 0.21rem;
      &.orange{
        background-color: #D18E62;
      }
      &.green{
        background-color: #C7D687;
      }
      &.blue{
        background-color: #87ACD6;
      }
      &.purple{
        background-color: #C397CB;
      }
      &.purple{
        background-color: #C397CB;
      }
    }
  }
  .m-order-label-ul{
    .flex-row(flex-start);
    border: 1px solid @borderColor;
    width: 100%;
    margin: 0.3rem 0;
    /*height: 190px;*/
    li{
      width: 24%;
      height: 2rem;
      padding: 0.4rem 0.5rem 0.24rem;
      border-right: 1px solid @borderColor;
      &:last-child{
        border-right: none;
      }
      .m-icon-price-box{
        .flex-row(flex-start);
        margin-bottom: 0.4rem;
        font-size: 0.18rem;
        .m-icon{
          display: block;
          width: 0.66rem;
          height: 0.66rem;
          background: url("../../common/images/order-money.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 0.2rem;
          &.m-order-num{
            background: url("../../common/images/order-num.png") no-repeat;
            background-size: 100% 100%;
          }
          &.m-order-pay{
            background: url("../../common/images/order-pay.png") no-repeat;
            background-size: 100% 100%;
          }
          &.m-order-back{
            background: url("../../common/images/order-back.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .m-order-price{
          font-size: 0.17rem;
          margin-top: 0.2rem;
          &.m-red{
            color: #D80000;
          }
        }
      }
      .m-order-bottom{
        .flex-row(space-between);
        font-size: 0.17rem;
        color: #999999;
        .m-order-up{
          display: inline-block;
          width: 0.17rem;
          height: 0.17rem;
          background: url("../../common/images/icon-order-up.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: text-top;
          &.m-down{
            background: url("../../common/images/icon-order-down.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .m-order-all{
        border-top: 1px solid @borderColor;
        padding: 0.1rem 0.1rem 0.1rem 0;
        font-size: 0.18rem;
        margin-top: 0.2rem;
        .flex-row(space-between);
        .m-order-price{
            color: #D80000;
        }
      }
    }

  }

}
</style>
