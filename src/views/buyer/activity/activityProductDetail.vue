<template>
  <div class="m-activity-product-detail">
    <div class="m-member-swipe" v-if="product.image">
      <mt-swipe :auto="3000">
        <mt-swipe-item class="product-swipe" v-for="(item, index) in product.image" v-bind:key="item.tciid">
          <img class="product-img" :src="item.tcipic" @click="previewImage(index, product.image)">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--商品详情的文字信息-->
    <div class="m-detail-text">
      <div class="m-text-row">
        <div class="m-text-name">{{product.tctitle}}</div>
        <div class="m-text-price" v-if="product.tcdeposit">押金：￥{{product.tcdeposit | money}}</div>
        <div class="m-text-price" v-if="product.prprice">￥{{product.prprice | money}}</div>
      </div>
      <div class="m-text-row">
        <div class="m-text-description">{{product.tcdescription}}</div>
        <div class="m-text-time" v-if="product.zh_deadline">（<span class="m-time-bold">{{product.zh_deadline}}</span>）</div>
      </div>
      <div class="m-text-row">
        <div class="m-text-courier">快递：{{product.tcfreight}} 元</div>
      </div>
    </div>
    <!--选择sku-->
    <sku v-if="show_sku" :now_select="select_value" :now_num="canums" :product="product" @changeModal="changeModal" @sureClick="sureClick" :activity="true"></sku>

    <div class="m-text-row m-sku-row" @click="changeModal('show_sku', true)">
      <div class="m-text-courier">规格</div>
      <div class="m-text-description">
        <template v-if="select_value">
          <span v-for="(item, index) in select_value.skuattritedetail">{{product.tcattribute[index]}} <span v-if="item">:</span> {{item}} </span>
        </template>
        <template v-else>
          <span v-for="item in product.tcattribute">{{item}} </span>
        </template>
      </div>
      <img class="m-right-img" src="/static/images/icon-right.png" alt="">
    </div>
    <div class="m-detail-img-box">
      <img class="m-detail-img" v-for="item in product.tcdesc" :src="item" alt="">
    </div>

    <div class="m-detail-btn-box">
      <div class="m-detail-service"></div>
      <div class="m-buy-btn m-ft-30" @click="buy">立即下单</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import sku from '../components/sku';
  import wxapi from '../../../common/js/mixins';

  let scroll = (function (className) {
    let scrollTop;
    return {
      afterOpen: function () {
        scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop;
        document.body.classList.add(className);
        document.body.style.top = -scrollTop + 'px';
      },
      beforeClose: function () {
        document.body.classList.remove(className);
        document.scrollingElement.scrollTop = scrollTop;
        document.body.scrollTop = scrollTop;
      }
    };
  })('scroll');

  export default {
    data() {
      return {
        name: '',
        tcid: "",
        product: {},
        show_sku: false,
        select_value: null,
        canums: 1,
        cart_buy: null,
        which: ''
      }
    },
    mixins: [wxapi],
    components: { sku },
    methods: {
      // 预览图片
      previewImage(index, image) {
        let images = [];
        for(let i = 0; i < image.length; i ++) {
          images.push(image[i].pipic);
        }
        let options = {
          current: image[index].pipic, // 当前显示图片的http链接
          urls: images,                  // 当前预览图片的list
        };
        wxapi.previewImage(options);
      },
      // 改变模态框 - 商品sku
      changeModal(v,bool) {
        this[v] = bool;
        if(bool){
          scroll.afterOpen();
        }else{
          scroll.beforeClose();
        }
      },
      // 获取商品详情
      getProductDetail() {
        this.which = this.$route.query.which;
        if(this.which == "new") {
          let params = {
            token: localStorage.getItem('token'),
            fmfpid: this.$route.query.fmfpid
          };
          axios.get(api.fresh_man_get, { params: params }).then(res => {
            if(res.data.status == 200){
              this.product = res.data.data;
              this.product.tctitle = res.data.data.prtitle;
              this.product.tcfreight = res.data.data.prfreight;
              this.product.tcdesc = res.data.data.prdesc;
              this.product.tcid = res.data.data.prid;
              this.product.tcattribute = res.data.data.prattribute;
              if(this.product.image) {
                for(let i = 0; i < this.product.image.length; i ++) {
                  this.product.image[i].tciid = this.product.image[i].piid;
                  this.product.image[i].tcipic = this.product.image[i].pipic;
                }
              }
            }
          });
        }else if(this.which == "try") {
          let params = {
            token: localStorage.getItem('token'),
            tcid: this.$route.query.tcid
          };
          axios.get(api.get_commodity_detail, { params: params }).then(res => {
            if(res.data.status == 200){
              this.product = res.data.data;
              this.product.prmainpic = res.data.data.tcmainpic;
            }
          });
        }
      },
      // sku确定
      sureClick(item, num) {
        this.canums = num;
        this.select_value = item;
        if(this.cart_buy == 'buy') {
          this.buy();
          this.cart_buy = null;
        }
        this.changeModal('show_sku', false);
      },
      // 立即下单
      buy() {
        if(this.select_value) {
          let product = {};
          product.pb = this.product.brand;
          product.cart = [];
          product.cart.push({ product: { prtitle: this.product.tctitle }, sku: this.select_value, canums: "1", prid: this.product.tcid});
          let arr = [];
          arr.push(product);
          this.$router.push({ path: '/submitOrder', query: { product: JSON.stringify(arr), from: this.which }});
        }else {
          this.changeModal('show_sku', true);
          this.cart_buy = 'buy';
        }
      }
    },
    mounted() {
      common.changeTitle('活动商品详情');
      this.getProductDetail();              // 获取商品详情
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-activity-product-detail {
    .mint-swipe{
      width: 750px;
      height: 750px;
    }
    .product-swipe {
      width: 750px;
      height: 750px;
    }
    .product-img{
      display: block;
      background-color: #EEEEEE;
      max-width: 750px;
      max-height: 750px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    }
    .m-member-swipe{
      position: relative;
      width: 750px;
      height: 750px;
    }
    .m-detail-text {
      padding: 25px 25px 15px 30px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    }
    .m-text-row {
      display: flex;
      justify-content: space-between;
      .m-text-name {
        font-size: 30px;
        font-weight: bold;
      }
      .m-text-price {
        color: #C70000;
        font-size: 30px;
        font-weight: bold;
      }
      .m-text-description {
        font-size: 24px;
        text-align: left;
        width: 500px;
        padding: 0 0 15px 0;
      }
      .m-text-time {
        color: #C70000;
        font-size: 30px;
        .m-time-bold {
          font-weight: bold;
        }
      }
      .m-text-courier {
        color: #999999;
        font-size:24px;
      }
      .m-right-img {
        width: 15px;
        height: 24px;
        padding-top: 5px;
      }
    }
    .m-sku-row {
      padding: 30px 30px 10px 30px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    }
    .m-detail-img-box {
      margin: 10px 0 100px 0;
      .m-detail-img {
        width: 750px;
        margin-bottom: -5px;
      }
    }
    .m-detail-btn-box {
      width: 750px;
      display: flex;
      align-items: center;
      padding: 20px 17px 20px 55px;
      background-color: #ffffff;
      position: fixed;
      bottom: 0;
      left: 0;
      .m-detail-service {
        width: 52px;
        height: 53px;
        background: url("/static/images/icon-service.png") no-repeat;
        background-size: 100% 100%;
      }
      .m-buy-btn {
        color: #ffffff;
        margin-left: 50px;
        padding: 11px 220px;
        border-radius: 10px;
        background-color: @mainColor;
      }
    }
  }
</style>
