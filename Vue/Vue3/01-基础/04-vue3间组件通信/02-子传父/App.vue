<template>
   <!-- 自定义事件传递事件 -->
   <Demo :num="num" @numAdd="numAdd" @numReduce="numReduce" />

   <Demo @some-event="n => num += n" />
</template>
<script setup>
import Demo from './components/Demo.vue'
import { ref } from 'vue';

const num = ref(1);

const numAdd = (val) => {
   console.log(`+${val}...`);
   num.value += val
}

const numReduce = (val) => {
   console.log(`-${val}...`);
   num.value -= val
}
</script>