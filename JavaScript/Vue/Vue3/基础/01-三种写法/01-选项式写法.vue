<template>
    <h1>{{ msg }}</h1>

    <h2>{{ num }}</h2>
    <button @click="numAdd">+1</button>
    <button @click="numReduce">-1</button>
</template>
<script>
export default {
    data: () => ({
        msg: "选项式写法",
        num: 10
    }),

    methods: {
        numAdd() {
            this.num++
        },

        numReduce() {
            this.num--
        }
    }
}
</script>