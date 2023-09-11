<template>
   <Demo />
   <button @click="handle">点我一下</button>
</template>
<script setup>
import Demo from './components/Demo.vue'
import { reactive, provide } from 'vue';

// provide 和 inject 提供和消费
// 父提供
const obj = reactive({
   name: "Hello Vue3",
   age: 17
})

// Vue3中因为全局代理 提供消费也是响应式的
provide("obj", obj)

// 建议尽可能将任何对响应式状态的变更都保持在供给方组件中。
const location = ref('North Pole')
function updateLocation() {
   location.value = 'South Pole'
}
provide('location', {
   count: readonly(count), // 可以使用 readonly() 来包装提供的值
   location,
   updateLocation
})

// 应用层全局 Provide
app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!');


/* 
  如果正在构建大型的应用，包含非常多的依赖提供
  或者你正在编写提供给其他开发者使用的组件库
  建议最好使用 Symbol 来作为注入名以避免潜在的冲突

  通常推荐在一个单独的文件中导出这些注入名 Symbol

  // keys.js
  export const myInjectionKey = Symbol();
  
  // 在供给方组件中
  import { provide } from 'vue';
  import { myInjectionKey } from './keys.js';
  provide(myInjectionKey, { 要提供的数据 });

  // 注入方组件
  import { inject } from 'vue';
  import { myInjectionKey } from './keys.js';
  const injected = inject(myInjectionKey);
*/


const handle = () => {
   obj.age++
}
</script>