<template>
  <div class="personBox">
    <h2>About Me</h2>
    <el-divider></el-divider>
    <div class="table_person">
      <tr>
        <td>姓名：{{ data.userName }}</td>
        <td>电话：{{ data.telephone }}</td>
      </tr>
      <tr>
        <td>学号：{{ data.stuNum }}</td>
        <td>学院：{{ data.academy }}</td>
      </tr>
      <tr>
        <td>班级：{{ data.classId }}</td>
        <td>性别：{{ data.sex }}</td>
      </tr>
    </div>
    <div class="btnForm">
      <el-button type="info" @click="edit">修改信息</el-button>
      <el-button type="danger" @click="editPsw">修改密码</el-button>
    </div>
    <el-dialog title="" :visible.sync="dialogVisible1" width="50%">
      <div class="edit_form">
        <el-row>
          <el-col :span="12">
            <el-input v-model="data.userName" placeholder="姓名"> </el-input
          ></el-col>
          <el-col :span="12">
            <el-input v-model="data.stuNum" placeholder="学号"> </el-input
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-input v-model="data.academy" placeholder="学院"> </el-input
          ></el-col>
          <el-col :span="12">
            <el-input v-model="data.classId" placeholder="班级"> </el-input
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-input v-model="data.telephone" placeholder="电话"> </el-input
          ></el-col>
          <el-col :span="12">
            <el-input v-model="data.sex" placeholder="性别"> </el-input
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-upload
              class="upload-demo"
              action
              multiple
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :http-request="uploadImg"
              accept=".jpg,.png.,.gif,.jpeg,.JPG,.PNG,.GIF,.JPEG"
            >
              <i class="add el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
          <el-col :span="12"
            ><el-button type="primary" @click="editInfo()"
              >确 定</el-button
            ></el-col
          >
        </el-row>
      </div>
    </el-dialog>
    <!-- 提示修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible2" width="50%">
      <el-form :rules="rules" ref="ref" :model="pswData">
        <el-form-item prop="oldPsw">
          <label>请输入旧密码：</label
          ><el-input v-model="pswData.oldPsw"></el-input>
        </el-form-item>
        <el-form-item prop="newPsw">
          <label>请输入新密码：</label
          ><el-input v-model="pswData.newPsw"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editInfo(data1)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getInfo } from "@/mixin/get.js";
export default {
  inject: ["reload"],
  mixins: [getInfo],
  data() {
    return {
      flag: 0,
      dialogVisible1: false,
      dialogVisible2: false,
      file: "",
      imgUrl: "",
      id: 0,
      psw: "",
      pswData: {
        oldPsw: "",
        newPsw: "",
      },
      rules: {
        oldPsw: { required: true, message: "请输入旧密码", trigger: "blur" },
        newPsw: { required: true, message: "请输入新密码", trigger: "blur" },
      },
    };
  },
  computed: {},
  created() {
    this.id = localStorage.getItem("stuId");
    this.id = parseInt(this.id);
    this.getInfo();
  },
  methods: {
    //上传头像
    uploadImg(param) {
      this.file = param.file;
      const formData = new FormData();
      formData.append("file", this.file);
      this.$http.post("/upload/img", formData).then((res) => {
        //上传头像img
        this.imgUrl = res.data.url;
      });
    },
    //上传成功时的钩子
    handleAvatarSuccess(res, file) {
      this.file = URL.createObjectURL(file.raw);
    },
    edit() {
      this.dialogVisible1 = true;
      this.flag = 1;
    },

    editInfo() {
      if (this.flag == 1) {
        const data1 = {
          id: this.id,
          number: this.data.stuNum,
          telephone: this.data.telephone,
          class: this.data.classId,
          username: this.data.userName,
          sex: this.data.sex,
          academy: this.data.academy,
          imgurl: this.imgUrl,
        };
        this.$http.post("/student/update", data1).then((res) => {
          if (res) {
            this.$message.success("修改成功");
            this.reload();
          } else this.$message.error("修改失败！");
        });
      } else if (this.flag == 2) {
        const data2 = {
          id: this.id,
          password: this.pswData.newPsw,
        };
        this.$refs.ref.validate((val) => {
          if (!val) return 0;
          else {
            if (this.pswData.oldPsw == this.data.passWord) {
              this.$http.post("/student/update", data2).then((res) => {
                if (res) {
                  this.$message.success("修改密码成功，请重新登录");
                  localStorage.clear();
                  this.$router.push("/login");
                }
              });
            } else {
              this.$message.error("你输入的旧密码不对！");
            }
          }
        });
      }
    },
    //是否修改秘密
    editPsw() {
      this.dialogVisible2 = true;
      this.flag = 2;
    },
  },
};
</script>
<style lang="less" scoped>
p {
  font-family: "Quicksand", sans-serif;
}
.personBox td {
  letter-spacing: 0.2rem;
  line-height: 50px;
  color: darkgray;
  text-indent: 30px;
  width: 350px;
}
.btnForm {
  margin: 30px;
}
.edit_form .el-input__inner {
  margin-bottom: 20px;
  width: 96%;
}
</style>