<template>
  <!-- 当组件包含了大量静态内容
    在这种情况下，你可以在根元素上添加 v-once attribute 
    以确保这些内容只计算一次然后缓存起来 
  -->
  <div v-once>
    <div v-for="(value, name) in object" :key="name">
      {{ name + ":" + value }}
    </div>

    <button @click="handle(false)">不强制刷新</button>
    <button @click="handle(true)">强制刷新</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    object: {
      a: 1,
      b: 2
    }
  }),
  methods: {
    handle(val) {
      this.object.c = 3;
      console.log(this.object);

      // 数组或对象更新 $forceUpdate
      if (val) this.$forceUpdate();
    }
  },
}
</script>