<template>
    <h1>{{ msg }}</h1>

    <h2>{{ num }}</h2>
    <button @click="numAdd">+1</button>
    <button @click="numReduce">-1</button>
</template>
<script>
import { ref } from 'vue';
export default {
    setup() {
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