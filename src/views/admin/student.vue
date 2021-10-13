<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }"
          ><i class="iconfont icon-zhuye"> 首页</i></el-breadcrumb-item
        >
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        <el-breadcrumb-item>学生管理</el-breadcrumb-item>
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
      <span class="count">共有数据：{{ totalStu }}条</span>
    </div>
    <div class="table">
      <el-table
        v-loading="loading"
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
        <el-table-column prop="stuNum" label="学号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="telephone" label="电话" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sex" label="性别" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="classId" label="班级" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="academy" label="班级" show-overflow-tooltip>
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
        :totalRow="totalStu"
        @pageChange="pageChange"
      ></v-pagination>
      <el-dialog title="添加学生信息" :visible.sync="dialogVisible" width="40%">
        <div class="addForm">
          <el-form :rules="Rules" ref="Ref" :model="Form">
            <el-form-item prop="number"
              ><el-input v-model="Form.number" placeholder="学号"></el-input
            ></el-form-item>
            <el-form-item prop="username"
              ><el-input v-model="Form.username" placeholder="姓名"></el-input
            ></el-form-item>
            <el-form-item prop="password"
              ><el-input v-model="Form.password" placeholder="密码"></el-input
            ></el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="add()">新增</el-button>
          </span>
        </div>
      </el-dialog>

      <!-- 修改学生信息 -->
      <el-dialog
        title="修改教师信息"
        :visible.sync="dialogVisible2"
        width="40%"
      >
        <el-form :model="dataEdit" :rules="Rules" ref="Ref">
          <el-form-item prop="stuNum">
            <el-input v-model="dataEdit.stuNum"></el-input>
          </el-form-item>
          <el-form-item prop="userName">
            <el-input v-model="dataEdit.userName"></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input v-model="dataEdit.passWord"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="Edit()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
import form from "@/component/form.vue";
import pagination from "@/component/pagination";
import "@/assets/css/admin/simpleTable.css";
import { addStudent } from "@/mixin/get.js";
import { getStudent } from "@/mixin/getCount.js";
export default {
  mixins: [addStudent, getStudent],
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      dataEdit: {},
      username: "",
      banji: "",
      college: "",
      Rules: {
        number: [{ required: true, message: "请输入学号", trigger: "blur" }],
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  components: {
    "v-form": form,
    "v-pagination": pagination,
  },
  created() {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页 pageChange当前页发生改变触发函数
    async pageChange(page) {
      this.pageNum = page;
      // 调用获取列表的方法
      this.getStudent();
    },
    //弹出对话框
    isDialog() {
      this.dialogVisible = true;
    },
    //修改时传值
    editData(data) {
      this.dialogVisible2 = true;
      this.dataEdit = data;
    },
    //修改学生
    Edit() {
      const data = {
        id: this.dataEdit.id,
        number: this.dataEdit.stuNum,
        username: this.dataEdit.userName,
        password: this.dataEdit.passWord,
      };
      this.$refs.Ref.validate((val) => {
        if (!val) {
          return 0;
        } else {
          this.$http.post("/student/update", data).then((res) => {
            if (res.data.code == 200) {
              this.dialogVisible2 = false;
              this.$message.success("修改成功");
            } else if (res.data.code == 202) this.$message.error("修改失败");
          });
        }
      });
    },
    //删除教师
    Delete(index, row) {
      const data = {
        id: row.id,
      };
      this.$confirm("此操作将永久删除，是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$http.post("/student/delete", data).then((res) => {
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
<style lang="less" scoped>
.el-input__inner {
  margin-bottom: 20px;
}
</style>