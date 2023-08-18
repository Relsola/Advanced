<template></template>

<script setup>
import { shallowReactive, isReactive } from "vue";
/* 
shallowReactive 对于复杂数据,会将第一层变成reactive类型
  但是需要注意 如：obj={a:1,b:1,c:{c1:1}}
  此时obj的a和obj的b已经是响应式reactive
  但是如果你isReactive(obj.a)false 是因为当你obj.a的时候,已经是obj的第二层,也就是判断的是obj的a的里面的属性是否为Reactive类型
  对obj使用isReactive返回true,因为访问的是obj的属性
*/
const obj = shallowReactive({ a: 1, b: { a: 10 } })
console.log(obj);
console.log(isReactive(obj)); // true
console.log(isReactive(obj.a)); // false

</script>