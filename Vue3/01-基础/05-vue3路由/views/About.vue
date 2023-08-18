<template>
    <h1>About</h1>
    <button @click="handle">去Home(query)</button>
    <button @click="handle2">去Home(name)</button>
    <button @click="handle3">去Home(state)</button>
    <button @click="handle4">去Home(params)</button>
</template>
<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
console.log(router);

const handle = () => {
    router.push({ path: "/", query: { a: "query传参" } })
}

const handle2 = () => {
    router.push({ name: "home", query: { a: "name传参" } })
}

// 安全传参 history.state接收
const handle3 = () => {
    router.push({ path: "/", state: { a: "state传参" } })
}

// 控制台会警告
const handle4 = () => {
    router.push({ path: "home", params: { a: "params传参" } })
}
</script>