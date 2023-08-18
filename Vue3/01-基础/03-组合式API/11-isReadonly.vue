<template></template>

<script setup>
import { ref, readonly, isReadonly } from "vue";
// isReadonly判断一个对象里面的属性是否是只读的

let num = ref(0);
num = readonly(num)
console.log(isReadonly(num)); // true
console.log(isReadonly(num.value)); // false

num = [1, 2, 3]
console.log(isReadonly(num)); // false

</script>