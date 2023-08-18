<template>
  <h1>{{ num }}</h1>
</template>

<script setup>
import { ref } from "vue";
// 如果父组件使用的是ref去获取子组件数据的 
// 那么子组件需要把数据暴露出去
const num = ref(0);
defineExpose({ num }) // 自动引入api
</script>