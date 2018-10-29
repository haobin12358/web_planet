<template>
    <div>
      <div class="m-scroll">
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
      <!--<div class="m-scroll-l">-->
        <!--<ul class="m-scene-label">-->
          <!--<li>冲锋衣裤</li>-->
          <!--<li>冲锋衣裤</li>-->
          <!--<li>冲锋衣裤</li>-->
          <!--<li>冲锋衣裤</li>-->
          <!--<li>冲锋衣裤</li>-->
          <!--<li>冲锋衣裤</li>-->
        <!--</ul>-->
      <!--</div>-->
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
  @import "../../../common/css/scroll";
  .m-scroll-l{
    margin: 30px 0 30px 33px ;
    width: 717px;
    overflow-x: auto;
    overflow-y: hidden;
    .m-scene-label{
      height: 53px;
      overflow-y: hidden;
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

</style>
