<template>
  <h1>{{ num }}</h1>
  <button @click="handle">+2 -1</button>
</template>

<script setup>
// defineProps的作用 就是用来接收父组件传递的数据
defineProps({ num: Number }); // 自动引入，可以引入

// 在v3中你需要定义emit的时候就要写上你要触发的事情名
const emits = defineEmits(['numAdd', 'numReduce']);
// 此时你这个emit1就可以去触发a事件
const handle = () => {
  emits("numAdd", 2);
  emits("numReduce", 1);
};
</script>