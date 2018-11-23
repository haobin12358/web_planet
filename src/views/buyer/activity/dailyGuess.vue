<template>
  <div class="m-dailyGuess">
    <div class="m-guess-title">
      <img class="m-guess-img" src="/static/images/activity/main-bg.png" alt="">
      <img class="m-product-img" src="http://dummyimage.com/550x550" alt="">
      <div>
        <div class="m-input-img">
          <div class="m-guess-result m-ft-50 m-ft-b">{{num}}<span class="m-result">{{result}}</span></div>
        </div>
        <div class="m-done-img">
          <div class="m-done-btn m-ft-44 m-ft-b" :class="submit ? 'm-submit-done' : ''" @click="submitResult">确认</div>
        </div>
      </div>
    </div>
    <div class="m-guess-num-text">
      <div class="m-guess-num">
        <div class="m-line-long"></div>
        <div class="m-num-bg">
          <div class="m-num-box">
            <div class="m-num-item m-one" @click="numClick('1')"></div>
            <div class="m-num-item m-two" @click="numClick('2')"></div>
            <div class="m-num-item m-three" @click="numClick('3')"></div>
            <div class="m-num-item m-four" @click="numClick('4')"></div>
            <div class="m-num-item m-five" @click="numClick('5')"></div>
            <div class="m-num-item m-six" @click="numClick('6')"></div>
            <div class="m-num-item m-seven" @click="numClick('7')"></div>
            <div class="m-num-item m-eight" @click="numClick('8')"></div>
            <div class="m-num-item m-nine" @click="numClick('9')"></div>
            <div class="m-num-item m-point" @click="numClick('.')"></div>
            <div class="m-num-item m-zero" @click="numClick('0')"></div>
            <div class="m-num-item m-delete" @click="numClick('delete')"></div>
          </div>
        </div>
        <div class="m-line-short"></div>
      </div>
      <div class="m-guess-text">
        <div class="m-rule-icon"></div>
        <div class="m-text-bg">
          <div class="m-rule-title">活动规则</div>
          <div class="m-rule-row">
            <div class="m-rule-no">1</div>
            <div>活动玩法balabala</div>
          </div>
          <div class="m-rule-row">
            <div class="m-rule-no">2</div>
            <div>没人每日仅限一次balabala</div>
          </div>
          <div class="m-rule-row">
            <div class="m-rule-no">3</div>
            <div>猜中填写地址支付即可</div>
          </div>
          <div class="m-text m-ft-21">活动最终解释权归本公司所有</div>
        </div>
      </div>
    </div>

    <!--竞猜成功-->
    <mt-popup class="m-guess-popup" v-model="successPopup" pop-transition="popup-fade">
      <div class="m-guess-success">
        <img class="m-guess-icon" src="/static/images/activity/guess-success.png" alt="">
        <div class="m-success-text m-ft-30 m-ft-b">恭喜您竞猜正确！</div>
        <div class="m-success-text margin m-ft-24">以该价格购买此商品吧！！</div>
        <div class="m-guess-btn m-success-btn m-ft-30 m-ft-b">去购买</div>
      </div>
    </mt-popup>
    <!--竞猜失败-->
    <mt-popup class="m-guess-popup" v-model="failPopup" pop-transition="popup-fade">
      <div class="m-guess-fail">
        <img class="m-guess-icon" src="/static/images/activity/guess-fail.png" alt="">
        <div class="m-ft-30 m-ft-b">很遗憾，回答错误，请明天再来吧！</div>
        <div class="m-guess-btn m-fail-btn m-ft-30 m-ft-b">知道了</div>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';

  export default {
    data() {
      return {
        name: '',
        num: "",               // 猜测的数字 2710.51
        result: "|",           // 光标
        count: "",
        submit: false,         // 是否已提交
        successPopup: false,   // 猜对啦
        failPopup: false,      // 猜错啦
      }
    },
    components: {},
    methods: {
      // 数字面板的点击事件
      numClick(v) {
        if(!this.submit) {
          if(v == "delete") {
            this.num = this.num.substring(0, this.num.length-1);
          }else {
            if(this.num.length < 10) {
              this.num += v;
            }
          }
        }
      },
      // 提交猜测的结果
      submitResult() {
        if(!this.submit) {
          this.submit = true;
          this.result = "";
          // console.log(this.num);
          alert(this.num);
        }
      },
      // 闪动光标 - 倒计时
      timeOut() {
        let timer = null;
        let TIME_COUNT = 2000000000000;
        this.count = TIME_COUNT;
        timer = setInterval(() => {
          if(this.count > 0 && this.count <= TIME_COUNT) {
            this.count --;
            if(!this.submit) {
              if(this.result == "|") {
                this.result = "";
              }else if(this.result == "") {
                this.result = "|";
              }
            }else {
              clearInterval(timer);
              timer = null;
            }
          }else {
            clearInterval(timer);
            timer = null;
          }
        }, 700);
      }
    },
    mounted() {
      common.changeTitle('每日竞猜');
      this.timeOut();                   // 闪动光标 - 倒计时
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-dailyGuess {
    .m-guess-title {
      position: relative;
      z-index: 1;
      .m-guess-img {
        width: 750px;
        height: 861px;
        margin-bottom: -130px;
      }
      .m-product-img {
        width: 550px;
        height: 550px;
        border: 20px solid rgba(255,255,255,1);
        box-shadow: 5px 5px 20px rgba(0,0,0,0.16);
        border-radius: 30px;
        position: absolute;
        top: 219px;
        left: 92px;
      }
      .m-input-img {
        width: 704px;
        height: 155px;
        background: url("/static/images/activity/icon-input.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 711px;
        left: 25px;
        .m-guess-result {
          max-width: 480px;
          color: #ffffff;
          margin: 40px 0 0 70px;
        }
      }
      .m-done-img {
        width: 128px;
        height: 128px;
        background: url("/static/images/activity/icon-done.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 722px;
        right: 48px;
        .m-done-btn {
          color: #ffffff;
          margin-top: 26px;
        }
        .m-submit-done {
          opacity: 0.5;
        }
      }
    }
    .m-guess-num-text {
      height: 1536px;
      min-height: 100%;
      background-color: #9959EA;
      position: relative;
      .m-guess-num {
        width: 700px;
        height: 950px;
        background-color: #8031E2;
        border-radius: 20px;
        position: absolute;
        top: 92px;
        left: 25px;
        .m-line-long {
          width: 498px;
          height: 78px;
          background: url("/static/images/activity/icon-line-long.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 0;
          left: 70px;
          z-index: 1;
        }
        .m-line-short {
          width: 18px;
          height: 96px;
          background: url("/static/images/activity/icon-line-short.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 903px;
          right: 59px;
          z-index: 1;
        }
        .m-num-bg {
          width: 644px;
          height: 850px;
          background: url("/static/images/activity/icon-bg.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 57px;
          left: 28px;
          .m-num-box {
            width: 606px;
            height: 796px;
            /*border: 1px red solid;*/
            position: absolute;
            top: 27px;
            left: 25px;
            display: flex;
            flex-wrap: wrap;
            .m-num-item {
              width: 190px;
              height: 190px;
              margin: 0 12px 12px 0;
              &.m-one {
                background: url("/static/images/activity/one.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-one:active {
                background: url("/static/images/activity/one-active.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-two {
                background: url("/static/images/activity/two.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-two:active {
                background: url("/static/images/activity/two-active.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-three {
                background: url("/static/images/activity/three.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-three:active {
                background: url("/static/images/activity/three-active.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-four {
                background: url("/static/images/activity/four.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-four:active {
                background: url("/static/images/activity/four-active.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-five {
                background: url("/static/images/activity/five.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-five:active {
                background: url("/static/images/activity/five-active.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-six {
                background: url("/static/images/activity/six.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-six:active {
                background: url("/static/images/activity/six-active.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-seven {
                background: url("/static/images/activity/seven.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-seven:active {
                background: url("/static/images/activity/seven-active.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-eight {
                background: url("/static/images/activity/eight.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-eight:active {
                background: url("/static/images/activity/eight-active.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-nine {
                background: url("/static/images/activity/nine.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-nine:active {
                background: url("/static/images/activity/nine-active.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-zero {
                background: url("/static/images/activity/zero.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-zero:active {
                background: url("/static/images/activity/zero-active.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-point {
                background: url("/static/images/activity/point.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-point:active {
                background: url("/static/images/activity/point-active.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-delete {
                background: url("/static/images/activity/delete.png") no-repeat;
                background-size: 100% 100%;
              }
              &.m-delete:active {
                background: url("/static/images/activity/delete-active.png") no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
      .m-guess-text {
        width: 700px;
        height: 473px;
        background: #924AEC;
        border-radius: 20px 20px 0 0;
        position: absolute;
        top: 1062px;
        left: 25px;
        .m-rule-icon {
          width: 99px;
          height: 39px;
          background: url("/static/images/activity/icon-rule.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 11px;
          left: 59px;
          z-index: 1;
        }
        .m-text-bg {
          width: 644px;
          height: 444px;
          background: #731CE3;
          border-radius: 20px 20px 0 0;
          position: absolute;
          top: 29px;
          left: 28px;
          color: #ffffff;
          font-size: 38px;
          .m-rule-title {
            margin: 24px 0 30px 0;
          }
          .m-rule-row {
            display: flex;
            .m-rule-no {
              width: 30px;
              height: 30px;
              font-size: 30px;
              font-weight: bold;
              line-height: 35px;
              padding: 10px;
              margin: 0 30px 30px 30px;
              background-color: #FCD316;
              border-radius: 50%;
            }
          }
          .m-text {
            position: absolute;
            bottom: 12px;
            left: 188px;
          }
        }
      }
    }
    .m-guess-popup {
      width: 700px;
      height: 600px;
      margin: -300px 0 0 25px;
      border-radius: 30px;
      .m-guess-success {
        width: 700px;
        height: 600px;
        background: url("/static/images/activity/icon-success-bg.png") no-repeat;
        background-size: 100% 100%;
        .m-success-text {
          color: #FCD316;
          &.margin {
            margin-top: 46px;
          }
        }
        .m-success-btn {
          margin: 110px 0 0 225px;
        }
      }
      .m-guess-fail {
        .m-fail-btn {
          margin: 180px 0 0 225px;
        }
      }
      .m-guess-icon {
        width: 85px;
        height: 85px;
        margin: 130px 0 30px 0;
      }
      .m-guess-btn {
        width: 250px;
        height: 70px;
        line-height: 80px;
        color: #ffffff;
        background: #FCD316;
        box-shadow: 2px 8px 8px rgba(0,0,0,0.16);
        border-radius: 10px;
      }
    }
  }
</style>
