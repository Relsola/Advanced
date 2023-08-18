<template>
  <h1>{{ num1 }}</h1>
  <button @click="handle">点我一下</button>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
/* 
  watch 用于监听响应式变量的变化 组件初始化的时候不执行
  watch第一个参数是监听的值 第二个参数是一个函数
  参数函数有两个值,一个是新值,一个是旧值
*/

const num1 = ref(0);
const num2 = ref(1);

//一 监听单个数据
watch(num1, (newVal, oldVal) => {
  console.log("newVal,oldVal", newVal, oldVal);
})

//二 监听多个数据
watch([num1, num2], (a, b) => {
  // 数组形式
  console.log(a, b, a[0] + b[1]);
})

const obj = reactive({ a: 1, b: { a: 10 } })

// 三 设置配置项 默认深度监听
watch(obj, (a, b) => {
  console.log(a, b);
}, {
  immediate: true,
  deep: true,
  flush: "post",
  onTrack: (event) => {
    console.log("count 被追踪", event);
  },
  onTrigger: (event) => {
    console.log("count 被触发", event);
  }
})


const handle = () => {
  num1.value++;
  obj.b.a++
}
</script>