<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  data: {
      interval: null,
  },

  computed:{
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    },
  },

  destroyed(){

  },

  created(){


  }
}
</script>
