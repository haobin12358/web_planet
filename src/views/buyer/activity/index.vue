<template>
  <div class="m-activity">
    <div class="m-activity-top-bg"></div>

    <div class="m-activity-box animated bounceInUp">
      <div class="m-activity-item" v-for="item in activityList" @click="changeRoute(item.url)">
        <img class="m-activity-img" src="http://www.cssqt.com.cdn.suixin8.com/uploads/520_4961/201811/db05483b3a09487dea5a44f380194cad.jpg" alt="">
        <div class="m-activity-user-demo" v-if="item.record">{{item.record}}</div>
        <div class="m-activity-btn" :class="item.btn.length > 6 ? 'active' : ''">{{item.btn}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';

  export default {
    data() {
      return {
        name: '',
        activityList: [
          { record: "", btn: "首单可免", url: "/activityProduct" },
          { record: "用户XX刚刚猜对啦猜对啦猜对啦", btn: "参与竞猜", url: "/dailyGuess" },
          { record: "", btn: "邀请好友帮拆魔盒", url: "" },
          { record: "", btn: "我要试用", url: "" }
        ]
      }
    },
    components: {},
    methods: {
      // 跳转页面
      changeRoute(v){
        this.$router.push(v)
      }
    },
    mounted() {
      common.changeTitle('活动');
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-activity {
    min-height: 100%;
    background-color: #ffffff;
    margin-bottom: -100px;
    .m-activity-top-bg {
      width: 750px;
      height: 350px;
      background: linear-gradient(180deg,rgba(252,211,22,1) 0%,rgba(239,232,197,1) 100%);
    }
    .m-activity-box {
      position: absolute;
      top: 100px;
      margin-bottom: 100px;
      .m-activity-item {
        width: 700px;
        height: 500px;
        margin: 0 0 20px 25px;
        box-shadow: 0 5px 6px rgba(0,0,0,0.16);
        border-radius: 20px;
        position: relative;
        .m-activity-img {
          width: 700px;
          height: 500px;
          background: #ffffff;
          border-radius: 20px;
        }
        .m-activity-user-demo {
          width: 490px;
          padding: 10px 25px;
          opacity: 0.5;
          border-radius: 50px;
          background-color: #EEEEEE;
          position: absolute;
          bottom: 180px;
          left: 80px;
        }
        .m-activity-btn {
          width: 300px;
          color: #AF3300;
          font-size: 38px;
          font-weight: bold;
          padding: 20px 25px;
          background: linear-gradient(180deg,rgba(255,235,148,1) 0%,rgba(252,211,22,1) 100%);
          box-shadow: 0 5px 10px rgba(0,0,0,0.16);
          border-radius: 50px;
          position: absolute;
          bottom: 50px;
          left: 175px;
          &.active {
            font-size: 28px;
          }
        }
      }
    }
  }
</style>
