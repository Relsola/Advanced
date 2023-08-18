<template></template>

<script setup>
import { shallowReadonly, isReadonly } from "vue";
/* 
shallowReadonly 对于复杂数据类型 会将第一层变成readonly类型
  但是需要注意 例如 obj={a:1,b:1,c:{c1:1}}
  此时obj的a和obj的b已经是只读的了
  obj并没有变成只读,可以更改
  但是 isReadonly检测obj为 true isReadonly检测obj.a为false
  是因为obj检测是检测obj的属性
  obj.a是obj.a的里面的属性是否为只读
*/
const obj = shallowReadonly({ a: 1, b: { a: 10 } })
console.log(obj); // Proxy(Object) {a: 1, b: {…}}
console.log(isReadonly(obj)); // true
console.log(isReadonly(obj.a)); // false

</script>