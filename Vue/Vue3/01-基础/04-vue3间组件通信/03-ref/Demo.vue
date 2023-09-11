<template>
  <h1>{{ num }}</h1>
</template>

<script setup>
import { ref } from "vue";


/* 
  如果一个子组件使用的是选项式 API 或没有使用 <script setup>
  被引用的组件实例和该子组件的 this 完全一致
  这意味着父组件对子组件的每一个属性和方法都有完全的访问权

  使用了 <script setup> 的组件是默认私有的
  一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西
  除非子组件在其中通过 defineExpose 宏显式暴露
*/
const num = ref(0);
// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({ num });
</script>