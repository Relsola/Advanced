<template>
    <h1>{{ msg }}</h1>

    <h2>{{ num }}</h2>
    <button @click="numAdd">+1</button>
    <button @click="numReduce">-1</button>

    <!-- 
        <ButtonCounter />

        在 DOM 中书写模板需要遵从浏览器中 HTML 的解析行为
        <button-counter></button-counter> 
    -->
</template>

<script setup>
// import ButtonCounter from './ButtonCounter.vue;'

import { ref } from 'vue';
const msg = "语法糖写法";
let num = ref(10);
const numAdd = () => { num.value++ }
const numReduce = () => { num.value-- }
</script>