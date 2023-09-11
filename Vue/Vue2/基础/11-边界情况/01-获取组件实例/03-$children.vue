<template>
  <div>
    <Demo />
  </div>
</template>

<script>
import Demo from "@/components/Demo";
export default {
  created() {
    // 拿到的是一个数组 这个数组中是你所有的子组件实例
    console.log(this.$children);
  },
  components: { Demo },
};
</script>
