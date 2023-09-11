<template>
  <h2>{{ countStore.num }}</h2>
  <h2>{{ countStore.getNum }}</h2>
  <h2>{{ countStore.getDoubleNum }}</h2>

  <button @click="handle">+1</button>
  <button @click="countStore.numReduce(2)">-2</button>
</template>

<script setup>
// 注意Store获取到后不能被解构，那么会失去响应式：
// 导入 storeToRefs 将pinia中的state里面的变量变成我们这边的响应式数据
import { storeToRefs } from "pinia"

import count from "../store/modules/count"
const countStore = count();

const handle = () => {
  countStore.numAdd(1)
}

</script>