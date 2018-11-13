<template>
  <div class="m-add-product">
    <div class="m-content-radius">
      <!--选择商品类别-->
      <div class="m-product-part-title">选择商品类别</div>
      <div class="m-product-select-box">
        <select class="m-product-select" :options="options" v-model="selected">
          <option v-for="item in options">{{item.text}}</option>
        </select>
        <select class="m-product-select" :options="options" v-model="selected">
          <option v-for="item in options">{{item.text}}</option>
        </select>
        <select class="m-product-select" :options="options" v-model="selected">
          <option v-for="item in options">{{item.text}}</option>
        </select>
      </div>
      <!--选择商品品牌-->
      <div class="m-product-part-title">选择商品品牌</div>
      <div class="m-product-select-box">
        <select class="m-product-select" :options="options" v-model="selected">
          <option v-for="item in options">{{item.text}}</option>
        </select>
      </div>
      <!--选择商品使用场景-->
      <div class="m-product-part-title">选择商品使用场景</div>
      <div class="m-product-select-box">
        <select class="m-product-select" :options="options" v-model="selected">
          <option v-for="item in options">{{item.text}}</option>
        </select>
        <select class="m-product-select" :options="options" v-model="selected">
          <option v-for="item in options">{{item.text}}</option>
        </select>
      </div>
    </div>
    <!--商品名称、商品描述、商品图片-->
    <div class="m-content-radius">
      <div class="m-product-part-title">商品详情</div>
      <div class="m-product-text-box">
        <div class="m-text-box-left">商品名称</div>
        <div class="m-text-box-right">
          <input type="text" class="m-row-input" placeholder="请输入商品名称">
        </div>
      </div>
      <div class="m-product-text-box">
        <div class="m-text-box-left">商品描述</div>
        <div class="m-text-box-right">
          <textarea class="m-row-textarea" rows="3" cols="20" placeholder="请输入商品描述"></textarea>
        </div>
      </div>
      <div class="m-product-text-box">
        <div class="m-text-box-left">商品主图</div>
        <div class="m-text-box-right">
          <img class="m-product-img" src="/static/images/icon-upload-img.png" alt="">
        </div>
      </div>
      <div class="m-product-text-box">
        <div class="m-text-box-left">商品轮播图</div>
        <div class="m-text-box-right">
          <div class="m-product-imgs">
            <img class="m-product-img" src="/static/images/icon-upload-img.png" alt="">
            <img class="m-product-img" src="/static/images/icon-upload-img.png" alt="">
            <img class="m-product-img" src="/static/images/icon-upload-img.png" alt="">
            <img class="m-product-img" src="/static/images/icon-upload-img.png" alt="">
            <img class="m-product-img" src="/static/images/icon-upload-img.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!--商品规格组合-->
    <div class="m-content-radius">
      <div class="m-product-part-title">商品规格组合</div>
      <div class="m-product-text-box">
        <div class="m-text-box-left">商品图片</div>
        <div class="m-text-box-right">
          <img class="m-product-img" src="/static/images/icon-upload-img.png" alt="">
        </div>
      </div>
      <div class="m-product-text-box">
        <div class="m-text-box-left">商品价格</div>
        <div class="m-text-box-right">
          <input type="text" class="m-row-input m-width" placeholder="请输入商品价格"> 元
        </div>
      </div>
      <div class="m-product-text-box">
        <div class="m-text-box-left">商品规格</div>
        <div class="m-text-box-right">
          <select class="m-product-select" :options="options" v-model="selected">
            <option v-for="item in options">{{item.text}}</option>
          </select>
          <input type="text" class="m-row-input m-width">
        </div>
      </div>
    </div>




    <!--发货按钮-->
    <div class="m-submit-btn" @click="submitProduct">发 布</div>
  </div>
</template>

<script>
  import common from '../../../common/js/common';

  export default {
    name: "addProduct",
    data() {
      return {
        selected: "",
        options: [
          { id: 1, text: '登山徒步' }, { id: 2, text: '户外上装' }, { id: 3, text: '软壳衣' }, { id: 4, text: '北山' }
        ]
      }
    },
    components: {},
    methods: {
      // 发布商品按钮
      submitProduct() {

      }
    },
    mounted() {
      common.changeTitle('添加商品');
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/personal";

  .m-add-product {
    min-height: 100%;
    background-color: #EEEEEE;
    padding: 20px;
    .m-content-radius {
      font-size: 24px;
      padding: 30px;
      border-radius: 10px;
      background-color: #ffffff;
      text-align: left;
      margin-bottom: 20px;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.16);
      .m-product-part-title {
        font-weight: bold;
      }
      .m-product-select-box {
        display: flex;
        padding: 20px 0 30px 0;
      }
      .m-product-select {
        width: 200px;
        height: 45px;
        border-radius: 10px;
        padding: 0 0 0 15px;
        margin-right: 20px;
      }
      .m-product-text-box {
        display: flex;
        margin-top: 20px;
        .m-text-box-left {
          width: 120px;
          line-height: 48px;
          margin-right: 15px;
        }
        .m-text-box-right {
          .m-row-input {
            width: 480px;
            height: 40px;
            border: 1px #999999 solid;
            border-radius: 10px;
            font-size: 24px;
            padding: 0 0 0 20px;
          }
          .m-width {
            width: 260px;
          }
          .m-row-textarea {
            width: 480px;
            height: 110px;
            border: 1px #999999 solid;
            border-radius: 10px;
            padding: 0 0 0 20px;
            font-size: 24px;
          }
          .m-product-main-img {
            width: 180px;
            height: 180px;
          }
          .m-product-imgs {
            width: 500px;
          }
          .m-product-img {
            width: 160px;
            height: 160px;
          }
        }
      }
    }
    .m-submit-btn {
      width: 710px;
      height: 100px;
      margin: 100px 0 0 0;
      line-height: 100px;
      background-color: @mainColor;
      font-size: 38px;
      font-weight: bold;
      border-radius: 10px;
      box-shadow: 0 5px 6px rgba(0,0,0,0.16);
    }
  }
</style>
