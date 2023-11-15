<template>
  <!-- 访问父级组件实例 -->
  <h1>{{ msg }}</h1>
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