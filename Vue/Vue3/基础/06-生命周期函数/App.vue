<template>
  <KeepAlive>
    <component :is="son"></component>
  </KeepAlive>

  <Demo v-if="num & 1 === 1" />

  <h1>{{ num }}</h1>
  <button @click="add">+1</button>
</template>

<script setup>
import Demo from "./components/Demo.vue";
import One from "./components/One.vue";
import Two from "./components/Two.vue";

import {
  ref,
  watch,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onRenderTracked,
  onRenderTriggered,
  onActivated,
  onDeactivated,
  onErrorCaptured
} from "vue";

const num = ref(1);
let son = One
watch(num, () => { son = num.value & 1 === 1 ? One : Two })
const add = () => { num.value++ };

/*  
  在vue3中，setup语法糖已经替代了beforeCreate和created.
  处于props解析完毕，组件没有创建的时候
*/

// 初始化
onBeforeMount(() => { console.log("开始挂载...") });
onRenderTracked(() => { console.log("跟踪...") });
onMounted(() => { console.log("挂载完成...") });

// 更新阶段
onRenderTriggered(() => { console.log("触发...") });
onBeforeUpdate(() => { console.log("开始更新...") });
onUpdated(() => { console.log("更新完成...") });


// 销毁阶段
onBeforeUnmount(() => { console.log("开始销毁...") });
onUnmounted(() => { console.log("销毁完成...") });

// 与动态组件有关
onActivated(() => { console.log("激活...") });
onDeactivated(() => { console.log("休眠...") });

// 异常捕获
onErrorCaptured(() => { console.log("错误捕获...") });

</script>