<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",
  }),

  created() {
    // this.$parent指的是父组件
    console.log(this.$parent);
  },
};
</script>