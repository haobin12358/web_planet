<template>
    <div class="m-selected">
      <!--<mt-loadmore :top-method="loadTop" ref="loadmore">-->
        <!--搜索-->
        <div class="m-selected-search">
          <span class="m-icon-home"></span>
          <!--<span class="m-icon-home" @click="changeRoute('/giftBox')"></span>-->
          <div class="m-search-input-box" @click="changeRoute('/search')">
            <span class="m-icon-search"></span>
            <span>搜索商品</span>
          </div>
        </div>
        <!--轮播图-->
        <div class="m-swipe">
          <mt-swipe :auto="3000" v-if="swipe_list">
            <mt-swipe-item v-for="item in swipe_list" :key="item.ibid">
              <img :src="item.ibpic" class="img" alt="" >
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <!--标签-->
        <div class="m-selected-label">
          <div class="m-selected-label-left">
            <div class="m-selected-label-l">
              <span>100%正品保证</span>
              <span>假一赔十</span>
            </div>
            <ul class="m-selected-label-ul">
              <li>
                <span class="m-icon-label"></span>
                <span>正品保证</span>
              </li>
              <li>
                <span class="m-icon-label"></span>
                <span>专业精选</span>
              </li>
              <li>
                <span class="m-icon-label"></span>
                <span>十五天无忧退换</span>
              </li>
            </ul>
          </div>
          <div class="m-selected-label-right">
            <span class="m-icon-gift"></span>
            <span>签到有礼！</span>
          </div>
        </div>
        <!--场景推荐-->
        <div class="m-selected-one">
          <h3 class="m-selected-title m-flex-between" @click="changeRoute('scene')">
            <span>场景推荐</span>
            <span class="m-selected-title-more">
              <span>查看更多</span>
              <span class="m-icon-more"></span>
            </span>
          </h3>
          <div class="m-scroll">
            <ul class="m-selected-scene-ul">
              <li v-for="(item,index) in scene_list" @click.stop = "sceneClick(item)" >
                <img :src="item.pspic" class="m-selected-scene-img" alt="" >
              </li>
            </ul>
          </div>
        </div>
        <!--品牌推荐-->
        <div class="m-selected-one">
          <h3 class="m-selected-title m-flex-between">
            <span>品牌推荐</span>
            <span class="m-selected-title-more"  @click="changeRoute('brandList')">
              <span>查看更多</span>
              <span class="m-icon-more"></span>
            </span>
          </h3>
          <div class="m-scroll ">
            <ul class="m-selected-brand-ul" v-if="brand_list">
              <li v-for="(item,index) in brand_list" @click="changeRoute('/brandDetail',item)">
                <img :src="item.pblogo" class="m-selected-brand-img" alt="" >
              </li>
            </ul>
          </div>
          <div class="m-scroll ">
            <ul class="m-selected-brand-product-ul">
              <li v-for="(item,index) in brand_product" @click.stop="productClick(item)">
                <img :src="item.prmainpic" class="m-selected-brand-product-img" alt="" >
                <div class="m-selected-brand-product-text">
                  <h3>【{{item.brand.pbname}}】{{item.prtitle}}</h3>
                  <p class="m-flex-between m-ft-18">
                    <span>￥{{item.prprice |money}}</span>
                    <s class="m-grey m-ft-18" v-if="item.prlineprice">￥{{item.prlineprice | money}}</s>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <!--商品分类-->
          <h3 class="m-selected-title m-flex-between">
            <span>商品分类</span>
            <span class="m-selected-title-more"  @click="changeRoute('equipment/detail')">
              <span>查看更多</span>
              <span class="m-icon-more"></span>
            </span>
          </h3>
          <div class="m-scroll " v-if="icon_list">
            <ul class="m-equipment-icon-ul">
              <li v-for="(item,index) in icon_list" @click="changeRoute('equipment/detail',item)">
                <img :src="item.pcpic" alt="">
                <span class="m-name">{{item.pcname}}</span>
              </li>
            </ul>
          </div>
          <div class="m-selected-hot m-flex-start" v-if="hot_list && hot_list.length>0">
            <div class="m-hot-box">
                <span class="m-hot">HOT!</span>
                <span>人气热卖</span>
            </div>
            <div class="m-one-product m-l" v-if="hot_list[0]" @click.stop="productClick(hot_list[0])">
              <img :src="hot_list[0].prmainpic" class="m-one-product-img" alt="">
              <div class="m-one-product-text">
                <h3>【{{hot_list[0].brand.pbname}}】THE NORTH d </h3>
                <p v-if="hot_list[0].prlineprice">￥{{hot_list[0].prlineprice | money}}</p>
              </div>
            </div>
            <div>
              <div class="m-one-product " v-if="hot_list[1]" @click.stop="productClick(hot_list[1])">
                <img :src="hot_list[1].prmainpic" class="m-one-product-img" alt="">
                <div class="m-one-product-text">
                  <h3>【{{hot_list[1].brand.pbname}}】THE NORTH d </h3>
                  <p v-if="hot_list[1].prlineprice">￥{{hot_list[1].prlineprice | money}}</p>
                </div>
              </div>
              <div class="m-one-product " v-if="hot_list[2]" @click.stop="productClick(hot_list[2])">
                <img :src="hot_list[2].prmainpic" class="m-one-product-img" alt="">
                <div class="m-one-product-text">
                  <h3>【{{hot_list[2].brand.pbname}}】THE NORTH d </h3>
                  <p v-if="hot_list[2].prlineprice">￥{{hot_list[2].prlineprice | money}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--活动专题-->
        <!--<div class="m-selected-one">-->
          <!--<h3 class="m-selected-title m-flex-start">-->
            <!--<span>活动专题</span>-->
          <!--</h3>-->
          <!--<div class="m-one-activity m-top">-->
            <!--<img src="" class="m-activity-img" alt="" @click="changeRoute('/activityDetail')">-->
            <!--<ul class="m-activity-ul">-->
              <!--<li>-->
                <!--<img src="" class="m-one-activity-img" alt="">-->
                <!--<div class="m-one-activity-text">-->
                  <!--<h3>【北面】THE NORTH d </h3>-->
                  <!--<p class="m-flex-between">-->
                    <!--<span >￥950.00</span>-->
                    <!--<s class="m-grey">￥950.00</s></p>-->
                <!--</div>-->
              <!--</li>-->
              <!--<li>-->
                <!--<img src="" class="m-one-activity-img" alt="">-->
                <!--<div class="m-one-activity-text">-->
                  <!--<h3>【北面】THE NORTH d </h3>-->
                  <!--<p class="m-flex-between">-->
                    <!--<span >￥950.00</span>-->
                    <!--<s class="m-grey">￥950.00</s></p>-->
                <!--</div>-->
              <!--</li>-->
              <!--<li>-->
                <!--<img src="" class="m-one-activity-img" alt="">-->
                <!--<div class="m-one-activity-text">-->
                  <!--<h3>【北面】THE NORTH d </h3>-->
                  <!--<p class="m-flex-between">-->
                    <!--<span >￥950.00</span>-->
                    <!--<s class="m-grey">￥950.00</s></p>-->
                <!--</div>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
          <!--<div class="m-one-activity ">-->
            <!--<img src="" class="m-activity-img" alt="">-->
            <!--<ul class="m-activity-ul">-->
              <!--<li>-->
                <!--<img src="" class="m-one-activity-img" alt="">-->
                <!--<div class="m-one-activity-text">-->
                  <!--<h3>【北面】THE NORTH d </h3>-->
                  <!--<p class="m-flex-between">-->
                    <!--<span >￥950.00</span>-->
                    <!--<s class="m-grey">￥950.00</s></p>-->
                <!--</div>-->
              <!--</li>-->
              <!--<li>-->
                <!--<img src="" class="m-one-activity-img" alt="">-->
                <!--<div class="m-one-activity-text">-->
                  <!--<h3>【北面】THE NORTH d </h3>-->
                  <!--<p class="m-flex-between">-->
                    <!--<span >￥950.00</span>-->
                    <!--<s class="m-grey">￥950.00</s></p>-->
                <!--</div>-->
              <!--</li>-->
              <!--<li>-->
                <!--<img src="" class="m-one-activity-img" alt="">-->
                <!--<div class="m-one-activity-text">-->
                  <!--<h3>【北面】THE NORTH d </h3>-->
                  <!--<p class="m-flex-between">-->
                    <!--<span >￥950.00</span>-->
                    <!--<s class="m-grey">￥950.00</s></p>-->
                <!--</div>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->
        <!--为您精选-->
        <div class="m-selected-one">
          <h3 class="m-selected-title m-flex-between">
            <span>为您精选</span>
            <span class="m-selected-title-more">
              <span>查看更多</span>
              <span class="m-icon-more"></span>
            </span>
          </h3>
          <product :list="recommend_for_you_list"></product>
        </div>
      <!--</mt-loadmore>-->
    </div>

</template>

<script type="text/ecmascript-6">
  import product from '../components/product';
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';

    export default {
      data() {
        return {
          swipe_list:null,
          brand_list:null,
          brand_product:null,
          hot_list:null,
          scene_list:null,
          recommend_for_you_list: [],
          icon_list:null,
        }
      },
      components: { product },
      inject:['reload'],
      mounted() {
        common.changeTitle('精选');
        this.getSwipe();
        this.getBrand();
        this.getScene();
        this.getCategory();
      },
      methods: {
        /*获取轮播图*/
        getSwipe(){
          axios.get(api.list_banner_index).then(res => {
            if(res.data.status == 200){
              this.swipe_list = res.data.data;
            }
          })
        },
        //获取场景
        getScene(){
          axios.get(api.scene_list).then(res => {
            if(res.data.status == 200){
              this.scene_list = [].concat(res.data.data);
            }
          })
        },
        /*获取品牌推荐*/
        getBrand(){
          axios.get(api.brand_recommend_index).then(res => {
            if(res.data.status == 200){
              this.brand_list = res.data.data.brands;
              this.brand_product = res.data.data.product;
              this.hot_list = res.data.data.hot;
              this.recommend_for_you_list = res.data.data.recommend_for_you;
            }
          })
        },
        //获取装备信息
        getCategory(){
          axios.get(api.category_list).then(res => {
            if(res.data.status == 200){
              this.icon_list = [].concat(res.data.data);
            }
          })
        },
        /*查看更多*/
        changeRoute(v, item) {
          switch(v) {
            case '/giftBox':
              axios.get(api.get_home + "?token=" + localStorage.getItem('token')).then(res => {
                if(res.data.status == 200){
                  if(res.data.data.uslevel == "1") {            // 1 - 买家 - 去商家大礼包购买页
                    this.$router.push({path:v});
                  }else if(res.data.data.uslevel == "2") {      // 2 - 卖家 - 去身份认证页
                    this.$router.push("/storekeeper/IDCardApprove");
                  }else if(res.data.data.uslevel == "3") {      // 3 - 身份认证中 - 去身份认证页
                    this.$router.push("/storekeeper/applyOwner");
                  }
                }
              });
              break;
            case 'equipment/detail':
              if(item){
                this.$router.push({path:v,query:{pcid:item.pcid}});
              }else{
                this.$router.push({path:v});
              }
              break;
            case '/brandDetail':
              this.$router.push({ path: v, query: { pbid: item.pbid,pbname: item.pbname }});
              break;
            default:
              this.$router.push({path:v,});
          }
        },
        /*场景点击*/
        sceneClick(item){
          this.$router.push({path:'/scene',query:{ psid:item.psid}})
        },
        /*商品点击*/
        productClick(item){
          this.$router.push({path:'/product/detail',query:{ prid:item.prid}});
        },
        /*下拉刷新*/
        loadTop(){
          this.reload();
        }
      },
      created() {

      }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
  @import "../../../common/css/scroll";
.m-selected{
  width: 100%;
  overflow-x: hidden;
  .m-swipe{
    padding: 0 33px;
    /*margin: auto;*/
  }
  .m-selected-label{
    width: 615px;
    padding: 15px 33px;
    margin: 20px auto;
    height: 60px;
    border-radius: 50px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-image: linear-gradient(to right, @subColor, @mainColor);
    .flex-row(space-between);
    .m-selected-label-left{
      text-align: left;
      .m-selected-label-l{
        margin-bottom: 8px;
        span{
          display: inline-block;
          padding: 0 22px;
          font-size: 21px;
          font-weight: bold;
          &:first-child{
            border-right: 1px solid #333333;
            padding-left: 0;
          }
        }
      }
      .m-selected-label-ul{
        .flex-row(flex-start);
        font-size: 18px;
        letter-spacing: -0.4px;
        li{
          margin-right: 20px;
        }
        .m-icon-label{
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("/static/images/icon-label.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 10px;
        }
      }
    }
    .m-selected-label-right{
      width: 160px;
      height: 50px;
      border-radius: 50px;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      background-color: #fff;
      font-size: 21px;
      line-height: 50px;
      text-align: center;
      .m-icon-gift{
        display: inline-block;
        width: 27px;
        height: 31px;
        background: url("/static/images/icon-gift.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: text-bottom;
      }
    }
  }
  .m-selected-title{
    font-size: 36px;
    font-weight: bold;
    padding: 0 33px ;
    .m-selected-title-more{
      font-size: 21px;
      font-weight: normal;
      color: #999999;
      .m-icon-more{
        display: inline-block;
        width: 23px;
        height: 23px;
        background: url("/static/images/icon-more.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: text-top;
      }
    }
  }
  .m-selected-one{
    .m-one-activity{
      padding: 0 33px ;
      &.m-top{
        padding-top: 30px;
      }
      .m-activity-img{
        display: block;
        width: 682px;
        height: 325px;
        background-color: #edb3b1;
        border-radius: 10px;
      }
      .m-activity-ul{
        text-align: left;
        margin: 15px 0;
        .flex-row(space-between);
        li{
          .m-one-activity-img{
            display: block;
            width: 200px;
            height: 200px;
            background-color: #edb3b1;
          }
          .m-one-activity-text{
            width: 200px;
            font-size: 19px;
            margin-top: 10px;
            h3{
              width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
  .m-equipment-icon-ul{
    .flex-row(flex-start);
    li{
      /*margin-right: 10px;*/
      font-size: 21px;
      line-height: 24px;
      letter-spacing: -0.4px;
      position: relative;
      width: 180px;
      height: 180px;
      margin-bottom: 10px;
      box-shadow: none;
      margin-right: 0;
      img{
        display: block;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        /*box-shadow:5px 5px 6px rgba(0,0,0,0.16);*/
      }
      .m-name{
        display: block;
        width: 120px;
        text-align: center;
      }
    }
  }
  .m-selected-hot{
    background-color: #f1f1f1;
    width: 685px;
    height: 360px;
    border-radius: 10px;
    margin: 30px 32px;
    .m-hot-box{
      width: 160px;
      background-color: #e9e9e9;
      height: 360px;
      font-weight: bold;
      font-size: 30px;
      border-radius: 10px;
      .m-hot{
        font-size: 58px;
        color: @mainColor;
        margin-top: 120px;
        display: block;
      }
    }
    .m-one-product{
      margin: 20px;
      position: relative;
      width: 160px;
      height: 160px;
      .m-one-product-img{
        display: block;
        width: 160px;
        height: 160px;
        background-color: #fff;
      }
      &.m-l{
        width: 300px;
        height: 335px;
        margin-right: 0;
        .m-one-product-img{
          display: block;
          width: 300px;
          height: 335px;
          background-color: #fff;
        }
        .m-one-product-text{
          h3{
            width: 300px;
          }
        }
      }
      .m-one-product-text{
        position: absolute;
        top: 8px;
        left: 0;
        text-align: left;
        h3{
          width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}


</style>
