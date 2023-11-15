<template>
  <Demo />
  <h1 class="demo-text">{{ count }}</h1>
  <button @click="increment">add</button>
  <Once />
</template>

<script setup lang="ts">
import useCountStore from '../src/store/useCountStore';

const { increment } = useCountStore();
const { count } = storeToRefs(useCountStore());
</script>

<style lang="less" scoped>
.demo {
  &-text {
    color: @color;
    text-decoration: dashed;
  }
}
</style>
