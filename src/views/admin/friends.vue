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
        <el-table-column l label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column
          prop="fName"
          width="400"
          label="内容"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="" label="地址" show-overflow-tooltip>
          <el-link :href="Url" type="success">跳转</el-link>
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
      <v-pagination
        :totalRow="totalRow"
        @pageChange="pageChange"
      ></v-pagination>
      <el-dialog
        title="添加友情链接信息"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <div class="addForm">
          <el-form ref="formRef" :rules="Rules" :model="Form">
            <el-form-item prop="fname">
              <el-input v-model="Form.fname" placeholder="内容"></el-input>
            </el-form-item>
            <el-form-item prop="addr">
              <el-input v-model="Form.addr" placeholder="地址"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="add()">新增</el-button>
          </span>
        </div>
      </el-dialog>

      <!-- 修改教师信息 -->
      <el-dialog
        title="修改链接信息"
        :visible.sync="dialogVisible2"
        width="40%"
      >
        <el-form :model="dataEdit">
          <el-form-item prop="fname">
            <el-input v-model="dataEdit.fName" placeholder="内容"></el-input>
          </el-form-item>
          <el-form-item prop="addr">
            <el-input v-model="dataEdit.fAddr" placeholder="地址"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="Edit()">修改</el-button>
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
      Url: "",
      pageNum: 1,
      pageSize: 5,
      tableData: [],
      totalRow: 0,
      dialogVisible: false,
      dialogVisible2: false,
      dataEdit: {},
      Form: {
        fname: "",
        addr: "",
      },
      Rules: {
        fname: [{ required: true, message: "请输入内容", trigger: "blur" }],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },
  components: {
    "v-pagination": pagination,
  },

  mounted() {
    // 程序启动先执行一遍，获取第一页数据
    this.getList();
  },

  methods: {
    mybtn(value) {
      console.log(value);
      this.getList();
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
    // 获取学院列表
    getList() {
      this.$http
        .get("/friend/list", {
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
    // 添加链接

    add() {
      const data = {
        fname: this.Form.fname,
        addr: this.Form.addr,
      };
      this.$refs.formRef.validate((val) => {
        if (!val) {
          return 0;
        }
        this.$http.post("/friend/create", data).then((res) => {
          console.log(res);
          if (res.data.code == 202) {
            this.dialogVisible = true;
            this.$message.error("该链接已经存在了");
          } else if (res.data.code == 200) {
            this.dialogVisible = false;
            this.Url = this.Form.addr;
            this.$message.success("新增链接成功了");
          }
          this.getList();
        });
      });
    },
    //修改时传值
    editData(data) {
      this.dialogVisible2 = true;
      this.dataEdit = data;
    },
    //修改学院
    Edit() {
      const data = {
        id: this.dataEdit.id,
        fname: this.dataEdit.fName,
        addr: this.dataEdit.fAddr,
      };
      this.Url = this.dataEdit.fAddr;
      this.$http.post("/friend/update", data).then((res) => {
        if (res.data.code == 200) {
          this.dialogVisible2 = false;

          this.$message.success("修改成功");
        } else if (res.data.code == 202) this.$message.error("您没有修改数据");
      });
    },
    //删除链接
    Delete(index, row) {
      const data = {
        id: row.id,
      };
      this.$confirm("此操作将永久删除，是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$http.post("/friend/delete", data).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("成功删除!");
              this.tableData.splice(index, 1);
              this.getList();
            } else if (res.data.code == 202) {
              this.$message.error("不能删除，有存在的该学院的数据");
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