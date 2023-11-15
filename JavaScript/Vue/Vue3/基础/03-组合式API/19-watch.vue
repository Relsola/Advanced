<template>
    <h1>{{ num1 }}</h1>
    <button @click="handle">点我一下</button>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
/* 
  watch 函数在每次响应式状态发生变化时触发回调函数
  watch第一个参数是监听的值 第二个参数是一个函数
  参数函数有两个值,一个是新值,一个是旧值
*/

const num1 = ref(0);
const num2 = ref(1);

// 单个 ref
watch(num1, (newVal, oldVal) => {
    console.log("newVal,oldVal", newVal, oldVal);
})

// getter 函数
watch(
    () => num1.value + num2.value,
    (sum) => {
        console.log(`sum of x + y is: ${sum}`)
    }
)

// 多个来源组成的数组
watch([num1, num2], (a, b) => {
    // 数组形式
    console.log(a, b, a[0] + b[1]);
})

/*
  // 注意，不能直接侦听响应式对象的属性值 
   const obj = reactive({ count: 0 })
   
   // 错误，因为 watch() 得到的参数是一个 number
   watch(obj.count, (count) => {
    console.log(`count is: ${count}`)
   })

   // 用一个返回该属性的 getter 函数解决
   watch(
    () => obj.count,
    (count) => {
        console.log(`count is: ${count}`)
    })
*/

const obj = reactive({ a: 1, b: { a: 10 } })

/* 
  直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发

  相比之下，一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调
*/
watch(
    () => state.someObject,
    () => {
        // 仅当 state.someObject 被替换时触发
    }
)

// 显式配置
watch(obj, (a, b) => {
    console.log(a, b);
}, {
    immediate: true, // 立即执行一次
    deep: true, // 深层侦听器
    // 默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用
    flush: "post", // 侦听器回调中能访问被 Vue 更新之后的 DOM
    onTrack: (event) => {
        console.log("count 被追踪", event);
    },
    onTrigger: (event) => {
        console.log("count 被触发", event);
    }
})

const handle = () => {
    num1.value++;
    obj.b.a++
}
</script>