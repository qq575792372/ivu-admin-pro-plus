<template>
  <div class="card">
    <EasyForm :data="PageJson"></EasyForm>
  </div>
</template>
<script setup>
import { EasyForm } from "@/lib/lowcode/es/components/index.mjs";

console.log(333, EasyForm);

/* console.log(3333, JadeLowcode.default ?? JadeLowcode); */
</script>
<style lang="scss" scoped></style>
