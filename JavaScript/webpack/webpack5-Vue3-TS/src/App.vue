<template>
    <h2>{{ msg }}</h2>

    <button @click="handle">展示</button>

    <Demo v-if="num === 1" />

    <template v-if="num === 1">
        <PreFetchDemo />
        <PreloadDemo />
    </template>

    <img :src="smallImg" alt="小于10kb的图片" />
    <img :src="bigImg" alt="大于于10kb的图片" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

// 资源懒加载
const Demo = defineAsyncComponent(() => import("@/components/Demo.vue"));

// 资源预加载
const PreFetchDemo = defineAsyncComponent(() => import(
    /* webpackChunkName: "PreFetchDemo" */
    /*webpackPrefetch: true*/
    "@/components/Demo.vue"
));

const PreloadDemo = defineAsyncComponent(() => import(
    /* webpackChunkName: "PreloadDemo" */
    /*webpackPreload: true*/
    "@/components/Demo.vue"
));

import smallImg from '@/assets/imgs/5kb.webp';
import bigImg from '@/assets/imgs/22kb.webp';
import "@/style.css";

const num = ref(0);
const msg = computed(() => num.value === 0 ? "Vue" : "Webpack");

const handle = () => {
    num.value ^= 1;
    import("@/style.scss");
}

onMounted(() => {
    console.log(this);
})

</script>
<style scoped></style>