<template></template>

<script setup>
import { ref, reactive, readonly, toRaw } from "vue";
// toRaw 得到 返回 reactive 变量或者 readonly 变量的原始变量
// 如果不是 返回原数据
const num = ref({ a: 10 });
const arr = reactive([1, 2, 3])

console.log(toRaw(readonly(num)) === num); // true
console.log(toRaw(num.value)); // { a: 10 }
console.log(toRaw(arr)); // [1,2,3]
console.log(toRaw(readonly(arr))); // [1,2,3]

</script>