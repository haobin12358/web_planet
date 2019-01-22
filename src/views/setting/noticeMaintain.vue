<template>
  <div class="container">
    <el-table :data="tableData" v-loading="loading">
      <el-table-column type="index" width="55" align="center" ></el-table-column>
      <el-table-column label="通告内容" prop="mncontent" align="center" ></el-table-column>
      <el-table-column label="发布状态" prop="mnstatus_zh" width="120" align="center" ></el-table-column>
      <el-table-column v-if="checkPermission(['admin', 'super'])" label="操作" prop="mnstatus" width="180" align="center" :render-header="renderHeader">
        <template slot-scope="scope">
          <el-button type="text" @click="doEditNote(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dlgVisible" :title="formData.mnid ? '编辑通告' : '新增通告'">
      <el-form ref="form" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="mncontent" label="通告内容">
          <el-input v-model="formData.mncontent" type="textarea" :autosize="{ minRows: 4}" maxlength="1000"></el-input>
        </el-form-item>
        <el-form-item prop="mncontent" label="发布状态">
          <el-select v-model="formData.mnstatus">
            <el-option v-for="item in statusOption" :key="item.value" :value="item.value" :label="item.label" >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSaveNote">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import checkPermission from 'src/utils/permission' // 权限判断函数

  export default {
    name: "NoticeMaintain",

    components: {},

    data() {
      return {
        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],

        dlgVisible: false,
        statusOption: [
          {
            label: '发布',
            value: 'publish'
          },{
            label: '草稿',
            value: 'draft'
          },
        ],
        formData:{
          "mnid": "",

          "mncontent": "这是测试2",
          mnstatus: ''
        },
        formRules: {
          "mncontent": [
            {required: true, message: '通告内容必填', trigger: 'blur'}
          ],
        }
      }
    },

    computed: {},

    methods: {
      checkPermission,

      getList() {
        this.$http.get(this.$api.get_system_notes, {
          params: {}
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

        this.getList();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getList();
      },

      renderHeader(h) {
        return h('el-button', {
          props: {
            type: 'primary',
          },
          on: {
            click: () => {
              this.doAddNote();
            }
          }
        }, '新增');
      },

      doAddNote(){
        this.formData = {
          mncontent: '',
          mnstatus: 'publish',
        }

        this.dlgVisible = true;
      },
      doEditNote(row){
        this.formData = {
          mnid: row.mnid,
          mncontent: row.mncontent,
          mnstatus: row.mnstatus,
        }

        this.dlgVisible = true;
      },

      doSaveNote(){
        this.$refs.form.validate(
          valid => {
            if(valid){
              if(this.formData.mnid){
                this.$http.post(this.$api.add_update_notes,this.formData).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                          data = res.data.data;

                      this.getList();
                      this.$notify({
                        title: '通告编辑成功',
                        type: 'success'
                      });
                      this.dlgVisible = false;
                    }
                  }
                )
              }else {
                this.$http.post(this.$api.add_update_notes,this.formData).then(
                  res => {
                    if (res.data.status == 200) {
                      let resData = res.data,
                        data = res.data.data;

                      this.getList();
                      this.$notify({
                        title: '通告新增成功',
                        type: 'success'
                      });
                      this.dlgVisible = false;
                    }
                  }
                )
              }
            } else {
              this.$message.warning('请根据校验信息完善表单!');
            }
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
