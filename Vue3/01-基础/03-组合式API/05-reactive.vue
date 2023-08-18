<template>
    <h1>{{ arr }}</h1>

    <button @click="handle">num++</button>
</template>

<script setup>
import { reactive } from "vue";
// reactive 定义一个响应式数据 一般我们使用reactive定义引用数据类型

const ary = [1, 2, 3];
const arr = reactive(ary);
console.log(arr);

console.log(arr === ary); // false

const handle = () => {
    arr.push(arr.at(-1) + 1)
}
</script>