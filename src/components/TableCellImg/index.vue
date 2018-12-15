<template>
  <div class="table-cell-img">
    <el-popover
      placement="left"
      trigger="hover">
      <img style="width: 350px;max-height: 100%;" :src="src" alt="">
      <img slot="reference" class="small" v-lazy="src" alt="">
    </el-popover>
  </div>
</template>

<script>
  export default {
    name: "TableCellImg",


    components: {},

    props: {
      src: {
        type: String,
      }
    },
    data() {
      return {
      }
    },

    computed: {},

    methods: {},

    created() {

    },
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .table-cell-img {
    width: 50px;
    height: 50px;
    display: inline-block;

    .small{
      width: 50px;
      height: 50px;
      border: 1px solid black;
    }

    .max{
      width: 50px;
      height: 50px;
    }
  }
</style>
