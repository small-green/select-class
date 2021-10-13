<template>
  <div class="container">
    <el-table :data="thesisArray" style="width: 100%">
      <el-table-column type="selection" width="70"> </el-table-column>
      <el-table-column label="序号" type="index" width="70"> </el-table-column>
      <el-table-column prop="stuId" label="学生学号"></el-table-column>
      <el-table-column prop="" label="论文">
        <template slot-scope="scope">
          <el-link :href="scope.row.addr" type="success">下载</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="提交时间"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getThesis } from "@/mixin/getCount.js";
export default {
  mixins: [getThesis],
};
</script>
<style scoped>
</style>