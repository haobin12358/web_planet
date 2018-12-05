<template>
  <div class="m-sku" >
    <div class="m-sku-state">
      <span class="m-icon-close" @click="changeModal('show_sku',false)"></span>
      <div class="m-sku-content">
        <div class="m-sku-img-box m-center">
          <img :src="select_value.skupic"  v-if="select_value" alt="">
          <img :src="product.prmainpic"  v-else alt="">
        </div>
        <div class="m-center">
          <span class="m-red" v-if="select_value">￥{{select_value.skuprice | money}}</span>
          <span class="m-red" v-else>￥{{product.prprice | money}}</span>
        </div>
        <div class="m-scroll">
          <ul class="m-sku-box">
            <li v-for="(items,index) in product.skuvalue">
              <p>{{items.name}}</p>
              <ul class="m-sku-ul">
                <li v-for="item in items.value" :class="item == select[index]?'active':''" @click.stop="skuSelect(index,item)">{{item}}</li>
              </ul>
            </li>
          </ul>
          <div class="m-sku-num" v-if="!activity">
            <span>购买数量</span>
            <div class="m-num">
              <span class="m-icon-cut" @click.stop="changeNum(-1)"></span>
              <input type="number" min="1" v-model="num" class="m-num-input" />
              <span class="m-icon-add" @click.stop="changeNum(1)"></span>
            </div>
          </div>
        </div>
        <div class="m-sku-btn">
          <span  class="active" v-if="select_value && select_value.skustock > 0" @click.stop="sureClick">确 定</span>
          <span v-else>确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            select:[],
            select_value:null,
            num:1,
          }
        },
      props:{
          product:{
            type:Object,
            default:null
          },
          now_select:{
              type:Object,
            default:null
          },
          now_num:{
            type:Number,
            default:1
          },
          activity:{
            type:Boolean,
            default:false
          }
      },
      mounted(){
          if(this.now_select){
            this.select_value = this.now_select;
            this.select = this.select_value.skuattritedetail;
            this.num = this.now_num;
          }

      },
      methods:{
        //  改变模态框
        changeModal(v,bool){
          this.$emit('changeModal',v,bool)
        },
        //数量改变
        changeNum(v){
          if(v == -1 && this.num ==1){
            return false;
          }
          this.num = this.num + v;
        },
        //sku选择
        skuSelect(index,item){
          let _arr = [].concat(this.select);
          _arr[index] = item;
          this.select = [].concat(_arr);
          let change = -1;
          if(this.select.length === this.product.skuvalue.length){
            for(let i = 0;i<this.product.skus.length;i++){
              if((JSON.stringify(this.product.skus[i].skuattritedetail) === JSON.stringify(this.select)) && (this.product.skus[i].skuattritedetail.length == this.select.length)){
                this.select_value = this.product.skus[i];
                change = change +1;
              }
            }
          }
          if(change == -1){
            this.select_value = null;
          }
        },
      //  确定
        sureClick(){
          this.$emit('sureClick',this.select_value,this.num);
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";

  .m-sku{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    /*background-color: rgba(0,0,0,0.2);*/
    z-index: 1001;
    transition: opacity .5s;
    .m-sku-state{
      background-color: #fff;
      position: absolute;
      width: 100%;
      height: 990px;
      left: 0;
      bottom:0;
      border-radius:50px 50px 0 0;
      -webkit-transition: height 0.88s;
      transition: height 0.88s;
      .m-icon-close{
        position: absolute;
        top: 35px;
        right: 35px;
        height: 35px;
        width: 35px;
        padding: 5px;
        background: url("/static/images/icon-close.png") no-repeat;
        background-size: 100% 100%;
      }
      .m-sku-content{
        .m-center{
          text-align: center;
          .m-red{
            color: #EF9B2D;
            font-size: 30px;
            font-weight:400;
          }
        }
        .m-sku-img-box{
          margin: 30px 0 10px;
          img{
            display: inline-block;
            width: 230px;
            height: 230px;
            box-shadow: 0 5px 6px rgba(0,0,0,0.16);
          }
        }
        .m-scroll{
          height: 450px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 10px 65px;
          color: #999999;
          .m-sku-box{
            text-align: left;
            list-style: none;
            padding: 0;
            .m-sku-ul{
              display: flex;
              flex-flow: row;
              align-items: center;
              justify-content: flex-start;
              flex-wrap: wrap;
              list-style: none;
              padding: 0;
              overflow-y: scroll;
              li{
                height: 25px;
                line-height: 28px;
                padding: 5px 56px;
                background-color: #D5D5D5;
                border-radius: 30px;
                margin-right: 30px;
                margin-bottom: 20px;
                &.active{
                  background-color: @mainColor;
                  color: #333333;
                }
              }
            }
          }
        }
        .m-sku-btn{
          margin-top: 53px;
          text-align: center;
          span{
            display: inline-block;
            width: 680px;
            background-color: #d5d5d5;
            height: 62px;
            line-height: 62px;
            font-size: 30px;
            border-radius: 10px;
            text-align: center;
            &.active{
              background-color: @mainColor;
            }
          }
        }
      }
    }

  }
</style>
