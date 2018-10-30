<template>
    <div class="m-scene">
      <div class="m-scroll m-margin">
        <ul class="m-selected-scene-ul">
          <li>
            <img src="" class="m-selected-scene-img active" alt="">
          </li>
          <li>
            <img src="" class="m-selected-scene-img" alt="">
          </li>
          <li>
            <img src="" class="m-selected-scene-img" alt="">
          </li>
          <li>
            <img src="" class="m-selected-scene-img" alt="">
          </li>
          <li>
            <img src="" class="m-selected-scene-img" alt="">
          </li>
          <li>
            <img src="" class="m-selected-scene-img" alt="">
          </li>
          <li>
            <img src="" class="m-selected-scene-img" alt="">
          </li>
          <li>
            <img src="" class="m-selected-scene-img" alt="">
          </li>
        </ul>
      </div>
      <div class="m-scroll-l">
        <ul class="m-scene-label">
          <li>冲锋衣裤</li>
          <li class="active">冲锋衣裤</li>
          <li>冲锋衣裤</li>
          <li>冲锋衣裤</li>
          <li>冲锋衣裤</li>
          <li>冲锋衣裤</li>
        </ul>
      </div>
      <product></product>
      <span class="m-icon-top"></span>
    </div>

</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import product from '../components/product';
    export default {
        data() {
            return {
                name: ''
            }
        },
        components: {
          product
        },
        mounted(){
            common.changeTitle('场景推荐');
        },
        methods: {},
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/scroll";
  .m-scene{
    background-color: #eeeeee;
    .m-margin{
      margin: 0 0 10px 33px;
      .m-selected-scene-ul{
        padding: 10px 0;
      }
    }
  }
  .m-scroll-l{
    margin: 0 0 0 33px ;
    width: 717px;
    overflow-x: auto;
    overflow-y: hidden;
    .m-scene-label{
      height: 53px;
      min-width: 101%;
      overflow-y: hidden;
      text-align: left;
      display: inline;
      white-space: nowrap;
      overflow-x: scroll;
      li{
        display: inline-block;
        padding: 0 27px;
        /*width: 150px!important;*/
        height: 53px;
        line-height: 53px;
        background-color: #ccc;
        margin-right: 30px;
        border-radius: 10px;
        &.active{
          background-color: #fcd316;
          color: #fff;
        }
      }
    }
  }
 .m-icon-top{
   position: fixed;
   bottom: 40px;
   right: 15px;
   width: 78px;
   height: 78px;
   background: url("/static/images/icon-top.png") no-repeat;
   background-size: 100% 100%;
 }
</style>
