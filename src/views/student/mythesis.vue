<template>
  <div class="myList">
    <h2 class="choose">Tish Is Your Title</h2>
    <el-divider></el-divider>
    <div class="tips" v-if="Data2">
      <span
        >亲爱的
        <span style="color: red; font-weight: 700">{{ username }}</span>
        同学，你勇敢地选择了</span
      >
      <span style="color: #c0e3e7; font-weight: 700">{{ Data2.name }}</span>
      <span>这个论文题目。</span>
      <p>以下是该论文题目的详细信息</p>
      <tr>
        <td>论题名称：</td>
        <td>{{ Data2.name }}</td>
      </tr>
      <tr>
        <td>论题类型：</td>
        <td>{{ Data2.type }}</td>
      </tr>
      <tr>
        <td>完成时间：</td>
        <td>{{ Data2.finishDate }}</td>
      </tr>
      <tr>
        <td>论题难度：</td>
        <td>{{ Data2.difficult }}</td>
      </tr>
    </div>
    <div class="table" v-if="!Data2">
      <p>很遗憾，你还没有选择论文课题。</p>
      <el-link type="warning" href="http://localhost:8080/#/thesisList"
        >马上去选题吧！</el-link
      >
    </div>
  </div>
</template>
<script>
import { stuTopic } from "@/mixin/get";
export default {
  mixins: [stuTopic],
  data() {
    return {
      username: "",
    };
  },
  created() {
    this.username = localStorage.getItem("stuName");

    this.getTitle();
  },
  methods: {
    //获取该学生选的论文题目
  },
};
</script>
<style lang="less" scoped>
.myList span {
  font-family: "Quicksand", sans-serif;
}
.myList .tips,
.table {
  margin-left: 50px;
}
.tips p {
  color: #757575;
  font-size: 1.2em;
  font-weight: 400;
  margin-bottom: 1.571em;
}
.tips td {
  width: 130px;
}
.tips tr {
  line-height: 40px;
}
.table .el-link--inner {
  font-size: 20px;
}
</style>