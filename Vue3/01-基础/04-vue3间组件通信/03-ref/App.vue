<template>
   <Demo ref="num" />

   <button @click="handle">+1</button>
</template>
<script setup>
import Demo from './components/Demo.vue'
import { onMounted, ref } from 'vue';

// 如果想拿到ref标记的组件
const num = ref(null);
onMounted(() => {
   console.log(num);
   console.log(num.value);
   console.log(num.value.num);
})

// 可以操作子组件的数据
const handle = () => {
   num.value.num++
}

</script>