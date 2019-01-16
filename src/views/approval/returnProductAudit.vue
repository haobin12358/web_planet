<template>
  <div class="container">
    <section class="tool-bar">
      <el-form :inline="true" size="medium">
        <el-form-item label="申请状态">
          <el-select v-model="searchForm.orastatus" @change="doSearch">
            <el-option v-for="item in applyStatusOptions" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="searchForm.orastatus == 10" label="退货状态">
          <el-select v-model="searchForm.orstatus" @change="doSearch">
            <el-option v-for="item in refundStatusOption" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" :loading="loading" @click="doSearch">查询</el-button>
          <el-button icon="el-icon-refresh" :loading="loading" @click="doReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-switch
        v-model="expandAll"
        active-text="展开"
        inactive-text="不展开"
        style="margin-bottom: 20px"
        @change="changeSwitch">
      </el-switch>
    </section>

    <!--订单table-->
    <el-table ref="orderTable" :data="orderData" v-loading="loading" size="small" :default-expand-all="expandAll"
              @row-click="expandRow" :cell-class-name="cellFunction" :row-class-name="tableRowClassName">
      <el-table-column type="expand">
        <template slot-scope="props">
          <!--展开table-->
          <el-table :data="props.row.order_part" size="small" style="width: 100%"
                    :row-class-name="subTableRowClassName">
            <el-table-column label="订单商品退款" align="center">
              <el-table-column label="审核状态" width="120" align="center">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.order_refund_apply"
                          :type="applyStatusTagType(scope.row.order_refund_apply.orastatus_zh)">
                    {{scope.row.order_refund_apply.orastatus_zh}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="退款金额" prop="order_refund_apply.oramount" width="120"
                               align="center"></el-table-column>
              <el-table-column label="买家是否收到货" width="180" align="center">
                <template slot-scope="scope">
                  <template v-if="scope.row.order_refund_apply">
                    <el-tag :type="scope.row.order_refund_apply.oraproductstatus == 0 ? 'danger': ''">
                      {{scope.row.order_refund_apply.oraproductstatus_zh}}
                    </el-tag>
                  </template>
                </template>
              </el-table-column>
              <!--<el-table-column label="退款原因" prop="order_refund_apply.orareason" width="180" align="center" show-overflow-tooltip></el-table-column>-->
              <el-table-column label="售后期望" width="120" align="center">
                <template slot-scope="scope">
                  <template v-if="scope.row.order_refund_apply">
                    <el-tag :type="scope.row.order_refund_apply.orastate == 0 ? 'danger': ''">
                      {{scope.row.order_refund_apply.orastate_zh}}
                    </el-tag>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="退货状态" width="120" align="center">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.order_refund" :type="orstatusTagType(scope.row.order_refund.orstatus_zh)">
                    {{scope.row.order_refund.orstatus_zh}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="申请时间" width="110" prop="order_refund_apply.createtime"
                               align="center"></el-table-column>
            </el-table-column>
            <el-table-column prop="opisinora" align="center" label="退款中" width="120">
              <template slot-scope="scope">
                {{scope.row.opisinora ? '是':'否'}}
              </template>
            </el-table-column>
            <el-table-column prop="prmainpic" align="center" label="图片" width="180">
              <template slot-scope="scope">
                <table-cell-img :src="[scope.row.prmainpic]" :key="scope.row.avid"></table-cell-img>
              </template>
            </el-table-column>
            <el-table-column prop="prtitle" align="center" label=" 商品名" width="240"></el-table-column>
            <el-table-column label="规格" width="240" align="center">
              <template slot-scope="scope">
                <span>{{getSkuCellText(scope.row.skuattritedetail, scope.row.prattribute)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="opnum" align="center" label="数量" width="120"></el-table-column>
            <el-table-column prop="skuprice" align="center" label="单价" width="120"></el-table-column>
            <el-table-column prop="opsubtruetotal" align="center" label="总价" width="120"></el-table-column>


            <el-table-column label="操作" width="200" align="center" fixed="left">
              <template slot-scope="scope">
                <template v-if="scope.row.opisinora">
                  <el-button type="text" @click="gotoReturnOrderDetail(scope.row, props)">查看</el-button>
                  <template v-if="scope.row.order_refund_apply.orastatus == 0">
                    <el-button type="text" class="success-text" @click="doPass(scope.row, props)">
                      同意
                    </el-button>
                    <el-button type="text" class="danger-text" @click="doNoPass(scope.row, props)">
                      拒绝
                    </el-button>
                  </template>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column prop="omno" align="center" label="订单号" width="280"></el-table-column>
      <el-table-column v-if="checkPermission(['admin', 'super'])" prop="pbname" align="center" label="订单所属" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.prcreateid" type="success">供应商</el-tag>
          <el-tag v-else>平台</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="pbname" align="center" label="品牌" width="180"></el-table-column>
      <el-table-column label="订单状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.omstatus_zh)">{{scope.row.omstatus_zh}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="整订单退款" align="center" :render-header="wholeHeaderRender">
        <el-table-column label="审核状态" width="120" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.order_refund_apply"
                    :type="applyStatusTagType(scope.row.order_refund_apply.orastatus_zh)">
              {{scope.row.order_refund_apply.orastatus_zh}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="退款金额" prop="order_refund_apply.oramount" width="120" align="center"></el-table-column>
        <el-table-column label="买家是否收到货" width="180" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.order_refund_apply">
              <el-tag :type="scope.row.order_refund_apply.oraproductstatus == 0 ? 'danger': ''">
                {{scope.row.order_refund_apply.oraproductstatus_zh}}
              </el-tag>
            </template>
          </template>
        </el-table-column>
        <!--<el-table-column label="退款原因" prop="order_refund_apply.orareason" width="180" align="center" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column label="退款原因" prop="order_refund_apply.oranote" width="180" align="center" show-overflow-tooltip></el-table-column>-->

        <el-table-column label="售后期望" width="120" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.order_refund_apply">
              <el-tag :type="scope.row.order_refund_apply.orastate == 0 ? 'danger': ''">
                {{scope.row.order_refund_apply.orastate_zh}}
              </el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="退货状态" width="120" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.order_refund" :type="orstatusTagType(scope.row.order_refund.orstatus_zh)">
              {{scope.row.order_refund.orstatus_zh}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="110" prop="order_refund_apply.createtime" align="center"></el-table-column>
      </el-table-column>

      <el-table-column label="退款中" width="120" align="center">
        <template slot-scope="scope">
          {{scope.row.ominrefund ? '是':'否'}}
        </template>
      </el-table-column>
      <el-table-column prop="ommount" label="总价" align="center" width="120"></el-table-column>
      <el-table-column prop="omfreight" label="运费" align="center" width="120"></el-table-column>
      <el-table-column prop="omtruemount" label="实付" align="center" width="120"></el-table-column>
      <el-table-column prop="omrecvname" align="center" label="收件人" width="120"></el-table-column>
      <el-table-column prop="omrecvphone" align="center" label="手机号" width="160"></el-table-column>
      <el-table-column prop="ommessage" label="备注" width="180" align="center" show-tooltip-overflow></el-table-column>
      <el-table-column prop="createtime" label="下单时间" align="center" width="180"></el-table-column>

      <el-table-column label="操作" width="200" fixed="right" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.ominrefund">
            <template v-if="scope.row.order_refund_apply.orastatus == 0">
              <el-button type="text" class="success-text" @click="doPass(scope.row)">
                同意
              </el-button>
              <el-button type="text" class="danger-text" @click="doNoPass(scope.row)">
                拒绝
              </el-button>
            </template>
            <el-button type="text" @click="gotoReturnOrderDetail(scope.row)">查看</el-button>
          </template>
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


    <el-dialog :visible.sync="passRefundVisible" title="卖家收货地址" v-el-drag-dialog width="600px"
               :close-on-click-modal="false">
      <el-form :model="passRefundForm" :rules="rules" ref="passRefundForm" label-position="left" label-width="120px">
        <el-form-item label="收货人" prop="orrecvname">
          <el-input class="m-input-pwd" v-model.trim="passRefundForm.orrecvname"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="orrecvphone">
          <el-input class="m-input-pwd" v-model.trim="passRefundForm.orrecvphone"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="orrecvaddress">
          <el-input class="m-input-pwd" v-model.trim="passRefundForm.orrecvaddress"
                    placeholder=""></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button v-permission="['supplizer']" type="info" @click="showAdresDlgVis = true">选择地址填充</el-button>
        <el-button @click="passRefundVisible = false">取 消</el-button>
        <el-button type="primary" @click="doPassRefundOrder">确 定</el-button>
      </span>
    </el-dialog>

    <address-maintain :visible="showAdresDlgVis" @close="showAdresDlgVis = false"
                      @choose="fillReturnProdForm"></address-maintain>
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg";
  import elDragDialog from 'src/directive/el-dragDialog'
  import AddressMaintain from './components/addressMaintain'
  import permission from 'src/directive/permission/index.js' // 权限判断指令
  import checkPermission from 'src/utils/permission' // 权限判断函数

  //  toreturn
  export default {
    name: 'ReturnProductAudit',

    components: {TableCellImg, AddressMaintain},

    directives: {elDragDialog, permission},

    data() {
      return {
        repeat: true,

        //
        applyStatusOptions: [
          {
            label: '全部',
            value: '',
          }, {
            label: '已同意',
            value: 10,
          }, {
            label: '已取消',
            value: -20,
          }, {
            label: '已拒绝',
            value: -10,
          }, {
            label: '审核中',
            value: 0,
          },
        ],
        refundStatusOption: [
          {
            label: '全部',
            value: '',
          }, {
            label: '等待买家发货',
            value: 0,
          }, {
            label: '等待卖家收货',
            value: 10,
          }, {
            label: '卖家已收货',
            value: 20,
          }, {
            label: '已退款',
            value: 30,
          }, {
            label: '已拒绝',
            value: -20,
          },
        ],
        searchForm: {
          orastatus: 0,
          orstatus: '', //  同意退货退款后才有
        },

        expandAll: false,
        loading: false,
        orderData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,

        passRefundVisible: false,
        passRefundForm: {
          "orrecvname": "",
          "orrecvphone": "",
          "orrecvaddress": "",
        },
        rules: {
          orrecvname: [
            {required: true, message: '收货人必填', trigger: 'blur'}
          ],
          orrecvphone: [
            {required: true, message: '手机号必填', trigger: 'blur'}
          ],
          orrecvaddress: [
            {required: true, message: '收货地址必填', trigger: 'blur'}
          ],
        },

        showAdresDlgVis: false,
      }
    },

    computed: {},

    methods: {
      checkPermission,

      doSearch() {
        this.currentPage = 1;
        this.setOrderList();
      },
      doReset() {
        this.searchForm = {
          orastatus: '',
          orstatus: '',
        };
        this.setOrderList();
      },

      changeSwitch() {
        for (let i = 0; i < this.orderData.length; i++) {
          this.$refs.orderTable.toggleRowExpansion(this.orderData[i], this.expandAll);
        }
      },

      expandRow(row) {
        this.$refs.orderTable.toggleRowExpansion(row);
      },
      cellFunction({row, column}) {
        if (['ommount', 'omfreight', 'omtruemount', 'order_refund_apply.oramount'].includes(column.property)) {
          return 'money-cell'
        }
      },
      tagType(statusZh) {
        switch (statusZh) {
          //  待支付 待发货
          case '待支付':
            return 'primary'
          case '待发货':
            return 'danger'
          case '已发货':
            return 'success'
          case '退款中':
            return 'warning'
          default:
            return 'info'
        }
      },
      applyStatusTagType(statusZh) {
        switch (statusZh) {
          case '未审核':
            return 'primary'
          case '已撤销':
            return 'info'
          case '已同意':
            return 'success'
          case '已拒绝':
            return 'danger'
        }
      },
      orstatusTagType(statusZh) {
        switch (statusZh) {
          case '已退款':
            return 'success'
          case '已拒绝':
            return 'info'
        }
      },

      tableRowClassName({row, rowIndex}) {
        let isOrderPartRefund = row.order_part.some(item => item.opisinora);

        if (row.ominrefund || isOrderPartRefund) {
          return 'warning-row';
        }

        return ''
      },

      getSkuCellText(detail, attribute) {
        let rst = '';

        for (let i = 0; i < detail.length; i++) {
          rst += attribute[i] + ': ' + detail[i];

          if (i + 1 < detail.length) {
            rst += ', '
          }
        }

        return rst;
      },
      subTableRowClassName({row, rowIndex}) {
        if (row.opisinora) {
          return 'warning-row';
        }

        return ''
      },

      setOrderList() {
        this.loading = true;
        this.$http.get(this.$api.get_all_order, {
          noLoading: true,
          params: {
            page_size: this.pageSize,
            page_num: this.currentPage,
            omstatus: 'inrefund',

            ...this.searchForm
          }
        }).then(
          res => {
            this.loading = false;

            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.orderData = data;
              this.total = resData.total_count;
            }
          }
        )
      },
      wholeHeaderRender(h, {column}) {
        return (
          <el-tooltip class="tooltip" placement="top">
            <ul class="table-header-tip" slot="content">
              <li>列表行底色为浅橘色时表示该行数据处在售后状态,订单行(未展开)标黄</li>
              <li>表示该退款订单只有一件商品,订单行未标黄表示订单商品含标黄退款商品</li>
            </ul>
            <div>{column.label}
              <i class="el-icon-question"></i>
            </div>
          </el-tooltip>
        )
      },
      sizeChange(pageSize) {
        this.expandAll = false;
        this.pageSize = pageSize;
        this.currentPage = 1;

        this.setOrderList();
      },
      pageChange(page) {
        this.expandAll = false;
        this.currentPage = page;
        this.setOrderList();
      },

      gotoReturnOrderDetail(row, props) {
        let query = {};

        if (props) {  //  订单商品退款查看
          query = {
            omid: props.row.omid,
            opid: row.opid
          }
        } else {
          query = {
            omid: row.omid,
          }
        }

        this.$router.push({
          path: '/approval/returnProdOrderDetail',
          query,
        })
      },
      //  点击同意
      doPass(row, props) {
        if (row.order_refund_apply.orastate == 0) {
          this.passRefundVisible = true;
          this.passRefundForm.oraid = row.order_refund_apply.oraid;
          this.passRefundForm.message = `订单号:${row.omno || props.row.omno + '-' + row.prtitle}`;
        } else {
          this.$confirm(`确认同意申请(将退回金额${row.order_refund_apply.oramount}元)?`, '提示').then(
            () => {
              this.$http.post(this.$api.agree_refund_apply, {
                "oraid": row.order_refund_apply.oraid,
                "agree": true,
              }).then(
                res => {
                  if (res.data.status == 200) {
                    let resData = res.data,
                      data = res.data.data;

                    this.setOrderList();
                    this.$notify({
                      title: '退款申请已同意',
                      message: `订单号:${row.omno || props.row.omno + '-' + row.prtitle}`,
                      type: 'success'
                    });
                  }
                }
              )
            }
          )
        }
      },

      //  供应商获取默认的地址填充表单
      fillFormIfSupplizer(){
        if(this.$store.roles[0] == 'supplizer'){
          this.$http.get(this.$api.get_all_address, {
            params: {
              page_num: this.currentPage,
              page_size: 300,
            }
          }).then(
            res => {
              if (res.data.status == 200) {
                let resData = res.data,
                  data = res.data.data;

                let defaultAdres = data.find(item => item.uadefault == 1)

                if(defaultAdres){
                  this.passRefundForm.orrecvname = defaultAdres.uaname
                  this.passRefundForm.orrecvphone = defaultAdres.uaphone
                  this.passRefundForm.orrecvaddress = defaultAdres.addressinfo
                }
              }
            }
          )
        }
      },
      //  选用收货地址组件的地址
      fillReturnProdForm(row) {
        this.showAdresDlgVis = false;

        this.passRefundForm.orrecvname = row.uaname
        this.passRefundForm.orrecvphone = row.uaphone
        this.passRefundForm.orrecvaddress = row.addressinfo
      },

      doPassRefundOrder() {
        this.$refs.passRefundForm.validate(
          valid => {
            if (valid) {
              this.$http.post(this.$api.agree_refund_apply, {
                "oraid": this.passRefundForm.oraid,
                "agree": true,
                "orrecvname": this.passRefundForm.orrecvname,
                "orrecvphone": this.passRefundForm.orrecvphone,
                "orrecvaddress": this.passRefundForm.orrecvaddress,
              }).then(
                res => {
                  if (res.data.status == 200) {
                    let resData = res.data,
                      data = res.data.data;

                    this.setOrderList();
                    this.$notify({
                      title: '退货申请已同意',
                      message: this.passRefundForm.message,
                      type: 'success'
                    });
                    this.passRefundForm = {
                      "orrecvname": "",
                      "orrecvphone": "",
                      "orrecvaddress": "",
                    };
                    this.passRefundVisible = false;
                  }
                }
              )
            } else {
              this.$message.warning('请根据校验信息完善表单!');
            }
          }
        );
      },

      doNoPass(row, props) {
        this.$prompt(`确认拒绝退货申请?`, '提示', {
          inputPlaceholder: '拒绝理由',
          inputValidator: value => {
            if (!value) {
              return '拒绝理由不能为空'
            }
            if (value.length > 100) {
              return '拒绝理由文本过长(100)'
            }
          }
        }).then(
          prompt => {
            this.$http.post(this.$api.agree_refund_apply, {
              "oraid": row.order_refund_apply.oraid,
              "agree": false,
              oracheckreason: prompt.value,
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.setOrderList();
                  this.$notify({
                    title: '退货申请已拒绝',
                    message: `订单号:${row.omno || props.row.omno + '-' + row.prtitle}`,
                    type: 'success'
                  });
                }
              }
            )
          }
        )
      },
    },

    activated() {
      if (this.repeat) {
        this.repeat = true;
      } else {
        this.setOrderList();
      }
    },

    created() {
      this.setOrderList();
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {

  }
</style>
