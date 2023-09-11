<template>
  <div>
    <h2 ref="h2">{{ msg }}</h2>

    <p>{{ data[0].name }}</p>

    <button @click="handle">点我一下</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue2",
    data: [
      { id: 1, name: "Vue2" },
      { id: 2, name: "react" },
    ],
    xx: { id: 1, name: "Vue2" },
  }),

  methods: {
    handle() {
      this.data[0].num = this.data[0].num ?? 1;
      const num = (this.data[0].num ^= 1);
      this.data[0].name = num === 1 ? "Vue2" : "Vue3";
      this.xx.name = this.data[0].name;
      this.msg = "Hello " + this.data[0].name;
    },
  },

  watch: {
    // 监听的值发生改变就会触发
    msg() {
      console.log(this.msg);
    },

    data: {
      deep: true, // 表示深度侦听
      immediate: true, // 立即侦听 刚打开页面的时候就会侦听到一次
      value: null, // 自己用于解决引用数据类型监听旧值
      // handler名字是固定的
      handler(newVal, oldVal) {
        if (oldVal === undefined) this.value = [...newVal];
        console.log(newVal, this.value);
        this.value = [...newVal];
      },
    },

    // 适用于对象，监听引用数据旧值
    "xx.name"(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
  },
};
</script>


