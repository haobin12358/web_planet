<template>
    <div class="m-integral">
      <div class="m-integral-top">
        <p class="m-integral-top-p">可用积分</p>
        <div class="m-integral-code">
          <span class="m-integral-top-img"></span>
          <span >520</span>
        </div>
      </div>
      <div class="m-integral-content">
        <ul class="m-nav-list">
          <li class="active">
            <span>全部</span>
          </li>
          <li>
            <span>收入</span>
          </li>
          <li>
            <span>支出</span>
          </li>
        </ul>


      </div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                name: ''
            }
        },
        components: {},
        methods: {},
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
.m-integral{
  .m-integral-top{
    width: 100%;
    height: 300px;
    background: url("/static/images/icon-integral-bg.png");
    background-size: 100% 100%;
    text-align: left;
    .m-integral-top-p{
      padding: 80px 0 24px 63px;
    }
    .m-integral-top-img{
      display: inline-block;
      width: 91px;
      height: 91px;
      background: url("/static/images/icon-integral-mark.png");
      background-size: 100% 100%;
      margin: 0 40px 0 63px;
      vertical-align: middle;
      color: #333;
    }
    .m-integral-code{
      height: 91px;
      line-height: 91px;
      font-size: 46px;
      font-weight: bold;
    }
  }
  .m-integral-content{
    padding: 30px 80px 0;
  }
}

</style>
