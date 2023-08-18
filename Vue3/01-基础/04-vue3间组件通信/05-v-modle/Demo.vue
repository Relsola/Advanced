<template>
  <h2>{{ msg }}</h2>
  <button @click="handle1">点我一下</button>
  <button @click="handle2">点我一下</button>
</template>

<script setup>
/* 
  自定义组件内部会接收一个名为modelValue的props，
  和一个名为update:modelValue的emits。
  自定义组件将新值，通过emit(update:modelValue, value)将事件抛出，
  从而实现数据的双向绑定。
*/

const props = defineProps({
  msg: {
    type: String,
    require: true
  },
  obj: {
    type: Object,
    require: true
  }
})

const emit = defineEmits(["update:msg"])

function handle1() {
  props.obj.a++
}

function handle2() {
  const value = props.msg === "Hello Vue3" ? "Hello World" : "Hello Vue3"
  emit("update:msg", value)
}


</script>