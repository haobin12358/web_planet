<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade-transform" mode="out-in">
      <!--<keep-alive :include="cachedViews">-->
        <router-view ></router-view>
      <!--</keep-alive>-->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // cachedViews() {
    //   return this.$store.state.tagsView.cachedViews
    // },
    // key() {
    //   return this.$route.fullPath
    // }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/_variate";
 .app-main{
   padding:  0.1rem 0.3rem  0.1rem  0.6rem ;
 }
</style>
