<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }"
          ><i class="iconfont icon-zhuye"> 首页</i></el-breadcrumb-item
        >
        <el-breadcrumb-item>学生门户</el-breadcrumb-item>
        <el-breadcrumb-item>班级管理</el-breadcrumb-item>
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
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="className" label="班级" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="academy" label="所属学院" show-overflow-tooltip>
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
      <el-dialog title="添加班级信息" :visible.sync="dialogVisible" width="40%">
        <div class="addForm">
          <el-form :model="Form">
            <el-form-item prop="class">
              <el-input v-model="Form.class" placeholder="班级"></el-input>
            </el-form-item>
            <el-form-item prop="academy">
              <el-select
                class="select"
                clearable
                filterable
                v-model="Form.academy"
              >
                <el-option
                  v-for="item in collegeData"
                  :key="item.id"
                  :value="item.academy"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button class="addBtn" type="primary" @click="add()"
              >新增</el-button
            >
          </span>
        </div>
      </el-dialog>

      <!-- 修改教师信息 -->
      <el-dialog
        title="修改班级信息"
        :visible.sync="dialogVisible2"
        width="40%"
      >
        <el-form :model="dataEdit">
          <el-form-item prop="className">
            <el-input v-model="dataEdit.className"></el-input>
          </el-form-item>
          <el-form-item prop="academy">
            <el-input v-model="dataEdit.academy"></el-input>
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
export default {
  data() {
    return {
      value: "",
      pageNum: 1,
      pageSize: 5,
      tableData: [],
      totalRow: 0,
      dialogVisible: false,
      dialogVisible2: false,
      dataEdit: {},
      collegeData: [],
      Form: {
        class: "",
        academy: "",
      },
    };
  },
  components: {
    "v-pagination": pagination,
  },
  mounted() {
    // 程序启动先执行一遍，获取第一页数据
    this.getList();
    this.getCollege();
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
    // 获取学院列表
    getCollege() {
      this.$http
        .get("/academy/list", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          this.collegeData = res.data.msg.rows;
        });
    },
    // 获取班级列表
    getList() {
      this.$http
        .get("/class/list", {
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
    // 添加班级
    add() {
      this.dialogVisible = true;
      const data = {
        className: this.Form.class,
        academy: this.Form.academy,
      };
      this.$http.post("/class/create", data).then((res) => {
        console.log(res);
        if (res.data.code == 202) {
          this.dialogVisible2 = false;
          this.$message.error("该班级已经存在了");
          this.getList();
        } else if (res.data.code == 200) {
          
          this.$message.success("新增班级成功了");
          this.dialogVisible = false;
        }
      }); 
    },  
    //修改时传值
    editData(data) {
      this.dialogVisible2 = true;
      this.dataEdit = data;
    },
    //修改班级
    Edit() {
      const data = {
        id: this.dataEdit.id,
        className: this.dataEdit.className,
        academy: this.dataEdit.academy,
      };
      this.$http.post("/class/update", data).then((res) => {
        if (res.data.code == 200) {
          this.dialogVisible2 = false;
          this.$message.success("修改成功");
        } else if (res.data.code == 202) this.$message.error("修改失败");
      });
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
          this.$http.post("/class/delete", data).then((res) => {
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
.addBtn {
  margin-left: 85%;
}
</style>