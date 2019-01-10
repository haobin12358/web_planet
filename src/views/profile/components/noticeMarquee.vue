<template>
    <div class="notice-marquee">
      <marquee direction="up"  scrolldelay="10" scrollamount="1" loop="-1" behavior="scroll" hspace="20" vspace="10" onMouseOver="this.stop()"
               onMouseOut="this.start()" width="100%" height="30px">
        <el-tooltip v-for="item in noticeList" :key="item" class="tooltip" placement="top">
            <span slot="content">
              {{item}}
            </span>
            <p class="notice-item">{{item}}</p>
        </el-tooltip>
      </marquee>
    </div>
</template>

<script>
    export default {
        name: "noticeMarquee",

        components: {},

        data() {
            return {
              noticeList: [
                '恭喜 135****2801会员成功。恭喜 135****2801会员成功。恭喜 135****2801会员成功。恭喜 135****2801会员成功。恭喜 135****2801会员成功。恭喜 135****2801会员成功。恭喜 135****2801会员成功。恭喜 135****2801会员成功。',
                '恭喜 135。',
                '恭喜 135****2801会员成功。',
              ]
            }
        },

        computed: {},

        methods: {
          showDetail(item){

          },
        },

        created() {

        },
    }
</script>

<style lang="less" scoped>
    @import "../../../styles/myIndex";

    .notice-marquee {
      display: inline-block;
      .notice-item{
        width: 200px;
        .hidden-ellipsis;
      }
    }
</style>
