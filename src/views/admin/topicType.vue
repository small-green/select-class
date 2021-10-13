<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }"
          ><i class="iconfont icon-zhuye"> 首页</i></el-breadcrumb-item
        >
        <el-breadcrumb-item>学生门户</el-breadcrumb-item>
        <el-breadcrumb-item>学院管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
    </el-header>
    <div class="allButton">
      <el-button type="warning"
        ><i class="el-icon-delete"> 批量删除</i></el-button
      >
      <el-button type="primary" @click="isDialog()"
        ><i class="el-icon-circle-plus-outline"> 添加</i></el-button
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
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="type" label="类型" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="difficult" label="难度" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top-end"
            >
              <i class="el-icon-edit" @click="editData(scope.row)"></i>
            </el-tooltip>
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
        @open="clearFn"
        title="添加论文类型信息"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <v-form v-on:add="add" :data="dataEdit"></v-form>
      </el-dialog>

      <!-- 修改教师信息 -->
      <el-dialog
        title="修改论文类型信息"
        :visible.sync="dialogVisible2"
        width="40%"
      >
        <v-form v-on:edit="Edit" :msg="msg" :data="dataEdit"></v-form>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
import "@/assets/css/admin/simpleTable.css";
import form from "@/component/typeForm.vue";
import pagination from "@/component/pagination";
export default {
  data() {
    return {
      msg: true,
      pageNum: 1,
      pageSize: 5,
      tableData: [],
      totalRow: 0,
      dialogVisible: false,
      dialogVisible2: false,
      dataEdit: {},
      Form: {
        academy: "",
      },
    };
  },
  components: {
    "v-form": form,
    "v-pagination": pagination,
  },
  mounted() {
    // 程序启动先执行一遍，获取第一页数据
    this.getList();
  },

  methods: {
    clearFn() {
      this.dataEdit = {
        type: "",
        difficult: "",
      };
    },
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
    // 获取课题类型
    getList() {
      this.$http
        .get("/topictype/list", {
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
    // 添加课题类型
    add(dataForm) {
      const data = {
        type: dataForm.type,
        difficult: dataForm.difficult,
      };
      this.$http.post("/topictype/create", data).then((res) => {
        console.log(res);
        if (res.data.code == 202) {
          this.dialogVisible = true;
          this.$message.error("该课题类型已经存在了");
        } else if (res.data.code == 200) {
          this.dialogVisible = false;
          this.$message.success("新增类型成功了");
        }
        this.getList();
      });
    },
    //修改时传值
    editData(data) {
      this.dialogVisible2 = true;
      this.dataEdit = data;
    },
    //修改课题类型
    Edit(dataForm) {
      const data = {
        id: dataForm.id,
        type: dataForm.type,
        difficult: dataForm.difficult,
      };
      this.$http.post("/topictype/update", data).then((res) => {
        if (res.data.code == 200) {
          this.dialogVisible2 = false;
          this.$message.success("修改成功");
        } else if (res.data.code == 202) this.$message.error("修改失败");
      });
    },
    //删除类型
    Delete(index, row) {
      const data = {
        id: row.id,
      };
      this.$confirm("此操作将永久删除，是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$http.post("/topictype/delete", data).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("成功删除!");
              this.tableData.splice(index, 1);
              this.getList();
            } else if (res.data.code == 202) {
              this.$message.error("不能删除，有存在的类型的数据");
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