<template>
  <div class="container">
    <template v-if="order_refund_apply.orastate == 0">
      <block-title title="退货订单流程"></block-title>
      <section class="tool-tip-wrap detail-section">
        <el-steps :active="orderStep" align-center>
          <el-step v-for="item in showSteps" :title="item.title" :key="item.title"
                   :description="item.description"></el-step>
        </el-steps>
      </section>
    </template>

    <section class="detail-section row-two">
      <section class="order-detail">
        <h1 class="title">
          订单详情
        </h1>
        <div class="detail-item-wrap">
          <p class="detail-item">
            <span class="label">订单号:</span>
            <span class="value">{{order.omno}}</span>
          </p>
          <p class="detail-item">
            <span class="label">订单状态:</span>
            <span class="value">{{order.omstatus_zh}}</span>
          </p>

          <p class="detail-item">
            <span class="label">总价:</span>
            <span class="value">￥ {{order.ommount}}</span>
          </p>
          <p class="detail-item">
            <span class="label">实付:</span>
            <span class="value">￥ {{order.omtruemount}}</span>
          </p>

          <p class="detail-item">
            <span class="label">下单时间:</span>
            <span class="value">{{order.createtime}}</span>
          </p>
          <p class="detail-item">
            <span class="label">收件人:</span>
            <span class="value">{{order.omrecvname}}</span>
          </p>
          <p class="detail-item">
            <span class="label">手机号:</span>
            <span class="value">{{order.omrecvphone}}</span>
          </p>
          <p class="detail-item">
            <span class="label">收货地址:</span>
            <span class="value">
              {{order.omrecvaddress}}
            </span>
          </p>
          <p class="detail-item">
            <span class="label">买家留言:</span>
            <span class="value">{{order.ommessage || '无'}}</span>
          </p>

        </div>
      </section>
      <section class="order-detail refund">
        <h1 class="title">
          售后详情
        </h1>
        <div class="detail-item-wrap">
          <p class="detail-item">
            <span class="label">买家申请退款时间:</span>
            <span class="value">{{order_refund_apply.createtime}}</span>
          </p>
          <p class="detail-item">
            <span class="label">审核状态:</span>
            <span class="value">{{order_refund_apply.orastatus_zh}}</span>
          </p>
          <p class="detail-item">
            <span class="label">退款金额:</span>
            <span class="value">￥{{order_refund_apply.oramount}}</span>
          </p>
          <p class="detail-item">
            <span class="label">买家是否收到货:</span>
            <span class="value">{{order_refund_apply.oraproductstatus_zh}}</span>
          </p>
          <p class="detail-item">
            <span class="label">售后期望:</span>
            <span class="value">{{order_refund_apply.orastate_zh}}</span>
          </p>
          <p class="detail-item">
            <span class="label">买家退款原因:</span>
            <span class="value">{{order_refund_apply.orareason || '无'}}</span>
          </p>
          <p class="detail-item">
            <span class="label">买家附加退款原因:</span>
            <span class="value">{{order_refund_apply.oraaddtion || '无'}}</span>
          </p>
          <p class="detail-item">
            <span class="label">凭证:</span>
            <span class="value">
              <template v-if="order_refund_apply.oraddtionvoucher && order_refund_apply.oraddtionvoucher.length">
                <img class="table-pic many" v-for="item in order_refund_apply.oraddtionvoucher" :src="item"
                     v-lazy="item"
                     @click="handleVoucher(item)" alt="">
              </template>
              <span v-else>无</span>
            </span>
          </p>
        </div>

        <template v-if="order_refund_apply.orastatus == 0">
          <el-button type="success" @click="doPass">同意</el-button>
          <el-button type="warning" @click="doNoPass">不同意</el-button>
        </template>

        <el-button style="margin-right: 10px;" type="primary" @click="doConfirmReceipt"
                   v-if="order_refund.orstatus == 10">确认收货(退货订单)
        </el-button>
        <template v-if="order_refund.orstatus == 20">
          <el-button style="margin-right: 10px;" type="primary" @click="doConfirmBackMoney(true)">确认退款(退货订单)</el-button>
          <el-button style="margin-right: 10px;" type="danger" @click="doConfirmBackMoney(false)">拒绝退款(退货订单)</el-button>
        </template>

        <!--<el-button style="margin-right: 10px;" type="primary" @click="doDeliver" icon="el-icon-success" v-if="order.omstatus == 10">确定发货-->
        <!--</el-button>-->
        <template v-if="order_refund_apply.orastate == 0">
          <el-popover v-if="order_refund.orlogisticdata && order_refund.orlogisticdata.list"
                      placement="left" trigger="hover">
            <div style="padding: 20px">
              <el-steps direction="vertical" :active="order_refund.orlogisticdata.list.length">
                <el-step v-for="item in order_refund.orlogisticdata.list" :title="item.time" :key="item.time"
                         :description="item.status"></el-step>
              </el-steps>
            </div>
            <el-button slot="reference" icon="el-icon-search">查看退货物流信息</el-button>
          </el-popover>
         <!-- <el-button v-else type="warning">退货物流信息:{{ order_refund.orlogisticdata ?
            order_refund.orlogisticdata.msg: ''}}
          </el-button>-->
        </template>
      </section>
    </section>

    <block-title title="售后商品"></block-title>
    <el-table :data="order.order_part" stripe style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="prmainpic" align="center" label="图片" width="180">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.prmainpic"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column prop="prtitle" align="center" label=" 商品名" width="240"></el-table-column>
      <el-table-column align="center" label="规格">
        <template slot-scope="scope">
          <span>{{getSkuCellText(scope.row.skuattritedetail, scope.row.prattribute)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="opnum" align="center" label="数量" width="120"></el-table-column>
      <el-table-column prop="skuprice" align="center" label="单价" width="120"></el-table-column>
      <el-table-column prop="opsubtruetotal" align="center" label="总价" width="120"></el-table-column>
      <el-table-column prop="opisinora" align="center" label="退款中" width="120">
        <template slot-scope="scope">
          {{scope.row.opisinora || order.ominrefund ? '是':'否'}}
        </template>
      </el-table-column>
    </el-table>

    <!--预览大图dialog-->
    <el-dialog :visible.sync="dialogVisible" top="8vh">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <el-dialog :visible.sync="passRefundVisible" title="卖家收货地址" :close-on-click-modal="false">
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
        <el-button @click="passRefundVisible = false">取 消</el-button>
        <el-button type="primary" @click="doPassRefundOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg";

  export default {
    name: "ReturnProdOrderDetail",

    components: {TableCellImg},

    data() {
      return {
        orderStep: 0,
        showSteps: [
          {
            title: '等待买家发货',
            description: '',
          }, {
            title: '等待收货',
            description: '',
          }, {
            title: '已收货',
            description: '',
          }, {
            title: '已退款',
            description: '',
          },
        ],

        order: {},
        order_refund_apply: {},
        order_refund: {},

        //  大图预览
        dialogImageUrl: '',
        dialogVisible: false,

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
      tableRowClassName({row, rowIndex}) {
        if (row.opisinora || this.order.ominrefund) {
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

      //  确认收货 退货订单的物流
      doConfirmReceipt() {
        this.$confirm(`确认收货?`, '提示').then(
          () => {
            this.$http.post(this.$api.back_confirm_recv, {
              oraid: this.order_refund.oraid
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.init();
                  this.$notify({
                    title: '收货成功',
                    type: 'success'
                  });
                }
              }
            )

          }
        )
      },
      //  处理已收货的退货订单
      doConfirmBackMoney(agree) {
        this.$confirm(`${agree ? '同意' : '拒绝'}退款(退货订单)?`, '提示').then(
          () => {
            this.$http.post(this.$api.back_confirm_refund, {
              "oraid": this.order_refund.oraid,
              "agree": agree
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.init();
                  this.$notify({
                    title: `退款已${agree ? '同意' : '拒绝'}`,
                    type: 'success'
                  });
                }
              }
            )
          }
        )
      },

      doPass() {
        if (this.order_refund_apply.orastate == 0) {
          this.passRefundVisible = true;
          this.passRefundForm.oraid = this.order_refund_apply.oraid;
          this.passRefundForm.message = `订单号:${this.order.omno || this.order.omno + '-' + this.order.prtitle}`;
        } else {
          this.$confirm(`确认同意退货申请?`, '提示').then(
            () => {
              this.$http.post(this.$api.agree_refund_apply, {
                "oraid": this.order_refund_apply.oraid,
                "agree": true,
              }).then(
                res => {
                  if (res.data.status == 200) {
                    let resData = res.data,
                      data = res.data.data;

                    this.init();
                    this.$notify({
                      title: '退货申请已同意',
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

                    this.init();
                    this.$notify({
                      title: '申请已同意',
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
      doNoPass() {
        this.$confirm(`确认拒绝退货申请?`, '提示').then(
          () => {
            this.$http.post(this.$api.agree_refund_apply, {
              "oraid": this.order_refund_apply.oraid,
              "agree": false,
            }).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.init();
                  this.$notify({
                    title: '退货申请已拒绝',
                    type: 'success'
                  });
                }
              }
            )
          }
        )
      },

      //  预览图
      handleVoucher(url) {
        this.dialogImageUrl = url;
        this.dialogVisible = true;
      },

      init() {
        this.$http.get(this.$api.get_order_by_LOid, {
          params: {
            omid: this.$route.query.omid
          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              if (this.$route.query.opid) { //  订单商品
                data.order_part = data.order_part.filter(item => item.opid == this.$route.query.opid)
                this.order_refund_apply = data.order_part[0].order_refund_apply ? data.order_part[0].order_refund_apply : {};
                this.order_refund = data.order_part[0].order_refund ? data.order_part[0].order_refund : {};
              } else {
                this.order_refund_apply = data.order_refund_apply ? data.order_refund_apply :{}
                this.order_refund = data.order_refund? data.order_refund :{}
              }

              if (this.order_refund.orlogisticdata && this.order_refund.orlogisticdata.list) {
                this.order_refund.orlogisticdata.list = this.order_refund.orlogisticdata.list.reverse();
              }

              if (this.order_refund.orstatus) {
                switch (this.order_refund.orstatus) {
                  case 0:
                    this.orderStep = 0;
                    break;
                  case 10:
                    this.orderStep = 1;
                    break;
                  case 20:
                    this.orderStep = 3;
                    break;
                  case 30:
                    this.orderStep = 4;
                    break;
                }
              }

              this.order = data;
            }
          }
        );
      }
    },


    created() {
      this.init();
    },
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .tool-tip-wrap {
      padding: 40px;
    }

    .detail-section {
      margin-bottom: 30px;
    }

    .row-two {
      .fj();

      .order-detail {
        border: 1px dotted black;
        flex: 1;
        border-radius: 10px;
        .fz(10px);
        padding: 20px;
        margin-right: 20px;

        /*&.refund {
          margin-right: 0;

          .detail-item-wrap {
            display: block;

            .detail-item {
              .fj();
              .label {
                display: inline-block;
                width: 140px;
                margin-right: 10px;
              }
              .value {
                flex: 1;
              }
            }
          }
        }*/

        .title {
          margin-bottom: 20px;
          font-size: 20px;
        }

        .detail-item-wrap {
          display: block;
          font-size: 14px;

          .detail-item {
            .fj();
            .label {
              display: inline-block;
              width: 120px;
              margin-right: 10px;
              margin-bottom: 10px;
            }
            .value {
              flex: 1;
            }
          }
        }
      }

      .order-action-block {
        border: 1px dotted black;
        flex: 1;
        border-radius: 10px;
        /*height: 10px;*/
        padding: 20px;
        box-sizing: border-box;
      }
    }
  }
</style>
