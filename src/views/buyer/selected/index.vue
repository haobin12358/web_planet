<template>
    <div class="m-selected">
      <!--搜索-->
      <div class="m-selected-search">
        <span class="m-icon-home"></span>
        <div class="m-search-input-box">
          <span class="m-icon-search"></span>
          <span>搜索品牌/商品</span>
        </div>
      </div>
      <!--轮播图-->
      <div class="m-selected-swipe">
        <mt-swipe :auto="3000" >
          <mt-swipe-item>
            <img src="" class="img" alt="">
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="" class="img" alt="">
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="" class="img" alt="">
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
            <!--<li>-->
              <!--<span class="m-icon-label"></span>-->
              <!--<span>十五天无忧退换</span>-->
            <!--</li>-->
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
            <li>
              <img src="" class="m-selected-scene-img" alt="">
            </li>
            <li>
              <img src="" class="m-selected-scene-img" alt="">
            </li>
            <li>
              <img src="" class="m-selected-scene-img" alt="">
            </li>
            <li>
              <img src="" class="m-selected-scene-img" alt="">
            </li>
            <li>
              <img src="" class="m-selected-scene-img" alt="">
            </li>
          </ul>
        </div>
      </div>
      <!--品牌推荐-->
      <div class="m-selected-one">
        <h3 class="m-selected-title m-flex-between">
          <span>品牌推荐</span>
          <span class="m-selected-title-more">
            <span>查看更多</span>
            <span class="m-icon-more"></span>
          </span>
        </h3>
        <div class="m-scroll ">
          <ul class="m-selected-brand-ul">
            <li>
              <img src="" class="m-selected-brand-img" alt="">
            </li>
            <li>
              <img src="" class="m-selected-brand-img" alt="">
            </li>
            <li>
              <img src="" class="m-selected-brand-img" alt="">
            </li>
            <li>
              <img src="" class="m-selected-brand-img" alt="">
            </li>
            <li>
              <img src="" class="m-selected-brand-img" alt="">
            </li>
          </ul>
        </div>
        <div class="m-scroll m-center-scroll">
          <ul class="m-selected-brand-product-ul">
            <li>
              <img src="" class="m-selected-brand-product-img" alt="">
              <div clas="m-selected-brand-product-text">
                <h3>【北面】THE NORTH FA1212</h3>
                <p class="m-flex-between">
                  <span>￥850.00</span>
                  <s class="m-grey">￥850.00</s>
                </p>
              </div>
            </li>
            <li>
              <img src="" class="m-selected-brand-product-img" alt="">
              <div clas="m-selected-brand-product-text">
                <h3>【北面】THE NORTH FA1212</h3>
                <p class="m-flex-between">
                  <span>￥850.00</span>
                  <s class="m-grey">￥850.00</s>
                </p>
              </div>
            </li>
            <li>
              <img src="" class="m-selected-brand-product-img" alt="">
              <div clas="m-selected-brand-product-text">
                <h3>【北面】THE NORTH FA1212</h3>
                <p class="m-flex-between">
                  <span>￥850.00</span>
                  <s class="m-grey">￥850.00</s>
                </p>
              </div>
            </li>
            <li>
              <img src="" class="m-selected-brand-product-img" alt="">
              <div clas="m-selected-brand-product-text">
                <h3>【北面】THE NORTH FA1212</h3>
                <p class="m-flex-between">
                  <span>￥850.00</span>
                  <s class="m-grey">￥850.00</s>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="m-selected-hot m-flex-start">
          <div class="m-hot-box">
              <span class="m-hot">HOT!</span>
              <span>人气热卖</span>
          </div>
          <div class="m-one-product m-l">
            <img src="" class="m-one-product-img" alt="">
            <div class="m-one-product-text">
              <h3>【北面】THE NORTH d </h3>
              <p>￥950.00</p>
            </div>
          </div>
          <div>
            <div class="m-one-product ">
              <img src="" class="m-one-product-img" alt="">
              <div class="m-one-product-text">
                <h3>【北面】THE NORTH d </h3>
                <p>￥950.00</p>
              </div>
            </div>
            <div class="m-one-product ">
              <img src="" class="m-one-product-img" alt="">
              <div class="m-one-product-text">
                <h3>【北面】THE NORTH d </h3>
                <p>￥950.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--活动专题-->
      <div class="m-selected-one">
        <h3 class="m-selected-title m-flex-start">
          <span>场景推荐</span>
        </h3>
        <div class="m-one-activity m-top">
          <img src="" class="m-activity-img" alt="">
          <ul class="m-activity-ul">
            <li>
              <img src="" class="m-one-activity-img" alt="">
              <div class="m-one-activity-text">
                <h3>【北面】THE NORTH d </h3>
                <p>
                  <span >￥950.00</span>
                <s class="m-grey">￥950.00</s></p>
              </div>
            </li>
            <li>
              <img src="" class="m-one-activity-img" alt="">
              <div class="m-one-activity-text">
                <h3>【北面】THE NORTH d </h3>
                <p>
                  <span >￥950.00</span>
                  <s class="m-grey">￥950.00</s></p>
              </div>
            </li>
            <li>
              <img src="" class="m-one-activity-img" alt="">
              <div class="m-one-activity-text">
                <h3>【北面】THE NORTH d </h3>
                <p>
                  <span >￥950.00</span>
                  <s class="m-grey">￥950.00</s></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="m-one-activity ">
          <img src="" class="m-activity-img" alt="">
          <ul class="m-activity-ul">
            <li>
              <img src="" class="m-one-activity-img" alt="">
              <div class="m-one-activity-text">
                <h3>【北面】THE NORTH d </h3>
                <p>
                  <span >￥950.00</span>
                  <s class="m-grey">￥950.00</s></p>
              </div>
            </li>
            <li>
              <img src="" class="m-one-activity-img" alt="">
              <div class="m-one-activity-text">
                <h3>【北面】THE NORTH d </h3>
                <p>
                  <span >￥950.00</span>
                  <s class="m-grey">￥950.00</s></p>
              </div>
            </li>
            <li>
              <img src="" class="m-one-activity-img" alt="">
              <div class="m-one-activity-text">
                <h3>【北面】THE NORTH d </h3>
                <p>
                  <span >￥950.00</span>
                  <s class="m-grey">￥950.00</s></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--为您精选-->
      <div class="m-selected-one">
        <h3 class="m-selected-title m-flex-between">
          <span>为您精选</span>
          <span class="m-selected-title-more">
            <span>查看更多</span>
            <span class="m-icon-more"></span>
          </span>
        </h3>
        <product></product>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import product from '../components/product';
  import common from '../../../common/js/common'
    export default {
        data() {
            return {
                name: ''
            }
        },
        components: {
          product
        },
      mounted(){
        common.changeTitle('精选');
      },
        methods: {
          /*查看更多*/
          changeRoute(v){
            this.$router.push(v)
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
  .m-selected-swipe{
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
    background-image: linear-gradient(to right, #fbea7d, #fcd316);
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
