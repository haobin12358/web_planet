<template>
    <div class="m-orderDetail">
       <div class="m-orderDetail-status" v-if="order_info.omstatus == 0">
         <span >买家待付款</span>
         <span class="m-icon-order-status m-pay" ></span>
       </div>
      <div class="m-orderDetail-status" v-if="order_info.omstatus == -40">
        <span >买家已取消</span>
        <span class="m-icon-order-status m-pay" ></span>
      </div>
      <div class="m-orderDetail-status" v-if="order_info.omstatus == 10">
        <span >买家已付款</span>
        <span class="m-icon-order-status m-pay" ></span>
      </div>
      <div class="m-orderDetail-status" v-if="order_info.omstatus == 20">
        <span >卖家已发货</span>
        <span class="m-icon-order-status m-send" ></span>
      </div>
      <div class="m-orderDetail-status" v-if="order_info.omstatus == 30 || order_info.omstatus == 35">
        <span>买家已签收</span>
        <span class="m-icon-order-status m-send"></span>
      </div>
      <div class="m-order-one-part">
        <div class="m-user-text" v-if="logistic_info" @click="changeRoute('/logisticsInformation')">
          <span class="m-icon-wuliu m-done"></span>
          <div class="m-flex-between">
            <div>
              <p class="m-wuliu-text">{{logistic_info.ollastresult.status}}</p>
              <p>{{logistic_info.ollastresult.time}}</p>
            </div>
            <span class="m-icon-more"></span>
          </div>
        </div>
        <div class="m-user-text">
          <span class="m-icon-loc"></span>
          <div>
            <p>
              <span>{{order_info.omrecvname}}</span>
              <span class="m-user-tel">{{order_info.omrecvphone}}</span>
            </p>
            <p class="m-bottom-text">
              收货地址：{{order_info.omrecvaddress}}
            </p>
          </div>
        </div>
      </div>
      <div class="m-order-one-part m-box-shadow">
        <div class="m-order-store-tile">
          <div @click.stop="changeRoute('/brandDetail')">
            <span class="m-icon-store"></span>
            <span class="m-store-name">{{order_info.pbname}}</span>
            <span class="m-icon-more"></span>
          </div>
          <span class="m-red">{{order_info.omstatus_zh}}</span>
        </div>
        <div class="m-product-box" v-for="(item, index) in order_info.order_part">
          <div class="m-order-product-ul">
            <div class="m-product-info" @click.stop="changeRoute('/product/detail',item)">
              <img :src="item.prmainpic" class="m-product-img" alt="">
              <div class="m-product-info-text">
                <p class="m-flex-between">
                <span class="m-product-name">{{item.prtitle}}</span>
                  <span>￥{{item.skuprice}}</span>
                </p>
                <p class="m-flex-between m-sku-text m-ft-22">
                  <span class="m-product-label">
                    <template v-for="(key,k) in item.skuattritedetail" >
                        <span >{{key}}</span>
                        <span v-if="k < item.skuattritedetail.length-1">；</span>
                      </template>
                  </span>
                  <span >x{{item.opnum}}</span>
                </p>
              </div>
            </div>
          </div>
          <p class="m-flex-between m-ft-22">
            <span>运费</span>
            <span>￥0.00</span>
          </p>
          <p class="m-flex-between m-ft-22">
            <span>实付款（含运费）</span>
            <span class="m-price">￥{{item.opsubtotal | money}}</span>
          </p>
          <p class="m-back-btn" v-if="from !== 'afterSales' && from !== 'activityProduct'">
            <span @click="changeRoute('/selectBack',item)" v-if="order_info.omstatus != -40 && order_info.omstatus != 0">退款</span>
          </p>
        </div>
      </div>
      <div class="m-order-one-part m-box-shadow">
        <p>
          <span class="m-border"></span>
          <span>订单信息</span>
        </p>
        <div class="m-ft-22 m-time-text">
          <p>订单编号：{{order_info.omno}}</p>
          <p>创建时间：{{order_info.createtime}}</p>
          <p v-if="order_info.pay_time">付款时间：{{order_info.pay_time}}</p>
          <p v-if="order_info.send_time">发货时间：{{order_info.send_time}}</p>
        </div>
      </div>
      <div class="m-order-one-part m-box-shadow" v-if="refund">
        <p>
          <span class="m-border"></span>
          <span>售后信息</span>
        </p>
        <div class="m-ft-22 m-time-text">
          <p>订单状态：{{refund.orastate_zh}} {{refund.orastatus_zh}}</p>
          <p>退款金额：￥{{refund.oramount | money}}</p>
          <p>申请理由：{{refund.orareason}}</p>
          <p>货物状态：{{refund.oraproductstatus_zh}}</p>
          <p v-if="refund.oraaddtion">附加留言：{{refund.oraaddtion}}</p>
          <p v-if="refund.orachecktime">处理时间：{{refund.orachecktime}}</p>
          <p v-if="refund.oracheckreason">审核理由：{{refund.oracheckreason}}</p>
          <p>申请时间：{{refund.createtime}}</p>
          <p>售后单号：{{refund.orasn}}</p>
        </div>
      </div>

      <div class="m-align-right" v-if="from !== 'activityProduct' && from !== 'afterSales'">
        <span @click="changeRoute('/logisticsInformation')" v-if="order_info.omstatus==20">查看物流</span>
        <span v-if="order_info.omstatus == -40 || order_info.omstatus == 30">删除订单</span>
        <span v-if="order_info.omstatus == 0 " @click="cancelOrder">取消订单</span>
        <span class="active" v-if="order_info.omstatus == 10 || order_info.omstatus == 20">确认收货</span>
        <span class="active" v-if="order_info.omstatus == 0">立即付款</span>
      </div>
      <bottom></bottom>
    </div>
</template>

<script>
  import common from '../../../common/js/common';
  import bottom from '../components/bottomService';
  import axios from 'axios';
  import api from '../../../api/api';
  import { MessageBox } from 'mint-ui';

  export default {
    data() {
      return {
        order_info: '',
        logistic_info: null,
        from: "",
        refund: null
      }
    },
    components: { bottom },
    inject: ['reload'],
    mounted() {
      common.changeTitle('订单详情');
      this.getOrderInfo();
      this.from = this.$route.query.from;
    },
    methods: {
      changeRoute(v, item) {
        if(this.from !== 'activityProduct') {
          switch (v) {
            case '/brandDetail':
              this.$router.push({ path: v, query: { pbid: this.order_info.pbid, pbname: this.order_info.pbname }});
              break;
            case '/product/detail':
              this.$router.push({ path: v, query: { prid: item.prid }});
              break;
            case '/selectBack':
              let arr = [] ;
              arr.push(item);
              this.$router.push({ path: v, query: { product: JSON.stringify(arr) }});
              break;
            case '/logisticsInformation':
              this.$router.push({ path: v, query: { omid: this.order_info.omid }});
              break;
            default:
              this.$router.push(v);
          }
        }else {
          switch (v) {
            case '/brandDetail':
              this.$router.push({ path: v, query: { pbid: this.order_info.pbid, pbname: this.order_info.pbname }});
              break;
            case '/product/detail':
              this.$router.push({ path: '/activityProductDetail', query: { tcid: item.prid }});
              break;
          }
        }
      },
      //获取订单详情
      getOrderInfo() {
        axios.get(api.order_get,{
          params:{
            token:localStorage.getItem('token'),
            omid:this.$route.query.omid
          }
        }).then(res => {
          if(res.data.status == 200) {
            console.log(res.data.data.order_refund_apply);
            this.order_info = res.data.data;
            if(res.data.data.omstatus >= 20){
              this.getLogistic();
            }
            if(res.data.data.order_refund_apply) {
              this.refund = res.data.data.order_refund_apply;
            }
          }
        })
      },
      // 获取物流信息
      getLogistic() {
        axios.get(api.get_logistic,{
          params:{
            omid:this.$route.query.omid
          }
        }).then(res => {
          if(res.data.status == 200){
            this.logistic_info = res.data.data;
          }
        })
      },
      // 取消订单
      cancelOrder() {
        MessageBox.confirm('是否取消该订单？').then(() => {
          axios.post(api.cancle_order + '?token='+ localStorage.getItem('token'),{
            omid:this.$route.query.omid
          }).then(res => {
            if(res.data.status == 200){
              this.reload();
            }
          })
        }).catch(() => {

        });
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-orderDetail{
    min-height: 100%;
    background-color: #eee;
    padding-bottom: 120px;
    .m-orderDetail-status{
      .flex-row(flex-end);
      width: 100%;
      height: 220px;
      background-color: @mainColor;
      .m-icon-order-status{
        display: block;
        width: 288px;
        height: 147px;
        background: url("/static/images/icon-order-status-wait.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 136px;
        margin-right: 65px;
        &.m-send{
          background: url("/static/images/icon-order-status-send.png") no-repeat;
          background-size: 100% 100%;
        }
        &.m-pay{
          background: url("/static/images/icon-order-status-pay.png") no-repeat;
          background-size: 100% 100%;
        }
        &.m-done{
          background: url("/static/images/icon-order-status-done.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .m-order-one-part{
      padding: 24px 24px 30px 50px;
      background-color: #fff;
      color: #666;
      margin-bottom: 20px;
      text-align: left;
      &.m-box-shadow{
        box-shadow: 0 5px 5px rgba(0,0,0,0.16);
      }
      .m-icon-loc{
        display: inline-block;
        width: 60px;
        height: 60px;
        background: url("/static/images/icon-order-loc.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 30px;
      }
      .m-icon-wuliu{
        display: inline-block;
        width: 60px;
        height: 60px;
        background: url("/static/images/icon-order-wuliu.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 30px;
        &.m-done{
          background: url("/static/images/icon-wuliu-done.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .m-wuliu-text{
        width: 540px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .m-icon-more{
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url("/static/images/icon-more.png") no-repeat;
        background-size: 100% 100%;
      }
      .m-user-text{
        text-align: left;
        padding: 35px 0;
        border-bottom: 1px solid @borderColor;
        &:last-child{
          border-bottom: none;
        }
        .flex-row(flex-start);
        .m-user-tel{
          display: inline-block;
          color: #999;
          margin-left: 56px;
        }
        .m-bottom-text{
          width: 580px;
          margin-top: 20px;
        }
      }
      .m-order-store-tile{
        .flex-row(space-between);
        .m-icon-store{
          display: inline-block;
          width: 31px;
          height: 29px;
          background: url("/static/images/icon-store.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: text-bottom;
        }
        .m-store-name{
          display: inline-block;
          margin: 0 25px;
        }
      }
      .m-product-box {
        padding-bottom: 30px;
        &:last-child {
          border-top: 1px #EEEEEE solid;
        }
        .m-order-product-ul {
          margin: 50px 0 20px 0;
          .m-product-info{
            display: flex;
            flex-flow: row;
            justify-content: flex-start;
            margin: 15px 0;
            .m-product-img{
              display: block;
              width: 100px;
              height: 100px;
              background-color: #9fd0bf;
              margin-right: 30px;
            }
            .m-product-info-text {
              width: 540px;
              .m-sku-text{
                margin-top: 40px;
              }
              .m-product-name{
                display: block;
                width: 460px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
              }
            }
          }
        }
      }
      .m-back-btn{
        text-align: right;
        margin-top: 30px;
        span{
          display: inline-block;
          width: 129px;
          height: 41px;
          border-radius: 30px;
          border: 1px solid #999;
          color: #999;
          text-align: center;
          line-height: 41px;
          font-weight: 400;
        }
      }
      .m-border{
        display: inline-block;
        width: 5px;
        height: 50px;
        background:linear-gradient(180deg,rgba(255,251,223,1) 0%,rgba(252,211,22,1) 100%);
        vertical-align: middle;
        margin-right: 10px;
      }
      .m-time-text{
        padding-left: 20px;
        p{
          line-height: 34px;
        }
      }
    }

    .m-align-right{
      text-align: right;
      background-color: #fff;
      width: 100%;
      padding: 30px 0;
      position: fixed;
      bottom: 0;
      left: 0;
      span{
        display: inline-block;
        width: 129px;
        height: 41px;
        line-height: 43px;
        border-radius: 30px;
        border: 1px solid #999;
        color: #999;
        text-align: center;
        margin-left: 40px;
        &.active{
          background-color: @mainColor;
          color: #333;
          border: 1px solid @mainColor;
        }
        &:last-child{
          margin-right: 25px;
        }
      }
    }
  }
</style>
