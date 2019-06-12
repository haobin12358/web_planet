<template>
  <div class="container">
    <section class="tool-bar">
      <el-form :inline="true" size="medium">
        <el-form-item label="活动开始时间">
          <el-col :span="11">
            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="inlineForm.starttime"
                            placeholder="起始日期"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="middle-line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="inlineForm.endtime" placeholder="结束日期"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="inlineForm.avstatus" @change="doSearch">
            <el-option v-for="(value, key) in statusOption" :label="value" :value="key" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" :loading="loading" @click="doSearch">查询</el-button>
          <el-button icon="el-icon-refresh" :loading="loading" @click="doReset">重置</el-button>
        </el-form-item>
      </el-form>
    </section>

    <el-table :data="tableData" v-loading="loading" :cell-class-name="cellFunction" @selection-change="handleSelectionChange">>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="审批内容" align="center">
        <el-table-column label="商品图片" align="center"  width="100">
          <template slot-scope="scope">
            <table-cell-img :src="[scope.row.content.prmainpic]" :key="scope.row.avid"></table-cell-img>
            <!--{{scope.row.content.product}}-->
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" prop="content.prtitle" width="220"></el-table-column>
        <el-table-column label="参与时间" align="center" prop="content.gpday" width="180"></el-table-column>
        <el-table-column label="活动价格" align="center" prop="content.prprice" width="120"></el-table-column>
        <el-table-column align="center" label="sku" width="120">
          <template slot-scope="scope">
            <product-sku :skus="scope.row.content.skus" :prattribute="scope.row.content.prattribute"></product-sku>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="发起人" align="center">
        <el-table-column label="姓名" prop="start.adname" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.start">
              {{scope.row.start.adname || scope.row.start.suname || scope.row.start.usname  }}
            </span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="当前审批层级" prop="avlevel" align="center" width="120"></el-table-column>
      <el-table-column label="审批创建时间" prop="createtime" align="center" width="180"></el-table-column>
      <el-table-column label="状态" prop="avlevel" align="center">
        <template slot-scope="scope">
          <el-tag :type="tagsType(scope.row.avstatus).type">{{tagsType(scope.row.avstatus).label}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220" fixed="right">
        <template slot-scope="scope">
          <template v-if="scope.row.avstatus == 0">
            <el-button type="text" class="success-text" @click="pass(scope.row)">通过</el-button>
            <el-button type="text" class="danger-text" @click="nopass(scope.row)">不通过</el-button>
          </template>
          <el-popover :key="scope.row.avid" v-if="[0,10].includes(scope.row.avstatus)" placement="left" trigger="click"
                      @show="showStep(scope.row)">
            <div style="padding: 20px;width: 300px;">
              <el-steps direction="vertical" :active="steps.length">
                <el-step v-for="item in steps" :title="item.anaction" :key="item.anid"
                         :description="item.avadname +': '+ item.anabo"></el-step>
              </el-steps>
            </div>
            <el-button slot="reference" type="text" style="margin-left: 10px;">查看记录</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="m-alert-btn">
      <span class="m-alert success-text" @click="pass(multipleSelection,'all')">批量通过</span>
      <span class="m-alert" @click="nopass(multipleSelection,'all')">批量拒绝</span>
    </div>
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
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg";
  import ProductSku from "src/views/product/components/productSku";

  //  toguessnum
  export default {
    name: "groupActiAudit",

    components: {TableCellImg, ProductSku},

    data() {
      return {
        inlineForm: {
          starttime: '',
          endtime: '',
          avstatus: 'wait_check',
        },
        statusOption: {
          all: '全部',
          "agree": "已同意",
          "cancle": "已撤销",
          "reject": "已拒绝",
          "wait_check": "审核中"
        },

        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],

        steps: [],
        multipleSelection: []
      }
    },

    computed: {},

    methods: {
      doSearch() {
        if (this.inlineForm.starttime && this.inlineForm.endtime) {
          if (new Date(this.inlineForm.starttime) > new Date(this.inlineForm.endtime)) {
            let term = this.inlineForm.endtime;

            this.inlineForm.endtime = this.inlineForm.starttime;
            this.inlineForm.starttime = term;
          }
        }

        this.getList();
      },
      doReset() {
        this.inlineForm = {
          starttime: '',
          endtime: '',
          avstatus: 'wait_check',
        };
        this.doSearch();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;

      },
      getList() {
        this.loading = true;
        this.$http.get(this.$api.get_approval_list, {
          noLoading: true,
          params: {
            page_size: this.pageSize,
            page_num: this.currentPage,

            ptid: 'togroupgoods',
            ...this.inlineForm,
          }
        }).then(
          res => {
            this.loading = false;
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.tableData = data;
              this.total = resData.total_count;
            }
          }
        )
      },
      sizeChange(pageSize) {
        this.pageSize = pageSize;
        this.currentPage = 1;

        this.getList();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getList();
      },

      cellFunction({row, column}) {
        if (['avlevel'].includes(column.property)) {
          return 'money-cell'
        }
      },
      tagsType(status) {
        switch (status) {
          case -20:
            return {label: '已取消', type: 'info'};
          case -10:
            return {label: '已拒绝', type: 'danger'};
          case 0:
            return {label: '审核中', type: 'primary'};
          case 10:
            return {label: '已通过', type: 'success'};
        }
      },

      showStep(row) {
        this.$http.get(this.$api.get_approvalnotes, {
          noLoading: true,
          params: {
            avid: row.avid
          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.steps = data;
            }
          }
        )
      },

      pass(row,type) {
        this.$prompt(`确认批准?`, '提示', {
          inputPlaceholder: '审批意见',
          inputValidator: value => {
            if (!value) {
              return '意见不能为空'
            }
            if (value.length > 100) {
              return '意见文本过长(100)'
            }
          }
        }).then(
          prompt => {
            let params ;
            if(type == 'all'){
              params = [];
              for(let i in row){
                params.push({
                  "avid": row[i].avid,
                  "anaction": 1,
                  "anabo": prompt.value
                })
              }
            }else{
              params ={
                "avid": row.avid,
                "anaction": 1,
                "anabo": prompt.value
              }
            }
            this.$http.post(this.$api.deal_approval, params).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.getList();
                  this.$notify({
                    title: '批准通过成功',
                    type: 'success'
                  });
                }
              }
            )
          }
        )
      },
      nopass(row,type) {
        this.$prompt(`确认不批准?`, '提示', {
          inputPlaceholder: '审批意见',
          inputValidator: value => {
            if (!value) {
              return '意见不能为空'
            }
            if (value.length > 100) {
              return '意见文本过长(100)'
            }
          },
        }).then(
          prompt => {
            let params ;
            if(type == 'all'){
              params = [];
              for(let i in row){
                params.push({
                  "avid": row[i].avid,
                  "anaction": 1,
                  "anabo": prompt.value
                })
              }
            }else{
              params ={
                "avid": row.avid,
                "anaction": 1,
                "anabo": prompt.value
              }
            }
            this.$http.post(this.$api.deal_approval, params).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;
                  this.getList();
                  this.$notify({
                    title: '批准拒绝成功',
                    type: 'success'
                  });
                }
              }
            )
          }
        )
      }
    },

    created() {
      this.getList();
    },
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
   .m-alert-btn{
    padding: 20px;
     color: #F56C6C;
     span{
       margin-right: 20px;
       cursor: pointer;
     }
   }
  }
</style>
