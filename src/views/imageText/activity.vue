<template>
    <div class="m-imageText">
      <h3 class="m-part-title m-flex-between">
        <span>
           <span class="m-part-title-icon"></span>
           <span>活动专题</span>
        </span>
      </h3>
      <div class="m-search-box">
        <div>
          <span class="m-btn active" @click="changeRoute('/imageText/addActivity')">
            <span class="m-btn-icon m-add"></span>
            <span>添加活动专题</span>
          </span>
        </div>
        <div>
          <el-input v-model="state4" class="m-search-input" placeholder="标题/作者/摘要"></el-input>
          <span class="m-btn m-search-btn">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
        </div>
      </div>
      <div class="m-content">
        <ul class="m-activity-ul">
          <li>
            <h3 class="m-activity-title">活动新主张</h3>
            <img src="" class="m-activity-img" alt="">
            <p class="m-activity-text">
              活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正....
            </p>
            <p class="m-activity-more">
              <span>阅读全文</span>
              <span class="m-activity-more-icon"></span>
            </p>
            <div class="m-activity-btn-box">
              <span class="m-activity-btn-icon m-activity-edit"></span>
              <span class="m-activity-edit">编辑</span>
              <span class="m-activity-delete m-activity-btn-icon"></span>
              <span class="m-activity-edit">删除</span>
            </div>
          </li>
          <li>
            <h3 class="m-activity-title">活动新主张</h3>
            <img src="" class="m-activity-img" alt="">
            <p class="m-activity-text">
              活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正....
            </p>
            <p class="m-activity-more">
              <span>阅读全文</span>
              <span class="m-activity-more-icon"></span>
            </p>
            <div class="m-activity-btn-box">
              <span class="m-activity-btn-icon m-activity-edit"></span>
              <span class="m-activity-edit">编辑</span>
              <span class="m-activity-delete m-activity-btn-icon"></span>
              <span class="m-activity-edit">删除</span>
            </div>
          </li>
          <li>
            <h3 class="m-activity-title">活动新主张</h3>
            <img src="" class="m-activity-img" alt="">
            <p class="m-activity-text">
              活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正....
            </p>
            <p class="m-activity-more">
              <span>阅读全文</span>
              <span class="m-activity-more-icon"></span>
            </p>
            <div class="m-activity-btn-box">
              <span class="m-activity-btn-icon m-activity-edit"></span>
              <span class="m-activity-edit">编辑</span>
              <span class="m-activity-delete m-activity-btn-icon"></span>
              <span class="m-activity-edit">删除</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
          return {
            state4:''
          }
        },
      methods:{
        changeRoute(v){
          this.$router.push(v);
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .m-content{
    .m-activity-ul{
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      li{
        width: 40%;
        border:1px solid rgba(238,238,239,1);
        box-shadow:0 3px 6px rgba(0,0,0,0.16);
        border-radius:10px;
        padding: 0.2rem 0.1rem 0.1rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        .m-activity-title{
          font-weight: bold;
        }
        .m-activity-img{
          display: block;
          width: 100%;
          height: 1.66rem;
          background-color: #91aeb5;
          margin: 0.06rem 0;
        }
        .m-activity-text{
          overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;
        }
        .m-activity-more{
          text-align: right;
          font-size: 0.12rem;
          color: #B8B8B8;
          margin: 0.12rem 0;
        }
        .m-activity-more-icon{
          display: inline-block;
          width: 0.07rem;
          height: 14px;
          background: url("../../common/images/icon-more.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: text-bottom;
        }
        .m-activity-btn-box{
          text-align: right;
          font-size: 0.18rem;
          color: #B8B8B8;
          border-top: 1px solid #DBDCDC;
          padding-top: 0.1rem;
          .m-activity-btn-icon{
            display: inline-block;
            width: 0.24rem;
            height: 0.24rem;
            margin-left: 0.4rem;
            &.m-activity-delete{
              background: url("../../common/images/icon-delete.png") no-repeat;
              background-size: 100% 100%;
              vertical-align: text-bottom;
            }
            &.m-activity-edit{
              background: url("../../common/images/icon-edit.png") no-repeat;
              background-size: 100% 100%;
              vertical-align: text-bottom;
            }
          }
        }
      }
    }
  }
</style>
