<template>
  <div>
    <h2>{{ msg }}</h2>

    <p style="background-color: skyblue"></p>
    <p :style="{ backgroundColor: 'skyblue', borderRadius: '50px' }"></p>
    <p :style="style"></p>
    <p :style="[{ backgroundColor: flag }, { borderRadius: '50px' }]"></p>
    <p></p>

    <br />
    <button @click="handle">点我一下</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",
    style: { backgroundColor: "skyblue", borderRadius: "50px" },
    flag: "skyblue",
  }),

  methods: {
    handle() {
      delete this.style.borderRadius;
      this.flag = "rebeccapurple";
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

