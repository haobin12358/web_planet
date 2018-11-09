<template>
  <div class="m-material">
    <!--搜索-->
    <div class="m-selected-search">
      <span class="m-icon-home"></span>
      <div class="m-search-input-box" @click="changeRoute('/search')">
        <span class="m-icon-search"></span>
        <span>搜索品牌/商品</span>
      </div>
    </div>
    <!--轮播图-->
    <div class="m-swipe">
      <mt-swipe :auto="3000">
        <mt-swipe-item>
          <img src="" class="img" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="" class="img" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="" class="img" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--内容-->
    <div class="m-material-content">
      <!--nav滑动选项-->
      <navListScroll :navList="navList" @navClick="navClick"></navListScroll>
      <!--<div class="m-scroll-l">
        <ul class="m-material-nav">
          <li class="active">全部</li>
          <li>运动健身</li>
          <li>户外徒步</li>
          <li>露营体验</li>
          <li>潜水滑雪</li>
          <li>潜水滑雪</li>
          <li>潜水滑雪</li>
          <li>潜水滑雪</li>
        </ul>
      </div>-->
      <!--素材body-->
      <div class="m-material-body">

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import navListScroll from '../../../components/common/navListScroll';

  export default {
    data() {
      return {
        name: '',
        navList: [
          { name: "全部", active: true }, { name: "专题活动", active: false }, { name: "大牌推荐", active: false },
          { name: "新品", active: false }, { name: "动态", active: false }
        ]
      }
    },
    components: { navListScroll },
    methods: {
      // 跳转其他页面的方法
      changeRoute(v){
        this.$router.push(v)
      },
      // 滚动navList的点击事件
      navClick(index){
        let arr = [].concat(this.navList);
        for(let i = 0; i < arr.length; i ++){
          arr[i].active = false;
        }
        arr[index].active = true;
        this.navList = [].concat(arr);
      }
    },
    created() {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-material {
    .m-swipe{
      padding: 0 33px;
      /*margin: auto;*/
    }
    .m-material-content {
      .m-scroll-l{
        width: 700px;
        overflow-x: auto;
        overflow-y: hidden;
        margin: 20px 0 0;
        padding: 0 28px;
        .m-material-nav{
          width: 101%;
          overflow-y: hidden;
          text-align: left;
          display: inline;
          white-space: nowrap;
          overflow-x: scroll;
          li{
            display: inline-block;
            padding: 5px;
            /*width: 150px!important;*/
            height: 34px;
            line-height: 34px;
            margin-right: 62px;
            &.active{
              border-bottom: 3px solid @mainColor;
            }
          }
        }
      }
      .m-material-body {

      }
    }
  }

</style>
