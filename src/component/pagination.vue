<template>
  <div>
    <el-pagination
      v-on:current-change="pageChange"
      @current-change="$emit('pageChange', pageNum)"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRow"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageSize: 5,
      pageNum: 1,
    };
  },
  props: ["totalRow"],
  methods: {
    // 分页 pageChange当前页发生改变触发函数
    async pageChange(page) {
      this.pageNum = page;
      console.log(page);
    },
  },
};
</script>
