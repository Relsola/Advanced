<template>
    <h1>{{ num }}</h1>
    <h1>{{ arr }}</h1>

    <button @click="handle">num++</button>
</template>

<script setup>
import { reactive, isRef, toRefs } from "vue";
// toRefs 把一个reactive对象中的所有属性都变成ref变量

const ary = [1, 2, 3];
const arr = reactive(ary);
console.log(arr);

const num = toRefs(arr);
console.log(num);

console.log(isRef(num)); // true
console.log(isRef(num[0])); //true 

const handle = () => {
    arr.push(arr.at(-1) + 1)
}
</script>