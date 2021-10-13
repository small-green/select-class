<template>
  <div class="list">
    <h2 class="choose">Choose A Thesis Title</h2>
    <el-divider></el-divider>
    <el-form :model="selectForm" class="selectForm" :rules="Rules" ref="Ref">
      <el-form-item prop="key">
        <el-input
          v-model="selectForm.key"
          placeholder="可输入论文id或论题题目或难度或类型查询论题哦"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="selectData">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="index" label="序号" width="70"> </el-table-column>
      <el-table-column
        prop="number"
        label="题号"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        width="150"
        prop="name"
        label="论文题目"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column prop="type" label="类型" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="difficult" label="难度" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="finishDate" label="完成日期" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="faburen" label="导师" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="fuJian" label="附件" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-link type="primary" :href="scope.row.fuJian">下载</el-link>
        </template>
      </el-table-column>
      <el-table-column label="选题" show-overflow-tooltip>
        <template slot-scope="scope">
          <i
            v-if="scope.row.isSelect == true"
            :class="{
              'el-icon-success': isActive,
            }"
          ></i>
          <i
            v-else
            :class="{
              'el-icon-circle-plus': isActive,
            }"
            @click="chooseTopic(scope.$index, scope.row)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="pageChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRow"
    >
    </el-pagination>
  </div>
</template>
<script>
import { topicMixin } from "@/mixin/get.js";
export default {
  mixins: [topicMixin],
  data() {
    return {
      pageSize: 5,
      selectForm: {
        key: "",
      },
      stuNum: "",
      isActive: true,
      totalRow: 0,
      Rules: {
        key: [{ required: true, message: "请输入关键字", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {
    this.username = localStorage.getItem("stuName");
    this.myclass = localStorage.getItem("stuClass");
    this.academy = localStorage.getItem("academy");
    this.stuNum = localStorage.getItem("stuNum");
    this.getTopicList(this.queryInfo);
  },
  methods: {
    //封装函数
    loading() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      setTimeout(() => {
        loading.close();
        this.getTopicList(this.queryInfo);
      }, 1500);
    },
    //删除其他参数
    deleteKey() {
      delete this.queryInfo.number;
      delete this.queryInfo.type;
      delete this.queryInfo.difficult;
      delete this.queryInfo.name;
    },
    //按需查找
    selectData() {
      this.$refs.Ref.validate((val) => {
        if (!val) {
          this.$message.error("你还没有输入");
          return 0;
        } else {
          //判断输入的是否为题号
          let isId = this.selectForm.key.indexOf("0");
          //判断输入的是否为类型
          let reg1 = RegExp(/论文/);
          //判断输入的是否为难度
          let reg2 = RegExp(/颗星/);
          if (isId == 0) {
            this.deleteKey();
            this.queryInfo["number"] = this.selectForm.key;
          } else if (this.selectForm.key.match(reg1)) {
            this.deleteKey();
            this.queryInfo["type"] = this.selectForm.key;
          } else if (this.selectForm.key.match(reg2)) {
            this.deleteKey();
            this.queryInfo["difficult"] = this.selectForm.key;
          } else {
            this.deleteKey();
            this.queryInfo["name"] = this.selectForm.key;
          }
          this.loading();
        }
      });
    },
    //重置
    reset() {
      this.deleteKey();
      this.loading();
    },
    // 分页 pageChange当前页发生改变触发函数
    async pageChange(page) {
      this.queryInfo.pageNum = page;
      // 调用获取列表的方法
      this.getTopicList(this.queryInfo);
      console.log(this.getTopicList(this.queryInfo));
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    //按需查找
    //学生选论文题目
    chooseTopic(index, topicData) {
      const data = {
        //学生的状态码，选课是1，提交论文为2
        status: 1,
        stuNum: this.stuNum,
        xuantiren: this.username,
        name: topicData.name,
        academy: this.academy,
        className: this.myclass,
      };
      localStorage.setItem("finishDate", topicData.finishDate);
      this.$confirm("此操作将选择该论题，是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$http.post("/stutopic/create", data).then((res) => {
            if (res.data.code == 200) {
              this.getTopicList(this.queryInfo);
              this.$message.success("选题成功喇，开始干吧！");
            } else if (res.data.code == 202) {
              this.$message.error("你已经选过了喔！");
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
.el-table .warning-row {
  background: #f0f9eb;
}

.el-table .success-row {
  background: oldlace;
}

.selectForm {
  margin-left: 30px;
}
.selectForm .el-input__inner {
  letter-spacing: 1px;
  width: 400px !important;
}
.selectForm .el-button,
.el-form-item {
  float: left;
}
.selectForm .el-button {
  margin-left: 0 !important;
}
.el-icon-success {
  color: greenyellow;
}
.el-icon-success,
.el-icon-circle-plus {
  cursor: pointer;
  font-size: 20px;
}
</style>