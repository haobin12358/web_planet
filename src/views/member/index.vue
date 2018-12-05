<template>
  <div >
      <page-nav :list="nav_list" @navClick="navClick"></page-nav>
    <router-view ></router-view>
  </div>
</template>

<script>
  import pageNav from '../../components/common/pageNav';
  export default {
    data(){
      return{
        nav_list:[
          {
            name:'分销商经销',
            src:'distributor',
            active:true
          },
          {
            name:'供应商经销',
            src:'supplier',
            active:false
          }
        ]
      }
    },
    components:{
      pageNav
    },
    methods:{
      navClick(index){
        let arr = [].concat(this.nav_list);
        for(let i=0;i<arr.length;i++){
          arr[i].active = false;
        }
        arr[index].active =true;
        this.nav_list = [].concat(arr);
        this.$router.push('/member/'+arr[index].src);
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

.m-check-alert{
  display: inline-block;
  margin-left: 0.2rem;
  border: 1px solid #B8B8B8;
  border-radius: 5px;
  color: #B8B8B8;
  padding: 0 0.3rem;
}
.m-compact-box{
    display: inline-block;
    padding: 0.15rem;
    background-color: #DBDCDC;
    border-radius: 5px;
    width: 0.78rem;
    height: 0.78rem;
    .m-icon-compact{
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: url("../../common/images/icon-compact.png") no-repeat;
      background-size: 100% 100%;
    }
  }

</style>
