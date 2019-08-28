<template>
  <div class="container">
    <section class="add-banner tr">

      <el-button type="primary" icon="el-icon-plus" @click="addClick">新增</el-button>
    </section>
    <el-table v-loading="dataLoading" :data="dataList" stripe>
      <el-table-column label="票务名称" align="center" prop="tiname" show-overflow-tooltip></el-table-column>
      <el-table-column label="封面图" align="center" prop="tiimg" width="280">
        <template slot-scope="scope">
          <table-cell-img :src="[scope.row.tiimg]" :key="scope.row.tiimg" width="92px" out-width="92px"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="发放时间" align="center" prop="ibsort" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.tistarttime}}</span> - <span>{{scope.row.tiendtime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="开启/中止" align="center" prop="ibshow">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.interrupt" @change="dataShow(scope)" active-color="#409EFF" inactive-color="#DBDCDC">
          </el-switch>
        </template>
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
          <el-button type="text" @click="editData(scope)" v-if="scope.row.interrupt">编辑</el-button>
          <el-button type="text" class="danger-text" @click="deleteData(scope)">删除</el-button>
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
        index: -1
      }
    },
    computed: {
      // 上传图片
      uploadUrl() {
        return this.$api.upload_file + getStore('token') + '&type=index'
      }
    },
    directives: { elDragDialog },
    components: { TableCellImg },
    mounted() {
      this.getData()          // 获取data
    },
    methods: {
      // 主图上传
      handledataSuccess(res, file) {
        this.dataForm.ibpic = res.data;
      },
      // 上传前限制小于15M
      beforeImgUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;
        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }
        return isLt15M;
      },
      // 获取data
      getData() {
        this.dataLoading = true;
        this.$http.get(this.$api.ticket_list, {
          noLoading: true, params: {
            page_num:this.page_num,
            page_size:this.page_size,
          }}).then(res => {
          if (res.data.status == 200) {
            this.dataList = res.data.data;
            this.dataLoading = false;
          }
        })
      },
      //新增
      addClick(){
        this.$router.push({path:'/ticket/editTicket'})
      },
      // 新增data的取消按钮
      initdataForm() {
        this.productList = [];
        this.$refs.dataFormRef.resetFields();
        this.dataForm = {
          prid: '',
          ibpic: '',
          ibsort: '',
          ibshow: false,
        };
        this.dataDialog = false;
      },
      // 添加data
      adddata() {
        this.$refs.dataFormRef.validate(valid => {
          if (valid) {
            if(this.dataForm.ibid) {      // 编辑
              this.$http.post(this.$api.update_banner, this.dataForm).then(res => {
                if (res.data.status == 200) {
                  this.$notify({
                    title: '修改成功',
                    message: '此轮播图修改成功',
                    type: 'success'
                  });
                  this.dataDialog = false;
                  this.getData()
                }
              });
            }else {                         // 新增
              this.$http.post(this.$api.set_banner, this.dataForm).then(res => {
                if (res.data.status == 200) {
                  this.initdataForm();
                  this.$notify({
                    title: '新增成功',
                    message: '轮播图新增成功',
                    type: 'success'
                  });
                  this.getData()
                }
              })
            }
          }else {
            this.$message.warning('请根据校验信息完善表单!');
          }
        })
      },
      // 删除data
      deleteData(scope) {
        let params = scope.row;
        // 删除轮播图
        this.$confirm('此操作将删除该票务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          params.delete = true;
          this.$http.post(this.$api.ticket_update, params).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '删除成功',
                message: '此票务已被删除',
                type: 'success'
              });
              this.getData();
            }
          });
        }).catch(() => { });
      },
      // data的展示与否
      dataShow(scope) {
        let msg = '';
        let params = scope.row;

        if(!scope.row.interrupt) {
          msg = '此票务不再展示'
        }else {
          msg = '此票务将会展示'
        }
        this.$http.post(this.$api.ticket_update, params).then(res => {
          if (res.data.status == 200) {
            this.$notify({
              title: '修改成功',
              message: msg,
              type: 'success'
            });
            this.getData();
          }
        });
      },
      // 编辑banner
      editData(scope) {
        this.$router.push({path:'/ticket/editTicket',query:{id:scope.row.tiid}})
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
