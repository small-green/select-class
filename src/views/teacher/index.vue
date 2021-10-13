<template>
  <div class="teacher_index">
    <div class="aside" :style="{ width: isWidth }">
      <el-menu
        @select="changeSelect"
        router
        unique-opened
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="teacherCount"
        v-for="item in menu"
        :key="item.index"
      >
        <component
          class="menu-item"
          :is="
            item.children && item.children.length > 0
              ? 'el-submenu'
              : 'el-menu-item'
          "
          :index="item.index"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span :style="{ display: isShow }">{{ item.title }}</span>
          </template>
          <template v-if="item.children && item.children.length > 0">
            <el-menu-item
              class="menu-item"
              v-for="(v, i) in item.children"
              :key="v.index + i"
              :index="v.index"
            >
              <i :class="v.icon"></i>
              <span slot="title">{{ v.title }}</span>
            </el-menu-item>
          </template>
        </component>
      </el-menu>
    </div>
    <div class="content" :style="{ marginLeft: isWidth }">
      <div class="navbar">
        <i class="el-icon-s-operation" @click="toggele"></i>
        <div class="bread">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/teacherIndex' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item v-for="o in breadcrumbs" :key="o.index"
              >{{ o.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="icon_ground">
          <i class="icon-quanping iconfont"></i>
          <i class="icon-tuichu iconfont" @click="exit"></i>
          <el-avatar shape="square" size="medium" :src="squareUrl"></el-avatar>
          <span>{{ username }}</span>
        </div>
      </div>
      <div class="cont_detail">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { getTeahcerInfo } from "@/mixin/get.js";
export default {
  mixins: [getTeahcerInfo],
  data() {
    return {
      cont_left: "210px",
      username: "",
      //存放路径数组
      breadcrumbs: [],
      indexBreadcrumbs: [],
      isCollapse: false,
      isShow: "",
      isWidth: "210px",
      menu: [
        {
          index: "/teacherIndex",
          icon: "icon-zhuye iconfont",
          title: "统计",
        },
        {
          index: "/teacherPerson",
          icon: "icon-17 iconfont",
          title: "修改信息",
        },
        {
          index: "/teacherTopic",
          icon: "icon-lunwentimu iconfont",
          title: "论题管理",
        },
        {
          index: "/teacherThesis",
          icon: "icon-wendang iconfont",
          title: "学生选题",
        },
        {
          index: "/teacherScore",
          icon: "icon-chengji iconfont",
          title: "论文管理",
        },
      ],
    };
  },
  watch: {
    $route() {
      this.handChange();
    },
  },
  computed: {
    breadcrumbList() {
      let breadcrumbs = [];
      let menuList = this.menu;
      this.indexBreadcrumbs.map((item) => {
        for (let i = 0; i < menuList.length; i++) {
          if (item === menuList[i].index) {
            breadcrumbs.push(menuList[i]);
            if (menuList[i].index) {
              menuList = menuList[i].children;
            }
            break;
          }
        }
      });
      this.breadcrumbs = breadcrumbs;
    },
  },
  methods: {
    toggele() {
      this.isShow = this.isCollapse ? "none" : "";
      this.isWidth = this.isCollapse ? "60px" : "210px";
      this.isCollapse = !this.isCollapse;
    },
    handChange() {
      this.breadcrumbList;
    },
    changeSelect(index, indexPath) {
      this.indexBreadcrumbs = indexPath;
    },
    //退出登录
    exit() {
      this.$router.push("/login");
      localStorage.clear();
    },
  },
  created() {
    this.changeSelect();
    this.getTeacher();
    //存id，姓名
    this.username = localStorage.getItem("teaName");
  },
};
</script>
<style scoped>
</style>