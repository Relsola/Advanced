<template>
  <div>
    <p>{{ msg }}</p>
    <p>{{ getNum(2) }}</p>

    <button v-on:click="numAdd">num++</button>
    <button @click="numReduce(3, 1)">num--</button>

    <button @click="getElement">7</button>
    <!-- 既传参 又传事件对象 -->
    <button @click="getAll(0x4e00, 0x9fff, $event)">对</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",
    num: 10,
  }),

  methods: {
    numAdd(val) {
      // 不传参默认第一个参数是事件对象
      val = typeof val === "object" ? 1 : val;
      this.num += val;
    },

    numReduce(num1, num2) {
      this.num -= num1 >> num2;
    },

    getNum(val) {
      return this.num ** val;
    },

    getElement: (e) => {
      let num = e.target.innerText;
      num = Number(num);
      num++;
      e.target.innerText = num;
    },

    getAll: (val1, val2, e) => {
      const start = val1;
      const end = val2;

      const randomCode = ~~(Math.random() * (end - start + 1)) + start;
      const randomChar = String.fromCharCode(randomCode);

      e.target.innerText = randomChar;
    },
  },
};
</script>
