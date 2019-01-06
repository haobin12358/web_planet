<template>
  <div class="container">
    <el-table :data="tableData" v-loading="loading">
      <el-table-column label="审批内容" align="center">
        <el-table-column label="商品规格图片" align="center" prop="prdescription">
          <template slot-scope="scope">
            <table-cell-img :src="scope.row.content.skupic" :key="scope.row.content.product.skupic"></table-cell-img>
          </template>
        </el-table-column>
        <el-table-column label="品牌" align="center" prop="content.product.pbname"></el-table-column>
        <el-table-column label="商品名称" align="center" prop="content.product.prtitle" show-overflow-tooltip></el-table-column>
        <el-table-column label="参与日期" align="center" prop="content.gnaastarttime"></el-table-column>
        <el-table-column label="参与价格" align="center" prop="content.skuprice"></el-table-column>
        <el-table-column label="参与数量" align="center" prop="content.skustock"></el-table-column>
      </el-table-column>
      <el-table-column label="发起人" align="center">
        <el-table-column label="姓名" prop="start.adname" align="center">
          <template slot-scope="scope">
            {{scope.row.start.adname || scope.row.start.suname}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="审批层级" prop="avlevel" align="center" width="120"></el-table-column>
      <el-table-column label="状态" prop="avlevel" align="center">
        <template slot-scope="scope">
          <el-tag :type="tagsType(scope.row.avstatus).type">{{tagsType(scope.row.avstatus).label}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" fixed="right">
        <template slot-scope="scope">
          <template v-if="scope.row.avstatus == 0">
            <el-button type="text" class="success-text" @click="pass(scope.row)">通过</el-button>
            <el-button type="text" class="danger-text" @click="nopass(scope.row)">不通过</el-button>
          </template>
          <el-popover :key="scope.row.avid" v-if="[0,10].includes(scope.row.avstatus)" placement="left" trigger="click" @show="showStep(scope.row)">
            <div style="padding: 20px;width: 300px;">
              <el-steps direction="vertical" :active="steps.length">
                <el-step v-for="item in steps" :title="item.anaction" :key="item.anid"
                         :description="item.avadname +': '+ item.anabo"></el-step>
              </el-steps>
            </div>
            <el-button slot="reference" type="text" >查看记录</el-button>
          </el-popover>
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
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg";

  //  toguessnum
  export default {
    name: "GuessActiAudit",

    components: {TableCellImg},

    data() {
      return {
        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],

        steps: [],
      }
    },

    computed: {},

    methods: {
      getList() {
        this.loading = true;
        this.$http.get(this.$api.get_approval_list, {
          noLoading: true,
          params: {
            page_size: this.pageSize,
            page_num: this.currentPage,

            ptid: 'toguessnum',
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

      tagsType(status) {
        switch (status) {
          case -20:
            return {label: '已取消',type: 'info'};
          case -10:
            return {label: '已拒绝',type: 'danger'};
          case 0:
            return {label: '审核中',type: 'primary'};
          case 10:
            return {label: '已通过',type: 'success'};
        }
      },

      showStep(row){
        this.$http.get(this.$api.get_approvalnotes,{
          noLoading: true,
          params: {
            avid: row.avid
          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.steps = data.reverse();
            }
          }
        )
      },

      pass(row) {
        this.$prompt(`确认批准?`, '提示', {
          inputPlaceholder: '审批意见',
          inputValidator: value => {
            if (!value) {
              return '意见不能为空'
            }
            if(value.length>100){
              return '意见文本过长(100)'
            }
          }
        }).then(
          prompt => {
            this.$http.post(this.$api.deal_approval, {
              "avid": row.avid,
              "anaction": 1,
              "anabo": prompt.value
            }).then(
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
      nopass(row) {
        this.$prompt(`确认不批准?`, '提示', {
          inputPlaceholder: '审批意见',
          inputValidator: value => {
            if (!value) {
              return '意见不能为空'
            }
            if(value.length>100){
              return '意见文本过长(100)'
            }
          },
        }).then(
          prompt => {
            this.$http.post(this.$api.deal_approval, {
              "avid": row.avid,
              "anaction": -1,
              "anabo": prompt.value
            }).then(
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

  }
</style>
