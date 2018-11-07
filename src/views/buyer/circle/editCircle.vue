<template>
    <div class="m-editCircle">
      <div class="m-editCircle-content">
        <div class="m-select m-one">
          <span>请选择</span>
          <span class="m-select-more"></span>
        </div>
        <div class="m-input m-one">
          <input type="text" placeholder="请输入标题">
        </div>
        <div class="m-textarea m-one">
          <textarea type="text" placeholder="请输入内容"></textarea>
        </div>
        <div class="m-upload-box">
          <div>
            <span class="m-icon-upload-img"></span>
            <span class="m-icon-upload-video"></span>
          </div>
          <span>预览</span>
        </div>
      </div>

      <div class="m-bottom-btn">
        <span>确认发布</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "edit-circle"
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-editCircle{
  color: #999;
  text-align: left;
  font-size: 21px;
  .m-editCircle-content{
    padding: 40px 67px 88px;
  }
  .m-one{
    border-radius: 30px;
    border: 1px solid #999;
    margin-bottom: 40px;
    padding: 11px 31px 11px 68px;
  }
  .m-select{
    width: 284px;
    /*line-height: 50px;*/
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    .m-select-more{
      display: block;
      width: 22px;
      height: 22px;
      background: url("/static/images/icon-up.png") no-repeat;
      transform: rotate(180deg);
      background-size: 100% 100%;
    }
  }
  .m-input{
    input{
      border: none;
      width: 100%;
      color: #999;
      font-size: 21px;
      font-family:Calibri;
    }
  }
  .m-textarea{
    textarea{
      display: block;
      width: 100%;
      height: 580px;
      border: none;
      font-size: 21px;
      font-family:Calibri;
    }
  }
  .m-upload-box{
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 58px;
    .m-icon-upload-img{
      display: inline-block;
      width: 186px;
      height: 186px;
      background: url("/static/images/icon-upload-img.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 30px;
    }
    .m-icon-upload-video{
      display: inline-block;
      width: 186px;
      height: 186px;
      background: url("/static/images/icon-upload-video.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .m-bottom-btn{
    text-align: center;
    span{
      display: inline-block;
      width: 700px;
      height: 106px;
      border-radius: 10px;
      background-color: #FCD316;
      line-height: 106px;
      font-size: 38px;
      font-weight: bold;
      color: #333;
    }
  }
}
input::-webkit-input-placeholder{
  color: #999;
}
textarea::-webkit-input-placeholder{
  color: #999;
}
</style>
