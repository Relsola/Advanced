<template>
  <h1>{{ num }}</h1>
  <button @click="handle">+2 -1</button>

  <!-- 直接使用 $emit 方法触发自定义事件 -->
  <button @click="$emit('someEvent', 1)">click me</button>
</template>

<script setup>
defineProps({ num: Number });


/* 
  组件可以显式地通过 defineEmits() 宏来声明它要触发的事件
  $emit 方法不能在组件的 <script setup> 部分中使用 但 defineEmits() 会返回一个相同作用的函数供我们使用
  defineEmits() 宏不能在子函数中使用 必须直接放置在 <script setup> 的顶级作用域下
*/
const emits = defineEmits(['numAdd', 'numReduce']);

const handle = () => {
  emits("numAdd", 2);
  emits("numReduce", 1);
};

// emits 选项还支持对象语法，它允许我们对触发事件的参数进行验证
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}

// TS类型标注声明 emits
/* 
  defineEmits<{
    (e: 'change', id: number): void
    (e: 'update', value: string): void
  }>()
*/
</script>