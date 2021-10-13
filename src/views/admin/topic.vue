<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }"
          ><i class="iconfont icon-zhuye"> 首页</i></el-breadcrumb-item
        >
        <el-breadcrumb-item>论文管理</el-breadcrumb-item>
        <el-breadcrumb-item>课题管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </el-header>
    <div class="allButton">
      <el-button type="warning"
        ><i class="el-icon-delete"> 批量删除</i></el-button
      >
      <span class="count">共有数据：{{ totalRow }}条</span>
    </div>
    <div class="table">
      <v-table :tableData="tableData" :flag="flag"></v-table>
      <!-- 分页方法 -->
      <v-pagination
        :totalRow="totalRow"
        @pageChange="pageChange"
      ></v-pagination>
    </div>
  </el-container>
</template>

<script>
import "@/assets/css/admin/simpleTable.css";
import { topicMixin } from "@/mixin/get.js";
import pagination from "@/component/pagination";
import table from "@/component/table";
export default {
  mixins: [topicMixin],
  data() {
    return {
      msg: true,
      value: "",
      collegeData: [],
      Url: "",
      flag: 2,
      params: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  components: {
    "v-pagination": pagination,
    "v-table": table,
    // "v-action": action,
  },
  mounted() {
    // 程序启动先执行一遍，获取第一页数据
    this.getTopicList(this.params);
  },

  methods: {
    // 分页 pageChange当前页发生改变触发函数
    async pageChange(page) {
      this.params.pageNum = page;
      // 调用获取列表的方法
      this.getTopicList(this.params);
    },
  },
};
</script>
<style lang="less" scoped>
.el-input__inner {
  margin-bottom: 20px;
}
.addBtn {
  margin-left: 85%;
}
.addForm .el-input__inner,
.editFrom .el-input__inner {
  width: 83%;
}
.finish {
  width: 100% !important;
}
</style>