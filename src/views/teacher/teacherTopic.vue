<template>
  <div class="teacher_topic">
    <el-divider content-position="left">论题管理</el-divider>
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
      <v-table
        :tableData="tableData"
        :flag="flag"
        v-on:editData="editData"
        v-on:Delete="Delete"
      ></v-table>
      <el-dialog
        @open="clearFn"
        title="添加论题信息"
        :visible.sync="dialogVisible"
        width="80%"
      >
        <div class="addForm">
          <v-form v-on:add="add" :data="dataEdit"></v-form>
        </div>
      </el-dialog>
      <!-- 修改课题信息 -->
      <el-dialog
        title="修改课题信息"
        :visible.sync="dialogVisible2"
        width="80%"
      >
        <div class="editFrom">
          <v-form v-on:edit="Edit" :msg="msg" :data="dataEdit"></v-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import "@/assets/css/admin/simpleTable.css";
import form from "@/component/topicForm.vue";
import pagination from "@/component/pagination";
import table from "@/component/table";
// import action from "@/common/action";
export default {
  data() {
    return {
      flag: 1,
      pageNum: 1,
      pageSize: 5,
      totalRow: 0,
      tableData: [],
      Url: [],
      msg: true,
      value: "",
      dialogVisible: false,
      dialogVisible2: false,
      dataEdit: {},
      collegeData: [],
    };
  },
  components: {
    "v-form": form,
    "v-pagination": pagination,
    "v-table": table,
    // "v-action": action,
  },
  mounted() {
    // 程序启动先执行一遍，获取第一页数据
    this.getList();
  },

  methods: {
    //获取该老师
    getList() {
      this.$http
        .get("/topic/list", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            faburen: localStorage.getItem("teaName"),
          },
        })
        .then((res) => {
          this.totalRow = res.data.msg.count;
          this.tableData = res.data.msg.rows;
          this.Url = res.data.msg.rows.fuJian;
        });
    },
    isDialog() {
      this.dialogVisible = true;
    },
    clearFn() {
      this.dataEdit = {
        id: "",
        name: "",
        difficult: "",
        finishDate: "",
        type: "",
        fuJian: "",
        faburen: "",
      };
    },
    // 分页 pageChange当前页发生改变触发函数
    async pageChange(page) {
      this.pageNum = page;
      // 调用获取列表的方法
      this.getList();
    },
    // 添加课题
    add(formData) {
      const data = {
        topicId: formData.number,
        name: formData.name,
        // difficult: formData.difficult,
        finish: formData.finishDate,
        type: formData.type,
        fujian: formData.fuJian,
        faburen: localStorage.getItem("teaName"),
        status: 1,
      };
      this.Url = formData.fileName;
      this.$http.post("/topic/create", data).then((res) => {
        if (res.data.code == 202) {
          this.dialogVisible = true;
          this.$message.error("课题已经存在");
        } else if (res.data.code == 200) {
          this.dialogVisible = false;
          this.$message.success("新增课题成功了");
          this.getList();
        }
      });
    },
    //修改时传值
    editData(data) {
      this.dialogVisible2 = true;
      this.dataEdit = data;
    },
    //修改课题信息
    Edit(formData) {
      const data = {
        id: this.dataEdit.id,
        topicId: formData.number,
        name: formData.name,
        difficult: formData.difficult,
        finish: formData.finishDate,
        type: formData.type,
        fujian: formData.fuJian,
        faburen: formData.faburen,
      };
      this.Url = formData.fuJian;
      this.$http.post("/topic/update", data).then((res) => {
        if (res.data.code == 200) {
          this.dialogVisible2 = false;
          this.$message.success("修改成功");
        } else if (res.data.code == 202) {
          this.dialogVisible2 = true;
          this.$message.error("修改失败");
        }
      });
      this.getList();
    },
    //删除班级
    Delete(index, row) {
      const data = {
        id: row.id,
      };
      this.$confirm("此操作将永久删除，是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$http.post("/topic/delete", data).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("成功删除!");
              this.tableData.splice(index, 1);
              this.getList();
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
<style scoped>
.el-divider__text {
  font-size: 18px;
  color: #ffd04b;
}
</style>