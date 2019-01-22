<template>
  <div class="container">
    <el-dialog :visible="visible" @close="doClose" v-el-drag-dialog title="收货地址列表(按esc或点x关闭)" fullscreen
               :close-on-click-modal="false">
      <el-table :data="supplizerAddressList" v-loading="loading" empty-text="新增地址后可选择退货地址,退款表单填充默认地址信息">
        <el-table-column prop="uaname" label="选用该地址" width="120" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="doChooseAddress(scope.row)">选用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="uaname" label="收货人" width="180" align="center"></el-table-column>
        <el-table-column prop="uaphone" label="手机号" width="180" align="center"></el-table-column>
        <el-table-column prop="addressinfo" label="收货地址" align="center"></el-table-column>
        <el-table-column prop="uapostalcode" label="邮编" align="center" width="120"></el-table-column>
        <el-table-column prop="uadefault" label="是否默认" width="120" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.uadefault" :active-value="1" :inactive-value="0" @change="updateUaDefault(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" :render-header="addressHeaderRender" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="doEditAddress(scope.row)">编辑</el-button>
            <el-button type="text" class="danger-text" @click="doDeleteAddress(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <section class="table-bottom">
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="sizeChange"
          @current-change="pageChange">
        </el-pagination>
      </section>
    </el-dialog>

    <el-dialog :visible.sync="addressDlgVisible" width="900px" :title="addressForm.aaid ? '编辑地址' : '新增地址'">
      <el-form :model="addressForm" :rules="rules" ref="addressForm" label-position="left" label-width="120px">
        <el-form-item label="收货人" prop="uaname">
          <el-input v-model.trim="addressForm.uaname"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="uaphone">
          <el-input v-model.trim="addressForm.uaphone"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="省市区" prop="aaid">
          <el-select v-model="provid" :loading="provLoading" @change="handleSelectProv">
            <el-option v-for="item in provs" :key="item.apid" :label="item.apname" :value="item.apid"></el-option>
          </el-select>
          <el-select v-model="cityid"  :loading="cityLoading" @change="handleSelectCity">
            <el-option v-for="item in cities" :key="item.acid" :label="item.acname" :value="item.acid"></el-option>
          </el-select>
          <el-select  :loading="areaLoading" v-model="addressForm.aaid">
            <el-option v-for="item in areas" :key="item.aaid" :label="item.aaname" :value="item.aaid"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="收货地址" prop="uatext">
          <el-input v-model.trim="addressForm.uatext"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="uapostalcode">
          <el-input v-model.trim="addressForm.uapostalcode"></el-input>
        </el-form-item>
        <el-form-item label="是否设为默认地址" prop="uadefault">
          <el-switch v-model="addressForm.uadefault" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDlgVisible =false">取 消</el-button>
        <el-button type="primary" @click="doSaveAddress">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import elDragDialog from 'src/directive/el-dragDialog'

  export default {
    name: "AddressMaintain",

    components: {},

    directives: {elDragDialog},

    props: ['visible'],
    data() {
      return {

        addressForm: {
          "uaid": "",

          "uaname": "",
          "uaphone": "",
          "aaid": "",
          "uatext": "",
          "uapostalcode": "",
          "uadefault": 0
        },
        rules: {
          uaname: [
            {required: true, message: '收货人必填', trigger: 'blur'}
          ],
          uaphone: [
            {required: true, message: '手机号必填', trigger: 'blur'}
          ],
          uatext: [
            {required: true, message: '收货地址必填', trigger: 'blur'}
          ],
          aaid: [
            {required: true, message: '省市县必选', trigger: 'blur'}
          ],
        },

        supplizerAddressList: [],
        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,

        addressDlgVisible: false,
        provLoading: false,
        provid: '',
        provs: [],

        cityLoading: false,
        cityid: '',
        cities: [],

        areaLoading: false,
        areaid: '',
        areas: [],
      }
    },

    watch: {
      visible(val) {
        if (val) {
          this.getAddressList();
        }
      }
    },

    computed: {},

    methods: {
      handleSelectProv(reset = true){
        this.cityLoading = true;

        this.$http.get(this.$api.get_citys,{
          noLoading: true,
          params: {
            apid: this.provid
          }
        }).then(
          res => {
            this.cityLoading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.cities = data;
              if(reset){
                this.cityid = '';
                this.areas = [];
                this.addressForm.aaid = '';
              }
            }
          }
        )
      },
      handleSelectCity(reset){
        this.areaLoading = true;

        this.$http.get(this.$api.get_areas,{
          noLoading: true,
          params: {
            acid: this.cityid
          }
        }).then(
          res => {
            this.areaLoading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.areas = data;
              if(reset){
                this.addressForm.aaid = '';
              }
            }
          }
        )
      },


      doClose() {
        this.$emit('close');
      },

      addressHeaderRender(h, {column}) {
        return h('el-button', {
          props: {
            type: 'primary',
          },
          on: {
            click: () => {
              this.doAddAddress();
            }
          }
        }, '新增');
      },

      doChooseAddress(row){
        this.$emit('choose', row);
      },

      initForm() {
        this.addressForm = {
          "aaid": "",

          "uaname": "",
          "uaphone": "",
          "uatext": "",
          "uapostalcode": "",
          "uadefault": 0
        }
        this.provLoading = true;
        this.$http.get(this.$api.get_provinces,{
          noLoading: true,
          params: {

          }
        }).then(
          res => {
            this.provLoading = false;

            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.provs = data;
            }
          }
        )
      },
      doAddAddress() {
        this.initForm();
        this.addressDlgVisible = true;
      },
      doEditAddress(row) {
        this.initForm();
        this.addressDlgVisible = true;

        this.addressForm = {
          "uaid": row.uaid,

          "uaname": row.uaname,
          "uaphone": row.uaphone,
          "uatext": row.uatext,
          "uapostalcode": row.uapostalcode,
          "uadefault": row.uadefault,
        }

        this.provid = row.apid;
        this.handleSelectProv(false);
        this.cityid = row.acid;
        this.handleSelectCity(false);
        this.addressForm.aaid = row.aaid;
      },

      updateUaDefault(row){
        this.$http.post(this.$api.update_address, row).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                  data = res.data.data;

              this.getAddressList();
              this.$notify({
                title: `默认地址切换成功`,
                type: 'success',
              });
            }
          }
        )
      },
      doSaveAddress() {
        this.$refs.addressForm.validate(
          valid => {
            if (valid) {
              let type = this.addressForm.uaid ? '地址修改' : '地址新增';

              if (this.addressForm.uaid) {
                this.$http.post(this.$api.update_address, this.addressForm).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                        data = res.data.data;

                      this.getAddressList();
                      this.addressDlgVisible = false;
                      this.$notify({
                        title: `${type}成功`,
                        message: `手机号:${this.addressForm.uaphone}`,
                        type: 'success'
                      });
                    }
                  }
                )
              } else {
                this.$http.post(this.$api.add_address, this.addressForm).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                        data = res.data.data;

                      this.getAddressList();
                      this.$notify({
                        title: `${type}成功`,
                        message: `手机号:${this.addressForm.uaphone}`,
                        type: 'success'
                      });
                    }
                  }
                )
              }
            } else {
              this.$message.warning('请根据校验信息完善表单!');
            }
          }
        )
      },

      doDeleteAddress(row) {
        this.$confirm(`确认删除地址(${row.uaphone})?`,'提示').then(
          ()=>{
            this.$http.post(this.$api.update_address,{
              "uaid": row.uaid,

              "uaname": row.uaname,
              "uaphone": row.uaphone,
              "uatext": row.uatext,
              "aaid": row.aaid,
              "uapostalcode": row.uapostalcode,
              "uadefault": row.uadefault,
              "uaisdelete": 1
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                      data = res.data.data;

                  this.getAddressList();
                  this.$notify({
                    title: '地址删除成功',
                    message: `手机号:${row.uaphone}`,
                    type: 'success'
                  });
                }
              }
            )
          }
        )
      },
      showAdresDlgVis() {
        this.addressDlgVisible = true;
        this.getAddressList();
      },
      getAddressList() {
        this.loading = true
        this.$http.get(this.$api.get_all_address, {
          params: {
            page_num: this.currentPage,
            page_size: this.pageSize,
          }
        }).then(
          res => {
            this.loading = false
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.supplizerAddressList = data;
              this.total = resData.total_count;
            }
          }
        )
      },
      sizeChange(pageSize) {
        this.pageSize = pageSize;
        this.currentPage = 1;

        this.getAddressList();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getAddressList();
      },
    },

    created() {

    },
  }
</script>

<style lang="less" scoped>
  @import "../../../styles/myIndex";

  .container {

  }
</style>
