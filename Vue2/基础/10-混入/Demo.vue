<template>
  <div>
    <h1>{{ ok }}</h1>
    <button @click="gn"></button>
  </div>
</template>

<script>
const mixin = {
  data: () => ({
    ok: "OK",
  }),
  methods: {
    gn() {
      this.ok = this.ok === "OK" ? "NO" : "OK";
    },
  },
};

export default {
  mixins: [mixin],
};
</script>