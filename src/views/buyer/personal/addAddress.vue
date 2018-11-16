<template>
  <div class="m-personal ">
    <div class="m-personal-bg">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-personal-content m-setUp m-addAddress">
      <div class="m-personal-info">
        <img class="m-personal-head-portrait" :src="user.usheader" alt="">
        <div class="m-personal-info-box">
          <div class="m-personal-info-text">
            <div>
              <p>{{user.usname}}</p>
              <p>
                <span class="m-personal-identity">{{user.usidname}}</span>
              </p>
            </div>

          </div>
        </div>
      </div>
      <div class="m-personal-body">
        <div class="m-one-part">
          <ul class="m-edit-ul m-addAddress-ul">
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label"><span class="m-must">*</span> 收件人</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" v-model="address.uaname">
              </div>
            </li>
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label"><span class="m-must">*</span> 手机号</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" v-model="address.uaphone">
              </div>
            </li>
            <li class="m-default-address" @click="getAddress">
              <div>
                <span class="m-border"></span>
                <span class="m-label"><span class="m-must">*</span> 省市区</span>
              </div>
              <div>
                <div class="m-address-text">{{addressText}}</div>
                <!--<span class="m-icon-more"></span>-->
              </div>
            </li>
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label"><span class="m-must">*</span> 详细地址</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" v-model="address.uatext">
              </div>
            </li>
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label">邮政编码</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" v-model="address.uapostalcode">
              </div>
            </li>
            <li class="m-no-border m-default-address">
              <div>
                <span class="m-border"></span>
                <span>设为默认地址</span>
              </div>
              <div>
                 <span class="m-icon-default" :class="address.uadefault == '1' ? 'active' : ''" @click="defaultAddress"></span>
              </div>
            </li>
          </ul>

          <!--省市区popup-->
          <mt-popup class="m-address-popup" v-model="addressPopup" position="bottom">
            <div class="m-popup-btn">
              <div @click="addressPopup = false">取消</div>
              <div @click="addressPopup = false">确认</div>
            </div>
            <mt-picker :slots="myAddressSlots" value-key="name" @change="onMyAddressChange"></mt-picker>
            <p>地址3级联动：{{myAddressProvince}} {{myAddressCity}} {{myAddressArea}}</p>
          </mt-popup>

          <div class="m-foot-btn-save">
            <span @click="submitAddress">保存地址</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import { Toast } from 'mint-ui';
  import myaddress from '../../../common/json/pca-code.json'

  export default {
    data() {
      return {
        name: '',
        user: {},
        address: { uadefault: "0" },
        addressText: "省-市-区",
        addressPopup: true,
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: myaddress, //省份数组
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },{
            divider: true,
            content: '-',
            className: 'slot4'
          },{
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        myAddressProvince:'',
        myAddressCity:'',
        myAddressArea:'',
      }
    },
    components: {},
    methods: {
      // 跳转页面
      changeRoute(v) {
        this.$router.push(v)
      },
      // 获取用户信息
      getUser() {
        axios.get(api.get_home + "?token=" + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            this.user = res.data.data;
          }else{
            Toast(res.data.message);
          }
        });
      },
      // 地址三级联动
      onMyAddressChange(picker, values) {
        console.log(values[0].children[0].children);
        // console.log([values[0]][0].children[0].children);
        if(myaddress[0].values){ //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
          picker.setSlotValues(1, values[0].children[0].children); // Object.keys()会返回一个数组，当前省的数组
          picker.setSlotValues(2, myaddress[values[0]][values[0]]); // 区/县数据就是一个数组
          this.myAddressProvince = myaddress[values[0]];
          this.myAddressCity = values[1];
          this.myAddressArea = values[2];
        }
      },
      // 省份改变
      provinceChange(picker, values) {
        // console.log(values);
      },
      // 城市改变
      cityChange() {

      },
      // 区县改变
      areaChange() {

      },
      // 获取地址信息 - 省市区
      getAddress() {
        this.addressPopup = true;
        // this.getProvince();         // 获取所有省份
      },
      // 获取所有省份
      getProvince() {
        axios.get(api.get_provinces).then(res => {
          if(res.data.status == 200){
            this.province_slots.values = res.data.data;
            console.log(this.province_slots);
          }else{
            Toast(res.data.message);
          }
        });
      },
      // 获取省份下城市
      getCity() {
        axios.get(api.get_citys).then(res => {
          if(res.data.status == 200){
            this.slots = res.data.data;
          }else{
            Toast(res.data.message);
          }
        });
      },
      // 获取城市下的区县
      getArea() {
        axios.get(api.get_areas).then(res => {
          if(res.data.status == 200){
            this.slots = res.data.data;
          }else{
            Toast(res.data.message);
          }
        });
      },
      // 设置默认地址
      defaultAddress() {
        if(this.address.uadefault == "0") {
          this.address.uadefault = "1";
        }else if(this.address.uadefault == "1") {
          this.address.uadefault = "0";
        }
      },
      // 保存地址
      submitAddress() {
        if(!this.address.uaname){
          Toast("请先输入收件人姓名");
          return false;
        }else if(!this.address.uaphone){
          Toast("请先输入收件人手机号");
          return false;
        }else if(!this.address.uatext){
          Toast("请先输入详细地址");
          return false;
        }
        console.log(this.address, this.address.uadefault);


        axios.post(api.add_address + '?token=' + localStorage.getItem('token'), this.address).then(res => {
          if(res.data.status == 200){
            Toast("添加成功");
          }else{
            Toast(res.data.message);
          }
        });
      }
    },
    created() {
      common.changeTitle('添加地址');
      this.getUser();         // 获取用户信息

      this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex = 0
        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
      });
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/personal";

  .m-address-popup {
    width: 750px;
    .m-popup-btn {
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      padding: 20px 40px 0 40px;
    }
    .m-popup-row {
      display: flex;
      .m-row-left {

      }
      .m-row-right {

      }
    }
  }
  .m-foot-btn-save {
    span{
      text-align: center;
      display: inline-block;
      width: 610px;
      height: 106px;
      line-height: 106px;
      background-color: @mainColor;
      font-size: 38px;
      font-weight: bold;
      border-radius: 10px;
      box-shadow: 0 5px 6px rgba(0,0,0,0.16);
    }
  }
</style>
