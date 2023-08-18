<template>
    <h1>{{ num }}</h1>
</template>

<script setup>
import { ref, isRef, unref } from "vue";
const num = ref(10);
const obj = { a: 10, b: 20 }

console.log(isRef(num));
console.log(isRef(obj));

// 使用unref获取响应式数据的value,如果不是响应式直接返回值
console.log(unref(num));
console.log(unref(obj));

setTimeout(() => {
    num.value += 10
}, 2000);

</script>