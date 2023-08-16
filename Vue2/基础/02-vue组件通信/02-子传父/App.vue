<template>
  <div>
    <span style="margin: 5px" v-for="item in data" :key="item.id">
      {{ item.name }}
    </span>

    <Demo @getData="getData" @addData="addData" @getFun="getFun" />
    <button @click="fn">触发子函数</button>
  </div>
</template>

<script>
import Demo from "./components/Demo.vue";

export default {
  data: () => ({
    data: [],
    gn: null,
  }),

  methods: {
    // 子集触发自定义事件传递参数的时候 会传递到父级的事件监听器上
    getData(data) {
      this.data = [...data];
    },

    addData(val) {
      this.data.push(val);
    },

    fn() {
      this.gn ? this.gn() : true;
    },

    getFun(val) {
      console.log(val);
      this.gn = val;
    },
  },

  components: { Demo },
};
</script>
