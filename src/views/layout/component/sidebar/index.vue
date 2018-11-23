<template>
  <div>
    <!--<router-link to="/index/adminIndex" key="user">-->
        <div class="m-system-name-box">
          <span class="m-system-circle"></span>
          <div class="m-system-name-text">
            <h3 class="m-system-name" @click="indexClick">大行星 </h3>
            <p class="m-ft-10">后台管理系统</p>
          </div>

        </div>

    <!--</router-link>-->
    <el-menu  class="el-menu-vertical-demo m-sidebar"
              mode="vertical"
              :default-active="this.$router.path"
              router
              :collapse="isCollapse"
              :show-timeout="0"
              :hide-timeout="0"
              text-color="#fff"
              active-text-color="#fff"
              unique-opened
              @open="handleOpen"
              @close="handleClose">
      <sidebar-item :list="side_list" ></sidebar-item>
    </el-menu>
    <!--<sidebar-item :list="side_list" ></sidebar-item>-->
  </div>


</template>

<script type="text/ecmascript-6">
  import SidebarItem from './SidebarItem';
  import sideList from '../../../../common/json/side';
  import store from '../../../../vuex/index';
    export default {
        data() {
            return {
              side_list:''
            }
        },
      components:{
        SidebarItem
      },
        methods: {
          sideClick(v){
            console.log(v)
            // this.side_list[v].opened = !this.side_list[v].opened;
            // for(let i =0;i<this.side_list.length;i++){
            //   if(i != v){
            //     this.side_list[i].opened = false;
            //   }
            // }
            this.$router.push(v.MNurl)
          },
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          },
          indexClick(){
            if(this.$store.state.role.indexOf('管理员') != -1){
              // this.$router.push('/index/adminIndex')
            }else{
              // this.$router.push('/index/userIndex')
            }

          }
        },
        created() {
            if(this.$store.state.side == null){
              this.side_list = sideList.side;

            }else{
              this.side_list = this.$store.state.side;
              console.log(this.side_list)
            }
        },
        computed:{
          isCollapse() {
            return store.state.isCollapse
          }
        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .m-system-name-box{
    text-align: center;
    padding: 0.3rem 0 0.12rem;
    border-bottom: 1px solid #e7eef1;
    margin: 0 0.2rem 0.15rem 0.2rem;
    display: flex;
    flex-flow: row;
    align-items: center;
    color: #fff;
    .m-system-circle{
      display: inline-block;
      width:0.25rem;
      height: 0.25rem;
      background:rgba(255,255,255,1);
      border-radius:18px;
      margin-right: 13px;
    }
    .m-system-name-text{
      text-align: left;
      .m-system-name{
        font-size: 0.2rem;
        cursor: pointer;
      }
      .m-ft-10{
        font-size: 10px;
      }
    }

  }

</style>
