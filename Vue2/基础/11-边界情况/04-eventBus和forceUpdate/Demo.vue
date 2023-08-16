<template>
  <div>
    <h1>子组件 {{ msg }}</h1>
    <button @click="handle">子组件</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Word",
  }),

  methods: {
    handle() {
      // 在 Vue实例 中创建事件总线 new Vue()
      // 1. 发布事件：使用$emit方法发布一个事件，你可以传递任意参数给订阅者。
      // 第一个参数是你要发布的事件的名字 第二个参数你传参
      this.$root.$emit("message", "Hello Word", "Hello Vue");
    },
  },
};
</script>