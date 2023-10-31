<template>
  <div class="card padding-40">
    <div class="text-success">{{ msg }}</div>
    <a-button type="primary" @click="handleClick">测试</a-button>
    <el-button type="primary" @click="handleClick"><span>测试</span></el-button>
    <a-input v-model="msg" placeholder="输入内容" style="width: 200px; margin-left: 20px" />

    <el-input v-model="msg" placeholder="输入内容" style="width: 200px; margin-left: 20px" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDark, useToggle } from "@vueuse/core";
import { ElMessage } from "element-plus";
import userStore from "@/store/modules/user";
let msg = ref("");
const user = userStore();
console.log(user.token);

ElMessage({
  message: "this is a message.",
  grouping: true,
  type: "success",
});

const handleClick = () => {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
};
</script>
<style lang="scss" scoped></style>
