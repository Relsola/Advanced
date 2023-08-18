<template>
    <h1>{{ num }}</h1>
    <h1>{{ arr }}</h1>

    <button @click="handle">num++</button>
</template>

<script setup>
import { reactive, toRef, isRef } from "vue";
// toRef 把一个reactive对象中的某个属性单独抽离出来变成一个ref变量

const ary = [1, 2, 3];
const arr = reactive(ary);

const num = toRef(arr[0]);
console.log(num);

console.log(isRef(num)); // true
console.log(isRef(arr)); // false


const handle = () => {
    arr[0] = ++num.value;
    arr.push(arr.at(-1) + 1)
}
</script>