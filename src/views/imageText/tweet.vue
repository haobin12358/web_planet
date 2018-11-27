<template>
  <div class="m-imageText">
    <h3 class="m-part-title m-flex-between">
        <span>
           <span class="m-part-title-icon"></span>
           <span>推文</span>
        </span>
    </h3>
    <div class="m-search-box">
      <div>
          <span class="m-btn active">
            <span class="m-btn-icon m-add"></span>
            <span>添加推文</span>
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
      <ul class="m-tweet-ul">
        <li>
          <h3 class="m-tweet-title">推文1</h3>
          <img src="" class="m-tweet-img" alt="">
          <p class="m-tweet-text">
            活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正....
          </p>
          <p class="m-tweet-more">
            <span>阅读全文</span>
            <span class="m-tweet-more-icon"></span>
          </p>
          <div class="m-tweet-btn-box">
            <span>
              <span class="m-tweet-btn-icon m-tweet-edit"></span>
            <span class="m-tweet-edit">编辑</span>
            </span>
            <span>
               <span class="m-tweet-delete m-tweet-btn-icon"></span>
            <span class="m-tweet-edit">删除</span>
            </span>
          </div>
        </li>
        <li>
          <h3 class="m-tweet-title">推文1</h3>
          <img src="" class="m-tweet-img" alt="">
          <p class="m-tweet-text">
            活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正文活动正....
          </p>
          <p class="m-tweet-more">
            <span>阅读全文</span>
            <span class="m-tweet-more-icon"></span>
          </p>
          <div class="m-tweet-btn-box">
            <span>
              <span class="m-tweet-btn-icon m-tweet-edit"></span>
            <span class="m-tweet-edit">编辑</span>
            </span>
            <span>
               <span class="m-tweet-delete m-tweet-btn-icon"></span>
            <span class="m-tweet-edit">删除</span>
            </span>
          </div>
        </li>
      </ul>
      <h3 class="m-part-title m-flex-between">
        <span>
           <span class="m-part-title-icon"></span>
           <span>推文标签</span>
        </span>
      </h3>
      <div class="m-new-label-box">
        <div class="m-new-label">
          <span>户外徒步</span>
          <span class="m-label-delete"></span>
        </div>
        <div class="m-new-label">
          <span>户外徒步</span>
          <span class="m-label-delete"></span>
        </div>
        <div class="m-new-label">
          <span>户外徒步</span>
          <span class="m-label-delete"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        state4:''
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .m-content{
    .m-tweet-ul{
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      li{
        width: 20%;
        border:1px solid rgba(238,238,239,1);
        box-shadow:0 3px 6px rgba(0,0,0,0.16);
        border-radius:10px;
        padding: 0.2rem 0.1rem 0.1rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        .m-tweet-title{
          font-weight: bold;
        }
        .m-tweet-img{
          display: block;
          width: 100%;
          height: 1.66rem;
          background-color: #91aeb5;
          margin: 0.06rem 0;
        }
        .m-tweet-text{
          overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;
        }
        .m-tweet-more{
          text-align: right;
          font-size: 0.12rem;
          color: #B8B8B8;
          margin: 0.12rem 0;
        }
        .m-tweet-more-icon{
          display: inline-block;
          width: 0.07rem;
          height: 14px;
          background: url("../../common/images/icon-more.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: text-bottom;
        }
        .m-tweet-btn-box{
          display: flex;
          flex-flow: row;
          justify-content: space-around;
          font-size: 0.18rem;
          color: #B8B8B8;
          border-top: 1px solid #DBDCDC;
          padding-top: 0.1rem;
          .m-tweet-btn-icon{
            display: inline-block;
            width: 0.24rem;
            height: 0.24rem;
            &.m-tweet-delete{
              background: url("../../common/images/icon-delete.png") no-repeat;
              background-size: 100% 100%;
              vertical-align: text-bottom;
            }
            &.m-tweet-edit{
              background: url("../../common/images/icon-edit.png") no-repeat;
              background-size: 100% 100%;
              vertical-align: text-bottom;
            }
          }
        }
      }
    }
    .m-new-label-box{
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      .m-new-label{
        position: relative;
        padding: 0.02rem 0.2rem;
        border: 1px solid #DBDCDC;
        margin-top: 0.2rem;
        margin-right: 0.2rem;
        cursor: pointer;
        .m-label-delete{
          position: absolute;
          bottom: -1px;
          right: -1px;
          width: 0.16rem;
          height: 0.16rem;
          background: url("../../common/images/icon-label-delete.png") no-repeat;
          background-size: 100% 100%;
        }
        &:hover{
          border: 1px solid #CB7E88;
          .m-label-delete{
            background: url("../../common/images/icon-label-delete-active.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>
