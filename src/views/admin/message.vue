<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }"
          ><i class="iconfont icon-zhuye"> 首页</i></el-breadcrumb-item
        >
        <el-breadcrumb-item>其他管理</el-breadcrumb-item>
        <el-breadcrumb-item>友情链接管理</el-breadcrumb-item>
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
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        highlight-current-row
      >
        <el-table-column type="selection" width="70"> </el-table-column>
        <el-table-column label="ID" prop="id" width="100"> </el-table-column>
        <el-table-column prop="name" label="姓名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="cont" label="内容" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="count" label="回复数量" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="" label="回复情况" show-overflow-tooltip>
          <el-link type="danger" @click="check">查看</el-link>
        </el-table-column>
        <el-table-column prop="addTime" label="留言时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-end"
            >
              <i
                class="el-icon-delete"
                @click="Delete(scope.$index, scope.row)"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页方法 -->
      <v-pagination
        :totalRow="totalRow"
        @pageChange="pageChange"
      ></v-pagination>
      <el-dialog
        title="回复留言的战况"
        :visible.sync="dialogVisible"
        width="80%"
      >
        <el-table
          ref="multipleTable"
          :data="replyData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          highlight-current-row
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="序号" type="index" width="100">
          </el-table-column>
          <el-table-column prop="name" label="姓名" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="sex" label="性别" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="cont" label="回复的内容" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="huiId"
            label="留言人的id"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="addTime"
            label="回复时间"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
import "@/assets/css/admin/simpleTable.css";
import pagination from "@/component/pagination";
export default {
  data() {
    return {
      count: "",
      pageNum: 1,
      pageSize: 5,
      tableData: [],
      totalRow: 0,
      dialogVisible: false,
      dataEdit: {},
      replyData: [],
    };
  },
  components: {
    "v-pagination": pagination,
  },
  mounted() {
    // 程序启动先执行一遍，获取第一页数据
    this.getList();
    this.getReply();
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
      this.getList();
    },
    // 获取留言列表
    getList() {
      this.$http
        .get("/message/list", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          this.totalRow = res.data.msg.count;
          this.tableData = res.data.msg.rows;
        });
    },
    //获取回复留言列表
    getReply() {
      this.$http
        .get("/reply/list", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          this.replyData = res.data.msg.rows;
        });
    },
    //查看回复情况
    check() {
      this.dialogVisible = true;
    },
    //删除留言
    Delete(index, row) {
      const data = {
        id: row.id,
      };
      this.$confirm("此操作将永久删除，是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$http.post("/message/delete", data).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("成功删除!");
              this.tableData.splice(index, 1);
              this.getList();
            } else if (res.data.code == 202) {
              this.$message.error("不能删除");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
.el-input__inner {
  margin-bottom: 20px;
}
</style>