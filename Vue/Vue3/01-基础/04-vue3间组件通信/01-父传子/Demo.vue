<template>
  <h1>{{ msg }}</h1>
</template>

<script setup>
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
import { ref, computed } from "vue";

// props 可以使用 defineProps() 宏来声明
// const props = defineProps(['msg']);
// console.log(props.foo);

// 对象的形式
const props = defineProps({
  title: String,
  likes: Number
});

// 计将 props.title 作为初始值  使 prop 和后续更新无关了
const title = ref(props.title);
// 该 prop 变更时计算属性也会自动更新
const normalizedTitle = computed(() => props.title.trim().toLowerCase());

// Prop 校验
defineProps({
  // 基础类型检查  null undefined 则会跳过任何类型检查）
  propA: Number,

  // 多种可能的类型
  propB: [String, Number],

  propC: {
    type: String,
    required: true // 必传
  },

  propD: {
    type: Number,
    default: 100 // 默认值
  },

  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },

  // 自定义类型校验函数
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },

  // 函数类型的默认值
  propG: {
    type: Function,
    // 一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  },

  author: Person,
});

// 声明为 Boolean 类型的 props 有特别的类型转换规则
defineProps({
  disabled: [Boolean, Number] // true
})

defineProps({
  disabled: [Boolean, String] // true
})

defineProps({
  disabled: [Number, Boolean] // true
})

defineProps({
  disabled: [String, Boolean] // disabled="" 空串
})

/* 
  校验选项中的 type 可以是下列这些原生构造函数：
  String Number Boolean Array Object Date Function Symbol

  type 也可以是自定义的类或构造函数，Vue 将会通过 instanceof 来检查类型是否匹配
*/

/*
  补充细节
  1. 如果一个 prop 的名字很长，应使用 camelCase 形式
  2. 所有 prop 默认都是可选的，除非声明了 required: true
  3. Boolean 类型的未传递 prop 将被转换为 false。可以通过设置 default: undefined 将与非布尔类型的 prop 的行为保持一致
  4. 如果声明了 default 值，那么在 prop 的值被解析为 undefined 时，无论 prop 是未被传递还是显式指明的 undefined，都会改为 default 值
* /

// TS类型标注声明 props
/* 
  defineProps<{
    title?: string
    likes?: number
  }>()
*/
</script>