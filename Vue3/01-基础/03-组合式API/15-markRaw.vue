<template></template>

<script setup>
import { ref, reactive, readonly, markRaw } from "vue";
// markRaw 将一个对象标记为永久原始对象,不能被代理

const obj = markRaw({ a: 10 })
console.log(ref(obj) === obj); // false
console.log(ref(obj).value === obj); // true
console.log(reactive(obj) === obj); // true
console.log(readonly(obj) === obj); // true
console.log(readonly(obj) === ref(obj).value); // true

console.log(ref(obj).value); // {a: 10, __v_skip: true}
console.log(reactive(obj)); // {a: 10, __v_skip: true}
console.log(readonly(obj)); // {a: 10, __v_skip: true}

</script>