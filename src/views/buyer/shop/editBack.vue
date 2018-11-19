<template>
  <div class="m-selectBack"v-if="product_info">
    <div class="m-product-info">
      <img :src="product_info.prmainpic" alt="">
      <div>
        <p>{{product_info.prtitle}}</p>
        <p class="m-ft-22">规格：
          <template v-for="(key,k) in product_info.skuattritedetail" >
            <span >{{key}}</span>
            <span v-if="k < product_info.skuattritedetail.length-1">；</span>
          </template>
        </p>
      </div>
    </div>
    <div class="m-selectBack-content">
      <div class="m-one-select">
        <ul class="m-selectBack-ul">
          <li  @click="showPicker('status_slot','status_select')">
            <div class="m-flex-between">
              <span class="m-border"></span>
              <span>货物状态</span>
            </div>
            <span >
          <span class="m-grey" v-if="status_select">{{status_select}}</span>
             <span class="m-grey" v-else>请选择</span>
          <span class="m-icon-more"></span>
        </span>
          </li>
          <li >
            <div class="m-flex-between">
              <span class="m-border"></span>
              <span>退款原因</span>
            </div>
            <span >
          <span class="m-grey">请选择</span>
          <span class="m-icon-more"></span>
        </span>
          </li>
        </ul>
        <p class="m-selectBack-num">退款金额：<span class="m-price">￥899.00</span></p>
      </div>
      <div class="m-one-select">
        <div>
          <span>退款原因：</span>
          <textarea name="" id="" placeholder="选填"></textarea>
        </div>
        <div class="m-selectBack-img-box">
          <div class="m-selectBack-camera">
          </div>
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
  export default {
    data(){
      return{
        product_info:null,
        slots: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        status_slot:[{
          flex: 1,
          values: ['已收到货', '未收到货'],
          className: 'slot1',
          textAlign: 'center'
        }],
        show_picker:false,
        status_select:null,
        picker_select:''
      }
    },
    components: { picker},
    mounted(){
      this.product_info = JSON.parse(this.$route.query.product);

    },
    methods:{
      changeRoute(v){
        this.$router.push(v)
      },
      showPicker(v,i){
        this.show_picker =true;
        this.slots = this[v];
        this.picker_select = i
      },
      pickerSave(v,bool,select){
        if(select){
          this[this.picker_select] = select[0]
        }
        this[v] = bool;
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
  .m-selectBack{
    min-height: 100vh;
    background-color: #eee;
    .m-product-info{
      display: flex;
      flex-flow: row;
      width: 100%;
      background-color: #fff;
      padding: 34px 25px;
      text-align: left;
      box-shadow:0 5px 5px rgba(0,0,0,0.16);
      margin-bottom: 20px;
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
          }
          img{
            display: inline-block;
            width: 220px;
            height: 220px;
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
</style>
