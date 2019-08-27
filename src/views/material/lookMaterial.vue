<template>
    <div class="m-lookMaterial">
      <section class="m-left">
        <block-title title="预览"></block-title>
        <div class="m-detail">
          <div class="m-title">
            <img src="" class="m-head" alt="">
            <div>
              <p>某某欧</p>
              <p>2019/06/11 20:20:20</p>
            </div>
          </div>
          <div class="m-text">
            <span class="m-blue">##</span>
            <div>123123</div>
          </div>
          <div class="m-img-box">
            <img src="" class="m-img" alt="">
            <img src="" class="m-img" alt="">
            <img src="" class="m-img" alt="">
            <img src="" class="m-img" alt="">
          </div>
          <div class="flex-start m-loc">
            <img src="/static/images/icon-loc.png" class="m-icon-loc" alt="">
            <span>杭州·杭州西湖风景名胜区</span>
          </div>
        </div>
      </section>
      <section class="m-right">
        <block-title title="链接/截图"></block-title>
        <el-form label-width="80px" label-position="left">
          <el-form-item label="平台：">
            <span>小红书</span>
          </el-form-item>
          <el-form-item label="链接：">
            <div class="m-blue">https://www.xiaohongshu.com/discovery/item5d304f9d000000002700ad87</div>
          </el-form-item>
          <el-form-item label="截图：">
            <img src="" class="m-img" alt="">
          </el-form-item>
        </el-form>
      </section>
    </div>
</template>

<script>
    export default {
        name: "lookMaterial"
    }
</script>

<style scoped lang="less">
  @import "../../styles/myIndex";
.m-lookMaterial{
  display: flex;
  flex-flow: row;
  .m-left{
    width: 566px;
    .m-detail{
      padding-left: 30px;
      /*max-height: 80vh;*/
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
        margin: 20px 0;
        .m-img{
          display: block;
          width: 160px;
          height: 160px;
          margin: 0 10px 10px 0;
          background-color: #9fd0bf;
        }

      }
      .m-loc{
        line-height: 24px;
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
}

</style>
