<template>
  <div>
    <Demo>
      {{ msg }}

      <template #one>One</template>
      <template #two>Two</template>

      <template v-slot="scoped">
        <p>父组件1{{ scoped.info }}</p>
      </template>

      <template #three="scoped">
        <p>父组件2{{ scoped.info }}</p>
      </template>
    </Demo>

    <Demo />
  </div>
</template>

<script>
import Demo from "@/components/Demo";
export default {
  data: () => ({
    msg: "Hello World",
  }),

  components: {
    Demo,
  },
};
</script>
