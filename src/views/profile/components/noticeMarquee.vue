<template>
  <div>
    <div class="notice-marquee" @click="dlgVisible = true">
      <span class="title">通告:</span>
      <marquee direction="up"  scrolldelay="10" scrollamount="1" loop="-1" behavior="scroll" hspace="20" vspace="10" onMouseOver="this.stop()"
               onMouseOut="this.start()" width="100%" height="30px">
        <el-tooltip v-for="(item,index) in noticeList" :key="index" class="tooltip" placement="top">
            <span slot="content">
              {{index+1}}.{{item.content}}
            </span>
          <p class="notice-item">{{index+1}}.{{item.content}}</p>
        </el-tooltip>
      </marquee>
    </div>

    <el-dialog :visible.sync="dlgVisible" title="平台通告">
      <el-table :data="noticeList">
        <el-table-column type="index" width="55" align="center"></el-table-column>
        <el-table-column label="通知" prop="content" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>

</template>

<script>
    export default {
        name: "noticeMarquee",

        components: {},

        data() {
            return {
              dlgVisible: false,
              noticeList: [
                {
                  content: '恭喜 135****2801会员成功。恭喜 135****2801会员成功。恭喜 135****2801会员成功。恭喜 135****2801会员成功。恭喜 135****2801会员成功。恭喜 135****2801会员成功。恭喜 135****2801会员成功。恭喜 135****2801会员成功。',
                },{
                  content: '恭喜 135****2801会员成功。',
                },{
                  content: '会员成功。',
                }
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
      /*display: inline-block;*/
      .fj();
      .title{
        width: 50px;
      }
      .notice-item{
        width: 200px;
        .hidden-ellipsis;
      }
    }
</style>
