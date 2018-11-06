<template>
    <div class="m-orderList">
      <nav-list :navlist="nav_list" @navClick="navClick"></nav-list>
      <div class="m-orderList-content">
        <div class="m-one-part" @click="changeRoute('/orderDetail')">
         <div class="m-order-store-tile">
           <div>
             <span class="m-icon-store"></span>
             <span class="m-store-name">背面</span>
             <span class="m-icon-more"></span>
           </div>
           <span class="m-red">待发货</span>
         </div>
          <div class="m-order-product-ul">
            <div class="m-product-info">
              <img src="" class="m-product-img" alt="">
              <div>
                <p class="m-flex-between">
                <span class="m-product-name">南面防雨防风软壳衣
                南面防雨防风软壳衣</span>
                  <span class="m-price">￥899</span>
                </p>
                <p class="m-flex-between">
                  <span class="m-product-label">绿色；XL</span>
                  <span >x1</span>
                </p>
              </div>
            </div>
            <div class="m-product-info">
              <img src="" class="m-product-img" alt="">
              <div>
                <p class="m-flex-between">
                <span class="m-product-name">南面防雨防风软壳衣
                南面防雨防风软壳衣</span>
                  <span class="m-price">￥899</span>
                </p>
                <p class="m-flex-between">
                  <span class="m-product-label">绿色；XL</span>
                  <span >x1</span>
                </p>
              </div>
            </div>
            <ul class="m-order-btn-ul">
              <li @click.stop="changeRoute('/logisticsInformation')">
                查看物流
              </li>
              <li>
                删除订单
              </li>
              <li class="active">
                确认收货
              </li>
            </ul>
          </div>
        </div>
        <div class="m-one-part">
          <div class="m-order-store-tile">
            <div>
              <span class="m-icon-store"></span>
              <span class="m-store-name">背面</span>
              <span class="m-icon-more"></span>
            </div>
            <span class="m-red">待发货</span>
          </div>
          <div class="m-order-product-ul">
            <div class="m-product-info">
              <img src="" class="m-product-img" alt="">
              <div>
                <p class="m-flex-between">
                <span class="m-product-name">南面防雨防风软壳衣
                南面防雨防风软壳衣</span>
                  <span class="m-price">￥899</span>
                </p>
                <p class="m-flex-between">
                  <span class="m-product-label">绿色；XL</span>
                  <span >x1</span>
                </p>
              </div>
            </div>
            <ul class="m-order-btn-ul">
              <li>
                退货
              </li>
              <li>
                删除订单
              </li>
              <li class="active" @click.stop="changeRoute('/addComment')">
                评价
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import common from '../../../common/js/common';
  import navList from '../../../components/common/navlist';
    export default {
        data(){
          return{
            nav_list:[
              {
                name:'全部',
                params:'',
                active:true
              },
              {
                name:'待付款',
                params:'',
                active:false
              },
              {
                name:'待发货',
                params:'',
                active:false
              },
              {
                name:'待收货',
                params:'',
                active:false
              },
              {
                name:'已完成',
                params:'',
                active:false
              }
            ]
          }
        },
      components: {
        navList
      },
      mounted(){
          common.changeTitle('订单列表');
      },
      methods:{
        changeRoute(v){
          this.$router.push(v)
        },
        navClick(index){
          let arr = [].concat(this.nav_list);
          for(let i=0;i<arr.length;i++){
            arr[i].active = false;
          }
          arr[index].active = true;
          this.nav_list = [].concat(arr)
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "../../../common/css/index";
  .m-orderList{
    background-color: #eee;
    min-height: 100%;
    .m-nav-list{
      padding: 0 26px ;
    }
    .m-orderList-content{
      padding: 26px;
      .m-icon-more{
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url("/static/images/icon-more.png") no-repeat;
        background-size: 100% 100%;
      }
      .m-one-part{
        background-color: #fff;
        padding: 30px 37px;
        border-radius: 10px;
        box-shadow:0 5px 6px rgba(0,0,0,0.16);
        margin-bottom: 20px;
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
        .m-order-product-ul{
          margin-top: 16px;
          .m-product-info{
            display: flex;
            flex-flow: row;
            justify-content: flex-start;
            margin: 15px 0;
            .m-product-img{
              display: block;
              width: 153px;
              height: 153px;
              background-color: #9fd0bf;
              margin-right: 30px;
            }
            p{
              line-height: 36px;
            }
            .m-product-name{
              display: block;
              width: 350px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: left;
            }
            .m-product-label{
              color: #999999;
              font-size: 21px;
            }
          }
          .m-order-btn-ul{
            text-align: right;
            color: #999;
            margin-top: 20px;
            li{
              display: inline-block;
              width: 129px;
              height: 41px;
              line-height: 41px;
              text-align: center;
              border: 1px solid #999;
              border-radius: 30px;
              margin-left: 15px;
              &.active{
                background-color: @mainColor;
                color: #333;
                border: 1px solid @mainColor;
              }
            }
          }
        }
      }
    }
  }
</style>
