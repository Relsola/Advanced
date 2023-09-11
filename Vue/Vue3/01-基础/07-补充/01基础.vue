<script setup>
import { ref } from 'vue';
const count = ref(0)

const objectOfAttrs = {
    id: "container",
    class: "wrapper"
}

const handle = () => { count.value++; }
</script>

<template>
    <!-- 真值或一个空字符串 disabled会生效 -->
    <button @click="handle" disabled="">{{ count }}</button>

    <!-- 
        通过不带参数的 v-bind，分别绑定对象上的每一个键值对
        数据绑定中都支持完整的 JavaScript 表达式和调用函数
        每个绑定仅支持单一表达式 一个简单的判断方法是是否可以合法地写在 return 后面 
         <p id='container' class='wrapper'></p>
    -->
    <p v-bind="objectOfAttrs"></p>

    <!-- 简写 动态参数 -->
    <a :[attributeName]="url"> ... </a>
    <a @[eventName]="doSomething"></a>
</template>