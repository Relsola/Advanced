<template>
   <!-- 模板引用 -->
   <Demo ref="num" />

   <!-- 当在 v-for 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素 -->
   <p v-for="item in [1, 2, 3]" ref="itemRefs">{{ item }}</p>

   <!-- 
      函数模板引用
      需要使用动态的 :ref 绑定才能够传入一个函数
      当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数会是 null
    -->
   <input :ref="(el) => {
      /* 将 el 赋值给一个数据属性或 ref 变量 */
      input = el;
   }">

   <button @click="handle">+1</button>
</template>
<script setup>
import Demo from './components/Demo.vue'
import { onMounted, ref } from 'vue';

// 访问模板引用
// 声明一个 ref 来存放该元素的引用  必须和模板里的 ref 同名
const num = ref(null);
const itemRefs = ref([]);
let input = ref(null);


onMounted(() => {
   // 注意，你只可以在组件挂载后才能访问模板引用
   console.log(num);
   console.log(num.value);
   console.log(itemRefs.value);
})


// 可以操作子组件的数据
const handle = () => {
   num.value.num++
}

</script>