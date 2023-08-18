<template>
  <h1>{{ `当前鼠标点击的坐标${point.x},${point.y}` }}</h1>
</template>

<script setup>
import usePoint from "../hook/usePoint"

const point = usePoint();
</script>