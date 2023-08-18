<template>
    <div>
        <h1>{{ msg }}</h1>
        <button @click="handle">子组件</button>
    </div>
</template>

<script>
// 方式一
// export default {
//     data: () => ({
//         msg: "Hello Word"
//     }),

//     props: {
//         value: { // 必须要使用value
//             type: String,
//             default: ""
//         }
//     },

//     methods: {
//         handle() {
//             const value =
//                 this.value === "Hello World" ? "Hello Vue2" : "Hello World"
//             this.$emit("input", value) // value + input
//         }
//     }

// };

// 方式二 注意方式一和方式二变量名不同
export default {
    model: {
        prop: "msg",
        event: "wc"
    },

    props: {
        msg: String
    },

    methods: {
        handle() {
            const value =
                this.msg === "Hello World" ? "Hello Vue2" : "Hello World"
            this.$emit("wc", value)
        }
    }
}
</script>