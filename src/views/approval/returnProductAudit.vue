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
          <el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
          <el-button icon="el-icon-refresh" @click="doReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-switch
        v-model="expandAll"
        active-text="展开"
        inactive-text="不展开"
        active-color="#13ce66"
        inactive-color="#ff4949"
        style="margin-bottom: 20px"
        @change="changeSwitch">
      </el-switch>
    </section>

    <!--订单table-->
    <el-table ref="orderTable" :data="orderData" v-loading="loading" size="small" :default-expand-all="expandAll"
              style="width: 100%;" @row-dblclick="expandRow" :cell-class-name="cellFunction"
              :row-class-name="tableRowClassName">
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
                    <el-tag  v-if="scope.row.order_refund" :type="orstatusTagType(scope.row.order_refund.orstatus_zh)">
                      {{scope.row.order_refund.orstatus_zh}}
                    </el-tag>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="opisinora" align="center" label="退款中" width="120">
              <template slot-scope="scope">
                {{scope.row.opisinora ? '是':'否'}}
              </template>
            </el-table-column>
            <el-table-column prop="prmainpic" align="center" label="图片" width="180">
              <template slot-scope="scope">
                <table-cell-img :src="scope.row.prmainpic"></table-cell-img>
              </template>
            </el-table-column>
            <el-table-column prop="prtitle" align="center" label=" 商品名" width="240"></el-table-column>
            <el-table-column label="规格" width="240">
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
                      审核通过
                    </el-button>
                    <el-button type="text" class="danger-text" @click="doNoPass(scope.row, props)">
                      审核拒绝
                    </el-button>
                  </template>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column prop="omno" align="center" label="订单号" width="280"></el-table-column>
      <el-table-column prop="pbname" align="center" label="品牌" width="180"></el-table-column>
      <el-table-column label="订单状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.omstatus_zh)">{{scope.row.omstatus_zh}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="整订单退款" align="center">
        <el-table-column label="审核状态" width="120" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.order_refund_apply"
                    :type="applyStatusTagType(scope.row.order_refund_apply.orastatus_zh)">
              {{scope.row.order_refund_apply.orastatus_zh}}
            </el-tag>
          </template>
        </el-table-column>
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
            <el-tag v-if="scope.row.order_refund"  :type="orstatusTagType(scope.row.order_refund.orstatus_zh)">
              {{scope.row.order_refund.orstatus_zh}}
            </el-tag>
          </template>
        </el-table-column>
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

    <el-dialog :visible.sync="passRefundVisible" title="卖家收货地址" :close-on-click-modal="false">
      <el-form :model="passRefundForm" :rules="rules" ref="passRefundForm" label-width="120px">
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
        <el-button @click="passRefundVisible = false">取 消</el-button>
        <el-button type="primary" @click="doPassRefundOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg";

  //  toreturn
  export default {
    name: 'ReturnProductAudit',

    components: {TableCellImg},

    data() {
      return {
        applyStatusOptions: [
          {
            label: '全部',
            value: '',
          }, {
            label: '已取消',
            value: -20,
          }, {
            label: '已拒绝',
            value: -10,
          }, {
            label: '未审核',
            value: 0,
          }, {
            label: '已同意',
            value: 10,
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
          orastatus: '',
          orstatus: '', //  同意退货退款后才有
        },

        expandAll: true,
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
      }
    },

    computed: {},

    methods: {
      doSearch() {
        this.currentPage = 1;
        this.setOrderList();
      },
      doReset() {
        this.searchForm = {
          orastatus: '',
          orstatus: '',
        }
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
        if (['ommount', 'omfreight', 'omtruemount'].includes(column.property)) {
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
      orstatusTagType(statusZh){
        switch (statusZh) {
          case '已退款':
            return 'success'
          case '已拒绝':
            return 'info'
        }
      },

      tableRowClassName({row, rowIndex}) {
        if (row.ominrefund) {
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
      sizeChange(pageSize) {
        this.expandAll = true;
        this.pageSize = pageSize;
        this.currentPage = 1;

        this.setOrderList();
      },
      pageChange(page) {
        this.expandAll = true;
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

        // console.log(row, props);
        // console.log(query);
        // return

        this.$router.push({
          path: '/approval/returnProdOrderDetail',
          query,
        })
      },
      doPass(row, props) {
        if (row.order_refund_apply.orastate == 0) {
          this.passRefundVisible = true;
          this.passRefundForm.oraid = row.order_refund_apply.oraid;
          this.passRefundForm.message = `订单号:${row.omno || props.row.omno + '-' + row.prtitle}`;
        } else {
          this.$confirm(`确认同意申请?`, '提示').then(
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
                      title: '申请已同意',
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
                      title: '申请已同意',
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
        this.$confirm(`确认拒绝申请?`, '提示').then(
          () => {
            this.$http.post(this.$api.agree_refund_apply, {
              "oraid": row.order_refund_apply.oraid,
              "agree": false,
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                      data = res.data.data;

                  this.setOrderList();
                  this.$notify({
                    title: '申请已拒绝',
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
