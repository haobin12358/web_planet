<template>
  <div class="container">
    <section class="profile-block profile-todos-block">
      <block-title title="代办事项"></block-title>
      <div class="todo-line"></div>

      <ul class="todo-list">
        <template v-if="checkPermission(level2)">
          <router-link  tag="li" to="/approval/withdrawAudit" class="todo-item">
            <span class="label">提现审批</span>
            <span class="num">21</span>
          </router-link>
          <router-link tag="li" to="/approval/returnProductAudit" class="todo-item return-prod">
            <span class="label">退货审批</span>
            <span class="num">21</span>
          </router-link>
          <router-link tag="li" to="/approval/agentAudit" class="todo-item agent-audit">
            <span class="label">代理商审批</span>
            <span class="num">21</span>
          </router-link>
          <router-link tag="li" to="/approval/productAudit" class="todo-item prod-audit">
            <span class="label">商品上架</span>
            <span class="num">21</span>
          </router-link>
          <router-link tag="li" to="/approval/circleAudit" class="todo-item circle">
            <span class="label">圈子审核</span>
            <span class="num">21</span>
          </router-link>
          <router-link tag="li" to="/approval/withdraw" class="todo-item activity">
            <span class="label">活动审核</span>
            <span class="num">21</span>
          </router-link>
        </template>
        <template v-if="checkPermission(level0)">
          <router-link tag="li" to="/product/index" class="todo-item prod-audit">
            <span class="label">商品上架</span>
            <span class="num">21</span>
          </router-link>
          <router-link tag="li" to="/activity/supplizerActi" class="todo-item activity">
            <span class="label">活动申请</span>
            <span class="num">21</span>
          </router-link>
        </template>
      </ul>
    </section>

    <template  v-if="checkPermission(level2)">
      <section class="profile-block">
        <block-title title="交易数据"></block-title>
        <ul class="m-order-label-ul">
          <li>
            <div class="m-icon-price-box">
              <img class="static-icon" src="/static/images/order-money.png" alt="">
              <div class="icon-price-box-main">
                <p class="label">今日交易额</p>
                <p class="m-order-price m-red">￥469.50</p>
              </div>
            </div>

            <p class="m-order-bottom">
              <span>昨日</span>
              <section class="m-order-bottom-right">
                <span>336.00</span>
                <img src="/static/images/icon-order-up.png" alt="">
              </section>
            </p>

            <p class="m-order-all">
              <span>全部交易额</span>
              <span class="m-order-price">￥336.00</span>
            </p>
          </li>
          <li>
            <div class="m-icon-price-box">
              <img class="static-icon" src="/static/images/order-num.png" alt="">
              <div class="icon-price-box-main">
                <p class="label">今日订单数</p>
                <p class="m-order-price">469</p>
              </div>
            </div>

            <p class="m-order-bottom">
              <span>昨日</span>
              <section class="m-order-bottom-right">
                <span>336</span>
                <img src="/static/images/icon-order-down.png" alt="">
              </section>
            </p>

            <p class="m-order-all">
              <span>全部订单数</span>
              <span class="m-order-price">336</span>
            </p>
          </li>


          <li>
            <div class="m-icon-price-box">
              <img class="static-icon" src="/static/images/order-pay.png" alt="">
              <div class="icon-price-box-main">
                <p class="label">待付款订单数</p>
                <p class="m-order-price">469</p>
              </div>
            </div>
            <p class="m-order-bottom">
              <span>昨日</span>
              <section class="icon-price-box-main">
                <span>336</span>
              </section>
            </p>
          </li>
          <li>
            <div class="m-icon-price-box">
              <img class="static-icon" src="/static/images/order-back.png" alt="">
              <div class="icon-price-box-main">
                <p class="label">退款订单数</p>
                <p class="m-order-price">469</p>
              </div>
            </div>
            <p class="m-order-bottom">
              <span>昨日</span>
              <span>336.00</span>
            </p>
          </li>
        </ul>
      </section>

      <block-title title="订单趋势"></block-title>
      <echarts :id="id" :option="option" :width="1300"></echarts>
    </template>
  </div>
</template>

<script>
  import VueEcharts from "src/components/VueEcharts";
  import permission from 'src/directive/permission/index.js' // 权限判断指令
  import checkPermission from 'src/utils/permission' // 权限判断函数
  import {level0,level2} from "src/router";


  export default {
    name: 'ProfileIndex',

    components: {
      echarts: VueEcharts
    },

    directives: { permission },

    data() {
      return {
        level0,
        level2,

        id:'profile_echart',
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
      }
    },

    computed: {},

    methods: {
      checkPermission,
    },

    created() {

    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .profile-block {
      margin-bottom: 20px;
    }

    .profile-todos-block {
      .todo-line {
        height: 2px;
        background: @borderColor;
        margin-bottom: 20px;
      }

      .todo-list {
        .fj(flex-start);
        flex-wrap: wrap;

        .todo-item {
          cursor: pointer;
          .sc(20px, white);
          padding: 20px 40px;
          box-sizing: border-box;
          margin-right: 10px;
          background: #CB7E88;
          border-radius: 10px;
          .bs(10px, 5px, 10px);
          .fj();
          align-items: flex-end;
          white-space: nowrap;

          &.return-prod {
            background: #D18E62;
          }

          &.agent-audit {
            background: #C7D687;
          }

          &.prod-audit {
            background: #87ACD6;
          }

          &.circle {
            background: #CB7E88;
          }

          &.activity {
            background: #C397CB;
          }

          .label {
            margin-right: 10px;
          }

          .num {
            .fz(22px);
          }
        }
      }
    }

    .m-order-label-ul {
      .fj(flex-start);
      border: 1px solid @borderColor;
      width: 100%;

      li {
        flex: 1;
        padding: 40px 40px 10px;
        border-right: 1px solid @borderColor;

        &:last-child {
          border-right: none;
        }
        .m-icon-price-box {
          .fj(flex-start);
          align-items: center;
          margin-bottom: 40px;
          font-size: 18px;

          .static-icon {
            .wl(66px, 66px);
            margin-right: 20px;
          }

          .icon-price-box-main {
            .fjc();
            color: #595757;

            .m-order-price {
              font-size: 17px;
              margin-top: 20px;
              &.m-red {
                color: #D80000;
              }
            }
          }

        }
        .m-order-bottom {
          .fj();

          font-size: 17px;
          color: #999999;

          .m-order-bottom-right{
            .fj();

            img {
              .wl(17px, 17px);
            }
          }
        }
        .m-order-all {
          border-top: 1px solid @borderColor;
          padding: 10px 10px 10px 0;
          font-size: 18px;
          margin-top: 20px;
          .fj();
          color: #595757;

          .m-order-price {
            color: #D80000;
          }
        }
      }

    }


  }
</style>
