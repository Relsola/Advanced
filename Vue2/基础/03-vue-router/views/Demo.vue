<template>
  <div>
    <h2>{{ msg }}</h2>

    <h3>{{ $route.params.info ? "name" + $route.params.info : null }}</h3>

    <h3>{{ $route.query.info ? "path" + $route.query.info : null }}</h3>

    <button @click="handle">点我一下</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",
  }),

  methods: {
    handle() {
      console.log(this.$route);
    },
  },
};
</script>

