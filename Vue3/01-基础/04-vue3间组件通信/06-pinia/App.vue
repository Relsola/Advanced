<template>
   <h1>{{`${pointStore.mouseX} , ${pointStore.mouseY}` }}</h1>
   <Demo />
</template>
<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import Demo from './components/Demo.vue'
import point from './store/modules/point';

const pointStore = point();

onMounted(() => {
   window.addEventListener("click", pointStore.getXY)
})

onBeforeUnmount(() => {
   window.removeEventListener("click", pointStore.getXY)
})
</script>