<template>
    <div class="m-addComment">
      <div>
        <div class="m-addComment-top">
          <div>
            <img src="" class="m-product-img" alt="">
            <span class="m-label">描述相符</span>
            <span class="m-start active"></span>
            <span class="m-start active"></span>
            <span class="m-start active"></span>
            <span class="m-start active"></span>
            <span class="m-start "></span>
          </div>
          <span>比较好</span>
        </div>
        <div class="m-addComment-content">
          <div class="m-addComment-content-edit">
            <!--<p>填写商品评价</p>-->
            <textarea name=""  placeholder="填写商品评价"></textarea>
            <div class="m-addComment-img-box">
              <span class="m-addComment-upload"></span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="m-addComment-top">
          <div>
            <img src="" class="m-product-img" alt="">
            <span class="m-label">描述相符</span>
            <span class="m-start active"></span>
            <span class="m-start active"></span>
            <span class="m-start active"></span>
            <span class="m-start active"></span>
            <span class="m-start "></span>
          </div>
          <span>比较好</span>
        </div>
        <div class="m-addComment-content">
          <div class="m-addComment-content-edit">
            <!--<p>填写商品评价</p>-->
            <textarea name=""  placeholder="填写商品评价"></textarea>
            <div class="m-addComment-img-box">
              <span class="m-addComment-upload"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="m-foot-btn">
        <span>发 布</span>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common'
    export default {
        data() {
            return {
                name: ''
            }
        },
      mounted(){
        common.changeTitle('发表评价');
      },
        components: {},
        methods: {},
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../../common/css/index";
  .m-addComment{
    width: 100%;
    overflow-x: hidden;
    min-height: 1334px;
    background-color: #eee;
    .m-addComment-top{
     .flex-row(space-between);
      padding: 15px 36px;
      background-color: #fff;
      .m-product-img{
        display: inline-block;
        width: 84px;
        height: 84px;
        background-color: #9fd0bf;
        vertical-align: middle;
      }
      .m-label{
        display: inline-block;
        padding: 0 53px 0 36px;
        vertical-align: middle;
      }
      .m-start{
        width: 26px;
        height: 26px;
        vertical-align: middle;
      }
    }
    .m-addComment-content{
      padding: 25px 0;
      .m-addComment-content-edit{
        padding: 20px 41px;
        background-color: #fff;
        box-shadow:0 5px 6px rgba(0,0,0,0.16);
        text-align: left;
        color: #999;
        textarea{
          display: block;
          width: 100%;
          min-height: 100px;
          padding: 20px;
          font-size: 24px;
        }
        .m-addComment-img-box{
          .flex-row(flex-start);
          flex-wrap: wrap;
          .m-addComment-upload{
            display: inline-block;
            width:220px;
            height:220px;
            text-align: center;
            color: #ccc;
            margin-right: 20px;
            margin-bottom: 20px;
            background: url("/static/images/icon-upload-img.png") no-repeat;
            background-size: 100% 100%;
          }
          img{
            display: block;
            width: 220px;
            height: 220px;
            margin-right: 20px;
            margin-bottom: 20px;
          }
        }
      }
    }
    .m-foot-btn{
      span{
        display: inline-block;
        width: 700px;
        height: 106px;
        line-height: 106px;
        background-color: @mainColor;
        border-radius: 10px;
        font-weight: bold;
        font-size: 38px;
        box-shadow:0px 5px 6px rgba(0,0,0,0.16);
        margin: 93px 0 140px;
      }
    }
  }
</style>
