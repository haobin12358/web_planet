<template>
  <div class="container">
    <section class="add-banner ">
      <el-form :inline="true">
        <el-form-item label="门票">
          <el-select v-model="value" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search"  :loading="loading" @click="doSearch">查询</el-button>
        <el-button icon="el-icon-refresh"  :loading="loading" @click="doReset">重置</el-button>
      </el-form>
<!--      <el-button type="primary" icon="el-icon-plus" @click="addClick">新增</el-button>-->
    </section>
    <el-table v-loading="dataLoading" :data="dataList" stripe>
      <el-table-column label="用户" align="center" prop="usname" show-overflow-tooltip></el-table-column>
      <el-table-column label="联系方式" align="center" prop="ustelphone" show-overflow-tooltip></el-table-column>
      <el-table-column label="图片视频" align="center" prop="mfls" width="280">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.image" v-if="scope.row.showtype == 'image'" :key="scope.$index" width="92px" out-width="92px"></table-cell-img>
          <table-cell-video :videoSrc="scope.row.video.url" :posterSrc="scope.row.video.thumbnail" v-if="scope.row.showtype == 'video'" :key="scope.$index" width="92px" out-width="92px"></table-cell-video>
        </template>
      </el-table-column>
      <el-table-column label="定位" align="center" prop="umflocation" ></el-table-column>

      <el-table-column label="时间" align="center" prop="createtime">
      </el-table-column>
      <!--      <el-table-column label="权重" align="center" prop="ibsort" :render-header="sortHeaderRender">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-input class="sort-input" @focus="indexDone(scope)" v-model.number="scope.row.ibsort"-->
      <!--                    @change="sortChange" maxlength="11"></el-input>-->
      <!--          <el-button type="text" v-if="scope.$index == index" @click="sortChange">保存</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="操作" align="center" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="editData(scope)">查看</el-button>
          <el-button type="text" class="danger-text" v-if="!scope.row.umfstatus" @click="submitMoney(scope)">返还押金</el-button>
        </template>
      </el-table-column>
    </el-table>
    <section class="table-bottom">
      <el-pagination background :page-sizes="[10, 20, 30, 40]" :current-page="page_num"
                     :page-size="page_size" :total="total" layout="total, sizes, prev, pager, next, jumper"
                     @size-change="sizeChange" @current-change="pageChange"></el-pagination>
    </section>
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg";
  import TableCellVideo from "src/components/TableCellVideo";
  import elDragDialog from 'src/directive/el-dragDialog'
  import { getStore } from "src/utils/index";

  const positiveNumberReg = /^([1-9]\d*)$/;   //  正整数
  export default {
    name: 'ticketIndex',
    data() {
      return {
        dataDialog: false,
        dataForm: {
          ibid: '',
          prid: '',
          ibpic: '',
          ibsort: '',
          contentlink: '',
          ibshow: false,
        },
        rules: {
          ibpic: [
            { required: true, message: '轮播图必需', trigger: 'blur' }
          ],
          ibsort: [
            { required: true, message: '序号必填', trigger: 'blur' }
          ],
          /*contentlink: [
            { required: true, message: '链接必填', trigger: 'blur' }
          ],*/
          /*prid: [
            { required: true, message: '商品必选', trigger: 'blur' }
          ]*/
        },
        dataLoading: false,
        dataList: [],
        productList: [],
        productsList: [],
        productDialog: false,
        productLoading: false,
        page_num: 1,
        page_size: 10,
        total: 0,
        kw: '',
        index: -1,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    computed: {
      // 上传图片
      uploadUrl() {
        return this.$api.upload_file + getStore('token') + '&type=index'
      }
    },
    directives: { elDragDialog },
    components: { TableCellImg,TableCellVideo },
    mounted() {
      this.getData()          // 获取data
    },
    methods: {

      // 获取data
      getData() {
        this.dataLoading = true;
        this.$http.get(this.$api.feedback_list, {
          noLoading: true, params: { tiid:'tiid1'}}).then(res => {
          if (res.data.status == 200) {
            this.dataList = res.data.data;
            this.dataLoading = false;
          }
        })
      },
      // 编辑banner
      editData(scope) {
        this.$router.push({path:'/material/lookMaterial',query:{umfid:scope.row.umfid}})
      },
      // 记录点击的是哪一行
      indexDone(scope) {
        this.index = scope.$index;
      },
      // 改变轮播图序号
      sortChange(v) {
        if(positiveNumberReg.test(this.dataList[this.index].ibsort)) {
          let params = {
            ibid: this.dataList[this.index].ibid,
            ibsort: this.dataList[this.index].ibsort,
            ibshow: this.dataList[this.index].ibshow,
          };

          this.$http.post(this.$api.update_banner, params).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '保存成功',
                message: '此轮播图序号已保存',
                type: 'success'
              });
              this.getData();         // 刷新banner
              this.index = -1;
            }
          });
        }else {
          this.$message.warning('请输入合理权重值(>0)');

        }
      },
      sortHeaderRender(h,{column}){
        return(
          <el-tooltip class="tooltip" placement="top">
          <span slot="content">
          权重是一个顺序展示的概念,数字小的放在前面,同权重按创建时间从早到晚排序
        </span>
        <div>{column.label}
        <i class="el-icon-question"></i>
          </div>
          </el-tooltip>
      )
      },

      sizeChange(val) {
        this.page_size = val;
        this.getData();
      },
      pageChange(val) {
        this.page_num = val;
        this.getData();
      },
      submitMoney(scope){
        this.$confirm('确定要返还押金吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.$api.feedback_refund,  { umfid:scope.row.umfid}).then(res => {
            if (res.data.status == 200) {
              this.getData();
              this.$message({
                type: 'success',
                message: '返还成功!'
              });
            }
          })
        }).catch(() => {

        });
      },
      // 重置按钮
      resetSearch() {
        this.kw = '';
        this.getData()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .add-banner {
      margin-bottom: 20px;
    }
    .banner-img {
      width: 272px;
      height: 148px;
      line-height: 148px;
    }
    .sort-input {
      width: 5rem;
    }
    .bind-btn {
      margin: 0 0 0 50px;
    }
  }
</style>
