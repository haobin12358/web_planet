<template>
  <div class="m-sku" >
    <div class="m-sku-state">
      <span class="m-icon-close" @click="changeModal('show_sku',false)"></span>
      <div class="m-sku-content">
        <div class="m-sku-img-box m-center">
          <img :src="product.prmainpic"  alt="">
        </div>
        <div  class="m-center">
          <span class="m-red">￥193.0</span>
        </div>
        <div class="m-scroll">
          <ul class="m-sku-box">
            <li v-for="(items,index) in product.skuvalue">
              <p>{{items.name}}</p>
              <ul class="m-sku-ul">
                <li v-for="item in items.value">{{item}}</li>
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
</template>

<script>
    export default {
        data(){
          return{

          }
        },
      props:{
          product:{
            type:Object,
            default:null
          }
      },
      methods:{
        changeModal(v,bool){
          this.$emit('changeModal',v,bool)
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
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
</style>
