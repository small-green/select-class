<template>
  <div class="find_psw">
    <p class="h2">找回密码</p>
    <p class="tips">为了保障您的帐户安全，请谨慎填写</p>
    <el-steps :active="active" finish-status="success">
      <el-step title="输入账户"></el-step>
      <el-step title="输入旧密码"></el-step>
      <el-step title="输入新密码"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <div class="steps" v-if="this.active != 4">
      <el-form :rules="rules" ref="Ref" :model="form1" v-if="this.active == 1">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入要找回的账户"
            v-model="form1.username"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :rules="rules1"
        ref="Ref1"
        :model="form2"
        v-if="this.active == 2"
      >
        <el-form-item prop="oldpsw">
          <el-input
            placeholder="请输入旧密码"
            v-model="form2.oldpsw"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :rules="rules2"
        ref="Ref2"
        :model="form3"
        v-if="this.active == 3"
      >
        <el-form-item prop="newpsw">
          <el-input
            placeholder="请输入新密码"
            v-model="form3.newpsw"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button style="margin-top: 12px" @click="next" type="warning"
        >下一步</el-button
      >
    </div>
    <div class="find_tips" v-if="this.active == 4">
      <i class="el-icon-success"></i>
      <p>恭喜您，修改密码成功！</p>
      <el-link type="success" @click="target">马上去登录把</el-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      id: 0,
      old: "",
      form1: {
        username: "",
      },
      form2: {
        oldpsw: "",
      },
      form3: {
        newpsw: "",
      },
      rules: {
        username: {
          required: true,
          message: "请输入要找回的账户",
          trigger: "blur",
        },
      },
      rules1: {
        oldpsw: {
          required: true,
          message: "请输入旧密码",
          trigger: "blur",
        },
      },
      rules2: {
        newpsw: {
          required: true,
          message: "请输入新密码",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    target() {
      this.$router.push("/login");
    },
    next() {
      if (this.active == 1) {
        this.$refs.Ref.validate((vali) => {
          if (!vali) return 0;
          else {
            //先检查账户是否存在
            this.$http
              .get("/student/list", {
                params: {
                  pageNum: 1,
                  pageSize: 1,
                  stuNum: this.form1.username,
                },
              })
              .then((res) => {
                if (res.data.msg.rows.length) {
                  this.active++;
                  //随便把旧密码查出来，存起来
                  this.old = res.data.msg.rows[0].passWord;
                  //把修改密码的学生id存起来
                  this.id = res.data.msg.rows[0].id;
                } else this.$message.error("该账户不存在");
              });
          }
        });
      } else if (this.active == 2) {
        this.$refs.Ref1.validate((vali) => {
          if (!vali) return 0;
          else {
            if (this.form2.oldpsw == this.old) this.active++;
            else this.$message.error("输入的原密码错误");
          }
        });
      } else if (this.active == 3) {
        //如果前两步都正确，进入修改密码阶段
        this.$refs.Ref2.validate((vali) => {
          if (!vali) return 0;
          else {
            const data = {
              id: this.id,
              password: this.form3.newpsw,
            };
            this.$http.post("/student/update", data).then((res) => {
              console.log(res);
              if (res.data.code == 200) this.active++;
              else this.$message.error("修改密码失败啰");
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="less">
.h2,
.find_psw .tips {
  text-align: center;
}
.find_psw .el-steps {
  width: 70%;
  margin: 50px auto;
}
.el-step__head.is-success {
  color: #ff8201;
  border-color: #ff8201;
}
.h2 {
  font-size: 20px;
  color: #000;
}
.find_psw {
  margin-top: 50px;
}
.find_psw .tips {
  font-size: 12px;
  color: #999;
}
.find_psw .el-input {
  width: 50%;
}
.steps {
  margin-top: 8%;
  margin-left: 36%;
}
.steps .el-button {
  margin-left: 20%;
}
.find_tips i {
  font-size: 50px;
  color: #ff8201;
  margin-left: 30%;
  margin-left: 48%;
}
.find_tips p {
  font-size: 24px;
  text-align: center;
}
.find_tips .el-link {
  font-size: 16px;
  margin: 0 45%;
}
</style>