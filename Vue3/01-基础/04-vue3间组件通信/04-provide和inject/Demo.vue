<template>
  <h1>{{ obj.age }}</h1>
</template>

<script setup>
import { inject } from "vue";

// 子消费
const obj = inject("obj")
console.log(obj);
</script>