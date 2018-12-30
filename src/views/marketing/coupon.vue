<template>
  <div class="container">
    <block-title title="优惠券列表"></block-title>
    <section class="tool-bar space-between">
      <el-form :inline="true" size="medium">
        <el-form-item label="商品名称">
          <el-input v-model="kw"></el-input>
        </el-form-item>
        <el-form-item label="商品编号">
          <el-input v-model="kw"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="">查询</el-button>
          <el-button icon="el-icon-refresh" @click="">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="addCoupon">新增</el-button>
    </section>
    <el-table v-loading="couponLoading" :data="couponList" stripe size="mini">
      <el-table-column label="名称" align="center" prop="coname" show-overflow-tooltip></el-table-column>
      <el-table-column label="生效条件" align="center" prop="favoritnumber"></el-table-column>
      <el-table-column label="优惠内容" align="center" prop="commentnumber"></el-table-column>
      <el-table-column label="生效范围" align="center" prop="commentnumber"></el-table-column>
      <el-table-column label="剩余/总量" align="center" prop="commentnumber"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <!--<el-button type="text" @click="editCoupon(scope)">编辑</el-button>-->
          <!--<el-button type="text" class="danger-text" @click="deleteCoupon(scope)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background class="page-box tc" :page-sizes="[10, 20, 30, 40]" :current-page="page_num"
                   :page-size="page_size" :total="total" layout="total, sizes, prev, pager, next, jumper"
                   @size-change="sizeChange" @current-change="pageChange"></el-pagination>

    <block-title title="优惠券标签列表"></block-title>
    <el-button type="primary" class="add-item-btn" icon="el-icon-plus" @click="itemDialog = true">新增标签</el-button>
    <el-table v-loading="itemLoading" :data="itemList" stripe size="mini">
      <el-table-column label="标签序号" align="center" prop="itsort"></el-table-column>
      <el-table-column label="标签名称" align="center" prop="itname"></el-table-column>
      <el-table-column label="标签描述" align="center" prop="itdesc"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editItem(scope)">编辑</el-button>
          <el-button type="text" class="danger-text" @click="deleteItem(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑dialog-->
    <el-dialog v-el-drag-dialog :visible.sync="itemDialog" width="700px" top="20vh"
               :title="itemForm.itid?'编辑优惠券标签':'新增优惠券标签'" :close-on-click-modal="false">
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

  export default {
    name: 'Coupon',
    data() {
      return {
        kw: '',
        couponLoading: false,
        couponList: [],
        itemLoading: false,
        itemList: [],
        itemDialog: false,
        page_num: 1,
        page_size: 10,
        total: 0,
        itemForm: {
          itid: '',
          itname: '',
          itdesc: '',
          itsort: '',
          ittype: 20
        },
        rules: {
          itname: [
            { required: true, message: '标签名称必填', trigger: 'blur' },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
          ],
          itsort: [
            { required: true, message: '标签序号必填', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
          ]
        },
      }
    },
    directives: { elDragDialog },
    components: {},
    watch: {
      // 标签diaolog关闭时重置itemForm
      itemDialog(newValue, oldValue) {
        if(!newValue) {
          this.itemForm = {
            itid: '',
            itname: '',
            itdesc: '',
            itsort: '',
            ittype: 20
          }
        }
      }
    },
    mounted() {
      this.getCoupon();       // 获取优惠券
      this.getItem()          // 获取优惠券标签
    },
    methods: {
      // 获取优惠券标签
      getItem() {
        this.itemLoading = true;
        this.$http.get(this.$api.items_list, { noLoading: true,
          params: { ittype: '20' }}).then(res => {
          if (res.data.status == 200) {
            this.itemList = res.data.data;
            this.itemLoading = false;
          }
        })
      },
      // 获取优惠券
      getCoupon() {
        this.couponLoading = true;
        this.$http.get(this.$api.coupon_list, { noLoading: true,
          params: { page_num: this.page_num, page_size: this.page_size }}).then(res => {
          if (res.data.status == 200) {
            this.couponList = res.data.data;
            this.total = res.data.total_count;
            this.couponLoading = false;
            console.log(res.data.data[0]);
          }
        })
      },
      // 新增优惠券
      addCoupon() {
        this.$router.push('/marketing/editCoupon');
      },
      // 编辑优惠券
      editCoupon(scope) {

      },
      // 删除优惠券
      deleteCoupon(scope) {

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
                      title: `优惠券标签${ type }成功`,
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
                    title: `优惠券标签${ type }成功`,
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
      // 编辑优惠券标签
      editItem(scope) {
        this.itemDialog = true;
        this.itemForm = JSON.parse(JSON.stringify(scope.row));
      },
      // 删除优惠券标签
      deleteItem(scope) {
        this.$confirm('此操作将删除该优惠券标签, 是否继续?', '提示', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
          let params = {
            itid: scope.row.itid,
            ittype: 20,
            isdelete: true
          };
          this.$http.post(this.$api.update_items, params).then(res => {
            if (res.data.status == 200) {
              this.$notify({
                title: '优惠券标签删除成功',
                message: `标签名称：${scope.row.itname}`,
                type: 'success'
              });
              this.itemDialog = false;
              this.itemList.splice(scope.$index, 1);
            }
          })
        }).catch(() => { });
      },
      sizeChange(val) {
        this.page_size = val;
        this.getCoupon()        // 获取优惠券
      },
      pageChange(val) {
        this.page_num = val;
        this.getCoupon()        // 获取优惠券
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    margin-top: -30px;
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
