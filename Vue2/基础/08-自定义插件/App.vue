<template>
  <div>
    <p v-objSet="info"></p>
    <br />
    <p>{{ info | objSet }}</p>
    <br />
    <Once />
    <span>{{ $double(10) }}</span
    >&nbsp; <span>{{ $double("10") }}</span
    >&nbsp; <span>{{ $double("as") }}</span
    >&nbsp; <span>{{ $double(info) }}</span
    >&nbsp;
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
};
</script>
