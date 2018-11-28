<template>
  <div class="m-after-sales" >
    <div class="m-order-box">
      <div class="m-order-item" v-for="item in order">
        <div class="m-store-box" @click.stop="changeRoute('/brandDetail')">
          <img class="m-store-img" src="/static/images/icon-store.png" alt="">
          <div class="m-store-name m-ft-24">{{item.pbname}}</div>
          <img class="m-more-img" src="/static/images/icon-more.png" alt="">
        </div>
        <div class="m-product-box" @click.stop="changeRoute('/product/detail')" v-for="product in item.order_part">
          <div>
            <img class="m-product-img" src="http://dummyimage.com/140x140" alt="">
          </div>
          <div class="m-product-text-box">
            <div class="m-product-text m-ft-24">{{product.prtitle}}</div>
            <div class="m-product-text m-ft-21">规格：
              <span v-for="(sku, index) in product.skuattritedetail">{{product.prattribute[index]}}：{{sku}} </span>
            </div>
          </div>
        </div>
        <div class="m-btn-box">
          <img class="m-after-sales-img" src="/static/images/icon-order-after-sale.png" alt="">
          <div class="m-after-sales-text">仅退款 退款成功</div>
          <div class="m-after-sales-btn">查看详情</div>
          <div class="m-after-sales-btn">查看详情</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import api from '../../../api/api'
  import { Toast } from 'mint-ui';
  import axios from 'axios';

  export default {
    data() {
      return {
        name: '',
        page_num: 1,
        page_size: 10,
        order: null,
      }
    },
    components: {},
    methods: {
      // 跳转页面
      changeRoute(v, which) {
        switch (v){
          case '/brandDetail':
            this.$router.push({ path: v, query: { pbid: item.pbid }});
            break;
          case '/orderDetail':
            this.$router.push({ path: v, query: { omid: item.omid }});
            break;
          case '/product/detail':
            this.$router.push({ path: v, query: { prid: item.prid }});
            break;
          default:
            this.$router.push(v);
        }
      },
      // 获取订单列表
      getOrderList() {
        let params = {
          token: localStorage.getItem('token'),
          page_num: this.page_num,
          page_size: this.page_size,
          omstatus: "inrefund"
        };
        axios.get(api.order_list, { params: params }).then(res => {
          if(res.data.status == 200){
            console.log(res.data.data);
            this.order = res.data.data;
          }else {
            Toast(res.data.message);
          }
        })
      },
      // 获取订单数量
      getOrderCount() {
        axios.get(api.order_count + "?extentions=refund&token=" + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            for(let i = 0; i < res.data.data.length; i ++) {
              if(res.data.data[i].status == "0") {
                this.pay = res.data.data[i].count;
              }else if(res.data.data[i].status == "10") {
                this.send = res.data.data[i].count;
              }else if(res.data.data[i].status == "20") {
                this.receive = res.data.data[i].count;
              }else if(res.data.data[i].status == "35") {
                this.evaluate = res.data.data[i].count;
              }else if(res.data.data[i].status == "refund") {
                this.after_sales = res.data.data[i].count;
              }
            }
          }else{
            Toast(res.data.message);
          }
        })
      }
    },
    mounted() {
      common.changeTitle('售后');
      this.getOrderList();             // 获取订单列表
      // this.getOrderCount();       // 获取订单数量
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/personal";

  .m-after-sales {
    min-height: 100%;
    background-color: #EEEEEE;
    .m-order-box {
      .m-order-item {
        background-color: #ffffff;
        padding: 24px 29px 33px 35px;
        margin-bottom: 20px;
        box-shadow: 0 5px 5px rgba(0,0,0,0.16);
        .m-store-box {
          display: flex;
          align-items: center;
          padding-bottom: 17px;
          border-bottom: 1px #CCCCCC solid;
          .m-store-img {
            width: 31px;
            height: 29px;
          }
          .m-store-name {
            margin: 0 25px;
          }
          .m-more-img {
            width: 22px;
            height: 22px;
          }
        }
        .m-product-box {
          padding: 35px 0;
          display: flex;
          .m-product-img {
            width: 140px;
            height: 140px;
            margin-right: 42px;
          }
          .m-product-text-box {
            text-align: left;
            .m-product-text {
              color: #666666;
              line-height: 40px;
            }
          }
        }
        .m-btn-box {
          display: flex;
          align-items: center;
          .m-after-sales-img {
            width: 22px;
            height: 18px;
          }
          .m-after-sales-text {
            flex: 1;
            text-align: left;
            margin-left: 15px;
          }
          .m-after-sales-btn {
            width: 100px;
            height: 35px;
            line-height: 40px;
            padding: 5px 16px;
            margin-left: 20px;
            border: 1px #999999 solid;
            border-radius: 30px;
            color: #999999;
            font-size: 24px;
          }
        }
      }
    }
  }
</style>
