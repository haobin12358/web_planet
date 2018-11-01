<template>
  <div class="m-personal m-address" >
    <div class="m-personal-bg">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-personal-content m-setUp">
      <p class="m-set-box">
        <span class="m-right">管理</span>
      </p>
      <div class="m-personal-body ">
        <div class="m-one-part m-address-part">
          <ul class="m-edit-ul m-address-edit-ul">
           <li>
               <div class="m-left">
                 <div class="m-address-name">
                   <div>
                     <span class="m-border"></span>
                     <span>收货人：居居女孩</span>
                   </div>
                   <span>15700000000</span>
                 </div>
                 <p class="m-address-p">
                   杭州市-西湖区-浙江工业大学（屏峰校区）家和西苑14幢112
                 </p>
               </div>
             <div class="m-address-edit-box">
               <div>
                 <span class="m-icon-radio active"></span>
                 <span>默认地址</span>
               </div>
               <div>
                 <span class="m-mr-40">编辑</span>
                 <span>删除</span>
               </div>
             </div>
           </li>
            <li>
              <div class="m-left">
                <div class="m-address-name">
                  <div>
                    <span class="m-border"></span>
                    <span>收货人：居居女孩</span>
                  </div>
                  <span>15700000000</span>
                </div>
                <p class="m-address-p">
                  杭州市-西湖区-浙江工业大学（屏峰校区）家和西苑14幢112
                </p>
              </div>
              <div class="m-address-edit-box">
                <div>
                  <span class="m-icon-radio"></span>
                  <span>默认地址</span>
                </div>
                <div>
                  <span class="m-mr-40">编辑</span>
                  <span>删除</span>
                </div>
              </div>
            </li>
            <li>
              <div class="m-left">
                <div class="m-address-name">
                  <div>
                    <span class="m-border"></span>
                    <span>收货人：居居女孩</span>
                  </div>
                  <span>15700000000</span>
                </div>
                <p class="m-address-p">
                  杭州市-西湖区-浙江工业大学（屏峰校区）家和西苑14幢112
                </p>
              </div>
              <div class="m-address-edit-box">
                <div>
                  <span class="m-icon-radio"></span>
                  <span>默认地址</span>
                </div>
                <div>
                  <span class="m-mr-40">编辑</span>
                  <span>删除</span>
                </div>
              </div>
            </li>
            <li>
              <div class="m-left">
                <div class="m-address-name">
                  <div>
                    <span class="m-border"></span>
                    <span>收货人：居居女孩</span>
                  </div>
                  <span>15700000000</span>
                </div>
                <p class="m-address-p">
                  杭州市-西湖区-浙江工业大学（屏峰校区）家和西苑14幢112
                </p>
              </div>
              <div class="m-address-edit-box">
                <div>
                  <span class="m-icon-radio"></span>
                  <span>默认地址</span>
                </div>
                <div>
                  <span class="m-mr-40">编辑</span>
                  <span>删除</span>
                </div>
              </div>
            </li>
            <li>
              <div class="m-left">
                <div class="m-address-name">
                  <div>
                    <span class="m-border"></span>
                    <span>收货人：居居女孩</span>
                  </div>
                  <span>15700000000</span>
                </div>
                <p class="m-address-p">
                  杭州市-西湖区-浙江工业大学（屏峰校区）家和西苑14幢112
                </p>
              </div>
              <div class="m-address-edit-box">
                <div>
                  <span class="m-icon-radio"></span>
                  <span>默认地址</span>
                </div>
                <div>
                  <span class="m-mr-40">编辑</span>
                  <span>删除</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="m-address-btn">
      <span>确  认</span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        name: ''
      }
    },
    components: {},
    methods: {
      changeRoute(v){
        this.$router.push(v)
      }
    },
    created() {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/personal";
  .m-address{
    padding-bottom: 350px;
  }
  .m-address-btn{
    position: absolute;
    bottom: 140px;
    left: 25px;
    span{
      display: inline-block;
      width: 700px;
      height: 106px;
      line-height: 106px;
      background-color: @mainColor;
      font-size: 38px;
      font-weight: bold;
      border-radius: 10px;
      box-shadow:0 5px 6px rgba(0,0,0,0.16);
    }
  }
</style>
