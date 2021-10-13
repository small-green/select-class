<template>
  <el-form :model="data" :rules="Rules">
    <el-row>
      <el-col :span="12">
        <el-form-item prop="number">
          <el-input v-model="data.number" placeholder="课题号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="name">
          <el-input v-model="data.name" placeholder="课题名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item prop="type">
          <el-select
            @change="change"
            class="select"
            clearable
            filterable
            v-model="data.type"
          >
            <el-option
              v-for="item in typeData"
              :key="item.id"
              :value="item.type"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="finishDate">
          <el-date-picker
            class="finish"
            value-format="yyyy-MM-dd"
            v-model="data.finishDate"
            type="date"
            placeholder="完成日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item prop="fujian">
          <v-upload :data="data" :flag="flag"></v-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-button
      v-if="msg"
      class="myBtn"
      type="primary"
      v-on:click="$emit('edit', data)"
      >修改</el-button
    >
    <el-button v-else type="primary" @click="$emit('add', data)" class="myBtn"
      >新增</el-button
    >
  </el-form>
</template>

<script>
import upload from "@/component/upload.vue";
export default {
  components: {
    "v-upload": upload,
  },

  data() {
    return {
      flag: 1,
      arrary: {},
      typeData: {},
      difficult: "",
      Rules: {
        name: [{ required: true, message: "请输入课题", trigger: "blur" }],
      },
    };
  },
  props: ["msg", "data"],
  mounted() {
    this.getList();
  },
  methods: {
    change(value) {
      this.$http
        .get("/topictype/list", {
          params: {
            pageNum: 1,
            pageSize: 5,
            type: value,
          },
        })
        .then((res) => {
          this.difficult = res.data.msg.rows[0].difficult;
          this.data.difficult = res.data.msg.rows[0].difficult;
          this.data.type = value;
          this.getList();
        });
      this.difficult = "";
      this.data.difficult = "";
    },
    //获取类型
    getList() {
      this.$http
        .get("/topictype/list", {
          params: {
            pageNum: 1,
            pageSize: 5,
          },
        })
        .then((res) => {
          this.typeData = res.data.msg.rows;
        });
    },
  },
};
</script>
