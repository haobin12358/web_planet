<template>
    <div class="m-coupon">
      <nav-list :navlist="nav_list" @navClick="navClick"></nav-list>
      <div class="m-coupon-content">
          <coupon-card></coupon-card>
        <coupon-card></coupon-card>
        <coupon-card></coupon-card>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import couponCard from '../components/couponCard';
  import navList from '../../../components/common/navlist';
    export default {
        data() {
            return {
              nav_list:[
                {
                  name:'未使用',
                  params:'',
                  active:true
                },
                {
                  name:'已使用',
                  params:'',
                  active:false
                },
                {
                  name:'已过期',
                  params:'',
                  active:false
                }
              ]
            }
        },
        components: {
          couponCard,
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
.m-coupon{
  .m-nav-list{
    padding: 0 80px;
  }
  .m-coupon-content{
    padding: 65px;
  }
}


</style>
