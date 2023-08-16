<template>
  <div>
    <h2>{{ msg }}</h2>

    <span v-for="item in Data" :key="item.id">{{ item.name }}&nbsp;</span><br />

    <span v-for="(item, index) in 3" :key="index"> {{ item }}&nbsp;</span><br />

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
  }),
};
</script>
