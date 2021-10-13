<template>
  <div class="login">
    <div class="top_body"></div>
    <div class="login_box" :style="{ height: height, top: top }">
      <div class="action">
        <a class="action_next">
          <i
            class="el-icon-right"
            @click="toggle_action"
            v-loading.fullscreen.lock="fullscreenLoading"
          ></i>
        </a>
      </div>
      <p class="is_thesis">Thesis</p>
      <div class="number">
        <span><i class="el-icon-s-opportunity"></i></span>
        <input v-model="Form.number" type="text" placeholder="Number" />
      </div>
      <div class="username" v-if="this.flag == 1">
        <span><i class="el-icon-s-custom"></i></span>
        <input v-model="Form.username" type="text" placeholder="Username" />
      </div>
      <div class="password">
        <span><i class="el-icon-question"></i></span>
        <input v-model="Form.password" type="password" placeholder="Password" />
      </div>
    </div>
    <div class="toggle">
      <ul class="login_nnavicat">
        <li
          class="register"
          @click="register"
          :style="{ backgroundColor: backgourd }"
        >
          {{ isLogin }}
        </li>
        <li class="forget" @click="find">FORGOT PASSWORD?</li>
      </ul>
    </div>
  </div>
</template>
<script>
import "@/assets/css/student/login.css";
export default {
  data() {
    return {
      Form: {
        username: "",
        number: "",
        password: "",
      },
      fullscreenLoading: false,
      isLogin: "REGISTER",
      flag: 0,
      isBig: false,
      backgourd: "#f44336",
      top: "31%",
      height: "280px",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.$router.apps);
    },
    //懒加载
    loading() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
      setTimeout(() => {
        this.$message.success("亲爱的，我们又见面了！");
      }, 2000);
    },
    register() {
      this.height = this.isBig ? "280px" : "320px";
      this.top = this.isBig ? "31%" : "30%";
      this.backgourd = this.isBig ? "#f44336" : "#4caf50";
      this.isLogin = this.isBig ? "REGISTER" : "LOGIN";
      if (this.isLogin == "REGISTER") this.flag = 0;
      else if (this.isLogin == "LOGIN") this.flag = 1;
      this.isBig = !this.isBig;
    },
    toggle_action() {
      //flag为1时，是注册功能，flag为0时，是登录功能
      if (this.flag == 0) {
        if (this.Form.number == "admin" && this.Form.password == "1234") {
          localStorage.setItem("admin", this.Form.number);
          this.loading();
          setTimeout(() => {
            this.$router.push("/index");
          }, 3000);
        } else if (this.Form.number == "" || this.Form.password == "") {
          this.$message.error("输入账号或秘密不能为空");
        } else {
          //五位为教师登录，九位为学生登录
          if (this.Form.number.length == 5) {
            const data = {
              number: this.Form.number,
              password: this.Form.password,
            };
            this.$http.post("/teacher/login", data).then((res) => {
              if (res.data.msg == 210) {
                this.$message.error("该用户不存在！");
              } else if (res.data.msg == 211) {
                this.$message.error("你输入的password不太对！");
              } else if (res.data.code == 200) {
                //本地存储localStorage
                localStorage.setItem("teaName", res.data.msg.teaName);
                localStorage.setItem("teaId", res.data.msg.id);
                this.loading();
                setTimeout(() => {
                  this.$router.push("/teacherIndex");
                }, 3000);
              }
            });
          } else if (this.Form.number.length == 9) {
            //九位数为学生
            const data = {
              username: this.Form.number,
              password: this.Form.password,
            };
            this.$http.post("student/login", data).then((res) => {
              if (res.data.msg == 210) {
                this.$message.error("该用户不存在！");
              } else if (res.data.msg == 211) {
                this.$message.error("你输入的password不太对！");
              } else if (res.data.code == 200) {
                localStorage.setItem("stuName", res.data.msg.userName);
                localStorage.setItem("stuNum", res.data.msg.stuNum);
                localStorage.setItem("stuId", res.data.msg.id);
                this.loading();
                setTimeout(() => {
                  this.$router.push("/studentIndex");
                }, 3000);
              }
            });
          } else {
            this.$message.error("请输入五位的教师工号或九位的学生学号进行登录");
          }
        }
      }
      if (this.flag == 1) {
        const data = {
          number: this.Form.number,
          username: this.Form.username,
          password: this.Form.password,
        };
        if (
          this.Form.number == "" ||
          this.Form.password == "" ||
          this.Form.username == ""
        ) {
          this.$message.error("有选项出现空值，请重新填写");
        } else {
          if (this.Form.number.length != 9) {
            this.$message.error("学号应为九位的纯数字");
          } else {
            this.$http.post("/student/register", data).then((res) => {
              if (res.data.code == 202) {
                this.$message.error("该学号的学生已经存在了");
              } else if (res.data.code == 200) {
                this.$message.success("注册成功了");
                setTimeout(() => {
                  this.flag = 0;
                  this.Form.number = data.number;
                  this.Form.password = data.password;
                }, 1000);
              }
            });
          }
        }
      }
    },
    //跳转找回密码页面
    find() {
      this.$router.push("/findPsw");
    },
  },
};
</script>
<style lang="less">
@media screen and(max-width:1280px) {
  .login_box {
    width: 86%;
    left: 6%;
  }
  .login_box input {
    width: 300px;
  }
  .action {
    top: 50%;
    right: 4%;
  }
}

@media screen and(min-width:1280px) {
  .login_box {
    width: 40%;
    left: 31%;
  }
  .action {
    right: 27%;
    top: 45%;
  }
  .login_box input {
    width: 350px;
  }
}
</style>