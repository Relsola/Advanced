<template>
    <h1>{{ num }}</h1>
</template>

<script setup>
import { ref, isRef } from "vue";
const num = ref(10);
const obj = { a: 10, b: 20 }

// 检查一个值是否是通过 ref 创建的响应式引用。它返回一个布尔值
// 注意：不是所有响应式数据都是ref, 但是ref一定是响应式数据
console.log(isRef(num));
console.log(isRef(obj));

setTimeout(() => {
    num.value += 10
}, 2000);

</script>