<template>
  <div>
    <el-divider content-position="left">论文管理</el-divider>
    <el-table :data="teacherArray" style="width: 100%">
      <el-table-column type="selection" width="70"> </el-table-column>
      <el-table-column label="序号" type="index" width="70"> </el-table-column>
      <el-table-column prop="name" label="论文题目"></el-table-column>
      <el-table-column prop="xuantiren" label="选题人"> </el-table-column>
      <el-table-column prop="addTime" label="选题时间"> </el-table-column>
      <el-table-column prop="" label="论文状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1" style="color: red">未提交</span>
          <span v-if="scope.row.status == 2" style="color: green">已提交</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getTopic } from "@/mixin/getCount.js";
import { topicMixin } from "@/mixin/get.js";
export default {
  mixins: [getTopic, topicMixin],
  data() {
    return {
      topicArray: [],
      teacherArray: [],
      thesisId: [],
      topicId: [],
      params: {
        pageNum: 1,
        pageSize: 100,
        faburen: localStorage.getItem("teaName"),
      },
      paramsList: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  created() {
    this.getTopicList(this.params, true);

    this.getTeacherTopic();
  },
  methods: {
    //获取该教师选题的学生信息
    getTeacherTopic() {
      this.$http
        .get("stutopic/list", {
          params: {
            pageSize: 5,
            pageNum: 1,
            tutor: localStorage.getItem("teaName"),
          },
        })
        .then((res) => {
          // teacherArray是选了该老师的论文的学生数组，tipicArray是交了论文的学生数组
          this.teacherArray = res.data.msg.rows;
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