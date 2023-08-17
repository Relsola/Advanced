# watch 有哪些属性，作用是什么

- 看一个 watch 的例子：

<template>
  <div>
    <div>监听到数组list的长度为：{{listLength}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [1, 1, 1],
      listLength: 0
    };
  },
  watch: {
    // 下面这种默认写法的监听器，初始化时不执行
    list(newValue, oldValue) {
      this.listLength = newValue.length;
    }
  }
};
</script>

### 上述代码和页面中有一个问题：
- 我们写了一个监听器，用来监听数组list长度的变化，但是很不幸我们看到页面上所显示的listLength依旧是初始值0。

### 这是为什么呢?
- 在我们使用watch即监听器来实现功能的时候，如果不加特别的声明，它表示所监听的对象发生变化之后才会执行，也就是说它一开始不会执行，所以listLength没有变化。

### 如何解决上述问题呢？
- 用另一个写法，即带选项的watch，并且把immediate属性置为true。
```js
watch: {
  list: {
    immediate: true,
    deep: true,
    handler(newValue, oldValue) {
      
    }
  }
},
```

**介绍一下带选项watch的两个属性:**
- *immediate：*
- 指定 immediate: true 将立即以表达式的当前值触发回调，会立即执行一次。 immediate 立即的

- *deep：*
- 指定 deep: true ，可以监听对象内部值的变化。

普通监听器是不会监听对象属性变化的，因为消耗很大，当我们需要监听这些属性的时候，就需要使用深度监听。


# computed 和 watch 的区别与使用场景

- computed 是计算属性，依赖已有的响应式数据来计算另一个目标变量，用于响应式数据的复杂逻辑计算处理。

- watch  是侦听器，监听到值的变化就会执行相应的回调函数，适用于观测到某个值的变化时 执行复杂的业务逻辑，比如执行异步或开销较大的操作。

**使用场景：**
- 当我们需要进行复杂的数值计算或逻辑处理，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；

- 当我们需要在数据变化时执行异步或开销较大的操作时，使用 watch 是最有用的。