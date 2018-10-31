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
      <div class="m-product-detail-more">
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

      <div class="m-sku" v-if="show_sku">
        <div class="m-sku-state">
          <span class="m-icon-close" @click="changeModal('show_sku',false)"></span>
          <div class="m-sku-content">
             <div class="m-sku-img-box m-center">
               <img src=""  alt="">
             </div>
            <div  class="m-center">
              <span class="m-red">￥193.0</span>
            </div>
            <div class="m-scroll">
              <ul class="m-sku-box">
                <li>
                  <p>颜色分类</p>
                  <ul class="m-sku-ul">
                    <li>红色</li>
                    <li>红色</li>
                    <li>红色</li>
                    <li class="active">红色</li>
                  </ul>
                </li>
                <li>
                  <p>颜色分类</p>
                  <ul class="m-sku-ul">
                    <li>红色</li>
                    <li>红色</li>
                    <li class="active">红色</li>
                  </ul>
                </li>
              </ul>
              <div class="m-sku-num">
                <span>购买数量</span>
                <div class="m-num">
                  <span class="m-icon-cut"></span>
                  <input type="text" class="m-num-input" placeholder="0">
                  <span class="m-icon-add"></span>
                </div>
              </div>
            </div>
            <div class="m-sku-btn">
              <span>确 定</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
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
      methods:{
         changeModal(v,bool) {
           this[v] = bool;
           if(bool){
             scroll.afterOpen();
           }else{
             scroll.beforeClose();
           }
         }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-product-detail{
  padding-bottom: 200px;
  .m-product-swipe{
    position: relative;
    width: 100%;
    height: 784px;
    img{
      display: block;
      width: 100%;
      height: 100%;
      background-color: #9fd0bf;
    }
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
    .m-start{
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url("/static/images/icon-start-half.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 10px;
      &.active{
        background: url("/static/images/icon-start-active.png") no-repeat;
        background-size: 100% 100%;
      }
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
  .m-sku{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    /*background-color: rgba(0,0,0,0.2);*/
    z-index: 1001;
    transition: opacity .5s;
    .m-sku-state{
      background-color: #fff;
      position: absolute;
      width: 100%;
      height: 990px;
      left: 0;
      bottom:0;
      border-radius:50px 50px 0 0;
      -webkit-transition: height 0.88s;
      transition: height 0.88s;
      .m-icon-close{
        position: absolute;
        top: 35px;
        right: 35px;
        height: 35px;
        width: 35px;
        background: url("/static/images/icon-close.png") no-repeat;
        background-size: 100% 100%;
      }
      .m-sku-content{
        .m-center{
          text-align: center;
          .m-red{
            color: #EF9B2D;
            font-size: 30px;
            font-weight:400;
          }
        }
        .m-sku-img-box{
          margin: 30px 0 10px;
          img{
            display: inline-block;
            width: 230px;
            height: 230px;
            box-shadow:0px 5px 6px rgba(0,0,0,0.16);
          }
        }
        .m-scroll{
          height: 450px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 10px 65px;
          color: #999999;
          .m-sku-box{
            text-align: left;
            list-style: none;
            padding: 0;
            .m-sku-ul{
              display: flex;
              flex-flow: row;
              align-items: center;
              justify-content: flex-start;
              flex-wrap: wrap;
              list-style: none;
              padding: 0;
              overflow-y: scroll;
              li{
                padding: 5px 56px;
                background-color: #D5D5D5;
                border-radius: 30px;
                margin-right: 30px;
                margin-bottom: 20px;
                &.active{
                  background-color: #FCD316;
                  color: #333333;
                }
              }
            }
          }
          .m-sku-num{
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .m-icon-add{
              display: inline-block;
              width: 42px;
              height: 42px;
              background: url("/static/images/icon-add.png") no-repeat;
              background-size: 100% 100%;
              vertical-align: middle;
            }
            .m-icon-cut{
              display: inline-block;
              width: 42px;
              height: 42px;
              background: url("/static/images/icon-cut.png") no-repeat;
              background-size: 100% 100%;
              vertical-align: middle;
            }
            .m-num-input{
              display: inline-block;
              width: 87px;
              padding: 5px  0;
              border: none;
              text-align: center;
            }
          }
        }
        .m-sku-btn{
          margin-top: 53px;
          span{
            display: inline-block;
            width: 680px;
            background-color: #fcd316;
            height: 62px;
            line-height: 62px;
            font-size: 30px;
            border-radius: 10px;
          }
        }
      }
    }

  }
}

</style>
