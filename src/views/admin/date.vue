<template>
  <div class="all_date">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }"
        ><i class="iconfont icon-zhuye"> 首页</i></el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider></el-divider>
    <count
      :totalTea="totalTea"
      :totalStu="totalStu"
      :totalRow="totalRow"
      :totalTopic="totalTopic"
      :adminArray="adminArray"
    ></count>
  </div>
</template>
<script>
import { getStudent, getTeacher, getTopic } from "@/mixin/getCount.js";
import { topicMixin } from "@/mixin/get.js";
import count from "@/component/count.vue";
export default {
  mixins: [getStudent, getTeacher, getTopic, topicMixin],
  data() {
    return {
      adminArray: ["教师人数", "学生人数", "论题数目", "选题人数"],
    };
  },
  components: {
    count,
  },
  created() {
    // this.getList();
  },
  methods: {},
};
</script>
