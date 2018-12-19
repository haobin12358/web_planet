<template>
  <div class="table-cell-img" :style="{width: width}">
    <el-popover
      v-if="src"
      placement="left"
      trigger="hover"
      :open-delay="500">
      <img style="width: 350px;max-height: 100%;" :src="src" alt="">
      <img slot="reference" class="small" :style="{width: width}" v-lazy="src" alt="">
    </el-popover>
    <div v-else>无</div>
  </div>
</template>

<script>
  export default {
    name: "TableCellImg",

    components: {},

    props: {
      src: {
        type: String,
      },
      width: {
        type: String,
        default: '50px',
      }
    },
    data() {
      return {}
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

    .small {
      width: 50px;
      height: 50px;
      border: 1px solid black;
      text-align: center;
    }

    .max {
      width: 50px;
      height: 50px;
    }
  }
</style>
