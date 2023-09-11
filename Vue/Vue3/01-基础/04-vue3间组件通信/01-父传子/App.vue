<template>
   <!-- 父传子通过自定义属性 -->
   <Demo :msg="msg" />

   <!-- 仅写上 prop 但不传值，会隐式转换为 `true` -->
   <Demo is-published />

   <!-- 
      将一个对象的所有属性都当作 props 传入，使用没有参数的 v-bind
      等价于 <Demo :id="post.id" :title="post.title" /> 
   -->
   <Demo v-bind="post" />

   
   <!-- 等同于传入 :disabled="true" -->
   <Demo disabled />
   <!-- 等同于传入 :disabled="false" -->
   <Demo />
</template>
<script setup>
import Demo from './components/Demo.vue'
import { ref } from 'vue';

const msg = ref("Hello Vue3")

const post = {
   id: 1,
   title: 'My Journey with Vue'
}

setInterval(() => {
   msg.value = msg.value === "Hello Vue3" ? "Hello World" : "Hello Vue3"
}, 3000)
</script>