<template>
  <h1>{{ obj.age }}</h1>
</template>

<script setup>
import { inject } from "vue";

// 子消费
const obj = inject("obj");
console.log(obj);


const { location, updateLocation } = inject('location');

/* 
  默认情况下，inject 假设传入的注入名会被某个祖先链上的组件提供。
  如果该注入名的确没有任何组件提供，则会抛出一个运行时警告。
  如果在注入一个值时不要求必须有提供者，那么我们应该声明一个默认值
*/
// 如果没有祖先组件提供 "message" value 会是 "这是默认值"
const value = inject('message', '这是默认值');

// 第三个参数表示默认值应该被当作一个工厂函数。
const key = inject('key', () => new ExpensiveClass(), true)
</script>