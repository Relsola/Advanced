<template>
    <h1>Home</h1>
    <h2>{{ route.query.a ? route.query.a : null }}</h2>
</template>
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route);
console.log(history.state);

</script>