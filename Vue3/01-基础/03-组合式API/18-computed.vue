<template>
    <h2>{{ num }}</h2>
    <h2>{{ getNum1 }}</h2>
    <h2>{{ getNum2 }}</h2>

    <button @click="handle">点我一下</button>
</template>

<script setup>
import { ref, computed } from "vue";
// computed 和 vue2的计算属性一样 有两种写法
// 第一种写法 写成函数  第二种 写成对象
const num = ref(10) // computed 计算属性需要的数据也要是响应式的

const getNum1 = computed(() => num.value + 1)

const getNum2 = computed({
    get: () => num.value + 2,
    set: (val) => {
        num.value += val
        console.log("set...");
    }
})

const handle = () => { getNum2.value = 1 }
</script>