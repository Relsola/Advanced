<template>
  <div>
    <h2>{{ msg }}</h2>

    <span>{{ count }}</span
    >&nbsp; <span>{{ left }}</span
    >&nbsp; <span>{{ right }}</span
    >&nbsp;

    <button @click="numAdd(2)">+ 2</button>
    <button @click="numReduce(2)">- 2</button>
    <button @click="numAddAsync(5)">异步</button>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    msg: "Hello Vue",
  }),

  methods: {
    ...mapMutations(["numAdd", "numReduce"]),
    ...mapActions(["numAddAsync"]),
  },

  computed: {
    // mapState映射的数据在computed中
    ...mapState(["count"]),
    ...mapGetters(["left", "right"]),
  },
};
</script>

