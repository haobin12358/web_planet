<template>
  <div class="m-my-code">
    <div class="m-cell-box">
      <!--<mt-cell-swipe v-for="item in codeList" :key="item.uacid"
                     :right="rightButtons" :title="item.uaccode">
      </mt-cell-swipe>-->
      <div class="m-code-item" v-for="(item, index) in codeList">
        <div class="m-code-text">激活码：{{item.uaccode}}</div>
        <div class="m-code-status">{{item.uacstatus_zh}}</div>
        <div class="m-code-copy-btn" :class="item.uacstatus == 10 ? 'un-active' : ''" @click="copyText(index)">复制</div>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        codeList: []
      }
    },
    methods: {
      // 获取个人激活码列表
      getMyCode() {
        axios.get(api.list_act_code + '?token=' + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            // console.log(res.data.data);
            this.codeList = res.data.data;
          }
        });
      },
      // 复制文本
      copyText(index) {
        let text = this.codeList[index].uaccode;
        this.$copyText(text).then(function (e) {
          Toast("已复制到剪切板");
        }, function (e) {
          console.log(e);
        })
      }
    },
    mounted() {
      common.changeTitle('我的激活码');
      this.getMyCode();            // 获取个人激活码列表

      this.rightButtons = [
        {
          content: 'Mark as Unread',
          style: { background: 'lightgray', color: '#fff' }
        },
        {
          content: 'Delete',
          style: { background: 'red', color: '#fff' },
          handler: () => this.$messagebox('delete')
        }
      ];
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-my-code {
    min-height: 100%;
    background-color: #ffffff;
    .m-cell-box {
      .m-code-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 60px;
        padding: 20px 0;
        border-bottom: 1px #CCCCCC solid;
        font-size: 24px;
        .m-code-text {

        }
        .m-code-status {

        }
        .m-code-copy-btn {
          padding: 4px 30px;
          border-radius: 10px;
          background-color: @mainColor;
          color: #fff;
          box-shadow:0 3px 6px rgba(0,0,0,0.16);
          line-height: 40px;
          &.un-active {
            background-color: #CCCCCC;
          }
        }
      }
    }
  }
</style>
