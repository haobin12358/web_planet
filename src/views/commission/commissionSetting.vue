<template>
  <div class="container ">
    <block-title title="等级佣金比例">
      <el-tooltip class="tooltip" placement="top">
            <span slot="content">
              一二三级代理佣金比例总和需要小于等于100%
            </span>
        <div>
          <i class="el-icon-question"></i>
        </div>
      </el-tooltip>
    </block-title>
    <section class="tool-bar">
      <el-form inline>
        <el-form-item label="一级代理佣金比例">
          <el-input v-model.number="commonSetting.levelcommision[0]" maxlength="5">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="二级代理佣金比例">
          <el-input v-model.number="commonSetting.levelcommision[1]" maxlength="5">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="三级代理佣金比例">
          <el-input v-model.number="commonSetting.levelcommision[2]" maxlength="5">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          |
        </el-form-item>
        <el-form-item label="平台佣金比例">
          <el-input v-model.number="commonSetting.levelcommision[3]" maxlength="5">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSaveCommonRate(1)">保存</el-button>
        </el-form-item>
      </el-form>
    </section>
    <block-title title="升级相关"></block-title>
    <section class="tool-bar">
      <el-form inline label-width="180px">
        <el-form-item label="升级所需人数/比例">
          <el-input v-model.number="commonSetting.invitenum" maxlength="11">
          </el-input>
          <el-input v-model.number="commonSetting.invitenumscale" maxlength="11">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="升级所需团队总额/比例">
          <el-input v-model.number="commonSetting.groupsale" maxlength="11">
          </el-input>
          <el-input v-model.number="commonSetting.groupsalescale" maxlength="11">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="升级所需个人总额/比例">
          <el-input v-model.number="commonSetting.pesonalsale" maxlength="11">
          </el-input>
          <el-input v-model.number="commonSetting.pesonalsalescale" maxlength="11">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSaveCommonRate(2)">保存</el-button>
        </el-form-item>
      </el-form>
    </section>
    <block-title title="极差减额"></block-title>
    <section class="tool-bar">
      <el-form inline>
        <el-form-item label="1-2">
          <el-input v-model.number="commonSetting.reduceratio[0]" maxlength="11">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="2-3">
          <el-input v-model.number="commonSetting.reduceratio[1]" maxlength="11">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="3-4">
          <el-input v-model.number="commonSetting.reduceratio[2]" maxlength="11">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="4-5">
          <el-input v-model.number="commonSetting.reduceratio[3]" maxlength="11">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSaveCommonRate(3)">保存</el-button>
        </el-form-item>
      </el-form>
    </section>

    <block-title title="极差增额"></block-title>
    <section class="tool-bar">
      <el-form inline>
        <el-form-item label="1-2">
          <el-input v-model.number="commonSetting.increaseratio[0]" maxlength="11">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="2-3">
          <el-input v-model.number="commonSetting.increaseratio[1]" maxlength="11">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="3-4">
          <el-input v-model.number="commonSetting.increaseratio[2]" maxlength="11">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="4-5">
          <el-input v-model.number="commonSetting.increaseratio[3]" maxlength="11">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSaveCommonRate(4)">保存</el-button>
        </el-form-item>
      </el-form>
    </section>


    <block-title title="个人佣金比"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="用户名称">
          <el-input v-model.trim="searchForm.name" clearable maxLength="100"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model.trim="searchForm.mobile" clearable maxLength="100"></el-input>
        </el-form-item>

        <el-button type="primary" icon="el-icon-search" :loading="loading" @click="doSearch">查询</el-button>
        <el-button icon="el-icon-refresh" :loading="loading" @click="doReset" style="margin-bottom: 20px;">重置
        </el-button>
      </el-form>
    </section>
    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
      <el-table-column label="用户名" align="center" prop="usname"></el-table-column>
      <el-table-column label="手机号" align="center" prop="ustelphone"></el-table-column>
      <el-table-column label="一级佣金比例" align="center" prop="usname">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.uscommission1" maxlength="5" style="width: 140px;">
            <template slot="append">%</template>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="二级佣金比例" align="center" prop="usname">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.uscommission2" maxlength="5" style="width: 140px;">
            <template slot="append">%</template>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="三级佣金比例" align="center" prop="usname">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.uscommission3" maxlength="5" style="width: 140px;">
            <template slot="append">%</template>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" prop="usname">
        <template slot-scope="scope">
          <el-button type="text" @click="doSavePersonRate(scope.row)">保存</el-button>
          <el-button type="text" class="info-text" @click="doSavePersonRate(scope.row, true)">重置</el-button>
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
  const percentReg = /^100$|^(\d|[1-9]\d)(\.\d{0,2})*$/;   //  百分数(>=0, <=100, 至多两位小数)

  export default {
    name: "CommissionSetting",

    components: {},

    data() {
      return {
        commonSetting: {
          "levelcommision": [0, 0, 0, 0],
          "invitenum": 0,
          "groupsale": 0,
          "pesonalsale": 0,
          "invitenumscale": 0,
          "groupsalescale": 0,
          "pesonalsalescale": 0,
          "reduceratio": [0, 0, 0, 0],
          "increaseratio": [0, 0, 0, 0],
        },

        searchForm: {
          name: '',
          mobile: '',
        },

        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
      }
    },

    computed: {},

    methods: {
      commonCheckRate(sectionNum) {
        const checkRate = (x) => {
          for (let item in x) {
            if (!x[item]) {
              return false
            }
          }

          return true
        }

        switch (sectionNum) {
          case 1:
            if (!checkRate(this.commonSetting.levelcommision)) {
              return false
            }
            break;
          case 2:
            if (!checkRate([this.commonSetting.invitenum, this.commonSetting.groupsale, this.commonSetting.pesonalsale])) {
              return false
            }
            break;
          case 3:
            if (!checkRate(this.commonSetting.reduceratio)) {
              return false
            }
            break;
          case 4:
            if (!checkRate(this.commonSetting.increaseratio)) {
              return false
            }
            break;
        }

        return true
      },

      doSaveCommonRate(sectionNum) {
        let saveData = {},
          type = '';


        // if(!this.commonCheckRate(sectionNum)){
        //   this.$message.warning('请检查填写内容格式')
        //   return
        // }

        switch (sectionNum) {
          case 1:
            type = '等级佣金比例';

            saveData = {
              levelcommision: this.commonSetting.levelcommision
            };

            break;
          case 2:
            saveData = {
              invitenum: this.commonSetting.invitenum,
              invitenumscale: this.commonSetting.invitenumscale,
              groupsale: this.commonSetting.groupsale,
              groupsalescale: this.commonSetting.groupsalescale,
              pesonalsale: this.commonSetting.pesonalsale,
              pesonalsalescale: this.commonSetting.pesonalsalescale,
            };
            type = '升级相关';
            break;
          case 3:
            saveData = {
              reduceratio: this.commonSetting.reduceratio
            };
            type = '极差减额';
            break;
          case 4:
            saveData = {
              increaseratio: this.commonSetting.increaseratio
            };
            type = '极差增额';
            break;
        }
        type += '设置';

        this.$confirm(`确认保存${type}?`, '提示').then(
          () => {
            this.$http.post(this.$api.update_commision, saveData).then(
              res => {
                if (res.data.status == 200) {
                  let resData = res.data,
                    data = res.data.data;

                  this.getCommisionSetting();
                  this.$notify({
                    title: `${type}保存成功`,
                    type: 'success'
                  });
                }
              }
            )
          }
        )
      },
      getCommisionSetting() {
        this.$http.get(this.$api.get_commision, {
          params: {}
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.commonSetting = data;
            }
          }
        )
      },

      doSearch() {
        this.currentPage = 1;
        this.getAllUserCommission();
      },
      doReset() {
        this.searchForm = {
          name: '',
          mobile: '',
        }
        this.doSearch();
      },
      getAllUserCommission() {
        this.$http.get(this.$api.list_user_commison, {
          params: {
            page_size: this.pageSize,
            page_num: this.currentPage,

            ...this.searchForm,
          }
        }).then(
          res => {
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

        this.getAllUserCommission();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getAllUserCommission();
      },
      doSavePersonRate(row, reset) {
        this.$http.post(this.$api.update_user_commision, {
          "usid": row.usid,
          "commision1": reset ? '' : row.uscommission1,
          "commision2": reset ? '' : row.uscommission2,
          "commision3": reset ? '' : row.uscommission3,
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.getAllUserCommission();
              this.$notify({
                title: '个人佣金设置成功',
                message: `用户名:${row.usname}`,
                type: 'success'
              });
            }
          }
        )

      },
    },

    created() {
      this.getCommisionSetting();
      this.getAllUserCommission();
    },
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 120px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      /*margin-bottom: 0;*/
      width: 50%;
    }
  }
</style>
