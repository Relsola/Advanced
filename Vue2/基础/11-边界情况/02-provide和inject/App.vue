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

  // 提供
  provide() {
    return {
      a: 10,
      msg: this.msg,
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
