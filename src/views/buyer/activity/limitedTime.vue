<template>
  <div class="m-limitedTime" v-if="brand_info" @touchmove="touchMove">
    <div class="m-brand-info">
      <img :src="brand_info.pbbackgroud" class="m-brand-img" alt="">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-limitedTime-title">
      <p>限时特惠</p>
      <p class="m-time">活动时间：</p>
    </div>
    <nav-list class="m-width" :navlist="nav_list" @navClick="navClick"></nav-list>

    <product :list="product_list"></product>
    <bottom-line v-if="bottom_show"></bottom-line>
  </div>
</template>

<script>
  import navList from '../../../components/common/navlist';
  import product from '../components/product';
  import common from "../../../common/js/common";
  import axios from 'axios';
  import api from '../../../api/api'
  import {Toast} from 'mint-ui';
  import bottomLine from '../../../components/common/bottomLine';

  export default {
    data() {
      return{
        nav_list: [
          { name: '场景1', params: '', active: true },
          { name: '场景2', params: '', active: false },
          { name: '场景3', params: '', active: false}
        ],
        brand_info: null,
        product_list: null,
        bottom_show: false,
        page_info: { page_num: 1, page_size: 6 },
        isScroll: true,
        total_count: 0
      }
    },
    components:{ navList, product, bottomLine },
    mounted() {
      common.changeTitle(this.$route.query.pbname);
      this.getBrand();
      this.getProduct();
    },
    methods: {
      //滚动加载更多
      touchMove(e){
        let scrollTop = common.getScrollTop();
        let scrollHeight = common.getScrollHeight();
        let ClientHeight = common.getClientHeight();
        if (scrollTop + ClientHeight  >= scrollHeight -10) {
          if(this.isScroll){
            this.isScroll = false;
            if(this.product_list.length == this.total_count){
              this.bottom_show = true;
            }else{
              for(let i=0;i<this.nav_list.length;i++){
                if(this.nav_list[i].active){
                  if(i != 0){
                    this.getProduct(this.nav_list[i].params + (this.nav_list[i].desc_asc?'|asc':'|desc'));
                  }else{
                    this.getProduct()
                  }
                }
              }
            }
          }
        }
      },
      //  导航点击
      navClick(index){
        this.page_info.page_num = 1;
        this.total_count= 0;
        this.bottom_show = false;
        let arr = [].concat(this.nav_list);
        for(let i=0;i<arr.length;i++){
          arr[i].active = false;
        }
        arr[index].active = true;
        if(index != 0){
          arr[index].desc_asc = !arr[index].desc_asc;
          if(arr[index].desc_asc){
            this.getProduct(arr[index].params +'|asc')
          }else{
            this.getProduct(arr[index].params +'|desc')
          }
        }else{
          this.getProduct()
        }
        this.nav_list = [].concat(arr);

      },
      /*获取品牌信息*/
      getBrand(){
        axios.get(api.get_one_brand,{
          params:{
            pbid:this.$route.query.pbid
          }
        }).then(res => {
          if(res.data.status == 200){
            this.brand_info = res.data.data;
          }
        })
      },
      /*获取商品*/
      getProduct(desc_asc){
        let pbid = this.$route.query.pbid || '';
        let start = this.page_info.page_num;
        axios.get(api.product_list,{
          params:{
            pbid:pbid,
            page_size:this.page_info.page_size,
            order_type:desc_asc,
            page_num:start,
            token:localStorage.getItem('token')
          }
        }).then(res => {
          if(res.data.status == 200){

            if(res.data.data.length >0){
              this.page_info.page_num = this.page_info.page_num +1;
            }else{
              this.page_info.page_num = 1;
              this.total_count= 0;
              return false;
            }
            if(start >1){
              this.product_list = this.product_list.concat(res.data.data);
            }else{
              this.product_list = res.data.data;
            }
            this.isScroll = true;
            this.total_count = res.data.total_count;
          }
        },error => {
          Toast({ message: error.data.message,duration:1000, className: 'm-toast-fail' });
        })
      },

    },
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
  .m-limitedTime{
    .m-brand-info{
      height:440px;
      width: 100%;
      position: relative;
      /*margin-bottom: 18px;*/
      .m-brand-img{
        display: block;
        width: 100%;
        height: 440px;
        background-color: #9fd0bf;
      }
      .m-icon-bg{
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100%;
        height: 67px;
        background: url("/static/images/icon-bg.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .m-width {
      /*width: 600px;*/
      /*padding: 0 75px;*/
      box-shadow: 0 5px 6px rgba(0,0,0,0.16);
      margin-bottom: 40px;
    }
    .m-limitedTime-title{
      font-size: 30px;
      line-height: 42px;
      text-align: left;
      padding-left: 47px;
      p{
        margin-bottom: 14px;
        &.m-time{
          font-size: 24px;
        }
      }
    }
    .m-brand-text{
      padding: 0 36px;
      text-align: left;
      .m-normal{
        height: 64px;
        line-height: 32px;
        overflow: hidden;
        text-indent: 2em;
        width: 676px;
        display:block;
        word-break: break-all;
        word-wrap: break-word;
      }
      .m-fold{
        height: auto;
      }
      .m-up-fold{
        text-align: right;
        padding: 19px 160px 34px;
        font-size: 22px;
        color: #999;
        .m-icon-unfold{
          display: inline-block;
          width: 22px;
          height: 10px;
          background: url("/static/images/icon-brand-unfold.png") no-repeat;
          background-size: 100% 100%;
          margin-left: 10px;
          vertical-align: middle;
        }
        .m-icon-packup{
          display: inline-block;
          width: 22px;
          height: 10px;
          background: url("/static/images/icon-packup.png") no-repeat;
          background-size: 100% 100%;
          margin-left: 10px;
          vertical-align: middle;
        }
      }
    }
    .m-nav-list{
      .flex-row(space-around);
      box-shadow: 0 3px 6px rgba(0,0,0,0.16);
      padding: 6px 0;

    }
  }
</style>
