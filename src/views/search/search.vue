<template>
    <div class="m-search">
      <div class="m-flex-between m-search-top">
        <div class="m-search-input-box">
          <input type="text" placeholder="请输入搜索内容">
          <span class="m-icon-close"></span>
        </div>
        <span @click="returnBack">取消</span>
      </div>
      <div class="m-search-content">
        <div class="m-search-one">
          <p class="m-ft-22 m-flex-between">
            <span>历史记录</span>
            <span>清除</span>
          </p>
          <ul class="m-tab-ul">
            <li>北山</li>
            <li>南山</li>
            <li>登山服</li>
            <li>登山服</li>
          </ul>
        </div>
        <div class="m-search-one">
          <p class="m-ft-22 m-flex-between">
            <span>推荐商品</span>
            <span class="m-icon-delete"></span>
          </p>
          <ul class="m-tab-ul">
            <li>北山</li>
            <li>南山</li>
            <li>登山服</li>
            <li>登山服</li>
          </ul>
        </div>
        <!--<ul class="m-search-result-ul">-->
          <!--<li>-->
            <!--<span>北山</span>-->
            <!--<span class="m-icon-go"></span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span>北山</span>-->
            <!--<span class="m-icon-go"></span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span>北山</span>-->
            <!--<span class="m-icon-go"></span>-->
          <!--</li>-->
        <!--</ul>-->
      </div>

    </div>
</template>

<script>
    export default {
        data(){
          return{

          }
        },
      methods:{
        returnBack(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/index";
.m-search{
  color: #666666;
  .m-search-top{
    border-bottom: 1px solid @borderColor;
    padding: 20px 33px;
    .m-search-input-box{
      width: 627px;
      border-radius: 30px;
      background-color: #eee;
      height: 50px;
      position: relative;
      input{
        position: absolute;
        top: 0;
        left:0;
        width: 530px;
        height: 50px;
        line-height: 50px;
        background-color: transparent;
        border: none;
        padding-left: 40px;
        font-size: 21px;
      }
      .m-icon-close{
        position: absolute;
        right: 15px;
        top:12.5px;
        width: 25px;
        height: 25px;
        background: url("/static/images/icon-search-close.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .m-search-content{
    padding: 13px 33px;
    .m-icon-delete{
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url("/static/images/icon-search-delete.png") no-repeat;
      background-size: 100% 100%;
    }
    .m-icon-history{
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url("/static/images/icon-history.png") no-repeat;
      background-size: 100% 100%;
    }
    .m-tab-ul{
      .flex-row(flex-start);
      flex-wrap: wrap;
      margin-bottom: 20px;
      li{
        padding: 5px 51px;
        background-color: #E9E9E9;
        border-radius: 30px;
        margin: 20px 30px 20px 0;
      }
    }
    .m-search-result-ul{
      li{
        .flex-row(space-between);
        padding: 10px;
        border-bottom: 1px solid @borderColor;
        .m-icon-go{
          display: block;
          width: 25px;
          height: 25px;
          background: url("/static/images/icon-go.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }

}
</style>
