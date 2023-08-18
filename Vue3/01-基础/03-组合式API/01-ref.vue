<template>
    <h1>{{ num }}</h1>
</template>

<script setup>
// 使用ref需要导入
import { ref } from "vue";
// 定义了一个响应式数据，初始值为10
const num = ref(10);
//如果想要操控这个响应式数据，需要对这个变量.value进行操作
console.log(num);

setTimeout(() => {
    num.value += 10
}, 2000);

</script>