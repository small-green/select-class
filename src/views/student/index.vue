<template>
  <el-container class="student">
    <el-header>
      <el-menu router :default-active="active" class="dMenu" mode="horizontal">
        <div class="stu_logo">
          <el-image
            style="width: 30px"
            :src="require('@/assets/images/studentLogo.jpg')"
          ></el-image>
          <span>.Student</span>
        </div>
        <el-menu-item index="person">个人信息</el-menu-item>
        <el-menu-item index="myThesis">我的论题</el-menu-item>
        <el-menu-item index="thesisList">选论题中心</el-menu-item>
        <el-menu-item index="again">退选论题</el-menu-item>
        <el-menu-item index="offer">提交论文</el-menu-item>
        <el-submenu index="more">
          <template slot="title">更多</template>
          <el-menu-item index="login" @click="exit">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container class="cont">
      <el-aside>
        <div class="person">
          <el-avatar :src="data.imgUrl"></el-avatar>
          <p class="username">{{ data.userName }}</p>
          <p class="other">{{ data.academy }} | {{ data.classId }}</p>
          <p>{{ data.sex }}</p>
        </div>
        <div class="friend" :style="{ height: width }">
          <el-button>More Friend Link</el-button>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- <el-footer></el-footer> -->
    </el-container>
  </el-container>
</template>
<script>
import { getInfo } from "@/mixin/get";
import "@/assets/css/student/index.css";
export default {
  mixins: [getInfo],
  data() {
    return {
      active: "person",
      width: "90px",
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    exit() {
      localStorage.clear();
    },
    zkaiNews() {},
  },
};
</script>

<style lang="less" scoped>
.student {
  position: relative;
  margin: 0 auto;
}
.dMenu {
  // background: #f3f3f3;
  position: relative;
  padding: 30px 10px 1px 38%;
}
.dMenu .el-menu-item {
  padding: 0 28px;
}
.student .el-menu.el-menu--horizontal {
  border-bottom: solid 3px #e6e6e6;
}
</style>
