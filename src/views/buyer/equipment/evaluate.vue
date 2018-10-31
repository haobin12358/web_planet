<template>
    <div class="m-evaluate">
      <div class="m-product-title">
        <span class="m-icon-back" @click="changeRoute"></span>
        <h3>商品列表</h3>
      </div>
      <div class="m-evaluate-content">
        <div class="m-evaluate-one">
          <img src="" class="m-evaluate-portrait" alt="">
          <div class="m-evaluate-one-content">
            <h3>居居女孩</h3>
            <div class="m-evaluate-start">
              <div>
                <span class="m-label">评价</span>
                <span class="m-icon-start active"></span>
                <span class="m-icon-start active"></span>
                <span class="m-icon-start active"></span>
                <span class="m-icon-start active"></span>
                <span class="m-icon-start "></span>
              </div>
              <span>好</span>
            </div>
            <p class="m-evaluate-text">
              <span class="m-label">评价详情</span>
              <span>
               非常好用！非常好用！非常好用！非常好用！非常好用！非常好用！
             </span>
            </p>
            <ul class="m-evaluate-img-ul">
              <li>
                <img src="" alt="">
              </li>
              <li>
                <img src="" alt="">
              </li>
              <li>
                <img src="" alt="">
              </li>
            </ul>
            <p class="m-product-label">黑色 15kg</p>
          </div>
        </div>
        <div class="m-evaluate-one">
          <img src="" class="m-evaluate-portrait" alt="">
          <div class="m-evaluate-one-content">
            <h3>居居女孩</h3>
            <div class="m-evaluate-start">
              <div>
                <span class="m-label">评价</span>
                <span class="m-icon-start active"></span>
                <span class="m-icon-start active"></span>
                <span class="m-icon-start active"></span>
                <span class="m-icon-start active"></span>
                <span class="m-icon-start "></span>
              </div>
              <span>好</span>
            </div>
            <p class="m-evaluate-text">
              <span class="m-label">评价详情</span>
              <span>
               非常好用！非常好用！非常好用！非常好用！非常好用！非常好用！
             </span>
            </p>
            <ul class="m-evaluate-img-ul">
              <li>
                <img src="" alt="">
              </li>
              <li>
                <img src="" alt="">
              </li>
              <li>
                <img src="" alt="">
              </li>
            </ul>
            <p class="m-product-label">黑色 15kg</p>
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
      methods:{
        changeRoute(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-evaluate{
  .m-product-title{
    position: relative;
    font-size: 32px;
    font-weight: bold;
    background-color: #fff;
    .m-icon-back{
      position: absolute;
      top: 0;
      left: 68px;
      width: 24px;
      height: 41px;
      background: url("/static/images/icon-back.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .m-evaluate-content{
    background-color: #EEEEEE;
    padding-bottom: 20px;
  }
  .m-evaluate-one{
    background-color: #fff;
    box-shadow:0 5px 6px rgba(0,0,0,0.16);
    padding: 16px 20px 30px 30px;
    text-align: left;
    margin-bottom: 20px;
    .m-evaluate-portrait{
      display: inline-block;
      width: 90px;
      height: 90px;
      background-color: #9fd0bf;
      margin-right: 30px;
      vertical-align: top;
    }
    .m-evaluate-one-content{
      display: inline-block;
      color: #8A8A8A;
      width: 570px;
      h3{
        font-size: 24px;
        font-weight: normal;
        margin: 0;
      }
      .m-evaluate-start{
        padding: 10px 0;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #C7C7C7;
        .m-label{
          display: inline-block;
          margin-right: 24px;
        }
        .m-icon-start{
          display: inline-block;
          width: 40px;
          height: 40px;
          background: url("/static/images/icon-evaluate-start.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: text-bottom;
          &.active{
            background: url("/static/images/icon-evaluate-start-active.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .m-evaluate-text{
        font-weight: 300;
        line-height: 32px;
        .m-label{
          font-weight: 400;
          display: inline-block;
          margin-right: 39px;
        }
      }
      .m-evaluate-img-ul{
        text-align: left;
        padding: 0;
        margin: 0;
        li{
          display: inline-block;
          margin: 0 20px 20px 0;
          &:nth-child(3n){
            margin-right: 0;
          }
          img{
            display: block;
            width: 170px;
            height: 170px;
            background-color: #9fd0bf;
          }
        }
      }
      .m-product-label{
        margin: 0;
      }
    }
  }
}
</style>
