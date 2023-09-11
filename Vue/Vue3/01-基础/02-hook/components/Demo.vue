<template>
  <h1>{{ `当前鼠标点击的坐标${point.x},${point.y}` }}</h1>
</template>

<script setup>
import { ref } from "vue";
import usePoint from "../hook/usePoint";
import { useFetch } from './fetch.js';


const point = usePoint();

// 异步状态示例
const url = ref('/initial-url');
const { data, error } = useFetch('...');
// 这将会重新触发 fetch
url.value = '/new-url';

// 或者接收一个 getter 函数：
{
  // 当 props.id 改变时重新 fetch
  const { data, error } = useFetch(() => `/posts/${props.id}`)
}
</script>