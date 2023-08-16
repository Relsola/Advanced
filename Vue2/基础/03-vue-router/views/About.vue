<template>
  <div>
    <h2>{{ msg }}</h2>

    <router-link to="/about/one">One传参&nbsp;&nbsp;</router-link>
    <router-link to="/about/two">Two</router-link><br />

    <button @click="toDemo">去Demo</button>
    <button @click="toTwo">去Two</button>
    <button @click="toDemo2">去Demo2</button>
    <button @click="toDemo3">name + params</button>
    <button @click="toDemo4">path + query</button>
    <button @click="toOne">动态路由传参</button>

    <router-view />
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "About",
  }),

  methods: {
    // 代码的路由跳转
    // 第一种写法
    toDemo() {
      this.$router.push("/demo");
    },

    // 第二种写法
    toTwo() {
      this.$router.push({ path: "/about/two" });
    },

    // 第三种写法
    toDemo2() {
      this.$router.push({ name: "demo" });
    },

    // 第三种带参数
    toDemo3() {
      this.$router.push({ name: "demo", params: { info: "传参而来" } });
    },

    // 第二种带参数
    toDemo4() {
      this.$router.push({ path: "/demo", query: { info: "传参而来" } });
    },

    // 第二种传参(动态路由传参)
    toOne() {
      this.$router.push({ path: "/about/one/1/2" });
    },

    // 替换
    // this.$router.replace("/");
  },
};
</script>

