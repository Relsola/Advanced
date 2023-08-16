<template>
  <div>
    <h2 ref="h2">{{ msg }}</h2>

    <p>{{ num }}</p>
    <p>{{ getNum }}</p>
    <p>{{ getDoubleNum }}</p>

    <button @click="handle">点我一下</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",
    num: 9,
  }),

  methods: {
    handle() {
      this.num++;
      this.getDoubleNum = 10;
    },
  },

  computed: {
    getNum() {
      console.log(this.num);
      return ~this.num;
    },

    // set函数是当你去设置计算属性的值的时候调用的
    getDoubleNum: {
      get() {
        console.log("get...");
        return this.num * 2;
      },
      set(val) {
        console.log("set...");
        console.log(val);
        this.num += val;
      },
    },
  },
};
</script>
