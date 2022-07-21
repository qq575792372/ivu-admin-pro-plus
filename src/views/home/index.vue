<template>
  <div class="card">
    {{ user.token }}
    <a-button type="primary" @click="handleClick">测试</a-button>
    {{ msg }}
    <a-input v-model="msg" placeholder="输入内容" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import userStore from "@/store/modules/user";
let msg = ref("");
const user = userStore();
console.log(user.token);

const handleClick = () => {
  user.token = msg.value;
  console.log(user.token);
};
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
