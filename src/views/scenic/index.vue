<template>
  <div class="container">
    <section class="tool-bar space-between">
            <el-form :inline="true">
              <el-form-item label="景区名称">
                <el-select v-model="value" multiple clearable placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="省市区">
                <el-cascader
                  v-model="value"
                  :options="options"
                  @change="handleChange"></el-cascader>
              </el-form-item>
              <el-button type="primary" icon="el-icon-search"  :loading="loading" @click="doSearch">查询</el-button>
              <el-button icon="el-icon-refresh"  :loading="loading" @click="doReset">重置</el-button>
            </el-form>
      <el-button type="primary" style="margin-bottom: 20px;" icon="el-icon-plus" @click="doAddScenic">新增</el-button>


    </section>

    <el-table :data="tableData" v-loading="loading" style="width: 100%" >

      <el-table-column align="center" prop="cmtitle" label="景区主图" width="280">
        <template slot-scope="scope">
          <img src="" class="m-scenic-img" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createtime" label="景区" width="280"></el-table-column>
      <el-table-column align="center" prop="cmmessage" label="省市区" >
        <template slot-scope="scope">
          <span></span>-<span></span>-<span></span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createtime" label="等级" width="280"></el-table-column>
      <el-table-column align="center" prop="cmmessage" label="是否有关联性" >
        <template slot-scope="scope">
          <el-switch v-model="scope.row.itrecommend" @change="recommend(scope.row)" active-color="#409EFF"
                     inactive-color="#DBDCDC">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createtime" label="归属景区" width="280"></el-table-column>
      <el-table-column align="center" label="操作" width="240" >
        <template slot-scope="scope">
          <el-button type="text" @click="doEditScenic(scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text" @click="doRemoveScenic(scope.row)">删除</el-button>
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

  import {getStore} from "src/utils/index";

  export default {
    name: 'scenic',

    components: {},


    data() {
      return {
        searchForm: {
          kw: ''
        },
        options: [
          {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        },
          {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        },
        ],
        options1: [{
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
        value: '',
        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],

      }

    },


    methods: {
      doSearch(){
        this.getScenic();
      },
      doReset(){
        this.searchForm = {
          kw: '',
        };
        this.doSearch();
      },

      getScenic() {
        this.loading = true;
        this.$http.get(this.$api.get_club_list, {
          noLoading: true,
          params: {
            page_size:this.pageSize,
            page_num:this.currentPage,
            cmindex: 2,
          },
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
        this.getScenic();
      },
      pageChange(page) {
        this.currentPage = page;
        this.getScenic();
      },
      handleChange(value) {
        console.log(value);
      },
      doAddScenic(){
        this.$router.push('/scenic/editScenic');
      },
      doEditScenic(item){
        this.$router.push({path:'/service/addNotice',query:{id:item.cmid}})
      },
      doRemoveScenic(item){
        let that = this;
        this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          item.delete = true;
          that.$http.post(that.$api.update_club, item).then(res => {
            if (res.data.status == 200) {
              that.$notify({
                title: '删除成功',
                message: '公告删除成功',
                type: 'success'
              });
              that.getScenic();
            }
          });
        }).catch(() => {

        });

      }





    },

    created() {
      // this.getScenic();
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .m-scenic-img{
      display: inline-block;
      width: 220px;
      height: 100px;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }

    .contract-img {
      .wl(300px, auto);
      max-height: 100%;
      margin-right: 30px;
      border: 1px solid black;
    }

  }
</style>
