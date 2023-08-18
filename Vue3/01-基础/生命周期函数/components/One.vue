<template>
    <h1>One</h1>
</template>

<script setup>
import { onActivated, onDeactivated } from "vue";

// 与动态组件有关
onActivated(() => { console.log("激活...") });
onDeactivated(() => { console.log("休眠...") });
</script>