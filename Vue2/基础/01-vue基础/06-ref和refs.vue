<template>
  <div>
    <h2 ref="h2">{{ msg }}</h2>

    <span ref="vue">vue</span>&nbsp; <span :ref="react">react</span><br />

    <button @click="handle">点我一下</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",
    react: "react",
  }),

  methods: {
    handle(e) {
      console.log(this.$refs);
      console.log(this.$refs.h2);
      e.target.innerHTML = this.$refs.h2.innerHTML;
    },
  },
};
</script>
