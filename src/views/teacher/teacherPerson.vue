<template>
  <div class="teacher_person">
    <el-divider content-position="left">个人信息</el-divider>
    <el-form :disabled="disabled" :rules="rules" ref="ref" :model="form">
      <div class="row_form">
        <el-form-item prop="teaNum">
          <el-input v-model="form.teaNum" placeholder="工号"></el-input>
        </el-form-item>
        <el-form-item prop="teaName">
          <el-input v-model="form.teaName" placeholder="姓名"></el-input>
        </el-form-item>
      </div>
      <div class="row_form">
        <el-form-item prop="telephone">
          <el-input v-model="form.telephone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item prop="sex">
          <el-input v-model="form.sex" placeholder="性别"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="later_form">
      <el-upload
        class="upload-demo"
        action
        multiple
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :http-request="uploadImg"
        accept=".jpg,.png.,.gif,.jpeg,.JPG,.PNG,.GIF,.JPEG"
      >
        <i v-if="isUpload" class="add el-icon-plus avatar-uploader-icon"></i>
        <el-image
          v-else
          style="width: 100px; height: 100px"
          :src="squareUrl"
        ></el-image>
      </el-upload>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        :type="type"
        @click="editInfo"
        >{{ isTisp }}</el-button
      >
    </div>
  </div>
</template>
<script>
import { getTeahcerInfo, loading } from "@/mixin/get.js";
export default {
  inject: ["reload"],
  mixins: [getTeahcerInfo, loading],
  data() {
    return {
      flag: true,
      isUpload: true,
      type: "primary",
      disabled: true,
      isTisp: "修改",
      rules: {
        teaNum: { required: true, message: "请输入工号", trigger: "blur" },
        teaName: { required: true, message: "请输入用户名", trigger: "blur" },
        sex: { required: true, message: "请输入姓名", trigger: "blur" },
        telephone: { required: true, message: "请输入电话", trigger: "blur" },
      },
    };
  },
  methods: {
    //上传头像
    uploadImg(param) {
      this.file = param.file;
      const formData = new FormData();
      formData.append("file", this.file);
      this.$http.post("/upload/img", formData).then((res) => {
        //上传头像img
        this.squareUrl = res.data.url;
        this.isUpload = false;
      });
    },
    //上传成功时的钩子
    handleAvatarSuccess(res, file) {
      this.file = URL.createObjectURL(file.raw);
    },
    editInfo() {
      this.disabled = false;
      this.type = "danger";
      this.isTisp = "确认";
      this.flag = !this.flag;
      if (this.isTisp == "确认" && this.flag) {
        //进行修改信息的操作
        const data = {
          userid: localStorage.getItem("teaId"),
          number: this.form.teaNum,
          username: this.form.teaName,
          sex: this.form.sex,
          telephone: this.form.telephone,
          imgurl: this.squareUrl,
        };
        this.$http.post("/teacher/update", data).then((res) => {
          this.loading();
          this.disabled = true;
          this.type = "primary";
          this.isTisp = "修改";
          localStorage.setItem("teaName", this.form.teaName);
          setTimeout(() => {
            this.reload();
          }, 1000);
        });
      }
    },
  },
};
</script>
<style scoped>
.el-form {
  margin-top: 10%;
}
.teacher_person {
  height: 100%;
}
.el-divider__text {
  font-size: 18px;
  letter-spacing: 0.2rem;
  color: #ffd04b;
}
.row_form {
  display: flex;
  justify-content: space-evenly;
}
.el-button {
  margin-left: 20%;
}
.upload-demo {
  margin-left: 20%;
  margin-bottom: 2%;
  width: 100px;
}
</style>