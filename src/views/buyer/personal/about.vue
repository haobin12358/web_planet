<template>
  <div class="m-personal">
    <div class="m-personal-bg">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-copy-right">
      <p class="m-copy-right-text-one">
        <span>Copyright</span>
        <span class="m-icon-copy-right"></span>
        <span>2018-2032</span>
      </p>
      <p class="m-copy-right-text-two">
        杭州跨狐信息技术有限公司 版权所有
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';

  export default {
    data() {
      return {

      }
    },
    components: {},
    methods: {

    },
    mounted() {
      common.changeTitle('关于');
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/personal";

  .m-personal {
    min-height: 100%;
    background-color: #EEEEEE;
  }
  .m-copy-right {
    /*color: #666666;*/
    position: absolute;
    top: 1100px;
    bottom: 400px;
    text-align: center;
    width: 750px;
    opacity: 0.6;
    .m-copy-right-text-one {
      font-size: 20px;
      line-height: 30px;
      .m-icon-copy-right {
        display: inline-block;
        margin-top: -5px;
        width: 25px;
        height: 25px;
        background: url("/static/images/icon-copyright.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
      }
    }
    .m-copy-right-text-two {
      font-size: 22px;
    }
  }
</style>
