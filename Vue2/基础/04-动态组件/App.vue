<template>
  <div>
    <Demo />

    <keep-alive>
      <component :is="once" />
    </keep-alive>

    <button @click="handle">切换组件</button>
  </div>
</template>

<script>
import Demo from "@/components/Demo.vue";
import One from "@/components/One.vue";
import Two from "@/components/Two.vue";

export default {
  data: () => ({
    once: "One",
  }),

  methods: {
    handle() {
      this.once = this.once === "One" ? "Two" : "One";
    },
  },

  components: {
    Demo,
    One,
    Two,
  },
};
</script>