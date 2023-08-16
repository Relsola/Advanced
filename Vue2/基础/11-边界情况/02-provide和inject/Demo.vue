<template>
  <div>
    <h1>{{ msg }}</h1>
    <h1>{{ a }}</h1>
  </div>
</template>

<script>
export default {
  // 消费 没有响应式 (单向)
  inject: ["a", "msg"],
};
</script>