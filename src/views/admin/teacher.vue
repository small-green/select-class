<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }"
          ><i class="iconfont icon-zhuye"> 首页</i></el-breadcrumb-item
        >
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        <el-breadcrumb-item>教师管理</el-breadcrumb-item>
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
      <span class="count">共有数据：{{ totalTea }}条</span>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @select="select"
        highlight-current-row
      >
        <el-table-column type="selection" width="70"> </el-table-column>
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="teaNum" label="工号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="teaName" label="姓名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="telephone" label="电话" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sex" label="性别" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="juese" label="职称" show-overflow-tooltip>
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
        :totalRow="totalTea"
        @pageChange="pageChange"
      ></v-pagination>
      <el-dialog title="添加教师信息" :visible.sync="dialogVisible" width="40%">
        <div class="addForm">
          <el-form ref="loginRef" :rules="loginRules" :model="loginForm">
            <el-form-item prop="number">
              <el-input
                v-model="loginForm.number"
                placeholder="工号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-button type="primary" @click="add">新增</el-button>
          </el-form>
        </div>
      </el-dialog>

      <!-- 修改教师信息 -->
      <el-dialog
        title="修改教师信息"
        :visible.sync="dialogVisible2"
        width="40%"
      >
        <el-form :model="dataEdit">
          <el-form-item prop="teaNum">
            <el-input v-model="dataEdit.teaNum" disabled></el-input>
          </el-form-item>
          <el-form-item prop="teaName">
            <el-input v-model="dataEdit.teaName"></el-input>
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
import "@/assets/css/admin/simpleTable.css";
import pagination from "@/component/pagination";
import { getTeacher } from "@/mixin/getCount.js";
export default {
  mixins: [getTeacher],
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      dataEdit: {},
      loginForm: {
        username: "",
        password: "",
        number: "",
      },
      //验证数据格式
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  components: {
    "v-pagination": pagination,
  },
  created() {},
  methods: {
    //选择行
    select(selection, row) {
      console.log(row.id);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页 pageChange当前页发生改变触发函数
    async pageChange(page) {
      this.pageNum = page;
      // 调用获取列表的方法
      this.getTeacher();
    },
    //弹出对话框
    isDialog() {
      this.dialogVisible = true;
    },

    add() {
      this.dialogVisible = false;
      const data = {
        username: this.loginForm.username,
        password: this.loginForm.assword,
        number: this.loginForm.number,
      };
      this.$refs.loginRef.validate(async (valid) => {
        if (!valid) {
          return 0;
        }
      });
      this.$http.post("/teacher/register", data).then((res) => {
        console.log(res);
        if (res.data.code == 202) {
          this.$message.error("该用户已经存在了");
        } else if (res.data.code == 200) {
          this.$message.success("新增成功了");
        }
      });
    },
    //修改时传值
    editData(data) {
      this.dialogVisible2 = true;
      this.dataEdit = data;
    },
    //修改教师
    Edit() {
      const data = {
        userid: this.dataEdit.id,
        username: this.dataEdit.teaName,
        password: this.dataEdit.passWord,
      };
      this.$http.post("/teacher/update", data).then((res) => {
        if (res.data.code == 200) {
          this.dialogVisible2 = false;
          this.$message.success("修改成功");
        } else if (res.data.code == 202) this.$message.error("修改失败");
        else if ((res.data.code = 212)) {
          this.$message.error("该用户已存在！");
        }
        console.log(res.data.code);
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
          this.$http.post("/teacher/delete", data).then((res) => {
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
