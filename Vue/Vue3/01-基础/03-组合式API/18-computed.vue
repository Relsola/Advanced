<template>
    <h2>{{ num }}</h2>
    <h2>{{ getNum1 }}</h2>
    <h2>{{ getNum2 }}</h2>

    <button @click="handle">点我一下</button>
</template>

<script setup>
import { ref, computed } from "vue";
// computed 和 vue2的计算属性一样 有两种写法
// 第一种写法 写成函数  第二种 写成对象
const num = ref(10) // computed 计算属性需要的数据也要是响应式的

const getNum1 = computed(() => num.value + 1)

// 调用 setter 直接赋值计算属性value
const getNum2 = computed({
    get: () => num.value + 2,
    set: (val) => {
        num.value += val
        console.log("set...");
    }
});

// 计算属性调试
/* 
  我们可以向 computed() 传入第二个参数
  是一个包含了 onTrack 和 onTrigger 两个回调函数的对象：
  
    onTrack 将在响应属性或引用作为依赖项被跟踪时被调用。
    onTrigger 将在侦听器回调被依赖项的变更触发时被调用。
    这两个回调都会作为组件调试的钩子，接受相同格式的调试事件
*/
const plusOne = computed(() => count.value + 1, {
    onTrack(e) {
        // 当 count.value 被追踪为依赖时触发
        debugger
    },
    onTrigger(e) {
        // 当 count.value 被更改时触发
        debugger
    }
})
// 访问 plusOne，会触发 onTrack
console.log(plusOne.value)
// 更改 count.value，应该会触发 onTrigger
count.value++


const handle = () => { getNum2.value = 1 }
</script>