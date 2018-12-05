
<template>
  <div class="m-income-detail">
    <div class="m-detail-top">
      <!--年月选择器-->
      <div class="m-time-box" @click="openPicker">
        <div class="m-time-text">{{now}}</div>
        <img class="m-time-img" v-if="!popupVisible" src="/static/images/icon-down-close.png" alt="">
        <img class="m-time-img" v-if="popupVisible" src="/static/images/icon-down-open.png" alt="">
      </div>
      <div class="m-date-popup-box">
        <mt-popup class="m-date-popup" v-model="popupVisible" position="bottom">
          <div class="m-popup-btn">
            <div @click="popupVisible = false">取消</div>
            <div @click="timeDone">确认</div>
          </div>
          <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </mt-popup>
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
      <!--<div>
        <img class="m-detail-img" src="/static/images/icon-no-income.png" alt="">
        <div class="m-detail-text">暂无收益，请加油哦~</div>
      </div>-->
    </div>
  </div>
</template>

<script>
  import common from '../../../common/js/common';
  import navList from '../../../components/common/navlist';

  export default {
    name: "incomeDetail",
    data() {
      return {
        now: "",                  // 当前时间 - 年月
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
        ],
        popupVisible: false,
        slots: [
          {
            flex: 1,
            values: ['2018', '2019', '2020'],
            className: 'slot1',
            textAlign: 'right'
          }, {
            divider: true,
            content: ' - ',
            className: 'slot2'
          }, {
            flex: 1,
            defaultIndex: 0,
            values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            className: 'slot3',
            textAlign: 'left'
          }
        ],

        // 和group类似的页面
        timeValue: []
      }
    },
    components: { navList },
    methods: {
      // 打开 - 关闭时间选择器
      openPicker() {
        if(this.popupVisible) {
          this.popupVisible = false;
        }else {
          this.popupVisible = true;
        }
      },
      // 监听时间选择器
      onValuesChange(picker, values) {
        this.timeValue = values;
      },
      // 时间选择器的确认按钮
      timeDone() {
        this.now = this.timeValue[0] + "年" + this.timeValue[1] + "月";
        console.log(this.now);
        this.popupVisible = false;
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
      console.log(this.now);
      this.slots[2].defaultIndex = now.getMonth();          // 默认当前月份
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
      .m-date-popup-box {
        .m-date-popup {
          width: 750px;
          .m-popup-btn {
            display: flex;
            justify-content: space-between;
            font-size: 28px;
            padding: 20px 40px 0 40px;
          }
        }
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
      .m-detail-img {
        width: 516px;
        height: 516px;
      }
      .m-detail-text {
        color: #333333;
        font-size: 28px;
        font-weight: bold;
      }
    }
  }
</style>
