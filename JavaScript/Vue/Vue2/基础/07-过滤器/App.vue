<template>
  <div>
    <p>{{ info | objSet }}</p>
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

  // 局部过滤器写到
  filters: {
    fil(arg) {
      "函数体";
    },
  },
};
</script>
