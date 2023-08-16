<template>
  <div>
    <h2>{{ msg }}</h2>

    <button @click="handle1">传递数据</button>
    <button @click="handle2">添加数据</button>
    <button @click="handle3">传递父函数</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",

    data: [
      { id: 1, name: "vue2" },
      { id: 2, name: "vue3" },
      { id: 3, name: "react" },
    ],

    id: null,

    words: [
      "hello",
      "world",
      "apple",
      "banana",
      "car",
      "dog",
      "cat",
      "tree",
      "house",
      "friend",
    ],
  }),

  methods: {
    // 我们子集可以通过this.$emit(事件名,参数)
    handle1() {
      this.$emit("getData", this.data);
    },

    handle2() {
      this.id = this.id ?? this.data.length;
      const id = ++this.id;
      const n = this.words.length;
      const num = (Math.random() * n) >> 0;
      const name = this.words[num];
      this.$emit("addData", { id, name });
    },

    handle3() {
      function addDate() {
        this.id = this.id ?? this.data.length;
        const id = ++this.id;
        const name = "子函数";
        this.data.push({ id, name });
      }
      this.$emit("getFun", addDate);
    },
  },
};
</script>

