<template>
  <div>
    <h2>{{ msg }}</h2>

    <p class="sb ra"></p>
    <p :class="sb"></p>
    <p :class="p"></p>
    <p :class="[sb, 'ra']"></p>
    <p :class="{ sb: true, ra: flag }"></p>

    <br />
    <button @click="handle">点我一下</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",
    sb: "sb",
    p: ["sb", "ra"],
    flag: true,
  }),

  methods: {
    handle() {
      this.p.pop(1);
      this.flag = !this.flag;
    },
  },
};
</script>
<style scoped>
p {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: rebeccapurple;
  margin: 5px;
}

.sb {
  background-color: skyblue;
}

.ra {
  border-radius: 50%;
}
</style>

