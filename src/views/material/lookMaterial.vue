<template>
    <div class="m-lookMaterial" v-if="detail">
      <div class="content">
        <section class="m-left">
          <block-title title="预览"></block-title>
          <div class="m-detail">
            <div class="m-title">
              <img :src="detail.usheader" class="m-head" alt="">
              <div>
                <p>{{detail.usname}}</p>
                <p>{{detail.createtime}}</p>
              </div>
            </div>
            <div class="m-scroll">
              <div class="m-text">
                {{detail.text}}
              </div>
              <div class="m-img-box" v-if="detail.showtype == 'image'" >
                <template>
                  <el-popover
                    v-for="item in detail.image" :key="item"
                    placement="right"
                    trigger="hover"
                    :open-delay="500">
                    <img style="width: 450px;max-height: 100%;" :src="item" alt="">
                    <img slot="reference" class="m-img" v-lazy="item" alt="">
                  </el-popover>
                </template>
              </div>
              <div class="m-img-box" v-if="detail.showtype == 'video'" >
                <el-dialog :visible="visible" title="视频预览" width="500" :modal="false" top="5vh" @close="close">
                  <video ref="video" :src="scope.row.video.url" :poster="scope.row.video.thumbnail" controls autoplay width="375" height="667"></video>
                </el-dialog>
                <img :src="scope.row.video.thumbnail" alt="" style="width: 160px;height: 160px;" @click="visible = true">
              </div>
              <div class="flex-start m-loc" v-if="detail.umflocation">
                <img src="/static/images/icon-loc.png" class="m-icon-loc" alt="">
                <span>{{detail.umflocation}}</span>
              </div>
            </div>

          </div>
        </section>
        <section class="m-right">
          <block-title title="链接/截图"></block-title>
          <el-form label-width="80px" label-position="left">
            <section v-for="(item,index) in detail.mfls">
              <el-form-item label="平台：">
                <span>{{item.linkage.liname}}</span>
              </el-form-item>
              <el-form-item label="链接：" v-if="item.mfllink">
                <a class="m-blue" :href="item.mfllink" target="blank">{{item.mfllink}}</a>
              </el-form-item>
              <el-form-item label="截图：">
                <el-popover
                  placement="right"
                  trigger="hover"
                  :open-delay="500">
                  <img style="width: 450px;max-height: 100%;" :src="item.mflimg" alt="">
                  <img slot="reference" class="m-img" v-lazy="item.mflimg" alt="">
                </el-popover>
              </el-form-item>
            </section>
          </el-form>
        </section>
      </div>
     <div class="m-bottom-btn" v-if="!detail.umfstatus">
       <el-button type="primary" @click="submitMoney">返还押金</el-button>
     </div>
    </div>
</template>

<script>

    export default {
        name: "lookMaterial",
      data(){
          return{
            detail:null,
            visible:false
          }
      },
      mounted(){
          this.getData();
      },
      methods:{
        // 获取data
        getData() {
          this.$http.get(this.$api.feedback_details, {
            noLoading: false, params: { umfid:this.$route.query.umfid}}).then(res => {
            if (res.data.status == 200) {
              this.detail = res.data.data;

            }
          })
        },
        //返还押金
        submitMoney(){
          this.$confirm('确定要返还押金吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post(this.$api.feedback_refund,  { umfid:this.$route.query.umfid}).then(res => {
              if (res.data.status == 200) {
                this.getData();
                this.$message({
                  type: 'success',
                  message: '返还成功!'
                });
              }
            })
          }).catch(() => {

          });
        }
      }
    }
</script>

<style scoped lang="less">
  @import "../../styles/myIndex";
.m-lookMaterial{
  .content{
    display: flex;
    flex-flow: row;
  }
  .m-left{
    width: 50%;
    .m-detail{
      padding-left: 30px;
      .m-scroll{
        height: 55vh;
        overflow: auto;
      }
      .m-title{
        .flex-start();
        line-height: 30px;
        color: #595757;
        margin-bottom: 40px;
        .m-head{
          display: block;
          width: 60px;
          height: 60px;
          margin-right: 20px;
        }
      }
      .m-text{
        .flex-start();
        .m-blue{
          color: #3498DB;
        }
      }
      .m-img-box{
        .flex-start();
        flex-wrap: wrap;
        margin: 20px 0 0;
        .m-img{
          display: block;
          width: 160px;
          height: 160px;
          margin: 0 10px 10px 0;
        }

      }
      .m-loc{
        line-height: 24px;
        margin-top: 20px;
      }
      .m-icon-loc{
        display: block;
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }

    }
  }
  .m-right{
    padding-left: 40px;
    .m-blue{
      color: #3498DB;
      cursor: pointer;
    }
    .m-img{
      width: 140px;
      height: 140px;
      display: inline-block;
    }
  }
  .m-bottom-btn{
    text-align: center;
    position: fixed;
    bottom:100px;
    right: 0;
    left: 0;
    margin: 0 auto;
    span{
      display: inline-block;

    }
  }
}

</style>
