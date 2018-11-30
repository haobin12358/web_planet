<template>
  <div class="m-personal " >
    <div class="m-personal-bg">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-personal-content m-setUp">
      <div class="m-personal-info">
        <img :src="user.usheader" class="m-personal-head-portrait" alt="">
        <div class="m-personal-info-box">
          <div class="m-personal-info-text">
            <div>
              <p>{{user.usname}}</p>
              <p>
                <span class="m-personal-identity">{{user.usidname}}</span>
              </p>
            </div>
            <div @click="changeRoute('/personal/personalInfo')">
              <span>个人资料</span>
              <span class="m-icon-more"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="m-personal-body">
        <div class="m-one-part">
           <ul class="m-edit-ul">
             <li @click="changeRoute('/personal/addressManagement')">
               <div>
                 <span class="m-icon m-icon-loc"></span>
                 <span>收货地址</span>
               </div>
               <div>
                 <span></span>
                 <span class="m-icon-more"></span>
               </div>
             </li>
             <li @click="clearCache">
               <div>
                 <span class="m-icon m-icon-delete"></span>
                 <span>清楚缓存</span>
               </div>
               <div>
                 <span>{{cache}} M</span>
                 <span class="m-icon-more"></span>
               </div>
             </li>
             <li>
               <div>
                 <span class="m-icon m-icon-about"></span>
                 <span>关于大行星</span>
               </div>
               <div>
                 <span>1.0</span>
                 <span class="m-icon-more"></span>
               </div>
             </li>
           </ul>
        </div>
      </div>
    </div>
    <div class="m-foot-btn">
      <span>退出登录</span>
    </div>
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
        user: {},              // 个人信息
        cache: 1.5,
      }
    },
    components: {},
    methods: {
      // 跳转页面
      changeRoute(v){
        this.$router.push(v)
      },
      // 获取个人信息
      getUser() {
        axios.get(api.get_home + "?token=" + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            this.user = res.data.data;
          }
        })
      },
      // 清除缓存
      clearCache() {
        if(this.cache != 0) {
          Toast("清除成功");
          this.cache = 0;
        }else {
          Toast("暂无缓存，无需清理");
        }
      }
    },
    mounted() {
      common.changeTitle('账户设置');
      this.getUser();       // 获取个人信息
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/personal";
</style>
