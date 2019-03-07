<template>
  <div class="m-code">
    <!--<div class="m-day-box">-->
      <!--<h3>-->
        <!--<span class="m-day">{{dayNum}}</span>-->
        <!--<span>{{monthNum}}</span>-->
      <!--</h3>-->
      <!--<h3>{{month}} / {{day}}</h3>-->
    <!--</div>-->
    <!--<img :src="user.usqrcode" class="m-code-img" alt="">-->
    <!--<p class="m-right-info">用户二维码</p>-->
    <!--<ul class="m-code-ul">-->
      <!--<li>-->
        <!--1.该二维码是您的专属推广二维码，可直接右上角分享到朋友圈邀请好友成为商城会员。</li>-->
        <!--<li>2.使用微信扫一扫功能直接邀请您的好友成为商城会员。</li>-->
        <!--<li>3.长按图片保存后分享到朋友圈。</li>-->
    <!--</ul>-->
    <img v-lazy="back_img" class="m-code-back" alt="">
    <img :src="user.usqrcode" class="m-code-img" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        back_img:'/static/images/icon-code-back.png',
        name: '',
        user: {},
        day: "",
        month: "",
        dayNum: "",
        monthNum: "",
      }
    },
    components: {},
    methods: {
      // 获取个人信息
      getUser() {
        axios.get(api.get_home + "?token=" + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            this.user = res.data.data;
          }
        });
      },// 获取时间
      getDate() {
        this.dayNum = new Date().getDate();
        this.monthNum = new Date().toString().substr(4, 4);

        // 判断星期几
        switch(new Date().getDay()) {
          case 1:
            this.day = "星期一";
            break;
          case 2:
            this.day = "星期二";
            break;
          case 3:
            this.day = "星期三";
            break;
          case 4:
            this.day = "星期四";
            break;
          case 5:
            this.day = "星期五";
            break;
          case 6:
            this.day = "星期六";
            break;
          case 7:
            this.day = "星期日";
            break;
        }

        // 判断月份
        switch(new Date().getMonth() + 1) {
          case 1:
            this.month = "一月";
            break;
          case 2:
            this.month = "二月";
            break;
          case 3:
            this.month = "三月";
            break;
          case 4:
            this.month = "四月";
            break;
          case 5:
            this.month = "五月";
            break;
          case 6:
            this.month = "六月";
            break;
          case 7:
            this.month = "七月";
            break;
          case 8:
            this.month = "八月";
            break;
          case 9:
            this.month = "九月";
            break;
            break;
          case 10:
            this.month = "十月";
            break;
            break;
          case 11:
            this.month = "十一月";
            break;
            break;
          case 12:
            this.month = "十二月";
            break;
        }
      }
    },
    mounted() {
      common.changeTitle('用户二维码');
      this.getUser();       // 获取个人信息
      // this.getDate();       // 获取时间
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
.m-code{
  width: 100%;
  height: 6900px;
  position: relative;
  /*height: 1334px;*/
  /*background: url("/static/images/icon-code-back.png") no-repeat;*/
  background-size: 100% 100%;
  .m-code-back{
    width: 750px;
    height: 6900px;
  }
  .m-code-img{
    position: absolute;
    bottom: 240px;
    right: 50px;
    width: 150px;
    height: 150px;
  }
  /*.m-day-box{*/
    /*padding: 130px 67px 56px;*/
    /*h3{*/
      /*text-align: left;*/
      /*font-size: 40px;*/
      /*color: #fff;*/
      /*margin: 0;*/
      /*font-weight: 400;*/
      /*.m-day{*/
        /*font-size: 60px;*/
        /*font-weight: bold;*/
      /*}*/
    /*}*/
  /*}*/
  /*.m-code-img{*/
    /*display: block;*/
    /*width: 621px;*/
    /*height: 621px;*/
    /*background: #edb3b1;*/
    /*margin-left: 67px;*/
    /*margin-bottom: 20px;*/
  /*}*/
  /*.m-right-info{*/
    /*text-align: right;*/
    /*padding-right: 67px;*/
    /*color: #fff;*/
    /*font-size: 28px;*/
  /*}*/
  /*.m-code-ul{*/
    /*padding: 0 67px;*/
    /*margin-top: 60px;*/
    /*li{*/
      /*list-style: none;*/
      /*text-align: left;*/
      /*color: #fff;*/
      /*width: 603px;*/
      /*line-height: 36px;*/
    /*}*/
  /*}*/
}
</style>
