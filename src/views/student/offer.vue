<template>
  <div class="offer">
    <h2 class="choose">Hand In Papers</h2>
    <el-divider></el-divider>
    <div class="date">
      <tr>
        <td>今天是：{{ date }}</td>
        <td>论文提交日期：{{ Data2.finishDate }}</td>
      </tr>
      <tr class="table_tr">
        <td>距离提交论文还有：</td>
        <td class="is_date">{{ isDate }}天</td>
      </tr>

      <div class="offer_thesis">
        <el-table border :data="table">
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status == 1" type="danger" round
                >未提交</el-button
              >
              <el-button v-if="scope.row.status == 2" type="success" round
                >已提交</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="论文题目" prop="title"></el-table-column>
          <el-table-column label="截止时间" prop="finish"></el-table-column>
          <el-table-column label="操作" v-if="isSelect">
            <template slot-scope="scope">
              <v-upload v-if="scope.row.status == '1'" :flag="flag"></v-upload>
              <span
                v-if="scope.row.status == '2'"
                style="color: green"
                @click="check"
                >已交</span
              >
              <el-upload
                :on-success="handleAvatarSuccess"
                class="upload-demo"
                action
                multiple
                :show-file-list="false"
                :http-request="editThesis"
              >
                <span>修改</span>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column label="导师回复附件" prop="reply"></el-table-column>
        </el-table>
      </div>
      <el-dialog title="已交论文信息" :visible.sync="dialogVisible" width="40%">
        <tr>
          <span>论文文件：</span>
          <el-link :href="addr">{{ thesis }}</el-link>
        </tr>
        <tr>
          <span>附件大小：</span>
          <span>{{ size }}MB</span>
        </tr>
        <tr>
          <span>上传时间：</span>
          <span>{{ date }}</span>
        </tr>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import upload from "@/component/upload.vue";
import { stuTopic } from "@/mixin/get";
import "@/assets/css/student/offer.css";
export default {
  inject: ["reload"],
  mixins: [stuTopic],
  data() {
    return {
      icon: "el-icon-edit",
      dialogVisible: false,
      addr: "",
      size: 0,
      isSelect: "",
      file: "",
      date: "",
      finishDate: "",
      thesis: "",
      stuNum: "",
      flag: 2,
      isDate: "",
      Form: {
        fileName: "",
      },
      table: [
        {
          title: localStorage.getItem("titleInfo"),
          finish: localStorage.getItem("finishDate"),
          reply: "空",
          status: "",
          fileList: "",
        },
      ],
    };
  },
  components: {
    "v-upload": upload,
  },
  mounted() {},
  created() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.date = year + "-" + month + "-" + day;
    this.title = localStorage.getItem("title");
    this.stuNum = localStorage.getItem("stuNum");
    //获取论文提交状态，未提交status为1，已提交为2
    this.thesis = localStorage.getItem("thesis");
    // 获取文件大小
    this.size = localStorage.getItem("size");
    this.finishDate = localStorage.getItem("finishDate");
    this.getTitle();
    this.getUrl();
    this.getStatus();
  },
  methods: {
    //获得状态等信息
    getStatus() {
      this.$http
        .get("stutopic/list", {
          params: {
            pageNum: 1,
            pageSize: 1,
            stuNum: this.stuNum,
          },
        })
        .then((res) => {
          this.isSelect = res.data.msg.count;
          if (this.isSelect) {
            this.table[0].status = res.data.msg.rows[0].status;
            //获取时间差
            let date2 = new Date();
            let date1 = new Date(
              Date.parse(this.finishDate.replace(/-/g, "/"))
            );
            let iDays = parseInt(
              Math.abs(date1.getTime() - date2.getTime()) / 1000 / 60 / 60 / 24
            );
            this.isDate = iDays;
          }
        });
    },
    //查一下提交论文的路径
    getUrl() {
      if (this.status == 2) {
        this.$http
          .get("/thesis/list", {
            params: {
              pageNum: 1,
              pageSize: 1,
              stuId: this.stuNum,
            },
          })
          .then((res) => {
            this.addr = res.data.msg.rows[0].addr;
            this.mydate = res.data.msg.rows[0].time;
          });
      }
    },
    //查看论文信息
    check() {
      this.dialogVisible = true;
    },
    //修改论文提交
    editThesis(param) {
      this.file = param.file;
      const formData = new FormData();
      formData.append("file", this.file);
      this.$http.post("upload/thesis", formData).then((result) => {
        this.Form.fileName = result.data.url;
        this.fileList = this.file.name;
      });
      setTimeout(() => {
        //存入数据库表
        const data = {
          id: this.stuNum,
          addr: this.Form.fileName,
          mydate: this.date,
        };
        this.$http.post("thesis/update", data).then((res) => {
          // 如果成功
          if (res.data.code == 200) {
            localStorage.setItem("thesis", this.file.name);
            //获取文件大小
            const Size = this.file.size / 1024 / 1024;
            localStorage.setItem("size", Size.toFixed(2));
            this.$message.success("修改论文成功");
            this.reload();
            console.log(this.date);
          }
        });
      }, 1000);
    },
    //上传成功时的钩子
    handleAvatarSuccess(res, file) {
      this.file = URL.createObjectURL(file.raw);
    },
  },
};
</script>
<style lang="less">
</style>