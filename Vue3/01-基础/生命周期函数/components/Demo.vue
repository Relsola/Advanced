<template>
  <h1>Demo</h1>
</template>

<script setup>
import { onBeforeUnmount, onUnmounted } from "vue";

// 销毁阶段
onBeforeUnmount(() => { console.log("开始销毁...") });
onUnmounted(() => { console.log("销毁完成...") });

</script>