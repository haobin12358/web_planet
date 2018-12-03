<template>
    <div class="m-editCircle">
      <div class="m-editCircle-content">
        <div class="m-select m-one" @click="circlePopup = true">
          <span>{{circle}}</span>
          <span class="m-select-more"></span>
        </div>
        <!--圈子类别-->
        <mt-popup class="m-gender-popup" v-model="circlePopup" position="bottom">
          <div class="m-popup-btn">
            <div @click="circlePopup = false">取消</div>
            <div @click="circleDone">确认</div>
          </div>
          <mt-checklist class="m-checklist" v-model="circleList"
                        :options="options"></mt-checklist>
        </mt-popup>

        <div class="m-input m-one m-ft-24">
          <input type="text" v-model="title" placeholder="请输入标题">
        </div>
        <div class="m-textarea m-one">
          <textarea v-model="content" placeholder="请输入内容"></textarea>
        </div>
        <div class="m-upload-box">
          <div>
            <div class="m-selectBack-img-box">
              <template v-for="(item,index) in img_box">
                <img :src="item" alt="">
              </template>
              <div class="m-selectBack-camera" v-if="img_box.length < 4">
                <input type="file" name="file" class="m-upload-input" value="" accept="image/*" multiple="" @change="uploadImg" ref="imgUpload">
              </div>
            </div>
            <div class="m-selectBack-img-box">
              <template v-for="(item,index) in video_box">
                <img :src="item" alt="">
              </template>
              <div class="m-selectBack-video" v-if="video_box.length < 1">
                <input type="file" name="file" class="m-upload-input" value="" accept="video/*" multiple="" @change="uploadVideo">
              </div>
            </div>
          </div>
          <!--<span>预览</span>-->
        </div>
      </div>

      <div class="m-bottom-btn">
        <span @click="createNews">确认发布</span>
      </div>
    </div>
</template>

<script>
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import { Toast } from 'mint-ui';

  export default {
    name: "edit-circle",
    data() {
      return {
        circlePopup: false,
        options: [],
        circle: "请选择",
        circleList: [],
        title: "",
        content: "",
        img_box: [],            // 上传图片集合
        upload_img: [],
        video_box: [],
        video: {}
      }
    },
    components: {},
    methods: {
      // 获取导航
      getNav() {
        axios.get(api.items_list + "?ittype=10").then(res => {
          if(res.data.status == 200){
            let option = {};
            this.options = [];
            for(let i = 0; i < res.data.data.length; i ++) {
              option = { label: res.data.data[i].itname, value: res.data.data[i].itid };
              this.options.push(option);
            }
          }
        })
      },
      // 圈子多选标签的确定按钮
      circleDone() {
        this.circle = "";
        this.circlePopup = false;
        for(let i = 0; i < this.options.length; i ++) {
          for(let j = 0; j < this.circleList.length; j ++) {
            if(this.options[i].value == this.circleList[j]) {
              this.circle = this.circle + this.options[i].label + " ";
            }
          }
        }
      },
      //上传图片
      uploadImg(e) {
        if(this.img_box && this.img_box.length == 4) {
          Toast('最多只可上传4张图片');
          return false;
        }
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        let reader = new FileReader();
        let that = this;
        let form = new FormData();
        form.append("file", files[0]);
        axios.post(api.upload_file+'?type=circle&token='+localStorage.getItem('token'),form).then(res => {
          if(res.data.status == 200){
            let img = { niimg: res.data.data, nisort: this.img_box.length + 1 };
            this.upload_img.push(img);
            reader.readAsDataURL(files[0]);
            reader.onload = function(e) {
              that.img_box.push(this.result);
            };
            this.$refs.imgUpload.value = "";
          }
        })
      },
      //上传视频
      uploadVideo(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        let reader = new FileReader();
        let that = this;
        let form = new FormData();
        form.append("file", files[0]);
        axios.post(api.upload_file+'?type=circleVideo&token='+localStorage.getItem('token'),form).then(res => {
          if(res.data.status == 200){
            this.video.nvurl = res.data.data;
            this.video.nvthum = res.data.video_thum;
            this.video.nvdur = res.data.video_dur;
            reader.readAsDataURL(files[0]);
            reader.onload = function(e) {
              that.video_box.push(window.location.origin + res.data.video_thum);
            };
          }
        })
      },
      createNews() {
        let params = {
          items: this.circleList,
          netitle: this.title,
          netext: this.content,
          images: this.upload_img,
          video: this.video,
          source: "h5"
        };
        if(this.title == "") {
          Toast("请输入标题");
          return false;
        }
        if(this.content == "") {
          Toast("请输入内容");
          return false;
        }
        axios.post(api.create_news + "?token=" + localStorage.getItem("token"), params).then(res => {
          if(res.data.status == 200){
            Toast(res.data.message);
            this.$router.go(-1);
          }
        })
      }
    },
    mounted() {
      common.changeTitle('发布圈子');
      this.getNav();                 // 获取导航
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-editCircle{
  color: #999;
  text-align: left;
  font-size: 21px;
  .m-editCircle-content{
    padding: 40px 50px 0 50px;
  }
  .m-one{
    border-radius: 30px;
    border: 1px solid #999;
    margin-bottom: 40px;
    padding: 11px 30px 11px 30px;
  }
  .m-select{
    /*width: 284px;*/
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    .m-select-more{
      display: block;
      width: 22px;
      height: 22px;
      margin-top: -10px;
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
      font-size: 24px;
    }
  }
  .m-textarea{
    textarea{
      display: block;
      width: 100%;
      height: 580px;
      border: none;
      font-size: 24px;
    }
  }
  .m-upload-box{
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 58px;
  }
  .m-selectBack-img-box{
    margin-bottom: 30px;
    .m-selectBack-camera{
      width: 186px;
      height: 186px;
      background: url('/static/images/icon-upload-img.png') no-repeat;
      background-size: 100% 100%;
      display: inline-block;
      margin: 0 15px 15px 0;
      position: relative;
    }
    .m-selectBack-video{
      width: 186px;
      height: 186px;
      background: url('/static/images/icon-upload-video.png') no-repeat;
      background-size: 100% 100%;
      display: inline-block;
      margin: 0 15px 15px 0;
      position: relative;
    }
    .m-upload-input{
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 186px;
      height: 186px;
    }
    img{
      display: inline-block;
      width: 186px;
      height: 186px;
      margin-bottom: 20px;
      margin-right: 15px;
    }
  }
  .m-bottom-btn{
    text-align: center;
    padding: 50px 0;
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
  input::-webkit-input-placeholder{
    color: #999;
  }
  textarea::-webkit-input-placeholder{
    color: #999;
  }
}
.m-gender-popup {
  width: 750px;
  .m-popup-btn {
    color: #333333;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    padding: 20px 40px 0 40px;
  }
  .m-checklist {
    padding: 50px 0;
    text-align: center;
  }
}

</style>
