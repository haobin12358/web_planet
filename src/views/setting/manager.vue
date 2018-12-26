<template>
  <div class="container">
    <section class="add-admin tr">
      <el-button type="primary" icon="el-icon-plus" @click="addAdmin">新增</el-button>
    </section>
    <el-table v-loading="adminLoading" :data="adminList" height="726" stripe size="mini">
      <el-table-column label="编号" align="center" prop="adnum"></el-table-column>
      <el-table-column label="头像" align="center" prop="adheader">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.adheader" :key="scope.row.adheader"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="管理员身份" align="center" prop="adlevel"></el-table-column>
      <el-table-column label="管理员昵称" align="center" prop="adname" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" align="center" prop="adstatus"></el-table-column>
      <el-table-column label="手机号" align="center" prop="adtelphone"></el-table-column>
      <el-table-column label="最近登录时间" align="center" prop="logintime" width="180"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="editAdmin(scope)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <section class="table-bottom">
      <el-pagination background :page-sizes="[10, 20, 30, 40]" :current-page="page_num"
                     :page-size="page_size" :total="total" layout="total, sizes, prev, pager, next, jumper"
                     @size-change="sizeChange" @current-change="pageChange"></el-pagination>
    </section>

    <el-dialog v-el-drag-dialog title="管理员信息" :visible.sync="adminDialog" top="10vh">
      <el-form :model="adminForm" :rules="rules" ref="adminForm" label-position="left" label-width="100px"
               status-icon inline>
        <el-form-item label="管理员头像" prop="adheader">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleBannerSuccess"
            :before-upload="beforeImgUpload">
            <img v-if="adminForm.adheader" v-lazy="adminForm.adheader" class="avatar admin-img">
            <i v-else class="el-icon-plus avatar-uploader-icon admin-img"></i>
            <div slot="tip" class="el-upload__tip">
              建议为正方形，大小不要超过15M，上传成功后会显示，文件较大时请耐心等待
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="管理员昵称" prop="adname">
          <el-input class="long-input" v-model="adminForm.adname"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="adtelphone">
          <el-input class="sort-input" v-model="adminForm.adtelphone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="identifyingcode">
          <el-input class="sort-input" v-model="adminForm.identifyingcode" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="adpassword">
          <el-input class="sort-input" type="password" v-model="adminForm.adpassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="adpasswordagain">
          <el-input class="sort-input" type="password" v-model="adminForm.adpasswordagain"></el-input>
        </el-form-item>
        <el-form-item label="管理员状态" prop="adstatus">
          <el-select v-model="adminForm.adstatus" placeholder="请选择">
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员等级" prop="adlevel">
          <el-select v-model="adminForm.adlevel" placeholder="请选择">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="initAdminForm">取 消</el-button>
        <el-button type="primary" @click="saveAdmin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import TableCellImg from "src/components/TableCellImg"
  import elDragDialog from 'src/directive/el-dragDialog'
  import { getStore } from "src/utils/index"

  export default {
    name: 'Manager',
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.adminForm.adpasswordagain !== '') {
            this.$refs.adminForm.validateField('adpasswordagain');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.adminForm.adpassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        adminLoading: true,
        adminList: [],
        page_num: 1,
        page_size: 10,
        total: 0,
        adminDialog: false,
        adminForm: {
          adid: '',
          adheader: '',
          adname: '',
          adstatus: 'normal',
          adtelphone: '',
          identifyingcode: '',
          adpassword: '',
          adpasswordagain: '',
          adlevel: 'common_admin',
        },
        rules: {
          adheader: [
            { required: true, message: '管理员头像必需', trigger: 'blur' }
          ],
          adname: [
            { required: true, message: '管理员昵称必填', trigger: 'blur' }
          ],
          adtelphone: [
            { required: true, message: '手机号必填', trigger: 'blur' }
          ],
          identifyingcode: [
            { required: true, message: '验证码必填', trigger: 'blur' }
          ],
          adpassword: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          adpasswordagain: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ]
        },
        statusList: [
          { value: 'normal', label: '正常' },
          { value: 'frozen', label: '已冻结' },
          { value: 'deleted', label: '已删除' }
        ],
        typeList: [
          { value: 'agent', label: '供应商' },
          { value: 'common_admin', label: '普通管理员' },
          { value: 'super_admin', label: '超级管理员' }
        ],
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
      this.getAdmin()          // 获取admin
    },
    methods: {
      // 主图上传
      handleBannerSuccess(res, file) {
        this.adminForm.adheader = res.data;
      },
      // 上传前限制小于15M
      beforeImgUpload(file) {
        const isLt15M = file.size / 1024 / 1024 < 15;
        if (!isLt15M) {
          this.$message.error('上传图片大小不能超过 15MB!');
        }
        return isLt15M;
      },
      // 获取admin
      getAdmin() {
        this.adminLoading = true;
        this.$http.get(this.$api.get_admin_list, {
          noLoading: true, params: {
            page_num: this.page_num,
            page_size: this.page_size
          }
        }).then(res => {
          if (res.data.status == 200) {
            this.adminList = res.data.data;
            this.total = res.data.total_count;
            console.log(res.data.data);
            this.adminLoading = false;
          }
        })
      },
      // 保存admin
      saveAdmin() {
        this.$refs.adminForm.validate(valid => {
          if (valid) {
            if(this.adminForm.adid) {      // 编辑
              this.$http.post(this.$api.update_admin, this.adminForm).then(res => {
                if (res.data.status == 200) {
                  this.$notify({
                    title: '修改成功',
                    message: `管理员：${adminForm.adname}修改成功`,
                    type: 'success'
                  });
                  this.adminDialog = false;
                  this.getAdmin()
                }
              });
            }else {                         // 新增
              this.$http.post(this.$api.add_admin_by_superadmin, this.adminForm).then(res => {
                if (res.data.status == 200) {
                  this.initAdminForm();
                  this.$notify({
                    title: '新增成功',
                    message: `管理员：${adminForm.adname}新增成功`,
                    type: 'success'
                  });
                  this.getAdmin()
                }
              })
            }
          }else {
            this.$message.warning('请根据校验信息完善表单!');
          }
        })
      },
      // 编辑admin
      editAdmin(scope) {
        this.adminForm = JSON.parse(JSON.stringify(scope.row));
        this.adminForm.adpassword = '';
        let validatePass = (rule, value, callback) => {
          if (this.adminForm.adpasswordagain !== '') {
            this.$refs.adminForm.validateField('adpasswordagain');
          }
          callback();
        };
        let validatePass2 = (rule, value, callback) => {
          if(value !== this.adminForm.adpassword) {
            callback(new Error('两次输入密码不一致!'));
          }else {
            callback();
          }
        };
        this.rules.adpassword = [{ required: false, validator: validatePass, trigger: 'blur' }];
        this.rules.adpasswordagain = [{ required: false, validator: validatePass2, trigger: 'blur' }];
        this.adminDialog = true;
      },
      sizeChange(val) {
        this.page_size = val;
        this.getAdmin();
      },
      pageChange(val) {
        this.page_num = val;
        this.getAdmin();
      },
      // 新增按钮
      addAdmin() {
        this.adminDialog = true;
        // 获取所有管理员的状态
        this.$http.get(this.$api.get_admin_all_status, { noLoading: true }).then(res => {
          if (res.data.status == 200) {
            // console.log(res.data.data);
          }
        });
        // 获取管理员所有的身份
        this.$http.get(this.$api.get_admin_all_type, { noLoading: true }).then(res => {
          if (res.data.status == 200) {
            // console.log(res.data.data);
          }
        })
      },
      // 重置
      initAdminForm() {
        this.adminDialog = false;
        this.$refs.adminForm.resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .add-admin {
      margin-bottom: 20px;
    }
    .admin-img {
      width: 100px;
      height: 100px;
      line-height: 100px;
    }
    .long-input {
      width: 19rem;
    }
    .sort-input {
      width: 195px;
    }
  }
</style>
