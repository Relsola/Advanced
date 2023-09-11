<template>
    <h1>{{ msg }}</h1>

    <h2>{{ num }}</h2>
    <button @click="numAdd">+1</button>
    <button @click="numReduce">-1</button>
</template>
<script>
import { ref } from 'vue';
export default {
    // 如果没有使用 <script setup>,props 必须以 props 选项的方式声明，props 对象会作为 setup() 函数的第一个参数被传入
    props: ['title'],

    // 事件需要通过 emits 选项来定义，emit 函数也被暴露在 setup() 的上下文对象上
    emits: ['inFocus', 'submit'],

    setup(props, { emit }) {
        console.log(props.title);
        emit('submit');

        const msg = "组合式写法";
        let num = ref(10);

        const numAdd = () => { num.value++ }
        const numReduce = () => { num.value-- }

        return {
            msg,
            num,
            numAdd,
            numReduce
        }
    }
}
</script>