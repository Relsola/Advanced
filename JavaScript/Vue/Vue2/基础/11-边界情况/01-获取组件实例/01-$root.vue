<template>
  <!-- 访问根实例 -->
  <Demo />
</template>

<script>
import Demo from "@/components/Demo";
export default {
  created() {
    // this.$root就是根组件
    console.log(this.$root);
  },
  components: { Demo },
};
</script>
