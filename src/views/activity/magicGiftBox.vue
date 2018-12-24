<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <el-form label-width="120px">
          <el-form-item label="原始价格:">
            <el-input class="price-input">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="预设价格:">
            <el-input class="price-input">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="最低价格:">
            <el-input class="price-input">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="三挡范围:">
          </el-form-item>
          <el-form-item label="第一档:">
            <span>随机减少</span>
            <el-input type="number" class="item-input"></el-input>
            <span>至</span>
            <el-input type="number" class="item-input"></el-input>
            <span>元</span>
          </el-form-item>
          <el-form-item label="第二档:">
            <span>随机减少</span>
            <el-input type="number" class="item-input"></el-input>
            <span>至</span>
            <el-input type="number" class="item-input"></el-input>
            <span>元</span>
            <span class="span-or">或</span>
            <span>随机增加</span>
            <el-input type="number" class="item-input"></el-input>
            <span>至</span>
            <el-input type="number" class="item-input"></el-input>
            <span>元</span>
          </el-form-item>
          <el-form-item label="第三档:">
            <span>随机减少</span>
            <el-input type="number" class="item-input"></el-input>
            <span>至</span>
            <el-input type="number" class="item-input"></el-input>
            <span>元</span>
            <span class="span-or">或</span>
            <span>随机增加</span>
            <el-input type="number" class="item-input"></el-input>
            <span>至</span>
            <el-input type="number" class="item-input"></el-input>
            <span>元</span>
          </el-form-item>
          <el-form-item label="持续时间:">
            <el-date-picker v-model="value6" type="datetimerange" start-placeholder="开始日期"
                            range-separator="至" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            选择商品
            <el-button type="primary">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "MagicGiftBox",
    components: {},
    data() {
      return {
        value6: '',
      }
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .item-input {
      .wl(4.5rem, 0.4rem);
    }
    .price-input {
      .wl(12rem, 0.4rem);
    }
    .span-or {
      margin: 0 0.4rem;
    }

    .action-button {
      padding: .1rem .2rem;
    }
  }
</style>
