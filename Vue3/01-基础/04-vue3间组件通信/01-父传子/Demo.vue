<template>
  <h1>{{ msg }}</h1>
</template>

<script setup>
import { defineProps } from "vue";
// defineProps的作用 就是用来接收父组件传递的数据

defineProps({
  msg: {
    type: String,
  }
})

</script>