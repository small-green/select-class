<template>
  <div class="again">
    <h2>Chosen Thesisi Title</h2>
    <el-divider></el-divider>
    <el-table :data="Data" style="width: 100%">
      <el-table-column type="index" width="100" label="序号"></el-table-column>
      <el-table-column width="600" prop="name" label="课题"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="exitTopic(scope.$index, scope.row)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="divTips" v-if="Data == ''">
      <el-link type="warning" href="http://localhost:8080/#/thesisList"
        >马上去选题了喂</el-link
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Data: [],
      title: "",
      username: "",
    };
  },
  created() {
    this.title = localStorage.getItem("title");
    this.username = localStorage.getItem("stuName");
    this.getTitle();
  },
  methods: {
    //获取选题信息
    getTitle() {
      this.$http
        .get("/stutopic/list", {
          params: {
            pageNum: 1,
            pageSize: 5,
            xuantiren: this.username,
          },
        })
        .then((res) => {
          this.Data = res.data.msg.rows;
        });
    },
    //退选课题
    exitTopic(index, row) {
      const data = {
        id: row.id,
      };
      this.$confirm("此操作将推选论题，是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$http.post("/stutopic/delete", data).then((res) => {
            if (res.data.code == 200) {
              this.Data.splice(index, 1);
              this.$message.success("退题成功，你开心了吗");
              localStorage.setItem("finishDate", "");
              localStorage.setItem("title", "");
            } else if (res.data.code == 202) {
              this.$message.error("不能退啊！");
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
.again .el-table .cell {
  font-size: 16px;
}
.divTips {
  margin-left: 42%;
}

.again .el-link--inner {
  text-align: center;
}
.again .tips,
.again .el-link--inner {
  //   text-align: center;
  font-size: 20px;
}
.again .tips {
  color: #c0e3e7;
}
.again .el-button.is-circle {
  width: 40px;
}
.again .el-button.is-circle:focus {
  background: #fff;
}
</style>