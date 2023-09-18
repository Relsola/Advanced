<template>
  <h2>{{ msg }}</h2>
  <button @click="handle">点我一下</button>

  <!-- v-model 可以在这个组件上正常工作 -->
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />

  <!-- CustomInput -->
  <input v-model="value" />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

// 另一种在组件内实现 v-model 的方式
const value = computed({
  // get 方法需返回 modelValue prop
  get() {
    return props.modelValue
  },
  // set 方法需触发相应的事件
  set(value) {
    emit('update:modelValue', value)
  }
})

// 带参v-model
const propS = defineProps({
  msg: {
    type: String,
    require: true
  },
  title: {
    type: Number,
    require: true
  }
})
const emits = defineEmits(["update:msg", "update:title"])

const handle = () => {
  const value = propS.msg === "Hello Vue3" ? "Hello World" : "Hello Vue3"
  emits("update:msg", value)
}


// 处理 v-model 修饰符
{
  const props = defineProps({
    modelValue: String,
    // 组件的 v-model 上所添加的修饰符，可以通过 modelModifiers prop 在组件内访问到
    // 它的默认值是一个空对象
    modelModifiers: { default: () => ({}) }
  })
  const emit = defineEmits(['update:modelValue'])
  console.log(props.modelModifiers) // { capitalize: true }

  // 处理修饰符逻辑
  function emitValue(e) {
    let value = e.target.value
    if (props.modelModifiers.capitalize) {
      value = value.charAt(0).toUpperCase() + value.slice(1)
    }
    emit('update:modelValue', value)
  }


  // 带参数的 v-model 修饰符
  {
    const props = defineProps(['title', 'titleModifiers'])
    defineEmits(['update:title'])

    console.log(props.titleModifiers) // { capitalize: true }
  }
}
</script>