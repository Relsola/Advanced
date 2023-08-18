<template>
   <!-- 父传子通过自定义属性 -->
   <Demo :msg="msg" />
</template>
<script setup>
import Demo from './components/Demo.vue'
import { ref } from 'vue';

const msg = ref("Hello Vue3")

setInterval(() => {
   msg.value = msg.value === "Hello Vue3" ? "Hello World" : "Hello Vue3"
}, 3000)

</script>