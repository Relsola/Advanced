<template>
  <div>
    <h1>{{ $store.state.count }}</h1>
    <button @click="$store.commit('numAdd', 1)">+ 1</button>
    <button @click="$store.commit('numReduce', 1)">- 1</button>
    <!-- 触发异步的 Action -->
    <button @click="$store.commit('numAddAsync', 1)">- 1</button>
    <Demo />
  </div>
</template>

<script>
import Demo from "./components/Demo.vue";

export default {
  components: { Demo },
};
</script>
