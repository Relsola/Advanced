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

/* 
  Ref 可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构，比如 Map。
  非原始值将通过 reactive 转换为响应式代理
*/

setTimeout(() => {
    num.value += 10
}, 2000);

</script>