<template>
    <div class="m-backDetail">
      <div class="m-orderDetail-status">
        <div>
          <p class="m-alert m-ft-28" v-if="refund.orastatus == '-20'">{{refund.orastatus_zh}}，售后申请已取消</p>
          <p class="m-alert m-ft-28" v-if="refund.orastatus == '-10'">{{refund.orastatus_zh}}，请稍后处理</p>
          <p class="m-alert m-ft-28" v-if="refund.orastatus == '0'">{{refund.orastatus_zh}}，请等待商家处理</p>
          <p class="m-alert m-ft-28" v-if="refund.orastatus == '10'">{{refund.orastatus_zh}}，请按要求操作</p>
        </div>
        <span class="m-icon-order-status "></span>
      </div>
      <div class="m-back-info-box">
        <p class="m-back-info" v-if="refund.orastatus == '-20'">您已取消售后申请。</p>
        <p class="m-back-info" v-if="refund.orastatus == '-10'">您的售后申请被拒绝，请稍后处理。</p>
        <p class="m-back-info" v-if="refund.orastatus == '0'">您的退款申请在审核中，请耐心等待商家处理。</p>
        <p class="m-back-info" v-if="refund.orastatus == '10'">商家已经同意您的退款申请，请按要求操作。</p>
        <!--<div class="m-product-text">
          <p>联系人：居居</p>
          <p>联系电话：15700000000</p>
          <p>地址：浙江省杭州市萧山区宁围镇宝盛世纪中心B座XXXX室</p>
          <p>邮政编码：310012</p>
          <p>
            快递单号：
            <input type="text" class="m-input">
          </p>
        </div>-->
        <p class="m-back-info-btn">
          <span @click="cancelRefund" v-if="refund.orastatus == '0'">撤销申请</span>
        </p>
      </div>
      <div class="m-back-product">
        <h3>退款信息</h3>
        <div class="m-back-product-info" v-for="item in order_info.order_part" v-if="item.order_refund_apply">
          <div>
            <img :src="item.prmainpic">
          </div>
          <div>
            <p>{{item.prtitle}}</p>
            <p class="m-product-select">规格：<span v-for="sku in item.skuattritedetail">{{sku}} </span></p>
          </div>
        </div>
        <div class="m-product-text">
          <p>退款原因：{{refund.orareason}}</p>
          <p>退款金额：￥{{refund.oramount | money}}</p>
          <p>申请时间：{{refund.createtime}}</p>
          <p>退款编号：{{refund.orasn}}</p>
        </div>
      </div>
      <bottom></bottom>
    </div>
</template>


<script>
  import common from '../../../common/js/common';
  import bottom from '../components/bottomService';
  import axios from 'axios';
  import api from '../../../api/api';
  import { Toast, MessageBox } from 'mint-ui';

  export default {
    data(){
      return{
        order_info: '',
        refund: { orareason: '', oramount: '' }
      }
    },
    components: { bottom },
    mounted() {
      common.changeTitle('退款详情');
      this.getOrderInfo();            // 获取订单详情
    },
    methods: {
      // 获取订单详情
      getOrderInfo() {
        axios.get(api.order_get,{
          params:{
            token:localStorage.getItem('token'),
            omid:this.$route.query.omid
          }
        }).then(res => {
          if(res.data.status == 200) {
            this.order_info = res.data.data;
            // 售后信息
            if(res.data.data.order_refund_apply) {
              this.refund = res.data.data.order_refund_apply;
            }
            this.getProductRefund();
          }
        })
      },
      // 当一个订单中有多个商品时，退掉其中一个，则以该商品的售后信息显示
      getProductRefund() {
        if(this.$route.query.allOrder) {

        }else {
          if(this.order_info.order_part) {
            for(let i = 0; i < this.order_info.order_part.length; i ++) {
              if(this.order_info.order_part[i].order_refund_apply) {
                this.refund = this.order_info.order_part[i].order_refund_apply;
              }
            }
          }
        }
      },
      // 撤销售后申请
      cancelRefund() {
        MessageBox.confirm('是否确认撤销该售后申请?').then(() => {
          axios.post(api.refund_cancel + '?token='+ localStorage.getItem('token'), { oraid: this.refund.oraid }).then(res => {
            if(res.data.status == 200) {
              Toast(res.data.message);
              this.getOrderInfo();            // 获取订单详情
            }
          });
        }).catch(() => {

        });
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
.m-backDetail{
  min-height: 100%;
  background-color: #eee;
  .m-orderDetail-status{
    .flex-row(flex-end);
    width: 100%;
    height: 220px;
    background-color: @mainColor;
    line-height: 36px;
    .m-icon-order-status{
      display: block;
      width: 288px;
      height: 147px;
      background: url("/static/images/icon-back-status.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 40px;
    }
    .m-alert{
      color: #ffffff;
    }
  }
  .m-back-info-box{
    padding: 0 50px 0;
    background-color: #fff;
    margin-bottom: 20px;
    text-align: left;
    .m-back-info{
      padding: 28px 0;
      border-bottom: 1px solid #ccc;
      text-align: left;
    }
    .m-product-text{
      padding-left: 0;
      padding-top: 28px;
      color: #666;
    }
    .m-back-info-btn{
      padding: 34px 0 55px;
      text-align: right;
      span{
        display: inline-block;
        padding: 5px 41px;
        line-height: 41px;
        text-align: center;
        border-radius: 30px;
        border: 1px solid #ccc;
        color: #999;
      }
    }
  }
  .m-back-product{
    background-color: #fff;
    box-shadow:0 5px 5px rgba(0,0,0,0.16);
    text-align: left;
    padding: 20px 0;
    color: #666;
    h3{
      padding: 0 0 20px 50px;
    }
    .m-back-product-info{
      .flex-row(flex-start);
      padding: 0 50px 30px 50px;
      /*background-color: #eee;*/
      img{
        display: block;
        width: 119px;
        height: 119px;
        background-color: #9fd0bf;
        margin-right: 20px;
      }
      .m-product-select{
        font-size: 21px;
        margin-top: 59px;
      }
    }
  }
  .m-product-text{
    padding-left: 50px;
    font-size: 21px;
    line-height: 40px;
    text-align: left;
  }
  .m-input{
    display: inline-block;
    width: 480px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 30px;
    margin: 10px 0;
  }
}
</style>
