<template>
  <div>
    <h2 ref="h2">{{ msg }}</h2>

    <span ref="vue">vue</span>&nbsp; <span :ref="react">react</span><br />

    <button @click="handle">点我一下</button>

    <!-- 
      $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。
      这仅作为一个用于直接操作子组件的“逃生舱”
      你应该避免在模板或计算属性中访问 $refs。
     -->
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
