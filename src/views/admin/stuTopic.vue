<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }"
          ><i class="iconfont icon-zhuye"> 首页</i></el-breadcrumb-item
        >
        <el-breadcrumb-item>论文管理</el-breadcrumb-item>
        <el-breadcrumb-item>学生课题</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </el-header>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="stuTopicList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        highlight-current-row
      >
        <el-table-column type="selection" width="70"> </el-table-column>
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="name" label="课题" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="xuantiren"
          label="选题学生"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="academy" label="学院" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="className" label="班级" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="addTime" label="选题时间" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <!-- 分页方法 -->
      <v-pagination
        :totalRow="totalTopic"
        @pageChange="pageChange"
      ></v-pagination>
    </div>
  </el-container>
</template>

<script>
import "@/assets/css/admin/simpleTable.css";
import pagination from "@/component/pagination";
import { getTopic } from "@/mixin/getCount.js";
export default {
  mixins: [getTopic],
  data() {
    return {
      dataEdit: {},
      params: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  components: {
    "v-pagination": pagination,
  },
  created() {
    this.getTopic(this.params);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    isDialog() {
      this.dialogVisible = true;
    },
    // 分页 pageChange当前页发生改变触发函数
    async pageChange(page) {
      this.pageNum = page;
      // 调用获取列表的方法
      this.getList(this.params);
    },
  },
};
</script>
<style lang="less" scoped>
.el-input__inner {
  margin-bottom: 20px;
}
</style>