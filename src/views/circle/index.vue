<template>
  <div class="circle-index">
    <block-title title="圈子标签管理"></block-title>
    <el-button type="primary" class="add-item-btn" icon="el-icon-plus" @click="itemDialog = true">新增标签</el-button>
    <el-table v-loading="itemLoading" :data="itemList" stripe>
      <el-table-column label="标签序号" align="center" prop="itsort"></el-table-column>
      <el-table-column label="标签名称" align="center" prop="itname"></el-table-column>
      <el-table-column label="标签描述" align="center" prop="itdesc"></el-table-column>
      <el-table-column label="推荐" align="center" prop="itrecommend">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.itrecommend" @change="recommend(scope.row)" active-color="#409EFF" inactive-color="#DBDCDC">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editItem(scope.row)">编辑</el-button>
          <el-button type="text" class="danger-text" @click="deleteItem(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <block-title title="圈子资讯"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="标题 / 摘要">
          <el-input v-model="kw"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSelect(nestatus)">查询</el-button>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="addCircle">新增资讯</el-button>
    </section>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="usual">已上架</el-menu-item>
      <el-menu-item index="auditing">审核中</el-menu-item>
      <el-menu-item index="refuse">已下架</el-menu-item>
    </el-menu>
    <el-table v-loading="circleLoading" :data="circleList" stripe size="mini">
    <!--<el-table v-loading="circleLoading" :data="circleList" stripe size="mini" height="562">-->
      <el-table-column label="资讯标题" align="center" prop="netitle" show-overflow-tooltip></el-table-column>
      <el-table-column label="点赞数" align="center" prop="favoritnumber" width="130"></el-table-column>
      <el-table-column label="评论数" align="center" prop="commentnumber" width="130"></el-table-column>
      <el-table-column label="浏览量" align="center" prop="nepageviews" width="130"></el-table-column>
      <el-table-column label="预览" align="center" fixed="right">
        <template slot-scope="scope">
          <preview-circle :circle="scope.row"></preview-circle>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editCircle(scope)">编辑</el-button>
          <el-button type="text" class="danger-text" @click="deleteCircle(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background class="page-box tc" :page-sizes="[10, 20, 30, 40]" :current-page="page_num"
                   :page-size="page_size" :total="total" layout="total, sizes, prev, pager, next, jumper"
                   @size-change="sizeChange" @current-change="pageChange"></el-pagination>

    <!--编辑dialog-->
    <el-dialog v-el-drag-dialog :visible.sync="itemDialog" width="700px" top="20vh"
               :title="itemForm.itid?'编辑圈子标签':'新增资讯标签'" :close-on-click-modal="false">
      <el-form :model="itemForm" :rules="rules" ref="itemForm" size="medium" label-width="100px">
        <el-form-item label="标签名称：" prop="itname">
          <el-input class="long-input" v-model="itemForm.itname"></el-input>
        </el-form-item>
        <el-form-item label="标签描述：" prop="itdesc">
          <el-input class="long-input" v-model="itemForm.itdesc"></el-input>
        </el-form-item>
        <el-form-item label="标签序号：" prop="itsort">
          <el-input class="short-input" v-model="itemForm.itsort"></el-input>
        </el-form-item>
        <el-form-item label="推荐：" prop="itrecommend">
          <el-switch v-model="itemForm.itrecommend" active-color="#409EFF" inactive-color="#DBDCDC">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="itemDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveItem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import elDragDialog from 'src/directive/el-dragDialog'
  import previewCircle from './components/previewCircle'

  export default {
    name: 'CircleIndex',
    data() {
      return {
        circleLoading: false,
        circleList: [],
        itemLoading: false,
        itemList: [],
        itemDialog: false,
        itemForm: {
          itid: '',
          itname: '',
          itdesc: '',
          itsort: '',
          itrecommend: false,
          ittype: 10
        },
        rules: {
          itname: [
            { required: true, message: '标签名称必填', trigger: 'blur' },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
          ],
          itsort: [
            { required: true, message: '标签序号必填', trigger: 'blur' },
            // { min: 1, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
          ]
        },
        activeIndex: 'usual',
        page_num: 1,
        page_size: 10,
        total: 10,
        kw: '',
        nestatus: ''
      }
    },
    directives: { elDragDialog },
    components: { previewCircle },
    mounted() {
      this.getItem();                       // 获取标签列表
      this.handleSelect(this.activeIndex);  // 获取不同状态的圈子资讯内容
    },
    watch: {
      // 圈子标签diaolog关闭时重置itemForm
      itemDialog(newValue, oldValue) {
        if(!newValue) {
          this.itemForm = {
            itid: '',
            itname: '',
            itdesc: '',
            itrecommend: false,
            ittype: 10
          }
        }
      }
    },
    methods: {
      // 获取不同状态的圈子资讯内容
      handleSelect(nestatus) {
        if(!nestatus == this.nestatus) {
          this.page_num = 1;
        }
        this.nestatus = nestatus;
        this.circleLoading = true;
        this.$http.get(this.$api.get_all_news, {
          noLoading: true,
          params: {
            page_num: this.page_num,
            page_size: this.page_size,
            kw: this.kw || '',
            nestatus: nestatus
          }}).then(res => {
          if (res.data.status == 200) {
            this.circleList = res.data.data;
            this.total = res.data.total_count;
            this.circleLoading = false;
          }
        })
      },
      // 重置搜索框
      resetSearch() {
        this.kw = '';
        this.handleSelect(this.nestatus);  // 获取不同状态的圈子资讯内容
      },
      // 添加资讯
      addCircle() {
        this.$router.push('/circle/editCircle');
      },
      sizeChange(val) {
        this.page_size = val;
        this.handleSelect(this.nestatus);
      },
      pageChange(val) {
        this.page_num = val;
        this.handleSelect(this.nestatus);
      },
      // 编辑资讯
      editCircle(scope) {
        this.$router.push({ path: '/circle/editCircle', query: { neid: scope.row.neid }})
      },
      // 删除资讯
      deleteCircle(scope) {
        this.$confirm('此操作将删除该资讯, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.$api.del_news, { neid: scope.row.neid }).then(res => {
            if (res.data.status == 200) {
              this.circleList.splice(scope.$index, 1);
              this.$notify({
                title: '删除成功',
                message: `${scope.row.netitle}：删除成功`,
                type: 'success'
              });
            }
          })
        }).catch(() => { });
      },
      // 获取标签列表
      getItem() {
        this.itemLoading = true;
        this.$http.get(this.$api.items_list, {
          noLoading: true,
          params: {
            ittype: 10
          }}).then(res => {
          if (res.data.status == 200) {
            this.itemList = res.data.data;
            this.itemLoading = false;
          }
        })
      },
      // 推荐该标签
      recommend(row) {
        let title = '推荐';
        if(row.itrecommend) {
          title += '';
        }else {
          title += '关闭';
        }
        this.$http.post(this.$api.update_items, row).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: `${title}成功`,
                message: `${row.itname}：${title}成功`,
                type: 'success'
              });
            }
          }
        );
      },
      // 标签dialog的保存按钮
      saveItem() {
        this.$refs.itemForm.validate(valid => {
          if(valid) {
            let type = this.itemForm.itid == '' ? '新增' : '编辑';
            if(this.itemForm.itid) { //  编辑
              this.$http.post(this.$api.update_items, this.itemForm).then(res => {
                  if (res.data.status == 200) {
                    this.$notify({
                      title: `圈子标签${ type }成功`,
                      message: `标签名称：${this.itemForm.itname}`,
                      type: 'success'
                    });
                    this.itemDialog = false;
                    this.$refs.itemForm.clearValidate();
                    this.getItem();         // 获取标签列表
                  }
                }
              )
            }else{
              // this.itemForm.itsort = Number(this.itemList.length + 1);
              this.$http.post(this.$api.create_items, this.itemForm).then(res => {
                if (res.data.status == 200) {
                  this.$notify({
                    title: `圈子标签${ type }成功`,
                    message: `标签名称：${this.itemForm.itname}`,
                    type: 'success'
                  });
                  this.itemDialog = false;
                  this.$refs.itemForm.clearValidate();
                  this.getItem();         // 获取标签列表
                }
              })
            }
          }else {
            this.$message.warning('请根据校验信息完善表单!');
          }
        })
      },
      // 编辑标签
      editItem(row) {
        this.itemDialog = true;
        this.itemForm = JSON.parse(JSON.stringify(row));
      },
      // 删除标签
      deleteItem(scope) {
        this.$confirm('此操作将删除该资讯标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            itid: scope.row.itid,
            ittype: 10,
            isdelete: true
          }
          this.$http.post(this.$api.update_items, params).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '圈子标签删除成功',
                message: `标签名称：${scope.row.itname}`,
                type: 'success'
              });
              this.itemDialog = false;
              this.itemList.splice(scope.$index, 1);
            }
          })
        }).catch(() => { });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .circle-index {
    .page-box {
      padding: 20px;
    }
    .add-item-btn {
      float: right;
      margin: -50px 0 10px 0;
    }
    .long-input {
      width: 500px;
    }
    .short-input {
      width: 250px;
    }
  }
</style>
