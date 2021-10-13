<template>
  <div>
    <el-form :model="data" :rules="Rules">
      <el-form-item prop="type">
        <el-input v-model="data.type" placeholder="论文类型"></el-input>
      </el-form-item>
      <el-form-item prop="difficult">
        <el-input v-model="data.difficult" placeholder="难度"></el-input>
      </el-form-item>
    </el-form>
    <el-button v-if="msg" type="primary" v-on:click="$emit('edit', data)"
      >修改</el-button
    >
    <el-button v-else type="primary" v-on:click="$emit('add', data)"
      >新增</el-button
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      Form: {
        type: "",
        difficult: "",
      },
      Rules: {
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        difficult: [{ required: true, message: "请输入难度", trigger: "blur" }],
      },
    };
  },
  props: ["msg", "data"],
};
</script>
