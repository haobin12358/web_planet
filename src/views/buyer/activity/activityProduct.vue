<template>
  <div class="m-activity-product">
    <div class="m-img-box">
      <img class="m-member-img" :src="banner" alt="">
      <div class="m-top-bg"></div>
      <div class="m-img-text-box">
        <div class="m-img-text"><span class="m-img-text-bold">{{dayNum}}</span> {{monthNum}}</div>
        <div class="m-img-text">{{month}} / {{day}}</div>
      </div>
    </div>
    <div class="m-activity-product-text-box">
      <div class="m-ft-30 m-ft-b">{{title}}</div>
      <div class="m-activity-product-text m-ft-24">{{remarks}}</div>
    </div>
    <!--内容-->
    <div class="m-product-content">
      <div class="m-product-part" v-for="item in productList" @click="changeRoute('/activityProductDetail', item)">
        <div class="m-part-left">
          <img class="m-product-img" :src="item.tcmainpic" alt="">
        </div>
        <div class="m-part-right">
          <div class="m-right-row">
            <div class="m-product-name"><span class="m-product-tag">【{{title}}】</span>{{item.tctitle}}</div>
          </div>
          <div class="m-product-description">{{item.tcdescription}}</div>
          <!--<div class="m-return-time">返还时间：<span class="m-yellow-text">2018-12-30前</span></div>-->
          <div class="m-price-share">
            <div class="m-product-price">押金：<span class="m-price-time">{{item.zh_remarks}}</span></div>
            <img class="m-share-img" src="/static/images/icon-gray-share.png" alt="" @click="productShare">
            <div class="m-share-text" @click="productShare">分享</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        name: '',
        page_num: 1,
        page_size: 10,
        title: "",
        banner: "",
        remarks: "",
        productList: [],
        day: "",
        month: "",
        dayNum: "",
        monthNum: "",
      }
    },
    components: {},
    methods: {
      // 跳转页面
      changeRoute(v, item) {
        this.$router.push({ path: v, query: { tcid: item.tcid }});
      },
      // 商品分享按钮
      productShare() {

      },
      // 获取商品
      getProduct() {
        let which = this.$route.query.which;
        if(which == "new") {
          this.title = "新人首单";
        }else if(which == "try") {
          this.title = "试用商品";
        }
        let params = {
          token: localStorage.getItem('token'),
          page_num: this.page_num,
          page_size: this.page_size
        };
        axios.get(api.get_commodity, { params: params }).then(res => {
          if(res.data.status == 200){
            this.banner = res.data.data.banner;
            this.productList = res.data.data.commodity;
            this.remarks = res.data.data.remarks;
          }
        });
      },
      // 获取时间
      getDate() {
        this.dayNum = new Date().getDate();
        this.monthNum = new Date().toString().substr(4, 3);

        // 判断星期几
        switch(new Date().getDay()) {
          case 1:
            this.day = "星期一";
            break;
          case 2:
            this.day = "星期二";
            break;
          case 3:
            this.day = "星期三";
            break;
          case 4:
            this.day = "星期四";
            break;
          case 5:
            this.day = "星期五";
            break;
          case 6:
            this.day = "星期六";
            break;
          case 7:
            this.day = "星期日";
            break;
        }

        // 判断月份
        switch(new Date().getMonth() + 1) {
          case 1:
            this.month = "一月";
            break;
          case 2:
            this.month = "二月";
            break;
          case 3:
            this.month = "三月";
            break;
          case 4:
            this.month = "四月";
            break;
          case 5:
            this.month = "五月";
            break;
          case 6:
            this.month = "六月";
            break;
          case 7:
            this.month = "七月";
            break;
          case 8:
            this.month = "八月";
            break;
          case 9:
            this.month = "九月";
            break;
            break;
          case 10:
            this.month = "十月";
            break;
            break;
          case 11:
            this.month = "十一月";
            break;
            break;
          case 12:
            this.month = "十二月";
            break;
        }
      }
    },
    mounted() {
      common.changeTitle('活动商品');
      this.getProduct();               // 获取商品
      this.getDate();                   // 获取时间
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-activity-product {
    min-height: 100%;
    .m-img-box {
      margin-bottom: -15px;
      .m-member-img {
        width: 750px;
        height: 360px;
      }
      .m-top-bg {
        width: 750px;
        height: 67px;
        background: url("/static/images/icon-bg.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 295px;
        left: 0;
      }
      .m-img-text-box {
        position: absolute;
        left: 50px;
        top: 130px;
        text-align: left;
        .m-img-text {
          color: #333333;
          font-size: 40px;
        }
        .m-img-text-bold {
          font-size: 60px;
          font-weight: bold;
        }
      }
    }
    .m-product-content {
      padding: 70px 50px 0 50px;
    }
  }
</style>
