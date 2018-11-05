<template>
    <div class="m-addComment">
      <div class="m-addComment-top">
        <div>
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
          <p>填写商品评价</p>
          <textarea name="" id="" ></textarea>
          <div class="m-addComment-img-box">
            <div class="m-addComment-upload">
              <p>
                <span class="m-icon-camera"></span>
              </p>
              <p>
                <span>添加照片</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="m-bottom-btn">
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
      .m-label{
        display: inline-block;
        padding: 0 53px 0 36px;
      }
      .m-start{
        width: 26px;
        height: 26px;
      }
    }
    .m-addComment-content{
      padding: 25px;
      .m-addComment-content-edit{
        padding: 28px 41px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow:0 5px 6px rgba(0,0,0,0.16);
        text-align: left;
        textarea{
          display: block;
          width: 100%;
          min-height: 160px;
          padding: 20px;
        }
        .m-addComment-img-box{
          .flex-row(flex-start);
          flex-wrap: wrap;
          .m-addComment-upload{
            width:220px;
            height:220px;
            border:2px dashed #CCCCCC;
            text-align: center;
            color: #ccc;
            margin-right: 20px;
            .m-icon-camera{
              display: inline-block;
              width: 62px;
              height: 52px;
              background: url("/static/images/icon-camera.png") no-repeat;
              background-size: 100% 100%;
              margin-top: 83px;
            }
          }
          img{
            display: block;
            width: 220px;
            height: 220px;
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
