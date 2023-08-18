<template></template>

<script setup>
import { ref, readonly } from "vue";
// readonly 把一个对象里面的属性变成只读

let num = ref(0);
num = readonly(num)
console.log(num);
num.value = 10; // 报错

// 对其本身整体的赋值是可以的
// readonly其实只是对对象的属性变成了只读，对象本身可以改变地址
num = [1, 2, 3]
num[0] = 3
console.log(num);

</script>