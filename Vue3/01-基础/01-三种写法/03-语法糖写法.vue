<template>
    <h1>{{ msg }}</h1>

    <h2>{{ num }}</h2>
    <button @click="numAdd">+1</button>
    <button @click="numReduce">-1</button>
</template>

<script setup>
import { ref } from 'vue';
const msg = "语法糖写法";
let num = ref(10);
const numAdd = () => { num.value++ }
const numReduce = () => { num.value-- }
</script>