<template>
    <div class="m-orderList" @touchmove.stop="touchMove">
      <div class="m-nav">
        <nav-list :navlist="nav_list" @navClick="navClick"></nav-list>
      </div>
      <div class="m-no-coupon" v-if="order_list.length == 0">
        <span class="m-no-img m-order-no-img"></span>
        <p>暂无订单哦,<span class="m-red">去下单</span>吧~</p>
      </div>

      <div class="m-orderList-content" v-else>
        <template v-for="(items,index) in order_list">
          <div class="m-one-part"  @click.stop="changeRoute('/orderDetail',items)">
            <div class="m-order-store-tile" >
              <div @click.stop="changeRoute('/brandDetail',items)">
                <span class="m-icon-store"></span>
                <span class="m-store-name">{{items.pbname}}</span>
                <span class="m-icon-more"></span>
              </div>
              <span class="m-red">{{items.omstatus_zh}}</span>
            </div>
            <div class="m-order-product-ul">
              <template v-for="(item,i) in items.order_part">
                <div class="m-product-info" >
                  <img src="" class="m-product-img" alt="">
                  <div>
                    <p class="m-flex-between">
                      <span class="m-product-name">{{item.prtitle}}</span>
                      <span class="m-price">￥{{item.skuprice | money}}</span>
                    </p>
                    <p class="m-flex-between">
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
              </template>

              <ul class="m-order-btn-ul">
                <!--<li v-if="items.omstatus==10" @click.stop="changeRoute('/selectBack',items)">退款</li>-->
                <li @click.stop="changeRoute('/logisticsInformation',items)" v-if="items.omstatus==20 || items.omstatus == 35">查看物流</li>
                <!--<li v-if=" items.omstatus == -40 || items.omstatus == 30">删除订单</li>-->
                <li v-if="items.omstatus == 0" @click.stop="cancelOrder(items)">取消订单</li>
                <!--<li class="active" @click.stop="changeRoute('/addComment')" v-if="items.omstatus == 35">评价</li>-->
                <li class="active" v-if="items.omstatus == 10 || items.omstatus == 20">确认收货</li>
                <li class="active" v-if="items.omstatus == 0">立即付款</li>
              </ul>
            </div>
          </div>
        </template>
      </div>
      <bottom-line v-if="bottom_show"></bottom-line>
    </div>
</template>

<script>
  import common from '../../../common/js/common';
  import navList from '../../../components/common/navlist';
  import axios from 'axios';
  import api from '../../../api/api';
  import bottomLine from '../../../components/common/bottomLine';
  import { MessageBox } from 'mint-ui';

    export default {
      data(){
        return{
          nav_list: [
            { active: true, name: "新人首单", count: "0", omfrom: 40 },
            { active: false, name: "每日竞猜", count: "0", omfrom: 30 },
            { active: false, name: "好友魔盒", count: "0", omfrom: 50 },
            { active: false, name: "免费试用", count: "0", omfrom: 60 }
          ],
          page_info: { page_num: 1, page_size: 10 },
          isScroll: true,
          total_count: 0,
          bottom_show: false,
          order_list: [],
          omfrom: 40
        }
      },
      inject: ['reload'],
      components: { navList, bottomLine },
      mounted(){
        common.changeTitle('订单列表');
        // this.getOrderNum();               // 获取各状态的订单数量
        this.getOrderList();
      },
      methods:{
        changeRoute(v,item) {
          switch (v){
            case '/brandDetail':
              this.$router.push({path:v,query:{pbid:item.pbid}});
              break;
            case '/orderDetail':
              this.$router.push({path:v,query:{omid:item.omid}});
              break;
            case '/logisticsInformation':
              this.$router.push({path:v,query:{omid:item.omid}});
              break;
            case '/selectBack':
              this.$router.push({path:v,query:{product:JSON.stringify(item),allOrder:1}});
              break;
            default:
              this.$router.push(v)
          }
        },
        // 导航点击
        navClick(index) {
          this.page_info.page_num = 1;
          this.total_count = 0;
          this.bottom_show = false;
          let arr = [].concat(this.nav_list);
          if(arr[index].active) {
            return false;
          }
          for(let i = 0; i < arr.length; i ++) {
            arr[i].active = false;
          }
          arr[index].active = true;
          this.nav_list = [].concat(arr);
          this.page_info.page_num = 1;
          this.omfrom = arr[index].omfrom;
          this.getOrderList();
        },
        // 获取订单列表
        getOrderList() {
          let params = {
            token: localStorage.getItem('token'),
            page_num: this.page_info.page_num,
            page_size: this.page_info.page_size,
            omfrom: this.omfrom
          };
          axios.get(api.order_list, { params: params }).then(res => {
            if(res.data.status == 200) {
              this.isScroll = true;
              if(res.data.data.length > 0) {
                if(this.page_info.page_num > 1) {
                  this.order_list = this.order_list.concat(res.data.data);
                }else{
                  this.order_list = res.data.data;
                }
                this.page_info.page_num = this.page_info.page_num + 1;
                this.total_count = res.data.total_count;
              }else{
                this.order_list = [];
                this.page_info.page_num = 1;
                this.total_count = 0;
                return false;
              }
            }
          })
        },
        // 获取各状态的订单数量
        /*getOrderNum() {
          axios.get(api.order_count + "?token=" + localStorage.getItem('token')).then(res => {
            if(res.data.status == 200) {
              for(let i = 0; i < res.data.data.length; i ++) {
                res.data.data[i].active = false;
              }
              this.nav_list = [].concat(res.data.data);
              console.log(this.nav_list);

              // 显示哪个类型的订单
              for(let i = 0; i < this.nav_list.length; i ++) {
                this.nav_list[i].active = false;
              }
              let which = this.$route.query.which;
              if(which) {
                this.navClick(which);
              }else {
                this.nav_list[0].active = true;
                this.getOrderList();
              }
            }
          })
        },*/
        //滚动加载更多
        touchMove(e) {
          let scrollTop = common.getScrollTop();
          let scrollHeight = common.getScrollHeight();
          let ClientHeight = common.getClientHeight();
          if (scrollTop + ClientHeight  >= scrollHeight -10) {
            if(this.isScroll){
              this.isScroll = false;
              if(this.order_list.length == this.total_count){
                this.bottom_show = true;
              }else{
                for(let i = 0; i < this.nav_list.length; i ++) {
                  if(this.nav_list[i].active) {
                    this.getOrderList();
                  }
                }
              }
            }
          }
        },
        // 取消订单
        cancelOrder(item) {
          MessageBox.confirm('是否取消该订单？').then(() => {
            this.page_info.page_num = 1;
            axios.post(api.cancle_order + '?token=' + localStorage.getItem('token'),
              { omid:item.omid }).then(res => {
              if(res.data.status == 200) {
                this.getOrderList();
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
  .m-orderList{
    min-height: 100%;
    padding-bottom: 30px;
    .m-nav{
      background-color: #fff;
    }
    .m-nav-list{
      padding: 0 26px ;
    }
    .m-no-coupon{
      margin-top: 300px;
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
