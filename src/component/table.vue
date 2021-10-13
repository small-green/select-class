<template>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    highlight-current-row
  >
    <el-table-column type="selection" width="70"> </el-table-column>
    <el-table-column label="序号" type="index" width="70"> </el-table-column>
    <el-table-column
      prop="number"
      width="70"
      label="题号"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      width="120"
      prop="name"
      label="论文题目"
      show-overflow-tooltip
    >
    </el-table-column>

    <el-table-column prop="type" label="类型" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="difficult" label="难度" show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="finishDate"
      label="完成日期"
      show-overflow-tooltip
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="faburen"
      label="发布人"
      show-overflow-tooltip
      width="100"
    >
    </el-table-column>
    <el-table-column prop="" label="附件" show-overflow-tooltip>
      <template slot-scope="scope">
        <el-link :href="scope.row.fuJian" type="primary">下载</el-link>
      </template>
    </el-table-column>
    <el-table-column label="审核状态" show-overflow-tooltip width="130">
      <template slot-scope="scope">
        <span v-if="scope.row.status == 1" style="color: red">未审核</span>
        <span v-if="scope.row.status == 2" style="color: green">审核通过</span>
        <span v-if="scope.row.status == 0" style="color: #ebb563">不通过</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" show-overflow-tooltip v-if="flag == 1">
      <template slot-scope="scope">
        <el-tooltip
          class="item"
          effect="dark"
          content="编辑"
          placement="top-end"
        >
          <i class="el-icon-edit" @click="$emit('editData', scope.row)"></i>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="删除"
          placement="top-end"
        >
          <i
            class="el-icon-delete"
            @click="$emit('Delete', scope.$index, scope.row)"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      show-overflow-tooltip
      v-if="flag == 2"
      class="is_action"
    >
      <template slot-scope="scope">
        <i
          class="el-icon-success"
          @click="isSuccess(scope.row)"
          v-loading.fullscreen.lock="fullscreenLoading"
        ></i>
        <i
          class="el-icon-error"
          @click="isError(scope.row)"
          v-loading.fullscreen.lock="fullscreenLoading"
        ></i>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { loading } from "@/mixin/get.js";
export default {
  inject: ["reload"],
  mixins: [loading],
  props: ["tableData", "flag"],
  data() {
    return {
      Url: "",
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    isAction(data) {
      this.$http.post("/topic/update", data).then((res) => {});
    },
    //审核通过
    isSuccess(row) {
      const data = {
        id: row.id,
        status: 2,
      };
      this.loading();
      setTimeout(() => {
        this.isAction(data);
        this.reload();
      }, 1000);
    },
    //审核不通过
    isError(row) {
      const data = {
        id: row.id,
        status: 0,
      };
      this.loading();
      setTimeout(() => {
        this.isAction(data);
        this.reload();
      }, 1000);
    },
  },
};
</script>
<style scoped>
.el-icon-success,
.el-icon-error {
  font-size: 16px;
  cursor: pointer;
}
.el-icon-success {
  color: green;
}
.el-icon-error {
  color: red;
}
</style>