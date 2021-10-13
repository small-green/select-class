<template>
  <div>
    <el-upload
      class="upload-demo"
      action
      multiple
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      v-model="file.name"
      :http-request="uploadFile"
    >
      <p v-if="Form.fileName && flag == 1" :src="Form.fileName">
        {{ fileList }}
      </p>
      <i v-else class="add el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  props: ["data", "flag"],
  data() {
    return {
      stuNum: "",
      file: "",
      Form: {
        fileName: "",
      },
    };
  },
  created() {
    //获取学号
    this.stuNum = localStorage.getItem("stuNum");
  },
  methods: {
    uploadFile(param) {
      this.file = param.file;
      const formData = new FormData();
      formData.append("file", this.file);
      if (this.flag == 1) {
        this.$http.post("upload/fujian", formData).then((result) => {
          this.Form.fileName = result.data.url;
          this.data.fuJian = result.data.url;
        });
      } else if (this.flag == 2) {
        //上传论文
        this.$http.post("upload/thesis", formData).then((result) => {
          this.Form.fileName = result.data.url;
          this.fileList = this.file.name;
        });
        let mydate = new Date(Date.now() + 8 * 60 * 60 * 1000);
        this.reload();
        setTimeout(() => {
          //存入数据库表
          const data = {
            stuId: this.stuNum,
            addr: this.Form.fileName,
            mydate: mydate,
          };
          this.$http.post("thesis/create", data).then((res) => {
            // 如果成功
            console.log(this.file);
            if (res.data.code == 200) {
              localStorage.setItem("thesis", this.file.name);
              //获取文件大小
              const Size = this.file.size / 1024 / 1024;
              localStorage.setItem("size", Size.toFixed(2));
              this.$message.success("提交论文成功");
              this.reload();
            }
          });
        }, 1000);
      }
    },
    //上传成功时的钩子
    handleAvatarSuccess(res, file) {
      this.file = URL.createObjectURL(file.raw);
    },
  },
};
</script>