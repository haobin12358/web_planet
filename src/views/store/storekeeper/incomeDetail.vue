<template>
  <div class="m-income-detail">
    <div class="m-detail-top">
      <!--年月选择器-->
      <div class="m-time-box" @click="openPicker">
        <div class="m-time-text">{{now}}</div>
        <img class="m-time-img" v-if="!pickerOpen" src="/static/images/icon-down-close.png" alt="">
        <img class="m-time-img" v-if="pickerOpen" src="/static/images/icon-down-open.png" alt="">
      </div>
      <div class="m-date-picker">
        <mt-datetime-picker v-model="month" ref="picker" type="date" @confirm="monthDone"
                            year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
        </mt-datetime-picker>
      </div>
      <!--本月总计-->
      <div class="m-total-text-box">
        <div class="m-total-text">本月总计</div>
        <div class="m-total-num">￥6666.66</div>
      </div>
      <!--nav滑动选项-->
      <div class="m-nav">
        <navList :navlist="navList" :isScroll="false" @navClick="navClick"></navList>
      </div>
    </div>
    <!--收益详情-->
    <div class="m-income-detail-box">
      <div class="m-detail-item" v-for="item in detailList">
        <div class="m-detail-item-left">
          <div class="m-product-name">{{item.name}}</div>
          <div class="m-product-time">{{item.time}}</div>
        </div>
        <div class="m-detail-item-right">+{{item.num}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { DatetimePicker } from 'mint-ui';
  import common from '../../../common/js/common';
  import navList from '../../../components/common/navlist';

  export default {
    name: "incomeDetail",
    data() {
      return {
        now: "",                  // 当前时间 - 年月
        pickerOpen: false,        // 是否正在打开时间picker
        month: null,              // 选择的时间
        navList: [
          { name: "普 通", active: true }, { name: "爆 款", active: false }
        ],
        detailList: [
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
          { name: "健身套装2", time: "2018.07.30 19:27:15", num: "120.00" },
        ]
      }
    },
    components: { navList },
    methods: {
      // 打开时间选择器
      openPicker() {
        this.$refs.picker.open();
        if(this.pickerOpen) {
          this.pickerOpen = false;
        }else {
          this.pickerOpen = true;
        }
      },
      // 选择时间后确认
      monthDone (d) {

        let date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        console.log(date);
      },
      // navList的点击事件
      navClick(index){
        let arr = [].concat(this.navList);
        for(let i = 0; i < arr.length; i ++){
          arr[i].active = false;
        }
        arr[index].active = true;
        this.navList = [].concat(arr);
      }
    },
    mounted() {
      common.changeTitle('收益详情');

      // 设置当前时间 - 年月
      let now = new Date();
      this.now = now.getFullYear() + "年" + (now.getMonth() + 1) + "月";
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-income-detail {
    min-height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    color: #666666;
    font-size: 24px;
    .m-detail-top {
      width: 100%;
      position: fixed;
      top: 0;
      background-color: #ffffff;
      .m-time-box {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 50px 0 70px 0;
        .m-time-text {
          font-size: 28px;
          margin-right: 15px;
        }
        .m-time-img {
          width: 30px;
          height: 15px;
        }
      }
      .m-date-picker {

      }
      .m-total-text-box {
        display: flex;
        justify-content: space-between;
        padding: 0 160px;
        .m-total-text {

        }
        .m-total-num {
          color: #C70000;
          font-weight: bold;
        }
      }
      .m-nav{
        width: 450px;
        margin: 0 0 40px 150px;
      }
    }
    .m-income-detail-box {
      margin: 310px 70px 0 90px;
      .m-detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .m-detail-item-left {
          display: flex;
          flex-direction: column;
          .m-product-name {

          }
          .m-product-time {
            color: #999999;
            font-size: 21px;
            line-height: 35px;
          }
        }
        .m-detail-item-right {
          color: #C70000;
        }
      }
    }
  }
</style>
