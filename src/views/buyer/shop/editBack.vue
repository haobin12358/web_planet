<template>
  <div class="m-selectBack"v-if="product_info">
    <div class="m-product-info">
      <template v-for="(items,index) in product_info">
        <div class="m-one-product">
          <img :src="items.prmainpic" alt="">
          <div>
            <p>{{items.prtitle}}</p>
            <p class="m-ft-22">规格：
              <template v-for="(key,k) in items.skuattritedetail" >
                <span >{{key}}</span>
                <span v-if="k < items.skuattritedetail.length-1">；</span>
              </template>
            </p>
          </div>
        </div>
      </template>
    </div>
    <div class="m-selectBack-content">
      <div class="m-one-select">
        <ul class="m-selectBack-ul">
          <li  @click="showPicker('status_slot','status_select')" v-if="oraproductstatus">
            <div class="m-flex-between">
              <span class="m-border"></span>
              <span>货物状态</span>
            </div>
            <span >
          <span class="m-grey" v-if="status_select">{{status_select.name}}</span>
             <span class="m-grey" v-else>请选择</span>
          <span class="m-icon-more"></span>
        </span>
          </li>
          <li @click="showPicker('refund_slot','refund_select')" >
            <div class="m-flex-between">
              <span class="m-border"></span>
              <span>退款原因</span>
            </div>
            <span >
             <span class="m-grey" v-if="refund_select">{{refund_select}}</span>
             <span class="m-grey" v-else>请选择</span>
            <span class="m-icon-more"></span>
        </span>
          </li>
        </ul>
        <p class="m-selectBack-num">退款金额：<span class="m-price">￥{{total_money | money}}</span></p>
      </div>
      <div class="m-one-select">
        <div>
          <span>退款原因：</span>
          <textarea name="" id="" placeholder="选填"></textarea>
        </div>
        <div class="m-selectBack-img-box">
          <div class="m-selectBack-camera" @click="uploadImg">
            <input type="file" name="file"  class="m-upload-input" value="" accept="image/jpeg,image/png,image/jpg,image/gif" multiple="" @change="uploadImg">
          </div>
          <template v-for="(item,index) in img_box">
            <img :src="item" alt="">
          </template>

        </div>
      </div>
      <div class="m-foot-btn">
        <span @click="changeRoute('/backDetail')">提交</span>
      </div>
    </div>
    <picker :show_picker="show_picker"  :slots="slots" @pickerSave="pickerSave" ></picker>
  </div>
</template>

<script>
  import picker from '../../../components/common/picker';
  import axios from 'axios';
  import api from '../../../api/api';
  import {Toast} from 'mint-ui';
  export default {
    data(){
      return{
        product_info:null,
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        status_slot:[{
          flex: 1,
          values: [{name:'已收到货',value:0},{name: '未收到货',value:1}],
          className: 'slot1',
          textAlign: 'center'
        }],
        show_picker:false,
        status_select:null,
        picker_select:'',
        oraproductstatus:0,
        total_money:0,
        img_box:[],//上传图片集合
        refund_slot:[{
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }],
        refund_select:null
      }
    },
    components: { picker},
    mounted(){
      this.product_info = JSON.parse(this.$route.query.product);
      this.oraproductstatus = Number(this.$route.query.oraproductstatus);
      let total = 0;
      for(let i = 0;i<this.product_info.length;i++){
        total = total + Number(this.product_info[i].opsubtotal);
      }
      this.total_money = total;
    //  获取退货原因
      this.getBack();
    },
    methods:{
      changeRoute(v){
        this.$router.push(v)
      },
      //显示选择
      showPicker(v,i){
        this.show_picker =true;
        this.slots = this[v];
        this.picker_select = i
      },
      //picker确定
      pickerSave(v,bool,select){
        if(select){
          this[this.picker_select] = select[0]
        }
        this[v] = bool;
      },
      //上传图片
      uploadImg(e){
       if( this.img_box && this.img_box.length == 4){
         Toast('最多只可上传4长图片');
         return false;
       }
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        let reader = new FileReader();
        let that = this;
        let form = new FormData();
        form.append("file", files[0]);
        axios.post(api.upload_file+'?token='+localStorage.getItem('token'),form).then(res => {
          if(res.data.status == 200){
            reader.readAsDataURL(files[0]);
            reader.onload = function(e) {
              that.img_box.push(this.result);
            }
          }
        })
      },
    //  获取图款原因
      getBack(){
        axios.get(api.list_dispute_type,{
          params:{
            type:this.oraproductstatus
          }
        }).then(res => {
          if(res.data.status == 200){
            for(let i =0;i<res.data.data.length;i++){
              this.refund_slot[0].values.push(res.data.data[i].diname);
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
  .m-selectBack{
    min-height: 100vh;
    background-color: #eee;
    .m-product-info{
      /*padding: 34px 25px;*/
      box-shadow:0 5px 5px rgba(0,0,0,0.16);
      margin-bottom: 20px;
      .m-one-product{
        display: flex;
        flex-flow: row;
        width: 100%;
        background-color: #fff;
        padding: 34px 25px 20px;
        text-align: left;
      }
      img{
        display: block;
        width: 140px;
        height: 140px;
        background-color: #9fd0bf;
        margin-right: 40px;
      }
      .m-ft-22{
        margin-top: 10px;
      }
    }
    .m-selectBack-content{
      .m-one-select{
        padding: 15px 40px 15px 45px;
        background-color: #fff;
        box-shadow:0 5px 5px rgba(0,0,0,0.16);
        text-align: left;
        margin-bottom: 20px;
        &.m-pl{
          padding-left: 65px;
        }
        .m-selectBack-ul{
          li{
            .flex-row(space-between);
            padding: 24px 0;
            border-bottom: 1px solid @borderColor;
            &:last-child{
              border-bottom: none;
            }
            .m-border{
              display: block;
              width: 5px;
              height: 50px;
              background:linear-gradient(180deg,rgba(255,251,223,1) 0%,rgba(252,211,22,1) 100%);
              margin-right: 15px;
            }
            .m-ft-18{
              font-size: 18px;
              color: #999;
            }
            .m-icon-more{
              display: inline-block;
              width: 22px;
              height: 22px;
              background: url("/static/images/icon-more.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
        .m-selectBack-num{
          padding-left: 20px;
          margin-bottom: 30px;
        }
        textarea{
          display: inline-block;
          width: 500px;
          margin-left: 20px;
          min-height: 100px;
          vertical-align: top;
          font-size: 24px;
        }
        .m-selectBack-img-box{
          margin-bottom: 30px;
          .m-selectBack-camera{
            width: 220px;
            height: 220px;
            background: url('/static/images/icon-camera-text.png') no-repeat;
            background-size: 100% 100%;
            display: inline-block;
            margin-right: 20px;
            position: relative;
            margin-bottom: 20px;
          }
          img{
            display: inline-block;
            width: 220px;
            height: 220px;
            margin-bottom: 20px;
            margin-right: 20px;
          }
        }

      }

    }
    .m-foot-btn{
      text-align: center;
      margin-top: 250px;
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
  .m-upload-input{
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
      width: 220px;
      height: 220px;
  }
</style>
