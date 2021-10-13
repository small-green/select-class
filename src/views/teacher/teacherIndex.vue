<template>
  <div>
    <count
      :adminArray="adminArray"
      :totalTea="totalTea"
      :totalStu="totalStu"
      :totalRow="totalRow"
      :totalTopic="thesisCount"
    ></count>
  </div>
</template>
<script>
import { getStudent, getThesis } from "@/mixin/getCount.js";
import "@/assets/css/teacher/index.css";
import count from "@/component/count.vue";
export default {
  mixins: [getStudent, getThesis],
  data() {
    return {
      totalTea: 0,
      totalRow: 0,
      topicArray: [],
      stuArrau: [],
      adminArray: ["指导课题", "学生人数", "选题人数", "已交论文"],
    };
  },
  components: {
    count,
  },
  created() {
    this.getTitleCount();
  },
  methods: {
    getTitleCount() {
      this.$http
        .get("/topic/list", {
          params: {
            pageNum: 1,
            pageSize: 5,
            faburen: localStorage.getItem("teaName"),
          },
        })
        .then((res) => {
          this.totalTea = res.data.msg.count;
          for (let i = 0; i < this.totalTea; i++) {
            this.totalRow = this.totalRow + res.data.msg.rows[i].count;
            //把该老师的课程放进一个数组
            this.topicArray[i] = res.data.msg.rows[i].name;
          }
        });
    },
  },
};
</script>
<style scoped>
</style>