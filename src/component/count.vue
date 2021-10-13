<template>
  <div>
    <el-row>
      <el-col :span="6">
        <i class="iconfont big_icon icon-jiaoshi"></i>
        <div class="font_tips">
          <span class="font_type">{{ adminArray[0] }}</span>
          <p class="font_count">{{ totalTea }}</p>
        </div>
      </el-col>
      <el-col :span="6">
        <i class="iconfont big_icon icon-jiaosemoban"></i>
        <div class="font_tips">
          <span class="font_type">{{ adminArray[1] }}</span>
          <p class="font_count">{{ totalStu }}</p>
        </div>
      </el-col>
      <el-col :span="6">
        <i class="iconfont big_icon icon-lunwentimu"></i>
        <div class="font_tips">
          <span class="font_type">{{ adminArray[2] }}</span>
          <p class="font_count">{{ totalRow }}</p>
        </div>
      </el-col>
      <el-col :span="6">
        <i class="iconfont big_icon icon-zhuangxiang"></i>
        <div class="font_tips">
          <span class="font_type">{{ adminArray[3] }}</span>
          <p class="font_count">{{ totalTopic }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isFlag: 0,
    };
  },
  props: ["totalTea", "totalStu", "totalRow", "totalTopic", "adminArray"],
};
</script>
<style scoped>
.big_icon {
  cursor: pointer;
  font-size: 48px;
  display: inline-block;
  margin-left: 10%;
}
.icon-jiaoshi {
  color: #40c9c6;
}
.icon-jiaosemoban {
  color: #36a3f7;
}
.icon-lunwentimu {
  color: #f4516c;
}
.icon-zhuangxiang {
  color: #34bfa3;
}
.el-row {
  margin-left: 3%;
  padding-top: 10%;
}
.el-col {
  display: flex;
  align-items: center;
  /* position: relative; */
  height: 108px;

  background: #fff;
  width: 22% !important;
  margin-right: 3%;
}
.font_tips {
  /* position: absolute;
  top: 22%;
  right: 10%; */
  margin: 30px;
}
.font_type {
  font-weight: 700;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.45);
}
.font_count {
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  color: #666;
  margin: 10px 0;
}
</style>