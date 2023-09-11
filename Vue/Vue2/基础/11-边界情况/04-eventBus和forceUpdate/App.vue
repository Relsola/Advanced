<template>
  <div>
    <h1>父组件 {{ msg }}</h1>
    <Demo />
  </div>
</template>

<script>
import Demo from "@/components/Demo";
export default {
  data: () => ({
    msg: "Hello Word",
    num: 0,
  }),

  methods: {
    handle(...val) {
      const value = val[(this.num ^= 1)];
      this.msg = value === "Hello Word" ? "Hello Vue" : "Hello Word";
    },
  },

  // 示例：
  mounted() {
    // 第三方日期选择器的库
    const picker = new PikaDay({
      field: this.$refs.input,
      format: 'YYYY-MM-DD'
    })

    // 程序化的侦听器
    // this.$once('hook:beforeDestroy', function () {
    //   picker.destroy()
    // })
    this.$once('hook:beforeDestroy', picker.destroy)
  },

  created() {
    // 2. 订阅事件：使用$on方法订阅一个事件，并在回调函数中处理事件。
    // 第一个参数你是要订阅的事件 第二个参数是当事件发布后触发的回调
    // 这里的msg就是传参
    this.$root.$on("message", this.handle);
  },

  components: { Demo },
};
</script>
