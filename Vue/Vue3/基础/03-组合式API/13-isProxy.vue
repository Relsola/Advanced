<template></template>

<script setup>
import { ref, reactive, isReactive, readonly, isProxy } from "vue";
// isProxy 判断一个变量是否是reactive或readonly (其实就是是否被proxy代理)
// 如果用ref去定义一个引用数据类型,那么它的value实际上是reactive对象
const num = ref({ a: 10 });
const arr = reactive([1, 2, 3])
console.log(isReactive(num.value)); // true

console.log(isProxy(num)); // false
console.log(isProxy(num.value)); // true
console.log(isProxy(arr)); // true

console.log(isProxy(readonly(num))); // true
console.log(isProxy(readonly(arr))); // true 

</script>