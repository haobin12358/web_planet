<template>
  <div class="container">
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="关键词词名">
          <el-input v-model.trim="inlineForm.ushname" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="关键词种类">
          <el-select v-model="inlineForm.ushtype" @change="doSearch">
            <el-option v-for="(value, key) in statusOption" :label="value" :value="key" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" :loading="keyLoading"  @click="doSearch">查询</el-button>
          <el-button icon="el-icon-refresh" :loading="keyLoading"  @click="resetKey">重置</el-button>
        </el-form-item>
      </el-form>
      <!--<el-button type="primary" icon="el-icon-plus" @click="">新增</el-button>-->
    </section>

    <el-table v-loading="keyLoading" :data="keyList" stripe>
      <el-table-column label="关键词" align="center" prop="ushname" show-overflow-tooltip></el-table-column>
      <el-table-column label="浏览量" align="center" prop="kwquery"></el-table-column>
      <el-table-column label="种类" align="center" prop="ushtype"></el-table-column>
    </el-table>
    <section class="table-bottom">
      <el-pagination background class="page-box" :page-sizes="[10, 20, 30, 40]" :current-page="page_num"
                     :page-size="page_size" :total="total" layout="total, sizes, prev, pager, next, jumper"
                     @size-change="sizeChange" @current-change="pageChange"></el-pagination>
    </section>
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg";

  export default {
    name: 'keyWord',
    data() {
      return {
        inlineForm:{
          ushname: '',
          ushtype:''
        },
        statusOption:{
          '':'全部',
          '0':'商品',
          '10': '圈子',
          '20': '话题',
          '30': '用户'
        },
        keyLoading: false,
        keyList: [],
        page_size: 10,
        page_num: 1,
        total: 0
      }
    },
    components: {TableCellImg},
    mounted() {
      this.getKeyList();         // 获取数据
    },
    methods: {
      // 获取数据
      getKeyList() {
        this.keyLoading = true;
        this.$http.get(this.$api.get_kw_list, {
          noLoading: true,
          params: {
            ushname: this.inlineForm.ushname || '',
            ushtype: this.inlineForm.ushtype || '',
            page_size: this.page_size,
            page_num: this.page_num
          }
        }).then(res => {
          if (res.data.status == 200) {
            this.keyList = res.data.data;
            this.total = res.data.total_count;
            this.keyLoading = false;
          }
        })
      },
      sizeChange(val) {
        this.page_size = val;
        this.getKeyList();         // 获取数据
      },
      pageChange(val) {
        this.page_num = val;
        this.getKeyList();         // 获取数据
      },
      doSearch(){
        this.page_num = 1;
        this.getKeyList();         // 获取数据
      },
      // 重置搜索框
      resetKey() {
        this.inlineForm = {
          ushname: '',
          ushtype:''
        };
        this.getKeyList();         // 获取数据
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .page-box {
      text-align: right;
      padding: 20px;
    }
  }
</style>
