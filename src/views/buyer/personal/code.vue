<template>
  <div class="m-code">
    <div class="m-day-box">
      <h3>
        <span class="m-day">25</span>
        <span>Spt</span>
      </h3>
      <h3>九月 / 星期二</h3>
    </div>
    <img :src="user.usqrcode" class="m-code-img" alt="">
    <p class="m-right-info">用户二维码</p>
    <ul class="m-code-ul">
      <li>
        1.该二维码是您的专属推广二维码，可直接右上角分享到朋友圈邀请好友成为商城会员。</li>
        <li>2.使用微信扫一扫功能直接邀请您的好友成为商城会员。</li>
        <li>3.长按图片保存后分享到朋友圈。</li>
    </ul>
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
        name: '',
        user: {}
      }
    },
    components: {},
    methods: {
      // 获取个人信息
      getUser() {
        axios.get(api.get_home + "?token=" + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            this.user = res.data.data;
            console.log(this.user);
          }else{
            Toast(res.data.message);
          }
        })
      },
    },
    mounted() {
      common.changeTitle('');
      this.getUser();       // 获取个人信息
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
.m-code{
  width: 100%;
  height: 1334px;
  background: url("/static/images/icon-code-bg.png") no-repeat;
  background-size: 100% 100%;
  .m-day-box{
    padding: 130px 67px 56px;
    h3{
      text-align: left;
      font-size: 40px;
      color: #fff;
      margin: 0;
      font-weight: 400;
      .m-day{
        font-size: 60px;
        font-weight: bold;
      }
    }
  }
  .m-code-img{
    display: block;
    width: 621px;
    height: 621px;
    background: #edb3b1;
    margin-left: 67px;
    margin-bottom: 20px;
  }
  .m-right-info{
    text-align: right;
    padding-right: 67px;
    color: #fff;
    font-size: 28px;
  }
  .m-code-ul{
    padding: 0 67px;
    margin-top: 60px;
    li{
      list-style: none;
      text-align: left;
      color: #fff;
      width: 603px;
      line-height: 36px;
    }
  }
}
</style>
