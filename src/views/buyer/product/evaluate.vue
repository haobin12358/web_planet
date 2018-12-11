<template>
    <div class="m-evaluate">
      <!--<div class="m-product-title">-->
        <!--<span class="m-icon-back" @click="changeRoute"></span>-->
        <!--<h3>商品列表</h3>-->
      <!--</div>-->
      <div class="m-evaluate-content">
        <template v-for="(item,index) in evaluate_list">
          <div class="m-evaluate-one">
            <img :src="item.user.usheader" class="m-evaluate-portrait" alt="">
            <div class="m-evaluate-one-content">
              <h3>{{item.user.usname}}</h3>
              <div class="m-evaluate-start">
                <div>
                  <span class="m-label">评价</span>
                  <span class="m-icon-start" v-for="(a, b) in star" :class="b < item.oescore ? 'active' : ''"></span>
                </div>
                <span>{{item.zh_oescore}}</span>
              </div>
              <p class="m-evaluate-text">
                <span class="m-label">评价详情</span>
                <span>
               {{item.oetext}}
             </span>
              </p>
              <ul class="m-evaluate-img-ul">
                <li v-for="(k,j) in item.image">
                  <img :src="k.oeimg" alt="">
                </li>
                <!--<li v-for="(k,j) in item.video">-->
                  <!--<div class="m-video-box">-->
                    <!--<video :src="k.oevideo" ></video>-->
                  <!--</div>-->
                <!--</li>-->
              </ul>
              <p class="m-product-label">
                <span v-for="(key,i) in item.skuattritedetail">{{key}}  </span>
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import api from '../../../api/api';
  import {Toast} from 'mint-ui'
    export default {
        data(){
          return{
            page_info:{
              page_num:1,
              page_size:10
            },
            isScroll:true,
            total_count:0,
            bottom_show:false,
            evaluate_list:null,
            star:['','','','','']
          }
        },
      mounted(){
          this.getEvaluation();
      },
      methods:{
        changeRoute(){
          this.$router.go(-1);
        },
        //获取评价
        getEvaluation(){
          axios.get(api.get_evaluation,{
            params:{
              prid:this.$route.query.prid,
              page_num:this.page_info.page_num,
              page_size:this.page_info.page_size
            }
          }).then(res => {
            if(res.data.status == 200){
              this.evaluate_list = res.data.data;
            }
          })
        },
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
          width: 35px;
          height: 35px;
          background: url("/static/images/icon-evaluate-star.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: text-bottom;
          &.active{
            background: url("/static/images/icon-evaluate-star-active.png") no-repeat;
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
          .m-video-box{
            display: block;
            width: 170px;
            height: 170px;
            background-color: #9fd0bf;
            video{
              display: block;
              width: 170px;
              height: 170px;
              background-color: #9fd0bf;
            }
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
