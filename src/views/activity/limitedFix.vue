<template>
  <div class="activity-index">
    <section class="tool-bar space-between">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="活动名称">
          <el-input v-model.trim="searchForm.tlaname"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.tlastatus" @change="doSearch">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search"  :loading="activityLoading" @click="doSearch">查询</el-button>
        <el-button icon="el-icon-refresh" style="margin-bottom: 20px;"  :loading="activityLoading" @click="doReset">重置</el-button>
      </el-form>
      <section style="margin-bottom: 20px;" v-if="isAdmin">
        <el-button type="primary" icon="el-icon-plus" @click="editActivity('add')">新增</el-button>
      </section>


    </section>
    <el-table v-loading="activityLoading" :data="activityList" stripe>
      <el-table-column label="活动封面图" align="center" prop="tlatoppic">
        <template slot-scope="scope">
          <table-cell-img :src="[scope.row.tlatoppic]" :key="scope.row.tlatoppic"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" align="center" prop="tlaname"></el-table-column>
      <el-table-column label="活动开始时间" align="center" prop="tlastarttime"></el-table-column>
      <el-table-column label="活动结束时间" align="center" prop="tlaendtime"></el-table-column>
      <el-table-column label="商品数" align="center" prop="prcount" width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row)">{{scope.row.prcount}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="tlastatus">
        <template slot-scope="scope">
          <el-tag type="success" plain v-if="scope.row.tlastatus == 0">正常</el-tag>
          <el-tag type="primary" plain v-else-if="scope.row.tlastatus == 10">结束</el-tag>
          <el-tag type="danger" plain v-else>终止</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="权重" align="center" :render-header="sortHeaderRender">
        <template slot-scope="scope">
          <el-input class="sort-input" @focus="indexDone(scope)" v-model="scope.row.tlasort" @keyup.native.enter="sortChange"></el-input>
          <el-button type="text" v-if="index == scope.$index" @click="sortChange">保存</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" v-if="isAdmin">
        <template slot-scope="scope">
          <el-button type="text" @click="editActivity(scope)">编辑</el-button>
          <el-button type="text" class="success-text"    @click="forbidActivity(scope)">终止</el-button>
          <el-button type="text"  class="danger-text" @click="deleteActivity(scope)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" v-else>
        <template slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row)">申请</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑dialog-->
    <el-dialog v-el-drag-dialog :visible.sync="activityDialog" width="800px" top="7vh"
               :title="formData.tlaname + ' - 编辑'" @close="initActivityForm">
      <el-form :model="formData" :rules="rules" ref="formData" label-position="left" size="medium" label-width="120px" status-icon>
        <el-form-item label="活动名称" prop="tlaname">
          <el-input class="long-input" v-model="formData.tlaname"></el-input>
        </el-form-item>
        <el-form-item label="详情页顶部图" prop="tlatoppic" >
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleTopSuccess"
            :before-upload="beforeImgUpload">
            <img v-if="formData.tlatoppic" :key="formData.tlatoppic" v-lazy="formData.tlatoppic" class="avatar top-img">
            <i v-else class="el-icon-plus avatar-uploader-icon top-img"></i>
            <div slot="tip" class="el-upload__tip">
              建议尺寸为700 * 500，大小不要超过15M，上传成功后会显示，文件较大时请耐心等待
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动开始时间" prop="tlastarttime">
          <el-date-picker
            v-model="formData.tlastarttime"
            type="datetime"
            value-format="yyyy-MM-dd HH-mm-ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间" prop="tlaendtime">
          <el-date-picker
            v-model="formData.tlaendtime"
            value-format="yyyy-MM-dd HH-mm-ss"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="initActivityForm">取 消</el-button>
        <el-button type="primary" @click="saveActivity">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import elDragDialog from 'src/directive/el-dragDialog'
  import TableCellImg from "src/components/TableCellImg"
  import { getStore } from "src/utils/index"

  const positiveNumberReg = /^([1-9]\d*)$/;   //  正整数
  export default {
    name: 'ActivityIndex',
    data() {
      return {
        activityLoading: false,
        activityList: [],
        index: '-1',                  // 暂存点击的是哪一行
        activityDialog: false,
        formData: {
          tlaname: '',
          tlatoppic: '',           // 详情页顶部图(如果需要)
          tlasort: '',
          tlastarttime:'',
          tlaendtime:''
        },
        rules: {
          tlaname: [{ required: true, message: '活动名称必填', trigger: 'blur' }],
          tlastarttime:[{ required: true, message: '活动开始时间必填', trigger: 'change' }],
          tlaendtime:[{ required: true, message: '活动结束时间必填', trigger: 'change' }]
        },
        isAdmin:false,
        statusOption: [
          {
            value: '',
            label: '全部',
          }, {
            value: '0',
            label: '正常',
          },  {
            value: '-10',
            label: '中止',
          }, {
            value: '10',
            label: '结束',
          }
        ],
        searchForm: {
          tlaname: '',
          tlastatus: '',
        }
      }
    },
    directives: { elDragDialog },
    components: { TableCellImg },
    computed: {
      // 上传图片
      uploadUrl() {
        return this.$api.upload_file + getStore('token') + '&type=index'
      }
    },
    mounted() {
      this.getActivity();         // 获取所有活动
      if(this.$store.state.user.roles.indexOf('admin') != -1){
        this.isAdmin = true;
      }
    },
    methods: {
      // 详情页顶部图上传
      handleTopSuccess(res, file) {
        this.formData.tlatoppic = res.data;
      },
      // 上传前限制小于15M
      beforeImgUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;
        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }
        return isLt15M;
      },
      // 获取所有活动
      getActivity() {
        this.activityLoading = true;
        console.log(this.searchForm.tlaname)
        this.$http.get(this.$api.timelimited_list, { noLoading: true,params:{
            tlaname:this.searchForm.tlaname,
            tlastatus:this.searchForm.tlastatus
          } }).then(res => {
          if (res.data.status == 200) {
            this.activityList = res.data.data;
            this.activityLoading = false;
          }
        })
      },
      doSearch() {
        this.currentPage = 1;
        this.getActivity();
      },
      doReset() {
        this.searchForm = {
          tlaname: '',
          tlastatus: '',
        };
        this.doSearch();
      },
      // 去活动详情页
      goDetail(row) {
          this.$router.push({path:'/activity/limitedFixEdit',query:{tlaid:row.tlaid}});
        },
      // 编辑活动
      editActivity(scope) {
        this.activityDialog = true;
        if(scope == 'add'){
        }else{
          this.formData = JSON.parse(JSON.stringify(scope.row));
        }
        this.index = scope.$index;
        this.rules.tlatoppic = [{ required: true, message: '详情页顶部图必需', trigger: 'blur' }];
      },
      // 编辑活动dialog的保存按钮
      saveActivity() {
        this.$refs.formData.validate(valid => {
          if(valid) {
            if(this.index > -1){
              this.$http.post(this.$api.timelimited_update, this.formData).then(res => {
                if (res.data.status == 200) {
                  this.initActivityForm();   // 重置
                  this.$notify({
                    title: '修改成功',
                    message: `${this.formData.tlaname} 修改成功`,
                    type: 'success'
                  });
                  this.activityDialog = false;
                  this.index = -1;
                  this.getActivity()         // 获取所有活动
                }
              })
            }else{
              this.$http.post(this.$api.timelimited_create, this.formData).then(res => {
                if (res.data.status == 200) {
                  this.initActivityForm();   // 重置
                  this.$notify({
                    title: '添加成功',
                    message: `${this.formData.tlaname} 添加成功`,
                    type: 'success'
                  });
                  this.activityDialog = false;
                  this.getActivity()         // 获取所有活动
                }
              })
            }

          }else {
            this.$message.warning('请根据校验信息完善表单!');
          }
        })
      },
      //终止活动
      forbidActivity(scope){
        this.$confirm('此操作将终止此活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          scope.row.tlastatus = -10;
          this.$http.post(this.$api.timelimited_update, scope.row).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '活动终止成功',
                message: `${scope.row.tlaname}的活动已终止`,
                type: 'success'
              });
              this.getActivity()          // 获取所有活动
              this.index = -1;
            }
          });
        }).catch(() => {

        });
      },
      //删除活动
      deleteActivity(scope){

        this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          scope.row.delete = true;
          this.$http.post(this.$api.timelimited_update, scope.row).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '删除成功',
                message: `${scope.row.tlaname}的活动已删除`,
                type: 'success'
              });
              this.getActivity()          // 获取所有活动
              this.index = -1;
            }
          });
        }).catch(() => {

        });

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
      // 记录点击的是哪一行
      indexDone(scope) {
        this.index = scope.$index;
      },
      // 改变活动序号
      sortChange(v) {
        if(positiveNumberReg.test(this.activityList[this.index].tlasort)) {
          // let params = {
          //   tlasort: this.activityList[this.index].tlasort
          // };
          this.$http.post(this.$api.timelimited_update, this.activityList[this.index]).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '保存成功',
                message: `${this.activityList[this.index].tlaname}的序号已保存`,
                type: 'success'
              });
              this.getActivity()          // 获取所有活动
              this.index = -1;
            }
          });
        }else{
          this.$message.warning('请输入合理权重值');
        }
      },
      // 重置
      initActivityForm() {
        this.activityDialog = false;
        // this.$refs.formData.resetFields();
        this.formData= {
           tlaname: '',
            tlatoppic: '',           // 详情页顶部图(如果需要)
            tlasort: '',
            tlastarttime:'',
            tlaendtime:''
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .activity-index {
    .back-img {
      width: 249px;
    }
    .top-img {
      width: 370px;
    }
    .long-input {
      width: 249px;
    }
    .sort-input {
      width: 5rem;
    }
  }
</style>
