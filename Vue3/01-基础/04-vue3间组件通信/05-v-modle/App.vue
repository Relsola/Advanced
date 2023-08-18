<template>
   <Demo v-model:msg="msg" v-model:obj="obj" />
   <h2>绑定的值：{{ obj.a }}</h2>
</template>
<script setup>
import Demo from './components/Demo.vue'
import { ref, reactive } from 'vue';
/* 
  v-model：双向绑定
    Vue3：v-model规定：
      在自定义组件上使用v-model指令时，
      会给组件绑定一个model-value属性和一个update:model-value监听事件
      1.属性名任意(假设为xxx)，事件名必须为update:xxx
      2 .效果：未用v-model

      <Switch :value="value" @update:value="value=$event"/>
      <Switch v-model:value="value"/>
*/

const obj = reactive({ a: 10 })

const msg = ref("Hello Vue3")
</script>