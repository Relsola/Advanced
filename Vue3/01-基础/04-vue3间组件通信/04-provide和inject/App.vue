<template>
   <Demo />
   <button @click="handle">点我一下</button>
</template>
<script setup>
import Demo from './components/Demo.vue'
import { reactive, provide } from 'vue';

// provide 和 inject 提供和消费
// 父提供
const obj = reactive({
   name: "Hello Vue3",
   age: 17
})

// Vue3中因为全局代理 提供消费也是响应式的
provide("obj", obj)

const handle = () => {
   obj.age++
}
</script>