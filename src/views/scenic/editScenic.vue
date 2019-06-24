<template>
    <div class="container">
      <el-row>
        <block-title title="景区介绍"></block-title>
        <el-col :span="14">
          <el-form :model="formData" :rules="rules" ref="formData" label-position="left"
                   label-width="140px">
            <el-form-item label="景区名称" prop="cmtitle">
              <el-input v-model="formData.name" placeholder="请输入景区名称"></el-input>
            </el-form-item>
            <el-form-item label="所在地区" prop="cmtitle">
              <el-cascader
                v-model="formData.value"
                :options="options"
                @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="具体定位" prop="cmtitle">
              <el-input v-model="formData.name" placeholder="请输入景区名称"></el-input>
            </el-form-item>
            <el-form-item label="景区主图" prop="nemainpic">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                accept="image/*"
                :on-success="handleMainPicSuccess"
                :before-upload="beforeImgUpload">
                <img v-if="formData.mainpic" v-lazy="formData.mainpic" class="avatar circle-main-img" />
                <i v-else class="el-icon-plus avatar-uploader-icon circle-main-img"></i>
                <div slot="tip" class="el-upload__tip">
                  建议尺寸：X*X像素
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="景区等级" prop="cmtitle">
              <el-select v-model="formData.value" multiple clearable placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="内容" prop="cmmessage">
              <div class="editor">
                <quill-editor ref="myTextEditor" :options="editorOption" v-model="formData.message" :config="editorOption"></quill-editor>
              </div>

            </el-form-item>
            <el-form-item label="是否有关联性：" prop="cmtitle">
              <el-switch v-model="formData.message"  active-color="#409EFF"
                         inactive-color="#DBDCDC">
              </el-switch>
            </el-form-item>
            <el-form-item label="关联景区" prop="cmtitle">
              <el-input v-model="formData.name" placeholder="请输入景区名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="checkFormData">保 存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { quillEditor } from "vue-quill-editor";
  import 'quill/dist/quill.js';
  import { getStore } from "src/utils/index";
    export default {
        name: "editScenic",
      data(){
          return{
            formData:{
              name:'',
              mainpic:'',
              message:''
            },
            rules: {
              cmtitle: [
                { required: true, message: '公告标题必填', trigger: 'blur' }
              ],
              cmmessage: [
                { required: true, message: '公告内容必填', trigger: 'blur' }
              ]
            },
            editorOption: {
              // placeholder: "placeholder",
              // 编辑器的配置
              // something config
              // theme: "bubble"
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
          }
      },
      // computed: {
      //   // 上传图片
      //   uploadUrl() {
      //     return this.$api.upload_file + getStore('token') + '&type=news'
      //   },
      // },
      components: {quillEditor},
      mounted() {
        if(this.$route.query.id){
          this.getFormData(this.$route.query.id);           //
        }

      },
      methods: {
        // 主图上传
        handleMainPicSuccess(res, file) {
          // this.circleForm.nemainpic = res.data;
        },
        // 上传前限制小于15M
        beforeImgUpload(file) {
          const isLt15M = file.size / 1024 / 1024 < 15;
          if (!isLt15M) {
            this.$message.error('上传图片大小不能超过 15MB!');
          }
          return isLt15M;
        },
        getFormData(id){
          this.$http.get(this.$api.get_club_message, {
            noLoading: true,
            params: {
              cmid: id,
            },
          }).then(
            res => {
              this.loading = false;

              if (res.data.status == 200) {
                let resData = res.data,
                  data = res.data.data;

              }
            }
          )
        },
        // 保存按钮
        checkFormData() {
          this.$refs.formData.validate(valid => {
            if (valid) {
              if(this.$route.query.id){
                this.$http.post(this.$api.update_club, this.formData).then(res => {
                  if (res.data.status == 200) {
                    this.$notify({
                      title: '保存成功',
                      message: '公告发布成功',
                      type: 'success'
                    });
                    this.$router.push('/service/notice')
                  }
                });
              }else{
                this.$http.post(this.$api.create_club, this.formData).then(res => {
                  if (res.data.status == 200) {
                    this.$notify({
                      title: '保存成功',
                      message: '公告发布成功',
                      type: 'success'
                    });
                    this.$router.push('/service/notice')
                  }
                });
              }

            }else {
              this.$message.warning('请根据校验信息完善表单!');
            }
          })
        },
        handleChange(){

        }
      }
    }
</script>

<style scoped lang="less">
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
