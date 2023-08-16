<template>
  <div>
    <h2>{{ msg }}</h2>

    <span style="margin: 5px" v-for="item in data" :key="item.id">
      {{ item.name }}
    </span>

    <button @click="addData">点我一下</button>
  </div>
</template>

<script>
export default {
  // props: ["data", "addData"],

  props: {
    data: {
      require: false, // 这就表示你父组件使用Son2组件的时候 必须传递money
      type: Array,
      default: [], //默认值
    },

    addData: {},
  },

  data: () => ({
    msg: "Hello Vue",
  }),
};
</script>

