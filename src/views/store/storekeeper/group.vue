<template>
  <div class="m-group">
    <!--顶部图片-->
    <img class="m-storekeeper-bg" src="/static/images/icon-integral-bg.png" alt="">
    <!--顶部文字-->
    <div class="m-date-box" @click="datePopup = !datePopup">
      <div class="m-date-text m-ft-32 m-ft-b">{{date}}</div>
      <img class="m-date-img" src="/static/images/icon-down-open.png" v-if="datePopup">
      <img class="m-date-img" src="/static/images/icon-down-close.png" v-if="!datePopup">
    </div>
    <!--时间选择popup-->
    <mt-popup class="m-date-popup" v-model="datePopup" position="bottom">
      <p class="m-picker-text">
        <span class="cancel" @click="datePopup = false">取消</span>
        <span class="m-picker-btn" @click="dateDone">确定</span>
      </p>
      <mt-picker :slots="slots"  @change="onValuesChange" :visibleItemCount="7"></mt-picker>
    </mt-popup>
    <div class="m-total-text">
      {{total_text}}<span class="m-ft-90"> {{total_money | money}} </span>元
    </div>
    <!--搜索-->
    <div class="m-selected-search">
      <div class="m-search-input-box" @click="changeRoute('/search')">
        <span class="m-icon-search"></span>
        <span>搜索粉丝/下级店主</span>
      </div>
    </div>
    <div class="m-nav">
      <nav-list :navlist="nav_list" @navClick="navClick"></nav-list>
    </div>
    <!--人员信息-->
    <div class="m-person">
      <ul>
        <li class="m-person-info" v-for="item in person">
          <div class="m-img-name-time">
            <div>
              <img class="m-img" :src="item.img" alt="">
            </div>
            <div class="m-name-time">
              <div class="m-name m-ft-28 m-ft-b">{{item.name}}</div>
              <div class="m-time m-ft-24">{{item.time}}</div>
            </div>
          </div>
          <div class="m-money m-ft-24">￥{{item.money | money}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import navList from '../../../components/common/navlist';

  export default {
    data() {
      return {
        date: "",                       // 本月
        datePopup: false,               // 时间选择popup
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'right'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            className: 'slot3',
            textAlign: 'left'
          }
        ],
        dateValue: [],                  // 暂存日期
        total_text: "团队粉丝销售额",
        total_money: "333.00",
        nav_list: [
          { active: true, name: '粉丝', count: '123' }, { active: false, name: '下级店主', count: '156' }
        ],
        person: [
          { img: '', name: '咕咕', time: '2018-09-12 23:51:23', money: '1542' },
          { img: '', name: '咕咕', time: '2018-09-12 23:51:23', money: '1542' },
          { img: '', name: '咕咕', time: '2018-09-12 23:51:23', money: '1542' },
          { img: '', name: '咕咕', time: '2018-09-12 23:51:23', money: '1542' },
          { img: '', name: '咕咕', time: '2018-09-12 23:51:23', money: '1542' },
          { img: '', name: '咕咕', time: '2018-09-12 23:51:23', money: '1542' },
          { img: '', name: '咕咕', time: '2018-09-12 23:51:23', money: '1542' },
          { img: '', name: '咕咕', time: '2018-09-12 23:51:23', money: '1542' },
          { img: '', name: '咕咕', time: '2018-09-12 23:51:23', money: '1542' },
          // 记得分页
        ]
      }
    },
    components: { navList },
    methods: {
      // 跳转其他页面的方法
      changeRoute(v) {
        this.$router.push(v)
      },
      // 导航点击
      navClick(index) {
        let arr = [].concat(this.nav_list);
        if(arr[index].active) {
          return false;
        }
        for(let i = 0; i < arr.length; i ++) {
          arr[i].active = false;
        }
        arr[index].active = true;
        this.nav_list = [].concat(arr);
        this.getInfo();               // 获取人员信息
      },
      // 时间popup确认按钮
      dateDone() {
        this.datePopup = false;
        this.date = this.dateValue[0] + "-" + this.dateValue[1];
        this.getInfo();               // 获取人员信息
      },
      onValuesChange(picker, values) {
        if(values[0]) {
          this.dateValue = values;
        }
      },
      // 获取人员信息
      getInfo() {
        /*let params = {
          token: localStorage.getItem('token'),
          year : this.dateValue[0],
          month : this.dateValue[1]
        };
        axios.get(api.history_join, { params: params }).then(res => {
          if(res.data.status == 200) {
            this.number = res.data.correct_count;
            this.recordList = res.data.data;
            // 商品名称显示优化
            for(let i = 0; i < this.recordList.length; i ++) {
              this.recordList[i].product.prtitle = this.recordList[i].product.prtitle.substring(0, 12) + "..";
            }
          }
        });*/
      },
      // 设置可选择的年份
      setYear() {
        let now = new Date();
        let year = Number(now.toString().substring(11, 15)) + 1;
        for(let i = 2018; i < year; i ++) {
          this.slots[0].values.push(i);
        }
        this.date = now.toString().substring(11, 15) + "-" + this.slots[2].values[now.getMonth()];
        this.dateValue = [now.toString().substring(11, 15), this.slots[2].values[now.getMonth()]];
      }
    },
    mounted() {
      common.changeTitle('我的团队');
      this.setYear();                  // 设置可选择的年份
      this.getInfo();                  // 获取人员信息
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-group {
    min-height: 100%;
    position: relative;
    .m-storekeeper-bg {
      width: 750px;
      height: 400px;
    }
    .m-date-box {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 100px;
      left: 320px;
      .m-date-text {

      }
      .m-date-img {
        width: 24px;
        height: 12px;
        margin-left: 10px;
      }
    }
    .m-date-popup {
      .m-picker-text{
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
        font-size: 30px;
        padding: 10px 20px;
        span.cancel{
          color: #a4a4a4;
        }
      }
    }
    .m-total-text {
      font-size: 21px;
      position: absolute;
      top: 210px;
      left: 90px;
    }
    .m-search-input-box {
      width: 680px;
    }
    .m-nav {
      width: 500px;
      margin: -10px 125px 50px 125px;
    }
    .m-person {
      .m-person-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px 50px 40px;
        .m-img-name-time {
          display: flex;

          .m-img {
            width: 97px;
            height: 97px;
            margin-right: 30px;
            background-color: #EEEEEE;
          }
          .m-name-time {
            text-align: left;
            display: flex;
            flex-flow: column;
            justify-content: space-between;
            .m-name {

            }
            .m-time {

            }
          }
        }
        .m-money {

        }
      }
    }
  }
</style>
