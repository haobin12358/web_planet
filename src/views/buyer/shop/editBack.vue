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
          <li  @click="showPicker('status_slot','status_select')" v-if="showProduct">
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
            <span>
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
          <textarea name="" id="" v-model="oraaddtion" placeholder="选填"></textarea>
        </div>
        <div class="m-selectBack-img-box">
          <template v-for="(item,index) in img_box">
            <img :src="item" alt="">
          </template>
          <div class="m-selectBack-camera">
            <input type="file" name="file" class="m-upload-input" value="" accept="image/*" multiple="" @change="uploadImg" ref="imgUpload">
          </div>

        </div>
      </div>
      <div class="m-foot-btn">
        <span @click="submitRefund">提交</span>
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
          values: [{name:'已收到货',value:0},{name: '未收到货',value:10}],
          className: 'slot1',
          textAlign: 'center'
        }],
        show_picker:false,
        status_select:null,
        picker_select:'',
        oraproductstatus:0,
        total_money:0,
        img_box:[],//上传图片集合
        upload_img:[],
        refund_slot:[{
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }],
        refund_select:null,
        order:null,
        oraaddtion:'',
        showProduct: true
      }
    },
    components: { picker},
    mounted(){
      if(this.$route.query.allOrder){
        this.order = JSON.parse(this.$route.query.product);
        this.total_money = JSON.parse(this.$route.query.product).omtruemount;
        this.product_info = JSON.parse(this.$route.query.product).order_part;
      }else{
        this.product_info = JSON.parse(this.$route.query.product);
        this.total_money = JSON.parse(this.$route.query.product)[0].opsubtotal;
      }

      this.oraproductstatus = Number(this.$route.query.oraproductstatus);
      // 判断是否显示货物状态
      if(this.oraproductstatus) {
        this.showProduct = false;
      }else {
        this.showProduct = true;
      }
      // 获取退货原因
      this.getBack();
    },
    methods:{
      changeRoute(v){
        this.$router.push(v)
      },
      //显示选择
      showPicker(v,i){
        this.show_picker = false;
        this.show_picker = true;
        this.slots = this[v];
        this.picker_select = i
      },
      //picker确定
      pickerSave(v,bool,select){
        if(select){
          this[this.picker_select] = select[0];
          this.oraproductstatus = select[0].value;
        }
        this[v] = bool;
        // 获取退货原因
        this.getBack();
        console.log(this.refund_slot[0].values);
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
        axios.post(api.upload_file+'?type=productBack&token='+localStorage.getItem('token'),form).then(res => {
          if(res.data.status == 200){
            this.upload_img.push(res.data.data);
            reader.readAsDataURL(files[0]);
            reader.onload = function(e) {
              that.img_box.push(this.result);
            };
            this.$refs.imgUpload.value = "";
          }
        })
      },
    //  获取退款原因
      getBack() {
        axios.get(api.list_dispute_type,{
          params:{
            type:this.oraproductstatus
          }
        }).then(res => {
          if(res.data.status == 200){
            this.refund_slot[0].values = [];
            for(let i =0;i<res.data.data.length;i++){
              this.refund_slot[0].values.push(res.data.data[i].diname);
            }
          }
        })
      },
    //  申请退款
      submitRefund() {
        if(this.oraproductstatus == 0 && !this.status_select){
          Toast("请先选择货物状态");
          return false;
        }
        if(!this.refund_select){
          Toast("请先选择退货原因");
          return false;
        }
        axios.post(api.refund_create + '?token=' + localStorage.getItem('token'),{
          omid: (this.order && this.order.omid ) || '',
          opid: (!this.order && this.product_info[0].opid) || '' ,
          orareason: this.refund_select,
          oraproductstatus:  (this.status_select && this.status_select.value) || 0 ,
          oraaddtion: this.oraaddtion,
          oraddtionvoucher: this.upload_img,
          orastate: this.oraproductstatus,
          oramount: this.total_money
        }).then(res => {
          if(res.data.status == 200){
            this.$router.push('/backDetail');
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
        box-sizing: border-box;
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
              background:linear-gradient(180deg, @subColor 0%, @mainColor 100%);
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
            width: 200px;
            height: 200px;
            background: url('/static/images/icon-camera-text.png') no-repeat;
            background-size: 100% 100%;
            display: inline-block;
            margin-right: 15px;
            position: relative;
            margin-bottom: 20px;
          }
          img{
            display: inline-block;
            width: 200px;
            height: 200px;
            margin-bottom: 20px;
            margin-right: 15px;
          }
        }

      }

    }
    .m-foot-btn{
      text-align: center;
      padding: 100px 0;
      span{
        display: inline-block;
        width: 700px;
        height: 106px;
        border-radius: 10px;
        background-color: @mainColor;
        line-height: 106px;
        font-size: 38px;
        font-weight: bold;
        color: #333;
      }
    }
  }
  .m-upload-input{
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 200px;
    height: 200px;
  }
</style>
