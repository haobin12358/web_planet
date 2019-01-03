<template>
  <div class="activity-index">
    <el-table v-loading="activityLoading" :data="activityList" stripe>
      <el-table-column label="序号" align="center" prop="acsort" width="180">
        <template slot-scope="scope">
          <el-input class="sort-input" @focus="indexDone(scope)" v-model="scope.row.acsort" @change="sortChange"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="活动封面图" align="center" prop="acbackground">
        <template slot-scope="scope">
          <table-cell-img :src="scope.row.acbackground" :key="scope.row.acbackground"></table-cell-img>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" align="center" prop="acname"></el-table-column>
      <el-table-column label="封面按钮文字" align="center" prop="acbutton" show-overflow-tooltip></el-table-column>
      <el-table-column label="活动类别" align="center" prop="actype_zh"></el-table-column>
      <el-table-column label="商品数" align="center" prop="prcount" width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row)">{{scope.row.prcount}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="关闭/开启" align="center" prop="pblogo">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.acshow" @change="showActivity(scope.row)" active-color="#409EFF" inactive-color="#DBDCDC">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editActivity(scope)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑dialog-->
    <el-dialog v-el-drag-dialog :visible.sync="activityDialog" width="800px" top="7vh"
               :title="formData.acname + ' - 编辑'" :close-on-click-modal="false">
      <el-form :model="formData" :rules="rules" ref="formData" label-position="right" size="medium" label-width="120px" status-icon>
        <el-form-item label="活动封面图" prop="adheader">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleBackSuccess"
            :before-upload="beforeImgUpload">
            <img v-if="formData.acbackground" :key="formData.acbackground" v-lazy="formData.acbackground" class="avatar back-img">
            <i v-else class="el-icon-plus avatar-uploader-icon back-img"></i>
            <div slot="tip" class="el-upload__tip">
              建议尺寸为700 * 500，大小不要超过15M，上传成功后会显示，文件较大时请耐心等待
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动名称" prop="acname">
          <el-input class="long-input" v-model="formData.acname"></el-input>
        </el-form-item>
        <el-form-item label="封面按钮文字" prop="acbutton">
          <el-input class="long-input" v-model="formData.acbutton"></el-input>
        </el-form-item>
        <el-form-item label="详情页顶部图" prop="actoppic" v-if="formData.actype == '0' || formData.actype == '3'">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleTopSuccess"
            :before-upload="beforeImgUpload">
            <img v-if="formData.actoppic" :key="formData.actoppic" v-lazy="formData.actoppic" class="avatar top-img">
            <i v-else class="el-icon-plus avatar-uploader-icon top-img"></i>
            <div slot="tip" class="el-upload__tip">
              建议尺寸为700 * 500，大小不要超过15M，上传成功后会显示，文件较大时请耐心等待
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情页描述" prop="acdesc" v-if="formData.actype == '0' || formData.actype == '3'">
          <el-input v-model="formData.acdesc"></el-input>
        </el-form-item>
        <el-form-item label="活动规则" prop="prlineprice" v-if="formData.actype == '1'">
          <el-input style="width: 400px; margin: 0 20px 20px 0" maxlength="13" :placeholder="'请输入活动规则' + (i + 1) + '，不超过13个汉字'"
                    v-for="i in [0, 1, 2]" :key="i" v-model="activityRule[i]">
            <template slot="prepend">序号{{i + 1}}</template>
            <template slot="append" v-if="activityRule[i]">{{activityRule[i].length}}/13</template>
          </el-input>
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

  export default {
    name: 'ActivityIndex',
    data() {
      return {
        activityLoading: false,
        activityList: [],
        index: '',                  // 暂存点击的是哪一行
        activityDialog: false,
        formData: {
          actype: '',
          acbackground: '',       // 活动封面图
          acname: '',
          actoppic: '',           // 详情页顶部图(如果需要)
          acdesc: '',             // 详情页描述(如果需要)
          acbutton: '',           // 封面按钮文字
          acsort: '',
          acshow: false,
        },
        rules: {
          acbackground: [{ required: true, message: '活动封面图必需', trigger: 'blur' }],
          acname: [{ required: true, message: '活动名称必填', trigger: 'blur' }],
          acbutton: [{ required: true, message: '封面按钮文字必填', trigger: 'blur' }],
        },
        activityRule: []
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
    },
    methods: {
      // 活动封面图上传
      handleBackSuccess(res, file) {
        this.formData.acbackground = res.data;
      },
      // 详情页顶部图上传
      handleTopSuccess(res, file) {
        this.formData.actoppic = res.data;
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
        this.$http.get(this.$api.activity_list, { noLoading: true }).then(res => {
          if (res.data.status == 200) {
            this.activityList = res.data.data;
            this.activityLoading = false;
          }
        })
      },
      // 去活动详情页
      goDetail(row) {
        switch(row.actype) {
          case 0:
            this.$router.push('/activity/firstOrder');
            break;
          case 1:
            this.$router.push('/activity/guess');
            break;
          case 2:
            this.$router.push('/activity/magicGiftBox');
            break;
          case 3:
            this.$router.push('/activity/trialProduct');
            break;
        }
      },
      // 关闭或开启活动
      showActivity(row) {
        let params = {
          actype: row.actype,
          acshow: row.acshow
        };
        let title = '';
        if(row.acshow) {
          title = '开启';
        }else {
          title = '关闭';
        }
        this.$http.post(this.$api.activity_update, params).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: `${title}成功`,
                message: `${row.acname}${title}成功`,
                type: 'success'
              });
            }
          }
        );
      },
      // 编辑活动
      editActivity(scope) {
        this.activityDialog = true;
        this.formData = JSON.parse(JSON.stringify(scope.row));
        if(this.formData.actype == '0' || this.formData.actype == '3') {
          this.rules.actoppic = [{ required: true, message: '详情页顶部图必需', trigger: 'blur' }];
          this.rules.acdesc = [{ required: true, message: '详情页描述必填', trigger: 'blur' }];
        }
        this.activityRule = this.formData.acdesc.split('|');
      },
      // 编辑活动dialog的保存按钮
      saveActivity() {
        this.$refs.formData.validate(valid => {
          if(valid) {
            if(this.formData.actype == '1') {
              this.formData.acdesc = '';
              for(let i in this.activityRule) {
                this.formData.acdesc = this.formData.acdesc + '|' + this.activityRule[i]
              }
              this.formData.acdesc = this.formData.acdesc.slice(1, this.formData.acdesc.length);
            }
            this.$http.post(this.$api.activity_update, this.formData).then(res => {
              if (res.data.status == 200) {
                this.initActivityForm();   // 重置
                this.$notify({
                  title: '修改成功',
                  message: `${this.formData.acname} 修改成功`,
                  type: 'success'
                });
                this.activityDialog = false;
                this.getActivity()         // 获取所有活动
              }
            })
          }else {
            this.$message.warning('请根据校验信息完善表单!');
          }
        })
      },
      // 记录点击的是哪一行
      indexDone(scope) {
        this.index = scope.$index;
      },
      // 改变活动序号
      sortChange(v) {
        let params = {
          actype: this.activityList[this.index].actype,
          acshow: this.activityList[this.index].acshow,
          acsort: this.activityList[this.index].acsort
        };
        this.$http.post(this.$api.activity_update, params).then(res => {
          if (res.data.status == 200) {
            this.$notify({
              title: '保存成功',
              message: `${this.activityList[this.index].acname}的序号已保存`,
              type: 'success'
            });
            this.getActivity()          // 获取所有活动
          }
        });
      },
      // 重置
      initActivityForm() {
        this.activityDialog = false;
        this.$refs.formData.resetFields();
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
