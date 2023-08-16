<template>
  <div>
    <Demo :data="data" :addData="addData" />
  </div>
</template>

<script>
import Demo from "./components/Demo.vue";

export default {
  data: () => ({
    data: [
      { id: 1, name: "vue2" },
      { id: 2, name: "vue3" },
      { id: 3, name: "react" },
    ],

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
    addData() {
      const id = this.data.at(-1).id + 1;
      const n = this.words.length;
      const num = (Math.random() * n) >> 0;
      const name = this.words[num];
      this.data.push({ id, name });
    },
  },

  components: { Demo },
};
</script>
