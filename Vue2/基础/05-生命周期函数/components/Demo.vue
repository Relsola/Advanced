<template>
  <div>
    <h2 ref="once">Demo {{ info }}</h2>

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

  // 最早执行的生命周期函数
  // vue初始化之前执行 此时你的data和methods都没有加载出来
  beforeCreate() {
    console.log("beforeCreate...", this.info);
  },

  // created 此时你的data和methods都已经加载好了
  created() {
    console.log("created...", this.info, this.$refs.once);
  },

  // beforeMount 此时我们的dom已经在内存中准备好了 但是还没有挂载到页面上
  beforeMount() {
    console.log("beforeMount...", this.$refs.once);
  },

  // mounted 表示真实dom已经有了 已经渲染到页面了
  mounted() {
    console.log("mounted...", this.$refs.once);
  },

  // beforeUpdate 此时data中的数据已经更新了
  // 但是dom中的数据还没有更新 还是旧数据
  beforeUpdate() {
    console.log("beforeUpdate...", this.info, this.$refs.once.innerHTML);
  },

  // updated 此时data和页面上的数据都更新了 保持同步
  updated() {
    console.log("updated...", this.info, this.$refs.once.innerHTML);
  },

  // beforeDestroy 销毁前 此时功能还都可以正常使用
  beforeDestroy() {
    console.log("beforeDestroy...  Demo要被销毁了");
  },

  // destroyed 销毁后 功能不在能正常使用
  destroyed() {
    console.log("destroyed...  Demo被销毁了");
  },
};
</script>