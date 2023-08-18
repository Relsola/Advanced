<template>
  <div>
    <Demo v-model="msg" />
    <div>外面的值:{{ msg }}</div>
    <button @click="handle">父组件</button>
  </div>
</template>

<script>
import Demo from "@/components/Demo";
export default {
  data: () => ({
    msg: "Hello World"
  }),

  methods: {
    handle() {
      this.msg = this.msg === "Hello World" ? "Hello Vue2" : "Hello World"
    }
  },

  components: { Demo },
};
</script>
