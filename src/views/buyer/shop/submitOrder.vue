<template>
    <div class="m-submitOrder">
      <div class="m-one-part m-pl-s m-pr-s m-address-part" @click="changeRoute('personal/addressManagement', 'choose')">
        <div class="m-left" v-if="!address_info.uaphone">
          <div class="m-address-name">
            <div>
              <span class="m-border"></span>
              <span>{{address_info.uaname}}</span>
            </div>
          </div>
        </div>
        <div class="m-left" v-if="address_info.uaphone">
          <div class="m-address-name">
            <div>
              <span class="m-border"></span>
              <span>收货人：{{address_info.uaname}}</span>
            </div>
            <span>{{address_info.uaphone}}</span>
          </div>
          <p class="m-address-p">
            收货地址：{{address_info.addressinfo}}
          </p>
        </div>
        <span class="m-icon-more"></span>
      </div>
      <div class="m-one-part">
        <div v-for="(items,index) in product_info">
          <h3>{{items.pb.pbname}}</h3>
          <div class="m-product" v-for="(item,i) in items.cart">
            <div>
              <img :src="item.sku.skupic" class="m-product-img" alt="">
            </div>
            <div>
              <h3>{{item.product.prtitle}}</h3>
              <p class="m-sku-select">
                <template v-for="(key,k) in item.sku.skuattritedetail" >
                  <span >{{key}}</span>
                  <span v-if="k < item.sku.skuattritedetail.length-1">；</span>
                </template>
              </p>
              <p class="m-price-num">
                <span class="m-price">￥{{item.sku.skuprice | money}}</span>
                <span>x{{item.canums}}</span>
              </p>
            </div>
          </div>
        </div>

      </div>
      <div class="m-one-part">
        <ul class="m-order-ul">
          <li class="m-sku-num">
            <span>商品金额</span>
            <div class="m-num ">
              ￥{{total_money | money}}
            </div>
          </li>
          <li class="m-flex-between">
            <span>配送方式</span>
            <div @click="changeModel('show_picker',true)">
              <span>快递:包邮</span>
              <span class="m-icon-more"></span>
            </div>
          </li>
          <li class="m-message">
            <span>买家留言：</span>
            <textarea name="" id=""></textarea>
            <!--<textarea name="" id=""  placeholder="选填"></textarea>-->
          </li>
          <li class="m-flex-between">
            <span>优惠方式</span>
            <div v-if="couponList" @click="changeModel('show_coupon',true)">
                <span class="m-grey" v-if="coupon_info">{{coupon_info.coname}}</span>
                <span v-else>选择优惠券</span>
                <span class="m-icon-more"></span>
            </div>
            <div v-else>
              <span >无优惠券</span>
              <!--<span class="m-icon-more"></span>-->
            </div>
          </li>
          <li class="m-flex-between">
            <span>付款方式</span>
            <div>
              <span>微信</span>
              <!--<span class="m-icon-more"></span>-->
            </div>
          </li>
        </ul>
      </div>
      <!--商家大礼包支付成功的popup-->
      <mt-popup class="m-gift-popup" v-model="giftPopup" pop-transition="popup-fade">
        <img class="m-gift-popup-img" src="/static/images/icon-out-know.png" alt="">
        <div class="m-ft-30 m-ft-b">支付成功</div>
        <div class="m-gift-popup-text m-ft-24">支付成功，提交申请并完成审批即可成为卖家。</div>
        <div class="m-gift-popup-btn m-ft-30 m-ft-b" @click="changeRoute('/storekeeper/IDCardApprove')">填写申请</div>
      </mt-popup>

      <div class="m-order-btn">
        <span @click="submitOrder" ref="button">支付订单</span>
      </div>
      <!--<picker :show_picker="show_picker" :params="picker_params" :is_search="true"  :slots="slots" @pickerSave="pickerSave" @inputChange="inputChange"></picker>-->

      <mt-popup v-model="show_coupon" popup-transition="popup-fade" class="m-coupon-modal">
        <div class="m-coupon-modal-content">
          <coupon :couponList="couponList" :order="true" @couponClick="couponClick"></coupon>
        </div>
      </mt-popup>

    </div>

</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import picker from '../../../components/common/picker';
  import axios from 'axios';
  import api from '../../../api/api';
  import {Toast} from 'mint-ui';
  import coupon from '../components/couponCard';

    export default {
      data() {
        return {
          product_info:null,
          show_picker :false,
          show_coupon:false,
          slots: [
            {
              flex: 1,
              values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
              className: 'slot1',
              textAlign: 'center'
            }
          ],
          picker_params: 'company',
          address_info: {},
          coupon_info: null,
          total_money: 0,
          uaid: "",                 // 收货地址id
          couponList: [],           // 优惠券list
          fromGift: false,          // 是否是商家大礼包的结算页面
          giftPopup: false,         // 商家大礼包支付后的popup
        }
      },
      components: { picker, coupon },
      mounted(){
        common.changeTitle('下单');
        // console.log(JSON.parse(this.$route.query.product));
        if(this.$route.query.product){
          this.product_info = JSON.parse(this.$route.query.product);
          let total = 0;
          for(let i=0;i<this.product_info.length;i++){
            for(let j=0;j<this.product_info[i].cart.length;j++){
              total = total+Number(this.product_info[i].cart[j].sku.skuprice)*this.product_info[i].cart[j].canums ;
            }
          }
          this.total_money = total;
          // 判断是否是从商家大礼包来结算的
          if(this.$route.query.gift) {
            this.fromGift = true
          }
        }
        this.uaid = localStorage.getItem("uaid");
        this.getOneAddress();
        this.getCoupon();
      },
      methods: {
        // 跳转其他页面的方法
        changeRoute(v, where) {
          if(where) {
            this.$router.push({ path: v, query: { from: where }});
          }else {
            this.$router.push(v);
          }
        },
        /*获取默认地址*/
        getOneAddress(){
          let params = { token: localStorage.getItem('token') };
          if(this.uaid) {
            params.uaid = this.uaid;
          }
          axios.get(api.get_one_address, { params: params }).then(res => {
            if(res.data.status == 200){
              this.address_info = res.data.data;
              this.uaid = res.data.data.uaid;
              localStorage.removeItem('uaid');      // 使用过uaid后将其删除
            }else{
              this.address_info.uaname = "没有地址信息，请点此添加";
            }
          });
        },
        /*获取优惠券*/
        getCoupon() {
          let params = {
            token: localStorage.getItem('token'),
            ucalreadyuse: false,
            canuse: true
          };
          axios.get(api.list_user_coupon, { params: params }).then(res => {
            if(res.data.status == 200){
              this.couponList = [];
              for(let i = 0; i < res.data.data.length; i ++) {
                if(res.data.data[i].coupon.title_subtitle.left_text.length > 8) {
                  res.data.data[i].coupon.title_subtitle.left_text = res.data.data[i].coupon.title_subtitle.left_text.substr(0, 8) + "..";
                }
                this.couponList.push(res.data.data[i].coupon);
              }
            }
          })
        },
        /*改变模态框*/
        changeModel(v,bool){
          this[v] = bool;
        },
        /*选择显示隐藏*/
        pickerSave(v,bool){
          this[v] = bool
        },
        /*搜索*/
        inputChange(v){
          console.log(v)
        },
        // 提交并调起支付
        submitOrder() {
          if(!this.uaid) {
            Toast("请先选择收货地址");
            return false;
          }
          // 是从商家大礼包来结算的则弹出popup
          if(this.fromGift) {
            this.giftPopup = true;
          }
          alert("success");
        },
        /*优惠券选择*/
        couponClick(item){
          this.coupon_info = item;
          this.show_coupon = false;
        }
      }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
.m-submitOrder{
  min-height: 100%;
  background-color: #eee;
  padding: 17px 25px 100px 25px;
  color: #333;
  .m-icon-more{
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url("/static/images/icon-more.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
  }
  .m-one-part{
    width: 612px;
    padding: 16px 44px 22px;
    background-color: #fff;
    box-shadow:0 5px 6px rgba(0,0,0,0.16);
    border-radius: 10px;
    margin-bottom: 20px;
    text-align: left;
    &.m-pl-s{
      width: 630px;
      padding: 16px 14px 22px 26px;
      &.m-pr-s{
        width: 660px;
        padding: 16px 14px 22px 26px;
      }
    }
    &.m-pr-s{
      width: 642px;
      padding: 16px 14px 22px 44px;
    }
    &.m-address-part{
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-between;
      .m-left{
        width: 630px;
      }
      .m-address-name{
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        color: #666;
        .m-border{
          display: inline-block;
          width: 5px;
          height:50px;
          background:linear-gradient(180deg,rgba(255,251,223,1) 0%,rgba(252,211,22,1) 100%);
          vertical-align: middle;
          margin-right: 15px;
        }
      }
      .m-address-p{
        text-align: left;
        color: #999;
        padding-left: 20px;
        line-height: 28px;
      }
    }
    h3{
      font-size: 24px;
      font-weight: 400;
      color: #333;
    }
    .m-product{
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      margin-top: 30px;
      h3{
        margin: 0;
      }
      .m-product-img{
        display: block;
        width: 100px;
        height: 100px;
        background-color: #edb3b1;
        margin-right: 20px;
      }
      .m-sku-select{
        margin: 8px 0;
        color: #999;
      }
      .m-price-num{
        margin: 0;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        width: 480px;
        .m-price{
          color: #FF6600;
        }
      }
    }
    .m-order-ul{
      li{
        border-bottom: 1px solid #ccc;
        padding: 28px 0;
        &:last-child{
          border-bottom: none;
        }
      }
    }
    .m-message{
      display: flex;
      flex-flow: row;
      textarea{
        display: block;
        min-height: 100px;
        width: 400px;
        padding: 0 40px 10px;
      }
    }
  }
  .m-gift-popup {
    width: 700px;
    height: 600px;
    margin: -300px 0 0 25px;
    border-radius: 30px;
    .m-gift-popup-img {
      width: 85px;
      height: 85px;
      margin: 100px 0 36px 0;
    }
    .m-gift-popup-text {
      margin: 45px 0 120px 0;
    }
    .m-gift-popup-btn {
      width: 120px;
      color: #ffffff;
      background-color: #FCD316;
      padding: 15px 70px;
      margin-left: 220px;
      border-radius: 10px;
      box-shadow: 2px 8px 8px rgba(0,0,0,0.16);
    }
  }
  .m-order-btn{
    padding: 0;
    width: 700px;
    margin-top: 100px;
    span{
      display: inline-block;
      width: 700px;
      height:106px;
      line-height: 106px;
      background: rgba(252,211,22,1);
      box-shadow: 0 5px 6px rgba(0,0,0,0.16);
      border-radius: 10px;
      font-weight: bold;
      font-size: 38px;
    }
  }
  .m-coupon-modal{
    display: flex;
    flex-flow: column;
    /*justify-content: center;*/
    align-items: center;
    height: 660px;
    overflow-y: auto;
    padding-bottom: 40px;
    .m-coupon-modal-content{
      padding: 40px 0;
    }
  }
}
</style>
