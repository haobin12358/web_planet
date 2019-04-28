<template>
  <div>
    <el-dialog v-el-drag-dialog :visible.sync="productDialog" width="1200px" top="5vh" title="选择商品" :close-on-click-modal="false">
      <section class="tool-bar space-between" style="margin-top: -30px">
        <el-form :inline="true" size="medium">
          <el-form-item label="商品名称">
            <el-input v-model="kw"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search"  :loading="productLoading" @click="search">查询</el-button>
            <el-button icon="el-icon-refresh"  :loading="productLoading" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
      <el-table v-loading="productLoading" :data="productList" stripe height="65vh">
        <el-table-column align="center" width="120" label="图片">
          <template slot-scope="scope">
            <table-cell-img :src="[scope.row.prmainpic]" :key="scope.row.prid"></table-cell-img>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" prop="prtitle" show-overflow-tooltip></el-table-column>
        <el-table-column label="价格" align="center" prop="prprice"></el-table-column>
        <el-table-column label="库存" align="center" prop="prstocks"></el-table-column>
        <el-table-column label="品牌" align="center" prop="brand.pbname"></el-table-column>
        <!--<el-table-column label="销量" align="center" prop="prsalesvalue"></el-table-column>-->
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="chooseProduct(scope)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background class="page-box tc" :page-sizes="[10, 20, 30, 40]" :current-page="page_num"
                     :page-size="page_size" :total="total" layout="total, sizes, prev, pager, next, jumper"
                     @size-change="sizeChange" @current-change="pageChange"></el-pagination>
    </el-dialog>


    <el-dialog v-el-drag-dialog :visible.sync="skusDialog" title="选择商品规格" width="1100px" top="7vh" :close-on-click-modal="false">
      <!--新人首单-->
      <el-form :model="skusForm" label-position="right" label-width="120px" v-if="where == 'new'">
        <el-form-item label="参与起止时间：">
          <el-date-picker
            v-model="fmfatime" type="daterange" value-format="yyyy-MM-dd" :picker-options="pickerOptions"
            start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="列表显示价格：" prop="prprice">
          <el-input class="long-input" v-model="skusForm.prprice" maxlength="11">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <!--竞猜奖品-->
      <el-form label-position="right" label-width="120px" v-if="where == 'guess'">
        <el-form-item label="参与时间：">
          <el-date-picker class="dates-box" type="dates" value-format="yyyy-MM-dd" :picker-options="pickerOptions"
                          v-model="gnaastarttime" :placeholder="placeholder">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="显示价格：" prop="prprice">
          <el-input class="long-input" v-model="skusForm.prprice" maxlength="11">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <!--星币-->
      <el-form label-position="right" label-width="120px" v-if="where == 'star'">
        <el-form-item label="显示价格：" prop="prprice">
          <el-input class="long-input" v-model="skusForm.prprice" maxlength="11">
            <template slot="append">星币</template>
          </el-input>
        </el-form-item>
      </el-form>
      <!--魔盒奖品-->
      <el-form label-position="right" label-width="120px" inline v-if="where == 'magic'" style="margin-top: -30px">
        <el-form-item label="参与时间：">
          <el-date-picker class="dates-box" type="dates" value-format="yyyy-MM-dd" :picker-options="pickerOptions"
                          v-model="mbastarttime" :placeholder="placeholder">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="第一档:">
          <span>随机减少</span>
          <el-input class="item-input" v-model="numList[0]" maxlength="11"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[1]" maxlength="11"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="第二档:">
          <span>随机减少</span>
          <el-input class="item-input" v-model="numList[2]" maxlength="11"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[3]" maxlength="11"></el-input>
          <span>元</span>
          <span class="span-or">或</span>
          <span>随机增加</span>
          <el-input class="item-input" v-model="numList[4]" maxlength="11"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[5]" maxlength="11"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="第三档:">
          <span>随机减少</span>
          <el-input class="item-input" v-model="numList[6]" maxlength="11"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[7]" maxlength="11"></el-input>
          <span>元</span>
          <span class="span-or">或</span>
          <span>随机增加</span>
          <el-input class="item-input" v-model="numList[8]" maxlength="11"></el-input>
          <span>至</span>
          <el-input class="item-input" v-model="numList[9]" maxlength="11"></el-input>
          <span>元</span>
        </el-form-item>
      </el-form>

      <!--限时商品-->
      <el-form label-position="right" label-width="120px" v-if="where == 'limited'">
<!--        <el-form-item label="限时活动场景：">-->
<!--          <el-select v-model="tlaid" placeholder="请选择">-->
<!--            <el-option-->
<!--              v-for="item in limited_list"-->
<!--              :key="item.tlaid"-->
<!--              :label="item.tlaname"-->
<!--              :value="item.tlaid">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="显示价格：" prop="prprice">
          <el-input class="long-input" v-model="skusForm.prprice" maxlength="11">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <!--表格部分-->
      <section style="margin-bottom: 20px;">
        <el-input v-model="commonNum" placeholder="统一设置参与数量" size="medium" style="width: 160px;"
                  @keyup.enter.native="setCommonSku('num')"></el-input>
        <el-input v-model="commonSkuPrice" placeholder="统一设置参与价格"  size="medium" style="width: 160px;"
                  @keyup.enter.native="setCommonSku('price')"></el-input>
        <el-input v-model="commonMaxPrice" placeholder="统一设置最高价格" v-if="where === 'magic'" size="medium" style="width: 160px;"
                  @keyup.enter.native="setCommonSku('maxprice')">
        </el-input>

        <span class="form-item-end-tip">回车统一设置</span>
        <el-button type="text" v-if="where == 'guess'" @click="setSkuSix('all')">设置减免金额</el-button>
      </section>
      <el-table v-loading="skusLoading" :data="skusList" stripe :height="height"
                @selection-change="handleSelectionChange" row-key="skuid" ref="skuList">
        <el-table-column type="selection" :reserve-selection="false"></el-table-column>
        <el-table-column align="center" width="120" label="图片">
          <template slot-scope="scope">
            <table-cell-img :src="[scope.row.skupic]" :key="scope.row.skuid"></table-cell-img>
          </template>
        </el-table-column>
        <el-table-column label="规格名称" align="center" prop="skuname" show-overflow-tooltip></el-table-column>
        <el-table-column label="库存" align="center" prop="skustock"></el-table-column>
        <el-table-column label="参与数量" align="center" prop="skuprice">
          <template slot-scope="scope">
            <el-input class="shorter-input" v-model="scope.row.stock" v-if="where == 'star'" maxlength="11">
            </el-input>
            <el-input class="shorter-input" v-model="scope.row.stock" v-else :disabled="isEdit" maxlength="11">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="原价" align="center" prop="skuprice" v-if="where !== 'magic'"></el-table-column>
        <el-table-column label="最高价格" align="center" prop="skuprice" v-else>
          <template slot-scope="scope">
            <el-input class="short-input" v-model="scope.row.maxprice" maxlength="11">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="参与价格" align="center" prop="skuprice" v-if="where !== 'magic'">
          <template slot-scope="scope">
            <el-input class="short-input" v-if="where != 'star'" v-model="scope.row.price" maxlength="11">
              <template slot="append">元</template>
            </el-input>
            <el-input class="short-input" v-else v-model="scope.row.price" maxlength="11">
              <template slot="append">星币</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="最低价格" align="center" prop="skuprice" v-else>
          <template slot-scope="scope">
            <el-input class="short-input" v-model="scope.row.price" maxlength="11">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="减免金额" align="center" width="120" v-if="where == 'guess'">
          <template slot-scope="scope">
            <el-button type="text" @click="setSkuSix(scope.row)">设置减免金额</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="skusDialog = false">取 消</el-button>
        <el-button type="primary" @click="chooseSku" v-if="isEdit">重新申请</el-button>
        <el-button type="primary" @click="chooseSku" v-else>确 定</el-button>
      </span>
    </el-dialog>

    <!--每日竞猜——设置sku的六个减免金额-->
    <el-dialog v-el-drag-dialog :visible.sync="skuSixDialog" title="设置减免金额" width="800px" top="7vh" :close-on-click-modal="false">
      <el-form label-position="right" label-width="120px" inline style="margin-top: -30px">
        <el-form-item label="规格名称:" style="margin: 0 300px 0 -28px">
          <span>{{rowTemp.skuname}}</span>
        </el-form-item>
        <el-form-item label="猜对一个数字:">
          <el-input class="short-long-input" v-model="rowTemp.skudiscountone" maxlength="11">
            <template slot="prepend">减免</template>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="猜对两个数字:">
          <el-input class="short-long-input" v-model="rowTemp.skudiscounttwo" maxlength="11">
            <template slot="prepend">减免</template>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="猜对三个数字:">
          <el-input class="short-long-input" v-model="rowTemp.skudiscountthree" maxlength="11">
            <template slot="prepend">减免</template>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="猜对四个数字:">
          <el-input class="short-long-input" v-model="rowTemp.skudiscountfour" maxlength="11">
            <template slot="prepend">减免</template>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="猜对五个数字:">
          <el-input class="short-long-input" v-model="rowTemp.skudiscountfive" maxlength="11">
            <template slot="prepend">减免</template>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="猜对六个数字:">
          <el-input class="short-long-input" v-model="rowTemp.skudiscountsix" maxlength="11">
            <template slot="prepend">减免</template>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="skuSixDialog = false">取 消</el-button>
        <el-button type="primary" @click="skuSixDone">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import TableCellImg from "src/components/TableCellImg"
  import elDragDialog from 'src/directive/el-dragDialog'

  const moneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/;
  const positiveNumberReg = /^([1-9]\d*)$/;   //  正整数
  export default {
    data() {
      return {
        kw: '',
        productDialog: false,
        productLoading: false,
        productList: [],
        page_size: 10,
        page_num: 1,
        total: 0,
        skusDialog: false,
        skusLoading: false,
        skuSixDialog: false,
        skusList: [],
        skus: [],
        fmfatime: [],
        skusForm: {
          prprice: ''
        },
        prid: '',
        gnaastarttime: [],
        mbastarttime: [],
        height: '400px',
        numList: [1, 2, 3, 5, 5, 10, 5, 10, 20, 30],
        isEdit: false,
        placeholder: '请选择一个或多个日期',
        pickerOptions: {         // 日期选择器的时间限制
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        rowTemp: {},
      //  统一
        commonNum:'',
        commonMaxPrice:'',
        commonSkuPrice:''
      }
    },
    props: {
      where: { type: String, default: '' },
      // limited_list:{type:Array,default: ''},
      tlaid:{type:String,default: ''}
    },
    directives: { elDragDialog },
    components: { TableCellImg },
    mounted() {
      this.getProduct();
      if(this.where == 'magic') {
        this.height = '300px'
      }
    },
    watch: {
      isEdit(val) {
        if(val) {
          this.placeholder = '重新编辑时只能选择单个日期'
        }else {
          this.placeholder = '请选择一个或多个日期'
        }
      }
    },
    methods: {
      sizeChange(val) {
        this.page_size = val;
        this.getProduct()
      },
      pageChange(val) {
        this.page_num = val;
        this.getProduct()
      },
      search() {
        this.page_num = 1;
        this.getProduct()
      },
      reset() {
        this.kw = '';
        this.page_num = 1;
        this.getProduct()
      },
      // 选择的skus在变化
      handleSelectionChange(val) {
        if(this.where == 'new' || this.where == 'guess' || this.where == 'limited' || this.where == 'star') {
          this.skus = val
        }else if(this.where == 'magic') {
          if(val.length > 1) {
            this.$message.warning('请单选商品规格');
            this.skus = []
          }else {
            this.skus = val
          }
        }
      },
      chooseDone() {
        this.productDialog = false;
        this.skusDialog = false;
      },
      // 新人首单
      chooseNewSku() {
        if(!this.skus.length) {
          this.$message.warning('请先勾选商品规格');
          return false
        }
        if(!this.fmfatime.length) {
          this.$message.warning('请先选择参与起止时间');
          return false
        }
        if(!moneyReg.test(this.skusForm.prprice)) {
          this.$message.warning('请先填写合理的列表显示价格');
          return false
        }
        let sku = {
          prid: this.prid,
          fmfastarttime: this.fmfatime[0],
          fmfaendtime: this.fmfatime[1],
          prprice: this.skusForm.prprice,
          skus: []
        };
        for(let i in this.skus) {
          let skus = {
            skuid: this.skus[i].skuid,
            skustock: this.skus[i].stock,
            skuprice: this.skus[i].price
          };

          if (!positiveNumberReg.test(this.skus[i].stock)){
            this.$message.warning('请输入合理的库存');
            return
          }
          if (!moneyReg.test(this.skus[i].price)){
            this.$message.warning('请输入合理的价格');
            return
          }
          if(this.skus[i].stock > this.skus[i].skustock){
            this.$message.warning('参与数量超出库存');
            return
          }

          sku.skus.push(skus)
        }
        this.$emit('chooseNewSku', sku, this.isEdit)
      },
      // 每日竞猜
      chooseGuessSku() {
        if(this.isEdit) {
          if(this.gnaastarttime.length != 1) {
            this.$message.warning('重新编辑时只能选择单个日期');
            return false
          }
        }else {
          if(!this.gnaastarttime.length) {
            this.$message.warning('请至少选择一个日期');
            return false
          }
        }
        if(!moneyReg.test(this.skusForm.prprice)) {
          this.$message.warning('请正确输入显示价格');
          return
        }
        if(!this.skus.length) {
          console.log(this.skus);
          this.$message.warning('请先选择商品规格');
          return false
        }
        if (!positiveNumberReg.test(this.skus[0].stock)) {
          this.$message.warning('请输入合理的库存');
          return
        }
        if (!moneyReg.test(this.skus[0].price)){
          this.$message.warning('请输入合理的sku价格');
          return
        }
        if(this.skus[0].stock > this.skus[0].skustock ){
          this.$message.warning('参与数量超出库存');
          return
        }
        let sku = {
          prid: this.prid,
          gnaastarttime: this.gnaastarttime,
          prprice: this.skusForm.prprice,
          skus: []
        };
        for(let i in this.skus) {
          let skus = {};
          skus.skustock = this.skus[i].stock;
          skus.skuid = this.skus[i].skuid;
          skus.skuprice = this.skus[i].price;
          skus.skudiscountone = this.skus[i].skudiscountone;
          skus.skudiscounttwo = this.skus[i].skudiscounttwo;
          skus.skudiscountthree = this.skus[i].skudiscountthree;
          skus.skudiscountfour = this.skus[i].skudiscountfour;
          skus.skudiscountfive = this.skus[i].skudiscountfive;
          skus.skudiscountsix = this.skus[i].skudiscountsix;
          sku.skus.push(skus)
        }
        this.$emit('chooseGuessSku', sku, this.isEdit)
      },
      // 魔盒
      chooseMagicSku() {
        if(!this.skus.length) {
          this.$message.warning('请先单选商品规格');
          return false
        }
        if(this.skus.length > 1) {
          this.$message.warning('请单选商品规格');
          return false
        }
        if(this.isEdit) {
          if(this.mbastarttime.length != 1) {
            this.$message.warning('重新编辑时只能选择单个日期');
            return false
          }
        }else {
          if(!this.mbastarttime.length) {
            this.$message.warning('请至少选择一个日期');
            return false
          }
        }
        for (let i = 0; i < this.numList.length; i++) {
          if(!moneyReg.test(this.numList[i])){
            this.$message.warning('档位金额设置有误');
            return
          }
        }
        if (!positiveNumberReg.test(this.skus[0].stock)){
          this.$message.warning('请输入合理的库存');
          return
        }
        if (!moneyReg.test(this.skus[0].price)){
          this.$message.warning('请输入合理的金额');
          return
        }
        if(this.skus[0].stock > this.skus[0].skustock){
          this.$message.warning('参与数量超出库存');
          return
        }
        let sku = {
          skuid: this.skus[0].skuid,
          prid: this.prid,
          mbastarttime: this.mbastarttime,
          skuminprice: this.skus[0].price,
          skuprice: this.skus[0].maxprice,
          skustock: this.skus[0].stock,
          gearsone: [this.numList[0] + '-' + this.numList[1]],
          gearstwo: [this.numList[2] + '-' + this.numList[3], this.numList[4] + '-' + this.numList[5]],
          gearsthree: [this.numList[6] + '-' + this.numList[7], this.numList[8] + '-' + this.numList[9]],
        };

        this.$emit('chooseMagicSku', sku, this.isEdit)
      },
      chooseSku() {
        if(this.where == 'new') {               // 新人首单
          this.chooseNewSku()
        }else if(this.where == 'guess') {       // 竞猜奖品
          this.chooseGuessSku()
        }else if(this.where == 'magic') {       // 魔盒奖品
          this.chooseMagicSku()
        }else if(this.where == 'limited'){     //限时活动
          this.chooseLimitedSku()
        }else if(this.where == 'star'){     //限时活动
          this.chooseStarSku()
        }
      },
      //星币
      chooseStarSku(){
        if(!positiveNumberReg.test(this.skusForm.prprice)) {
          this.$message.warning('请正确输入显示价格');
          return
        }
        if(!this.skus.length) {
          this.$message.warning('请先选择商品规格');
          return false
        }
        if (!positiveNumberReg.test(this.skus[0].stock)) {
          this.$message.warning('请输入合理的库存');
          return
        }
        if (!positiveNumberReg.test(this.skus[0].price)){
          this.$message.warning('请输入合理的sku价格');
          return
        }
        if(this.skus[0].stock > this.skus[0].skustock ){
          this.$message.warning('参与数量超出库存');
          return
        }
        let sku = {
          prid: this.prid,
          ipid: this.ipid,
          ipprice: this.skusForm.prprice,
          skus: []
        };
        for(let i in this.skus) {
          let skus = {};
          skus.ipsstock = this.skus[i].stock;
          skus.skuid = this.skus[i].skuid;
          skus.skuprice = this.skus[i].price;
          skus.skudiscountone = this.skus[i].skudiscountone;
          skus.skudiscounttwo = this.skus[i].skudiscounttwo;
          skus.skudiscountthree = this.skus[i].skudiscountthree;
          skus.skudiscountfour = this.skus[i].skudiscountfour;
          skus.skudiscountfive = this.skus[i].skudiscountfive;
          skus.skudiscountsix = this.skus[i].skudiscountsix;
          sku.skus.push(skus)
        }
        this.$emit('chooseStarSku', sku, this.isEdit)
      },
      // 限时
      chooseLimitedSku() {

        if(!this.tlaid) {
          this.$message.warning('请选择一个限时活动场景');
          return false
        }

        if(!moneyReg.test(this.skusForm.prprice)) {
          this.$message.warning('请正确输入显示价格');
          return
        }
        if(!this.skus.length) {
          this.$message.warning('请先选择商品规格');
          return false
        }
        if (!positiveNumberReg.test(this.skus[0].stock)) {
          this.$message.warning('请输入合理的库存');
          return
        }
        if (!moneyReg.test(this.skus[0].price)){
          this.$message.warning('请输入合理的sku价格');
          return
        }
        if(this.skus[0].stock > this.skus[0].skustock ){
          this.$message.warning('参与数量超出库存');
          return
        }
        let sku = {
          prid: this.prid,
          tlaid: this.tlaid,
          prprice: this.skusForm.prprice,
          skus: []
        };
        for(let i in this.skus) {
          let skus = {};
          skus.skustock = this.skus[i].stock;
          skus.skuid = this.skus[i].skuid;
          skus.skuprice = this.skus[i].price;
          skus.skudiscountone = this.skus[i].skudiscountone;
          skus.skudiscounttwo = this.skus[i].skudiscounttwo;
          skus.skudiscountthree = this.skus[i].skudiscountthree;
          skus.skudiscountfour = this.skus[i].skudiscountfour;
          skus.skudiscountfive = this.skus[i].skudiscountfive;
          skus.skudiscountsix = this.skus[i].skudiscountsix;
          sku.skus.push(skus)
        }
        this.$emit('chooseLimitedSku', sku, this.isEdit)
      },
      // 每日竞猜——设置sku的六个减免金额
      setSkuSix(row) {
        if(row == 'all'){
          this.rowTemp ={
            skudiscountone:1,
            skudiscounttwo:2,
            skudiscountthree:3,
            skudiscountfour:4,
            skudiscountfive:5,
            skudiscountsix:6,
            skuname:'所有'
          };
        }else{
          this.rowTemp = row;
        }

        this.skuSixDialog = true
      },
      // 每日竞猜——设置sku的确认按钮
      skuSixDone() {
        if(!moneyReg.test(this.rowTemp.skudiscountone) || !moneyReg.test(this.rowTemp.skudiscounttwo) ||
          !moneyReg.test(this.rowTemp.skudiscountthree) || !moneyReg.test(this.rowTemp.skudiscountfour) ||
          !moneyReg.test(this.rowTemp.skudiscountfive) || !moneyReg.test(this.rowTemp.skudiscountsix)) {
          this.$message.warning('请正确输入减免金额');
          return
        }
        if(this.rowTemp.skuname == '所有'){
          for(let i=0;i<this.skusList.length;i++){
            this.skusList[i].skudiscountone = Number(this.rowTemp.skudiscountone);
            this.skusList[i].skudiscounttwo = Number(this.rowTemp.skudiscounttwo);
            this.skusList[i].skudiscountthree = Number(this.rowTemp.skudiscountthree);
            this.skusList[i].skudiscountfour = Number(this.rowTemp.skudiscountfour);
            this.skusList[i].skudiscountfive = Number(this.rowTemp.skudiscountfive);
            this.skusList[i].skudiscountsix = Number(this.rowTemp.skudiscountsix);
          }
        }

        this.skusList = this.skusList.concat([])
        this.skuSixDialog = false
      },
      //统一
      setCommonSku(type) {

        if (this.skusList.length) {
          for (let i = 0; i < this.skusList.length; i++) {
            switch (type) {
              case 'num':
                this.skusList[i].stock = Number(this.commonNum);
                break;
              case 'maxprice':
                this.skusList[i].maxprice = this.commonMaxPrice;
                break;
              case 'price':
                this.skusList[i].price = this.commonSkuPrice;
                break;
            }
          }
          console.log(type,this.skusList)
          this.skusList = [].concat(this.skusList);
        } else {
          this.$message.warning('请先新增商品属性后再设置')
        }
      },
      getProduct() {
        this.productLoading = true;
        this.$http.get(this.$api.product_list, {
          noLoading: true,
          params: {
            kw: this.kw,
            prstatus: 'usual',
            page_num: this.page_num,
            page_size: this.page_size
          }}).then(res => {
          if (res.data.status == 200) {
            this.productList = res.data.data;
            this.total = res.data.total_count;
            this.productLoading = false;
          }
        })
      },
      chooseProduct(scope) {
        this.initDialog();
        // 获取选择的商品信息
        this.prid = scope.row.prid;
        // this.skusForm.prprice = scope.row.prprice;
        this.$http.get(this.$api.product_get, {
          noLoading: true,
          params: { prid: this.prid }}).then(res => {
          if (res.data.status == 200) {
            this.skusList = res.data.data.skus;
            this.skusDialog = true;
            for(let i in this.skusList) {
              this.skusList[i].skuname = '';
              for(let j in this.skusList[i].skuattritedetail) {
                this.skusList[i].skuname += this.skusList[i].skuattritedetail[j] + ' '
              }
              this.skusList[i].stock = 1;
              if(this.where == 'star'){
                this.skusList[i].price = 1;
              }else{
                this.skusList[i].price = 0.01;
              }

              this.skusList[i].maxprice = this.skusList[i].skuprice;
              this.skusList[i].skudiscountone = 1;
              this.skusList[i].skudiscounttwo = 2;
              this.skusList[i].skudiscountthree = 3;
              this.skusList[i].skudiscountfour = 4;
              this.skusList[i].skudiscountfive = 5;
              this.skusList[i].skudiscountsix = 6;
            }
            // 编辑时处理数据
            if(scope.row.where) {
              this.isEdit = true;
              this.editActivity(scope);
            }
          }
        });
      },
      // 初始化dialog
      initDialog() {
        this.skus = [];
        this.fmfatime = [];
        this.gnaastarttime = [];
        this.mbastarttime = [];
        this.skusForm.prprice = '';
      },
      // 编辑时处理数据
      editActivity(scope) {
        if(scope.row.where == 'new') {
          this.fmfatime = [scope.row.fmfastarttime, scope.row.fmfaendtime];
          this.skusForm.prprice = scope.row.fresh_product.prprice;
          // 倒计时
          const TIME_COUNT = 1;
          let count = TIME_COUNT;
          let time = setInterval(() => {
            if(count > 0 && count <= TIME_COUNT) {
              count --;
            }else {
              // 选中之前勾选的商品
              for(let i in scope.row.fresh_product.sku) {
                for(let j in this.skusList) {
                  if(scope.row.fresh_product.sku[i].skuid == this.skusList[j].skuid) {
                    this.skusList[j].stock = scope.row.fresh_product.sku[i].fmfpstock;
                    this.skusList[j].price = scope.row.fresh_product.sku[i].skuprice;
                    this.$refs.skuList.toggleRowSelection(this.skusList[j])
                  }
                }
              }
              clearInterval(time);
            }
          }, 10);
        }else if(scope.row.where == 'guess') {
          this.skusForm.prprice = scope.row.prprice;
          for(let i in this.skusList) {
            for(let j in scope.row.product.sku) {
              if(this.skusList[i].skuid == scope.row.product.sku[j].skuid) {
                this.skusList[i].skudiscountone = scope.row.product.sku[j].skudiscountone;
                this.skusList[i].skudiscounttwo = scope.row.product.sku[j].skudiscounttwo;
                this.skusList[i].skudiscountthree = scope.row.product.sku[j].skudiscountthree;
                this.skusList[i].skudiscountfour = scope.row.product.sku[j].skudiscountfour;
                this.skusList[i].skudiscountfive = scope.row.product.sku[j].skudiscountfive;
                this.skusList[i].skudiscountsix = scope.row.product.sku[j].skudiscountsix;
              }
            }
          }
          this.gnaastarttime = [scope.row.gnaastarttime];
          // 倒计时
          const TIME_COUNT = 1;
          let count = TIME_COUNT;
          let time = setInterval(() => {
            if(count > 0 && count <= TIME_COUNT) {
              count --;
            }else {
              // 选中之前勾选的商品
              for(let i in scope.row.product.sku) {
                for(let j in this.skusList) {
                  if(scope.row.product.sku[i].skuid == this.skusList[j].skuid) {
                    this.skusList[j].stock = scope.row.product.sku[i].skustock;
                    this.skusList[j].price = scope.row.product.sku[i].skuprice;
                    this.$refs.skuList.toggleRowSelection(this.skusList[j])
                  }
                }
              }
              clearInterval(time);
            }
          }, 10);
        }else if(scope.row.where == 'magic') {
          this.mbastarttime = [scope.row.mbastarttime];
          this.numList = [];
          for(let i in scope.row.gearsone[0].split('-')) {
            this.numList.push(scope.row.gearsone[0].split('-')[i])
          }
          for(let i in scope.row.gearstwo) {
            for(let j in scope.row.gearstwo[i].split('-')) {
              this.numList.push(scope.row.gearstwo[i].split('-')[j])
            }
          }
          for(let i in scope.row.gearsthree) {
            for(let j in scope.row.gearsthree[i].split('-')) {
              this.numList.push(scope.row.gearsthree[i].split('-')[j])
            }
          }
          // 倒计时
          const TIME_COUNT = 1;
          let count = TIME_COUNT;
          let time = setInterval(() => {
            if(count > 0 && count <= TIME_COUNT) {
              count --;
            }else {
              // 选中之前勾选的商品
              for(let i in this.skusList) {
                if(scope.row.skuid == this.skusList[i].skuid) {
                  this.skusList[i].stock = scope.row.skustock;
                  this.skusList[i].price = scope.row.skuminprice;
                  this.skusList[i].maxprice = scope.row.skuprice;
                  this.$refs.skuList.toggleRowSelection(this.skusList[i])
                }
              }
              clearInterval(time);
            }
          }, 10);
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../styles/myIndex";

  .page-box {
    padding-top: 20px;
  }
  .long-input {
    width: 350px;
  }
  .middle-input {
    width: 183px;
  }
  .short-long-input {
    width: 200px;
  }
  .short-input {
    width: 130px;
  }
  .shorter-input {
    width: 100px;
  }
  .dates-box {
    width: 500px;
  }
  .reduce-row {
    margin-left: -5rem;
    .reduce-long-input {
      .wl(13.2rem, 0.4rem);
      margin: 0 3rem 0 0.5rem;
    }
  }
  .item-input {
    .wl(4.5rem, 0.4rem);
  }
  .span-or {
    margin: 0 0.4rem;
  }
  .action-button {
    padding: .1rem .2rem;
  }
</style>
