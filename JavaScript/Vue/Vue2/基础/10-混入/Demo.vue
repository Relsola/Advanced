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
  created() {
    console.log(this.gn);
  }
};

export default {
  // 当组件和混入对象含有同名选项时，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。

  // 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
  mixins: [mixin],

  methods: {
    gn: () => "Once",
  },

  created() {
    console.log(this.ok);
  }
};
</script>