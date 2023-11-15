<template>
  <div>
    <h1>{{ once }}</h1>
    <button @click="fn">+ 1</button>

    <Demo />
  </div>
</template>

<script>
import Demo from "@/components/Demo";
export default { components: { Demo } };
</script>
