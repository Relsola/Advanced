<template>
  <div>
    <h2>{{ msg }}</h2>

    <!-- 循环渲染数组 -->
    <span v-for="item in Data" :key="item.id">{{ item.name }}&nbsp;</span><br />

    <!-- 重复3次模板 -->
    <span v-for="(item, index) in 3" :key="index"> {{ item }}&nbsp;</span><br />

    <!-- 循环渲染对象 -->
    <span v-for="(value, name, index) in 3" :key="name"> {{ `${index}.${name}:${value}` }}</span><br />

    <!-- 循环渲染函数 -->
    <div v-for="set in sets">
      <span v-for="n in even(set)">{{ n }}</span>
    </div>

    <span v-for="item in 'Date'" :key="item.charCodeAt(0)">
      {{ item }}&nbsp;
    </span>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",

    Data: [
      { id: 3, name: "vue2" },
      { id: 4, name: "react" },
      { id: 5, name: "vue3" },
    ],

    sets: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]],

    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    },
  }),

  methods: {
    even: numbers => numbers.filter(number => number % 2 === 0)
  }
};
</script>
