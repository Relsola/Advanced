<template>
  <div>
    <h1>{{ msg }}</h1>

    <button @click="handle1">$attrs</button>
    <button @click="handle2">$listeners</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: null,
  }),

  props: ["a"],

  methods: {
    handle1() {
      // $attrs可以拿到父组件传递下来的数据（props没有接收的）
      console.log(this.$attrs);
      this.msg = this.$attrs.msg;
    },

    handle2() {
      // $listeners可以拿到父组件传递下来的自定义方法
      console.log(this.$listeners);
      this.$listeners.handle();
    },
  },
};
</script>