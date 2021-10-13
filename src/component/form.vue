<template>
  <el-form ref="loginRef" :rules="loginRules" :model="loginForm">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="loginForm.password"
        placeholder="密码"
      ></el-input>
    </el-form-item>
    <el-button type="primary" v-on:click="$emit('addUser', loginForm)"
      >新增</el-button
    >
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      //验证数据格式
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
};
</script>
