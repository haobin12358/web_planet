<template>
    <div class="m-login">
      <!--<p>登录</p>-->
      <img src="" class="m-login-logo" alt="">
      <div type="text" class="m-login-input m-login-bottom" >
        <input type="text" placeholder="请输入手机号码">
        <span class="m-code">发送验证码</span>
      </div>
      <div type="text" class="m-login-input" >
        <input type="text" placeholder="请输入验证码">
      </div>
      <!--<p class="m-login-forget" @click="forgetClick">忘记密码？</p>-->
      <div class="m-login-btn">登  录</div>

      <div class="m-wei-box">
        <p>
          <span class="m-icon-wei"></span>
        </p>
        <p>微信快速登录</p>
      </div>
    </div>


</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import api from '../../api/api';
  import common from '../../common/js/common';
  import {Toast} from 'mint-ui';
    export default {
        data() {
            return {
                name: '',
              check:true
            }
        },
        components: {},
        methods: {
          isWeiXin() {
            let ua = window.navigator.userAgent.toLowerCase();
            console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
              return true;
            } else {
              return false;
            }

          },
          login() {
            if(this.check){
              axios.get(api.get_config,{
                params:{
                  url: window.location.href
                }
              } ).then((res) => {
                if(res.data.status == 200){
                  const id = res.data.data.appId
                  const url = window.location.href;
                  // const  url = 'https://daaiti.cn/WeiDian/#/login';
                  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
                    +  id + '&redirect_uri='+ encodeURIComponent(url) + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
                }

              }).catch((error) => {
                console.log(error ,'1111')
              })

            }else{

            }


          },
          checkClick(){
            this.check = !this.check;
          },
          forgetClick(){
            this.$router.push('/forget');
          }
        },
      mounted(){
        common.changeTitle('登录');
        if(this.isWeiXin()){    //是来自微信内置浏览器
          // 获取微信信息，如果之前没有使用微信登陆过，将进行授权登录
          if(common.GetQueryString('code')){
            // alert(common.GetQueryString('code'))
            window.localStorage.setItem("code",common.GetQueryString('code'));
            axios.get(api.get_accesstoken,{
              params:{
                code: common.GetQueryString('code'),
                UPPerd:localStorage.getItem('UPPerd') || ''
              }
            }).then(res => {
              if(res.data.status == 200){
                window.localStorage.setItem("access_token",res.data.data.access_token);
                window.localStorage.setItem("token",res.data.data.token);
                window.localStorage.setItem("openid",res.data.data.openid);
                window.localStorage.setItem("is_first",String(res.data.data.is_first));
                window.localStorage.setItem("wximg",res.data.data.wximg);
                window.localStorage.setItem("subscribe",res.data.data.subscribe);
                window.localStorage.setItem("is_today_first",res.data.data.is_today_first);
                window.localStorage.setItem("user_level",res.data.data.user_level);
                this.$store.state.tabbar = res.data.data.icon;
                this.$store.state.tabbar_select = res.data.data.icon[0].name;
                this.$router.push('/index/index');
              }else{
                Toast({ message: res.data.message, className: 'm-toast-fail' });
              }
            });
          }
        }
      },
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
.m-login{
  background-color: #9fd0bf;
  min-height: 100%;
  text-align: center;
  color: #fff;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  font-size: 38px;
  .m-login-logo{
    display: block;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background-color: #a4a4a4;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.16);
    margin: 71px 0 127px;
  }
  .m-login-input{
    width: 600px;
    height: 100px;
    border-radius: 10px;
    box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: rgba(255,255,255,0.2);
    color: #333;
    text-align: left;
    /*&.m-login-bottom{*/
      margin-bottom: 45px;
    /*}*/
    .m-code{
      display: inline-block;
      padding: 6px 18px;
      border-radius: 10px;
      background-color: #FCD316;
      font-size: 21px;
      color: #fff;
      box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    }
    input{
      display: inline-block;
      width: 358px;
      padding-left: 52px;
      height: 100px;
      border-radius: 10px;
      border: none;
      text-align: left;
      font-size: 28px;
      background-color: transparent;
      color: #333;
    }
  }
  .m-login-forget{
    width: 600px;
    text-align: right;
    font-size: 24px;
    margin: 8px 0;
  }
  .m-login-btn{
    width: 600px;
    height: 100px;
    line-height: 100px;
    border-radius: 10px;
    box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #fcd316;
  }
  .m-wei-box{
    margin-top: 158px;
    color: #fff;
    font-size: 18px;
    .m-icon-wei{
      display: inline-block;
      width: 65px;
      height: 65px;
      background: url("/static/images/icon-wei.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
input::-webkit-input-placeholder{
  color: #333;
}
input::-moz-placeholder{  //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
  color: #333;
}
input:-ms-input-placeholder{  //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
  color: #333;
}
</style>
