<template>
  <div>
    <!-- 匿名插槽 -->
    <h2><slot>默认值-匿名插槽</slot></h2>

    <!-- 具名插槽 -->
    <h3><slot name="one">默认值-具名One</slot></h3>
    <h3><slot name="two">默认值-具名Two</slot></h3>

    <!-- 作用域插槽 父级中使用子组件中的数据 -->
    <h4><slot :info="info"></slot></h4>

    <h4><slot name="three" :info="info"></slot></h4>

    <button @click="handle">点我一下</button>
  </div>
</template>

<script>
export default {
  data: () => ({ info: 1 }),

  methods: {
    handle() {
      this.info ^= 1;
    },
  },
};
</script>