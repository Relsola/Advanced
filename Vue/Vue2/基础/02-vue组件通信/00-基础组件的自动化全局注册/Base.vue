<template>
    <div>
        <input type="text" v-model="searchText">
        <button @click="search">search</button>
    </div>
</template>
<script>
export default {
    name: "Base",
    data: () => ({ searchText: "" }),
    methods: { search() { console.log(this.searchText) } },
    // 组件的根元素不继承 attribute
    inheritAttrs: false,
}
</script>