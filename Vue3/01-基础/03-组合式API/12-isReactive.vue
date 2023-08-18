<template></template>

<script setup>
import { ref, reactive, isReactive, readonly, isRef } from "vue";
// isReactive判断一个变量是否是reactive
const num = ref(0);
const arr = reactive([1, 2, 3])
console.log(isReactive(num)); // false
console.log(isReactive(arr)); // true

// readonly状态下 isRef isReactive 依然可以正确判断
console.log(isRef(readonly(num))); // true
console.log(isReactive(readonly(arr))); // true 

</script>