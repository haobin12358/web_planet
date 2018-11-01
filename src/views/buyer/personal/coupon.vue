<template>
    <div>
      <ul class="m-nav-list">
        <li class="active">
          <span>未使用</span>
        </li>
        <li>
          <span>已使用</span>
        </li>
        <li>
          <span>已过期</span>
        </li>
      </ul>
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
@import "../../../common/css/index";
  .m-nav-list{
    padding: 0 80px;
  }
</style>
