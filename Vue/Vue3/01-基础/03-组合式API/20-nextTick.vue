<script setup>
import { ref, nextTick, onMounted } from 'vue';
const count = ref(0);
let but = ref(null);

onMounted(() => { but = but.value })

// DOM 更新不是同步的。Vue 会在“next tick”更新周期中缓冲所有状态的修改，以确保不管你进行了多少次状态修改，每个组件都只会被更新一次。
const handle = async () => {
    count.value++;
    console.log(but.textContent);
    nextTick();
    // 异步Promise
    await nextTick();
    // 现在 DOM 已经更新了
    console.log(but.textContent);
}
</script>

<template>
    <button @click="handle">{{ count }}</button>
</template>