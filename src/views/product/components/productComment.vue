<template>
  <div class="container">
    <el-dialog :visible="visible" @close="doClose">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column label=""></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ProductComment",

    components: {},

    props: ['visible', 'prid'],

    watch: {
      visible(val){
        if(val){
          this.$http.get(this.$api.get_evaluation,{
            params: {
              page_size: this.pageSize,
              page_num: this.currentPage,
              prid: row.prid
            }
          }).then(
            res => {
              if (res.data.status == 200) {
                let resData = res.data,
                  data = res.data.data;

                console.log(data);
              }
            }
          )
        }
      }
    },

    data() {
      return {
        loading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
      }
    },

    computed: {},

    methods: {
      doClose(){
        this.$emit('close');
      }
    },

    created() {

    },
  }
</script>

<style lang="less" scoped>
  @import "../../../styles/myIndex";

  .container {

  }
</style>
