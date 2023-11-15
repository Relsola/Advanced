<template>
  <!-- 
      v-model 语法糖
      原生元素: v-model => :value + @input
      组件上: v-model => :modelValue +  @update:modelValue
  -->
  <Demo v-model="searchText" />

  <!-- 
    可以通过给 v-model 指定一个参数
      => <Demo :msg="msg" @update:msg="value=$event" />
    可以在单个组件实例上创建多个 v-model 双向绑定
  -->
  <Demo v-model:msg="msg" v-model:title="title" />
  <h2>绑定的值：{{ msg }}</h2>

  <!-- v-model 支持自定义的修饰符 -->
  <Demo v-model.capitalize="myText" />
</template>
<script setup>
import Demo from './components/Demo.vue'
import { ref } from 'vue';

const searchText = ref("");
const msg = ref("Hello Vue3");
const title = ref(111);
</script>