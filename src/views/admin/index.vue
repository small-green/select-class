<template>
  <el-container class="box">
    <el-header>
      <div class="logo">
        <i class="iconfont icon-xiezuoye"></i>
        <span class="admin">ADMINISTRATOR</span>
        <i class="iconfont icon-zhankai" @click="toggle()"></i>
        <div class="side">
          <i class="iconfont icon-xiaoxi"></i>
        </div>
        <div class="right_side">
          <div class="right_box">
            <div class="select">
              <i class="iconfont icon-tuichu" style="opacity: 0"></i>
            </div>
            <div class="other">
              <i class="iconfont icon-tuichu" @click="exit"></i>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="iconfont icon-ziyuan"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>中文</el-dropdown-item>
                  <el-dropdown-item>英文</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-image :src="require('@/assets/images/avatar.gif')"></el-image>
              <span>{{ username }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '66px' : '300px'">
        <!-- 导航栏 -->
        <el-menu
          @select="hand"
          class="el-menu-vertical-demo"
          :default-active="active"
          :collapse="isCollapse"
          unique-opened
          active-text-color="red"
          router
        >
          <!-- 一级菜单 首页 -->
          <el-menu-item index="date">
            <template slot="title">
              <i class="iconfont icon-zhuye"></i>
              <span slot="title">主页</span>
            </template>
          </el-menu-item>
          <el-submenu index="2">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-jiaosemoban"></i>
              <!-- 文本 -->
              <span>角色管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="student">
                <template slot="title">
                  <i class="iconfont icon-xuesheng"></i>
                  <span>学生管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="teacher">
                <template slot="title">
                  <i class="iconfont icon-jiaoshi"></i>
                  <span>教师管理</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-menhu"></i>
              <!-- 文本 -->
              <span>学生门户</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="class">
                <template slot="title">
                  <i class="iconfont icon-banjixinxi"></i>
                  <span>班级管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="college">
                <template slot="title">
                  <i class="iconfont icon-xueyuan"></i>
                  <span>学院管理</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-lunwentimu"></i>
              <!-- 文本 -->
              <span>论文管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="topicType">
                <template slot="title">
                  <i class="el-icon-news"></i>
                  <span>课题类型</span>
                </template>
              </el-menu-item>
              <el-menu-item index="topic">
                <template slot="title">
                  <i class="iconfont icon-yanjiuzhulu"></i>
                  <span>课题管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="stuTopic">
                <template slot="title">
                  <i class="iconfont icon-woxiezuoye"></i>
                  <span>学生选题</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-discount"></i>
              <!-- 文本 -->
              <span>其他管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="message">
                <template slot="title">
                  <i class="iconfont icon-liuyanban-05"></i>
                  <span>留言板管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="friends">
                <template slot="title">
                  <i class="iconfont icon-icon_xinyong_xianxing_jijin-"></i>
                  <span>友情链接管理</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      active: "1",
      isCollapse: false,
      circleUrl: "",
      size: "small",
      username: "",
      right: "33%",
      isRight: false,
      select: "",
      isWidth: "0",
      liData: [],
    };
  },
  created() {
    this.username = localStorage.getItem("admin");
  },
  methods: {
    hand(index, path) {
      this.liData = path;
    },
    exit() {
      this.$router.push("/login");
      localStorage.clear();
    },
    changeRight() {
      this.right = this.isRight ? "33%" : "-50%";
      this.isWidth = this.isRight ? "0" : "1";
      this.isRight = !this.isRight;
    },
    toggle() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style lang="less" scoped>
//新加退出按钮
.icon-tuichu {
  color: #fff;
  cursor: pointer;
}
@media screen and (max-width: 800px) {
  .admin {
    display: none;
  }
  .icon-zhankai {
    margin-left: 15% !important;
  }
}
@height: 60px;
.box{
  height: 100%;
}
body {
  .el-header {
    padding: 0;
    .logo {
      position: relative;
      background-image: linear-gradient(120deg, #00e4d0, #5983e8);
      padding-left: 2%;
      min-height: 60px;
      max-height: 60px;
      .icon-xiezuoye {
        display: inline-block;
        font-size: 40px;
        color: #1c67a0;
        line-height: @height;
      }
      .icon-zhankai {
        position: absolute;
        top: 35%;
        font-weight: bold;
        margin-left: 21%;
        color: white;
        cursor: pointer;
      }
      .admin {
        position: absolute;
        top: 30%;
        font-size: 20px;
        color: whitesmoke;
        margin-left: 1%;
      }
      .side {
        position: absolute;
        top: 30%;
        left: 30%;
        color: #fff;
        i {
          font-size: 22px;
        }
      }
      .right_side {
        position: absolute;
        top: 0%;
        right: 2%;
        .right_box {
          position: relative;
          .select {
            position: relative;
            .el-input__inner {
              position: absolute;
              top: 0px;
              left: -40%;
              width: 70%;
              transition: opacity 0.8s;
              height: 30px;
              background: rgba(255, 255, 255, 0.43);
              border: none;
            }
            .icon-sousuokuang {
              position: absolute;
              top: 100%;
              font-weight: bold;
              color: white;
              font-size: 20px;
              cursor: pointer;
              transition: left 0.2s;
            }
          }
          .other {
            padding-left: 100px;
            .icon-ziyuan {
              padding-right: 15px;
              cursor: pointer;
            }
            .el-image {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              position: absolute;
              top: 30%;
            }
            span {
              display: inline-block;
              color: white;
              text-indent: 45px;
            }
          }
        }
      }
    }
  }
  .el-container {
    .el-aside {
      // height: 515px;
      .el-menu {
        height: 100%;
        background: linear-gradient(
          to top,
          rgba(116, 84, 169, 0.9) 0%,
          rgba(49, 126, 206, 0.9) 100%
        );
        //相当于li
        .el-submenu__title,
        .el-menu-item {
          span {
            display: inline-block;
            font-family: "Roboto", Arial, Helvetica, sans-serif;
            text-indent: 17px;
            color: #ced6d6;
          }
          .iconfont,
          .el-icon-news {
            display: inline-block;
            text-indent: 5px;
            font-size: 18px;
            color: #ced6d6;
          }
        }
        .el-submenu__title i {
          color: #d1cdcd;
        }
      }
    }
    .el-main {
      background: #f7f7f7;
    }
  }
}
</style>