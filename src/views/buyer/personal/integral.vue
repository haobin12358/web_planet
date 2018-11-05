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
        <nav-list :navlist="nav_list" @navClick="navClick"></nav-list>
       <ul class="m-integral-detail-ul">
         <li>
           <p class="m-integral-detail-p">
             <span>签到积分</span>
             <span>+1</span>
           </p>
           <p class="m-grey">2018-0-20  14:12:31</p>
         </li>
         <li>
           <p class="m-integral-detail-p">
             <span>签到积分</span>
             <span>+1</span>
           </p>
           <p class="m-grey">2018-0-20  14:12:31</p>
         </li>
         <li>
           <p class="m-integral-detail-p">
             <span>签到积分</span>
             <span>+1</span>
           </p>
           <p class="m-grey">2018-0-20  14:12:31</p>
         </li>
         <li>
           <p class="m-integral-detail-p">
             <span>签到积分</span>
             <span>+1</span>
           </p>
           <p class="m-grey">2018-0-20  14:12:31</p>
         </li>
       </ul>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import navList from '../../../components/common/navlist';
    export default {
        data() {
            return {
              nav_list:[
                {
                  name:'全部',
                  params:'',
                  active:true
                },
                {
                  name:'收入',
                  params:'',
                  active:false
                },
                {
                  name:'支出',
                  params:'',
                  active:false
                }
              ]
            }
        },
        components: {
          navList
        },
        methods: {
          navClick(index){
            let arr = [].concat(this.nav_list);
            for(let i=0;i<arr.length;i++){
              arr[i].active = false;
            }
            arr[index].active = true;
            this.nav_list = [].concat(arr)
          }
        },
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
    .m-integral-detail-ul{
      li{
        padding: 25px 0;
        text-align: left;
        border-bottom: 1px solid #CCCCCC;
        .m-integral-detail-p{
          .flex-row(space-between);
          padding: 10px 0;
        }
      }
    }
  }
}

</style>
