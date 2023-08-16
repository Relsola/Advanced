<template>
  <div>
    <p>{{ msg }}</p>
    <input type="text" v-model="text" @input="getThis" />
    <input type="password" v-model="password" @input="getThis" />

    <!-- 
        事件修饰符 可以连用 @click.stop.prevent.once
        prevent 取消默认事件
        取消事件冒泡
        once修饰符 只执行一次
     -->
    <a href="http://localhost:8080/" @click.stop.prevent.once="text = '112'"
      >我跳我自己</a
    >
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",
    text: null,
    password: null,
  }),

  methods: {
    getThis() {
      this.getInfo(this);
    },

    getInfo: (vue) => {
      console.log(vue.text);
      console.log(vue.password);
    },
  },
};
</script>
