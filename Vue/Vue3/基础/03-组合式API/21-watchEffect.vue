<template>
    <h1>{{ num1 }}</h1>
    <button @click="handle">点我一下</button>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
/* 
  watchEffect 函数 允许我们自动跟踪回调的响应式依赖
*/

const todoId = ref(1)
const data = ref(null)

// 侦听器两次使用 todoId，一次是作为源，另一次是在回调中。
watch(todoId, async () => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    );
    data.value = await response.json();
}, { immediate: true })


// 使用 watchEffect 简化
watchEffect(async () => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    );
    data.value = await response.json();
})

/* 
  回调会立即执行，不需要指定 immediate: true。
  在执行期间，它会自动追踪 todoId.value 作为依赖（和计算属性类似）。
  每当 todoId.value 变化时，回调会再次执行。
  有了 watchEffect()，我们不再需要明确传递 todoId 作为源值。

  对于有多个依赖项的侦听器来说，使用 watchEffect() 可以消除手动维护依赖列表的负担。
  此外，如果需要侦听一个嵌套数据结构中的几个属性
  watchEffect() 只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性。
*/


/* 
  watch 和 watchEffect 都能响应式地执行有副作用的回调
  它们之间的主要区别是追踪响应式依赖的方式：

    watch 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西
    另外，仅在数据源确实改变时才会触发回调
    watch 会避免在发生副作用时追踪依赖
    因此，我们能更加精确地控制回调函数的触发时机
    
    watchEffect，则会在副作用发生期间追踪依赖
    它会在同步执行过程中，自动追踪所有能访问到的响应式属性
    这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确
*/

/* 
  停止侦听器
  在 setup() 或 <script setup> 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止

  如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，必须手动停止，以防内存泄漏

  要手动停止一个侦听器，请调用 watch 或 watchEffect 返回的函数
*/

// 它会自动停止
watchEffect(() => { })

// ...这个则不会！
setTimeout(() => {
    watchEffect(() => { })
}, 100)


const unwatch = watchEffect(() => { })
// ...当该侦听器不再需要时
unwatch()


// 注意，需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑

watchEffect(() => {
    if (data.value) {
        // 数据加载后执行某些操作...
    }
})
</script>