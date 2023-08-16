<template>
  <div>
    <p v-objSet="info"></p>
  </div>
</template>

<script>
export default {
  data: () => ({
    info: [
      { id: 1, name: "vue2" },
      { id: 1, name: "vue2" },
      { id: 2, name: "vue3" },
      { id: 3, name: "react" },
      { id: 3, name: "react" },
    ],
  }),

  // 自定义指令（局部定义）
  directives: {
    // 第一种写法  写成对象的形式
    one: {
      // 这个inserted是固定的
      // 第一个参数是绑定的dom节点
      // 第二个参数是携带的信息
      inserted: function (el, op) {
        "函数体";
      },
    },

    // 第二种写法
    two(el, op) {
      "函数体";
    },
  },
};
</script>
