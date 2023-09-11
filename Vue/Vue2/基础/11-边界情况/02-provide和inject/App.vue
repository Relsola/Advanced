<template>
  <div>
    <h1>{{ msg }}</h1>

    <Demo />

    <button @click="handle">点我一样</button>
  </div>
</template>

<script>
import Demo from "@/components/Demo";
export default {
  data: () => ({
    msg: "Hello Word",
  }),



  // 提供  祖先组件不需要知道哪些后代组件使用它提供的 property
  provide() {
    return {
      a: 10,
      msg: this.msg,
      handle: this.handle
    };
  },

  methods: {
    handle() {
      this.msg = this.msg === "Hello Word" ? "Hello Vue" : "Hello Word";
    },
  },

  components: { Demo },
};
</script>
