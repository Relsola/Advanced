<template>
  <div>
    <h1>{{ msg }}</h1>

    <Demo
      :msg="msg"
      :a="a"
      :b="b"
      @add="add"
      @reduce="reduce"
      @handle="handle"
    />

    <button @click="handle">点我一下</button>
  </div>
</template>

<script>
import Demo from "@/components/Demo";
export default {
  data: () => ({
    msg: "Hello Word",
    a: 1,
    b: 2,
  }),

  methods: {
    handle() {
      this.msg = this.msg === "Hello Word" ? "Hello Vue" : "Hello Word";
    },

    add() {
      this.a++;
    },

    reduce() {
      this.b--;
    },
  },

  components: { Demo },
};
</script>
