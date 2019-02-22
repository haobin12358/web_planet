<template>
  <ul class="m-recommend">
    <li @click="changeRoute(item)" v-for="(item,index) in list">
      <img :src="item.prmainpic" class="m-one-product-img" alt="">
      <div class="m-one-product-text">
        <h3>【{{item.brand.pbname}}】{{item.prtitle}} </h3>
        <p class="m-flex-between">
          <span class="money-text">￥{{item.prprice | money}}</span>
          <s class="money-text m-grey" v-if="item.prlineprice">￥{{item.prlineprice | money}}</s>
          <s class="money-text m-grey" v-else>￥{{item.prprice | money}}</s>
        </p>
      </div>
    </li>
  </ul>

</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                name: ''
            }
        },
        props: {
          list:{
            type:Array,
            default:null
          },
          gift:{
            type:Boolean,
            default:false
          },
        },
        methods: {
          changeRoute(item){
            if(this.gift) {
              this.$router.push({ path: '/gift', query: { prid: item.prid, from: this.gift }});
            }else {
              this.$router.push({ path: '/productDetail', query: { prid: item.prid }});
            }
          }
        },
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/index";
  .m-recommend{
    display: flex;
    flex-flow: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 30px 33px ;
    li{
      list-style: none;
      width: 325px;
      height: auto;
      border-radius: 10px;
      box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.16);
      background-color: #ffffff;
      margin-bottom: 30px;
      &:nth-child(odd){
        margin-right: 30px;
      }
      .m-one-product-img{
        display: block;
        width: 325px;
        height: 325px;
        /*background-color: #edb3b1;*/
        border-radius: 10px;
      }
      .m-one-product-text{
        padding: 15px;
        .m-flex-between {
          font-size: 21px;
          text-align: left;
          width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      h3{
        width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 38px;
        font-size: 21px;
        text-align: left;
      }
    }
    .money-text {
      /*width: 200px;*/
      overflow: hidden; // 超出的文本隐藏
      text-overflow: ellipsis;    // 溢出用省略号显示
    }
  }
</style>
