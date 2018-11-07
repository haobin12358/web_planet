<template>
    <div class="m-product-detail">
      <div class="m-product-swipe">
        <mt-swipe :auto="2000" >
          <mt-swipe-item>
            <img src="" class="m-swipe-img" alt="">
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="" class="m-swipe-img" alt="">
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="" class="m-swipe-img" alt="">
          </mt-swipe-item>
        </mt-swipe>
        <span class="m-icon-back"></span>
      </div>
      <div class="m-product-detail-info">
        <h3>
          <span>登山服</span>
          <span class="m-red">￥1668.0</span>
        </h3>
        <div class="m-info-list">
          <span>快递：0.00</span>
          <span>快递：0.00</span>
          <span>快递：0.00</span>
        </div>
      </div>
      <div class="m-product-detail-more" @click="changeModal('show_sku',true)">
        <div>
          <span class="m-label">规格</span>
          <span class="m-select m-black">选择    颜色分类 重量</span>
        </div>
        <div>
          <span class="m-more"></span>
        </div>
      </div>
      <div class="m-product-detail-more" @click="changeRoute">
        <div>
          <span class="m-label">评价</span>
          <span class="m-start active"></span>
          <span class="m-start active"></span>
          <span class="m-start active"></span>
          <span class="m-start active"></span>
          <span class="m-start "></span>
        </div>
        <div>
          <span class="m-ft-20">查看详情</span>
          <span class="m-more"></span>
        </div>
      </div>
      <div class="m-product-detail-img-box">
        <img src=""  alt="">
      </div>
      <div class="m-product-detail-foot">
        <span class="m-icon-car"></span>
        <span class="m-icon-service"></span>
        <div class="m-product-detail-btn">
          <span>加入购物车</span>
          <span class="active">立即购物车</span>
        </div>
      </div>

      <sku v-if="show_sku" @changeModal="changeModal"></sku>
    </div>
</template>

<script>
  import sku from '../components/sku'
  var scroll = (function (className) {
    var scrollTop;
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
        data(){
          return{
            show_sku:false
          }
        },
      components:{
          sku
      },
      methods:{
         changeModal(v,bool) {
           this[v] = bool;
           if(bool){
             scroll.afterOpen();
           }else{
             scroll.beforeClose();
           }
         },
        changeRoute(){
           this.$router.push('/evaluate');
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
.m-product-detail{
  padding-bottom: 200px;
  .m-product-swipe{
    position: relative;
    width: 100%;
    height: 784px;
    .m-icon-back{
      position: absolute;
      top: 20px;
      left: 68px;
      width: 24px;
      height: 41px;
      background: url("/static/images/icon-detail-back.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .m-product-detail-info{
    padding: 30px;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    h3{
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-between;
      font-size: 30px;
      font-weight: bold;
      color: #666666;
      margin-bottom: 40px;
      .m-red{
        color: #EF9B2D;
      }
    }
    .m-info-list{
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-between;
      color: #999999;
    }
  }
  .m-product-detail-more{
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    padding: 24px 30px;
    color: #999999;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    .m-label{
      display: inline-block;
      margin-right: 30px;
    }
    .m-black{
      color: #666666;
    }
    .m-more{
      display: inline-block;
      width: 13px;
      height: 19px;
      background: url("/static/images/icon-right.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 20px;
    }
  }
  .m-product-detail-img-box{
    margin: 10px 0;
    img{
      display: block;
      width: 100%;
      height: 600px;
      background-color: #9fd0bf;
    }
  }
  .m-product-detail-foot{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 26px 0 98px;
    background-color: #fff;
    text-align: left;
    .m-icon-car{
      display: inline-block;
      width: 53px;
      height: 53px;
      background: url("/static/images/icon-car.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 29px 0 15px;
      vertical-align: middle;
    }
    .m-icon-service{
      display: inline-block;
      width: 53px;
      height: 53px;
      background: url("/static/images/icon-service.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 20px;
      vertical-align: middle;
    }
    .m-product-detail-btn{
      display: inline-block;
      height: 62px;
      line-height: 62px;
      span{
        display: inline-block;
        width: 271px;
        text-align: center;
        background-color: #fbe891;
        margin: 0;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        &.active{
          background-color: #fcd316;
          margin-left: -8px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }

}

</style>
