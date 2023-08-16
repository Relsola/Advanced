<template>
  <h2>One</h2>
</template>

<script>
export default {
  created() {
    console.log("One被创建了");
  },

  activated() {
    console.log("出现...");
  },

  deactivated() {
    console.log("隐藏....");
  },
};
</script>