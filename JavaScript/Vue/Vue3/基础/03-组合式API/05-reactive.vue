<template>
  <h1>{{ arr }}</h1>

  <button @click="handle">num++</button>
</template>

<script setup>
import { reactive } from "vue";
// reactive 定义一个响应式数据 使用reactive定义引用数据类型
/* 
  reactive() 将使对象本身具有响应性
  reactive() 将深层地转换对象
  reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的
  对一个已存在的代理对象调用 reactive() 会返回其本身
*/

const raw = {}
const proxy = reactive(raw)
// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true
// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true

/* 
  reactive() 的局限性
  1. 有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。
  2. 不能替换整个对象，因为这样的话与第一个引用的响应性连接将丢失
  3. 对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：
*/

let state = reactive({ count: 0 });
// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state = reactive({ count: 1 });

// 当解构时，count 已经与 state.count 断开连接
let { count } = state;
// 不会影响原始的 state
count++;

// 该函数接收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
callSomeFunction(state.count)

/* 
  额外的 ref 解包细节
  作为 reactive 对象的属性​
  一个 ref 会在作为响应式对象的属性被访问或修改时自动解包。
  换句话说，它的行为就像一个普通的属性
  如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，那么它会替换掉旧的 ref

  只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为浅层响应式对象的属性被访问时不会解包。
*/

{
  const count = ref(0);
  const state = reactive({ count });
  console.log(state.count); // 0
  state.count = 1;
  console.log(count.value); // 1


  const otherCount = ref(2)
  state.count = otherCount
  console.log(state.count) // 2
  // 原始 ref 现在已经和 state.count 失去联系
  console.log(count.value) // 1
}

/* 
  数组和集合的注意事项
  与 reactive 对象不同的是，当 ref 作为响应式数组或原生集合类型(如 Map) 中的元素被访问时，它不会被解包
*/
{
  const books = reactive([ref('Vue 3 Guide')])
  // 这里需要 .value
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // 这里需要 .value
  console.log(map.get('count').value)
}

/* 
  在模板中解包的注意事项​
  在模板渲染上下文中，只有顶级的 ref 属性才会被解包。
  在下面的例子中，count 和 object 是顶级属性，但 object.id 不是

  如果 ref 是文本插值的最终计算值 (即 {{ }} 标签)，那么它将被解包
*/
{
  const count = ref(0)
  const object = { id: ref(1) }

  // 为了解决这个问题，我们可以将 id 解构为一个顶级属性
  const { id } = object

  { { object.id } } // => {{ object.id.value }}
}


const ary = [1, 2, 3];
const arr = reactive(ary);
console.log(arr);

console.log(arr === ary); // false

const handle = () => {
  arr.push(arr.at(-1) + 1)
}
</script>